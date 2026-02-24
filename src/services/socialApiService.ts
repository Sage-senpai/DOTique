/**
 * socialApiService.ts
 *
 * Social platform API integrations for DOTique.
 * Covers: Instagram Graph API, Pinterest API v5, X (Twitter) API v2, Figma API.
 *
 * Per spec §8 — Social API Integrations:
 *  - Users connect social accounts via OAuth
 *  - DOTique imports fashion-relevant assets (images, boards, posts, files)
 *  - Connected account metadata is stored in Supabase `social_accounts` table
 *
 * Environment variables required:
 *  VITE_INSTAGRAM_CLIENT_ID    — Instagram Basic Display / Graph API client
 *  VITE_PINTEREST_CLIENT_ID    — Pinterest API v5 OAuth client
 *  VITE_X_CLIENT_ID            — X API v2 OAuth 2.0 PKCE client
 *  VITE_FIGMA_CLIENT_ID        — Figma API OAuth client
 *
 * All OAuth flows use PKCE where supported and redirect through
 * window.location.origin + "/auth/social/callback?provider=<name>"
 */

import { reportError, reportWarning } from "./errorService";
import { supabase } from "./supabase";
import type { DatabaseSocialAccount } from "@/types/database.types";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID as string | undefined;
const PINTEREST_CLIENT_ID = import.meta.env.VITE_PINTEREST_CLIENT_ID as string | undefined;
const X_CLIENT_ID = import.meta.env.VITE_X_CLIENT_ID as string | undefined;
const FIGMA_CLIENT_ID = import.meta.env.VITE_FIGMA_CLIENT_ID as string | undefined;

type SocialProvider = DatabaseSocialAccount["provider"];

function callbackUrl(provider: SocialProvider): string {
  return `${window.location.origin}/auth/social/callback?provider=${provider}`;
}

// ---------------------------------------------------------------------------
// PKCE helpers
// ---------------------------------------------------------------------------

async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier)
  );
  const challenge = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return { verifier, challenge };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  permalink: string;
}

export interface PinterestPin {
  id: string;
  title?: string;
  description?: string;
  media: { images: { "1200x": { url: string } } };
  link?: string;
  created_at: string;
}

export interface PinterestBoard {
  id: string;
  name: string;
  description?: string;
  pin_count: number;
  follower_count: number;
  privacy: "PUBLIC" | "PROTECTED" | "SECRET";
}

export interface XPost {
  id: string;
  text: string;
  created_at: string;
  attachments?: { media_keys?: string[] };
  entities?: { urls?: Array<{ expanded_url: string; images?: Array<{ url: string }> }> };
}

export interface FigmaFile {
  key: string;
  name: string;
  thumbnail_url: string;
  last_modified: string;
}

export interface FigmaExportFrame {
  id: string;
  name: string;
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// OAuth initiation
// ---------------------------------------------------------------------------

/**
 * Open an OAuth popup for the given provider.
 * Resolves with the OAuth code once the popup redirects back.
 */
export async function initiateOAuth(provider: SocialProvider): Promise<string> {
  const redirect = callbackUrl(provider);
  let authUrl: string;

  switch (provider) {
    case "instagram": {
      if (!INSTAGRAM_CLIENT_ID) {
        reportWarning("socialApiService: VITE_INSTAGRAM_CLIENT_ID not set", { provider });
        throw new Error("Instagram integration not configured");
      }
      const params = new URLSearchParams({
        client_id: INSTAGRAM_CLIENT_ID,
        redirect_uri: redirect,
        scope: "user_profile,user_media",
        response_type: "code",
      });
      authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;
      break;
    }

    case "pinterest": {
      if (!PINTEREST_CLIENT_ID) {
        reportWarning("socialApiService: VITE_PINTEREST_CLIENT_ID not set", { provider });
        throw new Error("Pinterest integration not configured");
      }
      const { verifier, challenge } = await generatePKCE();
      sessionStorage.setItem("pinterest_pkce_verifier", verifier);
      const params = new URLSearchParams({
        client_id: PINTEREST_CLIENT_ID,
        redirect_uri: redirect,
        response_type: "code",
        scope: "boards:read,pins:read,user_accounts:read",
        code_challenge: challenge,
        code_challenge_method: "S256",
      });
      authUrl = `https://www.pinterest.com/oauth/?${params.toString()}`;
      break;
    }

    case "x": {
      if (!X_CLIENT_ID) {
        reportWarning("socialApiService: VITE_X_CLIENT_ID not set", { provider });
        throw new Error("X (Twitter) integration not configured");
      }
      const { verifier, challenge } = await generatePKCE();
      sessionStorage.setItem("x_pkce_verifier", verifier);
      const state = crypto.randomUUID();
      sessionStorage.setItem("x_oauth_state", state);
      const params = new URLSearchParams({
        response_type: "code",
        client_id: X_CLIENT_ID,
        redirect_uri: redirect,
        scope: "tweet.read users.read offline.access",
        state,
        code_challenge: challenge,
        code_challenge_method: "S256",
      });
      authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
      break;
    }

    case "figma": {
      if (!FIGMA_CLIENT_ID) {
        reportWarning("socialApiService: VITE_FIGMA_CLIENT_ID not set", { provider });
        throw new Error("Figma integration not configured");
      }
      const state = crypto.randomUUID();
      sessionStorage.setItem("figma_oauth_state", state);
      const params = new URLSearchParams({
        client_id: FIGMA_CLIENT_ID,
        redirect_uri: redirect,
        scope: "file_read",
        state,
        response_type: "code",
      });
      authUrl = `https://www.figma.com/oauth?${params.toString()}`;
      break;
    }

    default:
      throw new Error(`Unknown social provider: ${provider as string}`);
  }

  return new Promise((resolve, reject) => {
    const popup = window.open(authUrl, `${provider}_oauth`, "width=520,height=680");
    if (!popup) {
      reject(new Error("Popup was blocked — allow popups for this site"));
      return;
    }

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const msg = event.data as { type?: string; code?: string; error?: string };
      if (msg.type === `social_oauth_${provider}_success` && msg.code) {
        window.removeEventListener("message", handler);
        resolve(msg.code);
      } else if (msg.type === `social_oauth_${provider}_error`) {
        window.removeEventListener("message", handler);
        reject(new Error(msg.error ?? `${provider} OAuth failed`));
      }
    };

    window.addEventListener("message", handler);

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        window.removeEventListener("message", handler);
        reject(new Error("OAuth popup was closed without completing"));
      }
    }, 500);
  });
}

// ---------------------------------------------------------------------------
// Supabase persistence
// ---------------------------------------------------------------------------

/**
 * Persist (upsert) a connected social account into Supabase `social_accounts`.
 */
export async function connectSocialAccount(
  userId: string,
  provider: SocialProvider,
  data: {
    providerUserId: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: string;
    scopes: string[];
    username?: string;
  }
): Promise<void> {
  const { error } = await supabase.from("social_accounts").upsert(
    {
      user_id: userId,
      provider,
      provider_user_id: data.providerUserId,
      access_token: data.accessToken,
      refresh_token: data.refreshToken ?? null,
      token_expires_at: data.expiresAt ?? null,
      scopes: data.scopes,
      username: data.username ?? null,
      last_synced_at: new Date().toISOString(),
    },
    { onConflict: "user_id,provider" }
  );

  if (error) {
    reportError(error, { service: "socialApiService", action: "connectSocialAccount", provider });
    throw error;
  }
}

/**
 * Disconnect (delete) a social account from Supabase.
 */
export async function disconnectSocialAccount(
  userId: string,
  provider: SocialProvider
): Promise<void> {
  const { error } = await supabase
    .from("social_accounts")
    .delete()
    .eq("user_id", userId)
    .eq("provider", provider);

  if (error) {
    reportError(error, { service: "socialApiService", action: "disconnectSocialAccount", provider });
    throw error;
  }
}

/**
 * Fetch all connected social accounts for a user.
 */
export async function getConnectedAccounts(
  userId: string
): Promise<DatabaseSocialAccount[]> {
  const { data, error } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    reportError(error, { service: "socialApiService", action: "getConnectedAccounts" });
    throw error;
  }

  return (data ?? []) as DatabaseSocialAccount[];
}

// ---------------------------------------------------------------------------
// Instagram — media import
// ---------------------------------------------------------------------------

/**
 * Fetch recent media from Instagram Graph API using a stored access token.
 * Returns up to 25 most recent items.
 */
export async function fetchInstagramMedia(
  accessToken: string
): Promise<InstagramMedia[]> {
  try {
    const fields = "id,media_type,media_url,thumbnail_url,caption,timestamp,permalink";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=25`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Instagram API ${response.status}`);
    const json = (await response.json()) as { data: InstagramMedia[] };
    return json.data ?? [];
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "fetchInstagramMedia" });
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Pinterest — boards & pins import
// ---------------------------------------------------------------------------

export async function fetchPinterestBoards(
  accessToken: string
): Promise<PinterestBoard[]> {
  try {
    const response = await fetch("https://api.pinterest.com/v5/boards?privacy_filter=all&page_size=25", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error(`Pinterest API ${response.status}`);
    const json = (await response.json()) as { items: PinterestBoard[] };
    return json.items ?? [];
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "fetchPinterestBoards" });
    throw err;
  }
}

export async function fetchPinterestBoardPins(
  accessToken: string,
  boardId: string
): Promise<PinterestPin[]> {
  try {
    const url = `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error(`Pinterest API ${response.status}`);
    const json = (await response.json()) as { items: PinterestPin[] };
    return json.items ?? [];
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "fetchPinterestBoardPins", boardId });
    throw err;
  }
}

// ---------------------------------------------------------------------------
// X (Twitter) — posts import
// ---------------------------------------------------------------------------

export async function fetchXTimeline(
  accessToken: string,
  userId: string,
  maxResults = 20
): Promise<XPost[]> {
  try {
    const params = new URLSearchParams({
      "tweet.fields": "created_at,attachments,entities",
      expansions: "attachments.media_keys",
      "media.fields": "url,preview_image_url",
      max_results: String(maxResults),
    });
    const url = `https://api.twitter.com/2/users/${userId}/tweets?${params.toString()}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error(`X API ${response.status}`);
    const json = (await response.json()) as { data: XPost[] };
    return json.data ?? [];
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "fetchXTimeline" });
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Figma — file & frame import
// ---------------------------------------------------------------------------

export async function fetchFigmaFiles(
  accessToken: string
): Promise<FigmaFile[]> {
  try {
    const response = await fetch("https://api.figma.com/v1/me/files?page_size=25", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error(`Figma API ${response.status}`);
    const json = (await response.json()) as { files: FigmaFile[] };
    return json.files ?? [];
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "fetchFigmaFiles" });
    throw err;
  }
}

/**
 * Export a specific Figma frame as a PNG image URL.
 *
 * @param accessToken - Figma OAuth access token
 * @param fileKey     - Figma file key (from URL: figma.com/file/<key>/...)
 * @param nodeId      - Frame/component node ID
 */
export async function exportFigmaFrame(
  accessToken: string,
  fileKey: string,
  nodeId: string
): Promise<string> {
  try {
    const params = new URLSearchParams({
      ids: nodeId,
      format: "png",
      scale: "2",
    });
    const response = await fetch(
      `https://api.figma.com/v1/images/${fileKey}?${params.toString()}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!response.ok) throw new Error(`Figma export API ${response.status}`);
    const json = (await response.json()) as { images: Record<string, string> };
    const url = json.images[nodeId];
    if (!url) throw new Error(`No image URL returned for node ${nodeId}`);
    return url;
  } catch (err) {
    reportError(err, { service: "socialApiService", action: "exportFigmaFrame", fileKey, nodeId });
    throw err;
  }
}
