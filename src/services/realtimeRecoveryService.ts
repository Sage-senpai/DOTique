/**
 * realtimeRecoveryService.ts
 *
 * Manages Supabase Realtime channel health and automatic reconnection.
 *
 * Problem: Supabase Realtime WebSocket connections can drop silently on
 * mobile networks, long idle tabs, or proxy timeouts. Without recovery,
 * users miss live feed updates and chat messages until a hard refresh.
 *
 * Solution: This service wraps every Realtime channel subscription and:
 *  1. Tracks channel state (subscribing / subscribed / closed / errored)
 *  2. Detects unexpected disconnections via Supabase channel callbacks
 *  3. Applies exponential back-off reconnection (max 5 attempts, ~30 s cap)
 *  4. Fires optional onRecovered / onFailed callbacks for UI feedback
 *
 * Usage:
 *   import { realtimeRecovery } from "@/services/realtimeRecoveryService";
 *
 *   const unsub = realtimeRecovery.watch("feed_posts", (channel) => {
 *     channel.on("postgres_changes", { event: "*", schema: "public", table: "posts" }, handler);
 *   }, {
 *     onRecovered: () => toast.success("Live feed reconnected"),
 *     onFailed: () => toast.warning("Live updates paused — check connection"),
 *   });
 *
 *   // Later:
 *   unsub(); // remove and clean up
 */

import { supabase } from "./supabase";
import { reportError, reportWarning } from "./errorService";
import type { RealtimeChannel } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1_000;
const MAX_DELAY_MS = 30_000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RecoveryOptions {
  /** Called when a channel successfully re-subscribes after a drop. */
  onRecovered?: () => void;
  /** Called after MAX_RETRIES exhausted without success. */
  onFailed?: () => void;
  /** Maximum number of reconnect attempts before giving up. Default: 5 */
  maxRetries?: number;
}

type ChannelSetup = (channel: RealtimeChannel) => void;

interface ManagedChannel {
  name: string;
  setup: ChannelSetup;
  options: RecoveryOptions;
  channel: RealtimeChannel | null;
  retries: number;
  retryTimer: ReturnType<typeof setTimeout> | null;
  removed: boolean;
}

// ---------------------------------------------------------------------------
// Internal registry
// ---------------------------------------------------------------------------

const registry = new Map<string, ManagedChannel>();

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

function delay(attempt: number): number {
  const jitter = Math.random() * 500;
  return Math.min(BASE_DELAY_MS * Math.pow(2, attempt - 1) + jitter, MAX_DELAY_MS);
}

function subscribe(managed: ManagedChannel): void {
  if (managed.removed) return;

  // Remove previous channel if any
  if (managed.channel) {
    supabase.removeChannel(managed.channel);
    managed.channel = null;
  }

  const channel = supabase.channel(managed.name);

  // Let caller attach their listeners
  managed.setup(channel);

  channel.subscribe((status, err) => {
    if (managed.removed) return;

    if (status === "SUBSCRIBED") {
      if (managed.retries > 0 && managed.options.onRecovered) {
        managed.options.onRecovered();
      }
      managed.retries = 0;
    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
      const maxRetries = managed.options.maxRetries ?? MAX_RETRIES;

      if (err) {
        reportWarning("realtimeRecovery: channel error", {
          channel: managed.name,
          status,
          error: String(err),
        });
      }

      if (managed.retries >= maxRetries) {
        reportError(
          new Error(`Realtime channel "${managed.name}" failed after ${maxRetries} retries`),
          { service: "realtimeRecoveryService", channel: managed.name }
        );
        if (managed.options.onFailed) managed.options.onFailed();
        return;
      }

      managed.retries++;
      const wait = delay(managed.retries);

      managed.retryTimer = setTimeout(() => {
        subscribe(managed);
      }, wait);
    }
  });

  managed.channel = channel;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Watch a named Supabase Realtime channel with automatic recovery.
 *
 * @param name    - Unique channel name (matches Supabase channel key)
 * @param setup   - Function that attaches `.on()` listeners to the channel
 * @param options - Optional recovery callbacks and retry config
 * @returns       - Unsubscribe function — call this to stop watching
 */
function watch(
  name: string,
  setup: ChannelSetup,
  options: RecoveryOptions = {}
): () => void {
  // Tear down existing entry with the same name
  const existing = registry.get(name);
  if (existing) {
    existing.removed = true;
    if (existing.retryTimer) clearTimeout(existing.retryTimer);
    if (existing.channel) supabase.removeChannel(existing.channel);
    registry.delete(name);
  }

  const managed: ManagedChannel = {
    name,
    setup,
    options,
    channel: null,
    retries: 0,
    retryTimer: null,
    removed: false,
  };

  registry.set(name, managed);
  subscribe(managed);

  return () => {
    managed.removed = true;
    if (managed.retryTimer) clearTimeout(managed.retryTimer);
    if (managed.channel) supabase.removeChannel(managed.channel);
    registry.delete(name);
  };
}

/**
 * Remove all managed channels (call on logout or app teardown).
 */
function removeAll(): void {
  for (const managed of registry.values()) {
    managed.removed = true;
    if (managed.retryTimer) clearTimeout(managed.retryTimer);
    if (managed.channel) supabase.removeChannel(managed.channel);
  }
  registry.clear();
}

/**
 * Returns the current status of a named channel.
 * Returns null if not currently watched.
 */
function getStatus(name: string): "watching" | "retrying" | "removed" | null {
  const managed = registry.get(name);
  if (!managed) return null;
  if (managed.removed) return "removed";
  if (managed.retries > 0) return "retrying";
  return "watching";
}

export const realtimeRecovery = { watch, removeAll, getStatus };
