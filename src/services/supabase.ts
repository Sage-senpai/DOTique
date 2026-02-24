import { createClient } from "@supabase/supabase-js";
import { reportWarning } from "./errorService";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required."
  );
}

// ---------------------------------------------------------------------------
// Timeout-aware fetch
// Supabase JS retries indefinitely on ERR_NAME_NOT_RESOLVED.
// We wrap fetch with a 10-second timeout so failures are detected fast and
// the Supabase client can give up after its built-in retry budget.
// ---------------------------------------------------------------------------
const FETCH_TIMEOUT_MS = 10_000;

let _offlineNotified = false;

function timeoutFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  return fetch(input, { ...init, signal: controller.signal })
    .then((res) => {
      clearTimeout(timer);
      _offlineNotified = false; // backend is reachable again — reset flag
      return res;
    })
    .catch((err: unknown) => {
      clearTimeout(timer);

      // Warn once in dev when the backend is unreachable — avoid log spam
      if (!_offlineNotified) {
        _offlineNotified = true;
        reportWarning("Supabase backend unreachable — check VITE_SUPABASE_URL or project status", {
          url: typeof input === "string" ? input : String(input),
          cause: err instanceof Error ? err.message : String(err),
        });
      }

      throw err;
    });
}

// ---------------------------------------------------------------------------
// Supabase client
// ---------------------------------------------------------------------------
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: timeoutFetch,
  },
});
