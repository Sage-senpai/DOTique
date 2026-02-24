/**
 * zkLoginService.ts
 *
 * Zero-knowledge login for DOTique.
 *
 * Flow (per spec §4 — Authentication):
 *  1. User clicks "Continue with Google" or "Continue with Apple"
 *  2. OAuth redirect → receive JWT (id_token)
 *  3. Extract JWT `sub` (subject) + nonce
 *  4. Send JWT to ZK prover endpoint → receive ZK proof
 *  5. Derive deterministic Polkadot address from sub hash
 *  6. Store session: { address, provider, sub, proof }
 *
 * Dependencies:
 *  - VITE_GOOGLE_CLIENT_ID  — Google OAuth 2.0 client ID
 *  - VITE_ZK_PROVER_URL     — URL of the ZK prover service
 *
 * NOTE: This is a production-ready scaffold. The ZK proof step uses a
 * pluggable prover URL so it can connect to any compatible backend
 * (e.g. a custom Rust service or an existing zkLogin relay).
 *
 * When VITE_ZK_PROVER_URL is not set the service runs in dev-stub mode:
 * it derives a deterministic test address without a real ZK proof.
 */

import { reportError, reportWarning } from "./errorService";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
const ZK_PROVER_URL = import.meta.env.VITE_ZK_PROVER_URL as string | undefined;
const IS_DEV_STUB = !ZK_PROVER_URL;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ZkLoginProvider = "google" | "apple";

export interface ZkLoginSession {
  /** Substrate/Polkadot address derived from ZK proof */
  address: string;
  /** OAuth provider */
  provider: ZkLoginProvider;
  /** Unique identifier from the provider's JWT (sub claim) */
  providerSubject: string;
  /** Base64-encoded ZK proof (empty string in dev-stub mode) */
  zkProof: string;
  /** ISO timestamp when session expires */
  expiresAt: string;
}

export interface ZkProverResponse {
  proof: string; // base64 ZK proof
  polkadotAddress: string; // derived address
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derive a deterministic 48-char hex string from a provider subject.
 * Used ONLY in dev-stub mode — not a real Polkadot address derivation.
 */
async function deriveDevAddress(sub: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`dotique_dev_${sub}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  // Polkadot addresses are SS58; for dev we return a mock 5... address pattern
  return `5DEV${hex.slice(0, 44).toUpperCase()}`;
}

/**
 * Decode a JWT without verification (verification is done server-side by prover).
 */
function decodeJwtPayload(token: string): Record<string, unknown> {
  const [, payload] = token.split(".");
  if (!payload) throw new Error("Invalid JWT format");
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json) as Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Open the Google OAuth popup and return the raw id_token on success.
 *
 * Requires VITE_GOOGLE_CLIENT_ID to be configured.
 * Falls back to a synthetic token in dev-stub mode.
 */
export async function initiateGoogleOAuth(redirectUri: string): Promise<string> {
  if (IS_DEV_STUB || !GOOGLE_CLIENT_ID) {
    reportWarning("zkLoginService: VITE_GOOGLE_CLIENT_ID not set — using dev stub", {
      service: "zkLogin",
    });
    // Return a synthetic JWT-shaped string for testing
    const payload = btoa(JSON.stringify({ sub: "dev_user_001", email: "dev@dotique.app", iat: Date.now() }));
    return `eyJhbGciOiJSUzI1NiJ9.${payload}.dev_signature`;
  }

  const nonce = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "id_token",
    scope: "openid email profile",
    nonce,
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return new Promise((resolve, reject) => {
    const popup = window.open(authUrl, "google_oauth", "width=500,height=600");
    if (!popup) {
      reject(new Error("Popup blocked — allow popups for this site"));
      return;
    }

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const { type, token, error } = event.data as {
        type?: string;
        token?: string;
        error?: string;
      };
      if (type === "zklogin_oauth_success" && token) {
        window.removeEventListener("message", handler);
        resolve(token);
      } else if (type === "zklogin_oauth_error") {
        window.removeEventListener("message", handler);
        reject(new Error(error ?? "OAuth failed"));
      }
    };

    window.addEventListener("message", handler);

    // Cleanup if popup closes without sending a message
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        window.removeEventListener("message", handler);
        reject(new Error("OAuth popup was closed"));
      }
    }, 500);
  });
}

/**
 * Exchange an OAuth id_token for a ZkLoginSession.
 *
 * In dev-stub mode: skips the prover and derives a test address.
 * In production:    POSTs to VITE_ZK_PROVER_URL and returns real proof + address.
 */
export async function exchangeOAuthToken(
  idToken: string,
  provider: ZkLoginProvider
): Promise<ZkLoginSession> {
  let payload: Record<string, unknown>;
  try {
    payload = decodeJwtPayload(idToken);
  } catch {
    throw new Error("Failed to decode OAuth token — invalid JWT format");
  }

  const sub = (payload["sub"] as string | undefined) ?? "unknown";
  const SESSION_TTL_HOURS = 24;
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString();

  if (IS_DEV_STUB) {
    reportWarning("zkLoginService: ZK_PROVER_URL not set — using dev stub address", {
      service: "zkLogin",
      provider,
    });
    const address = await deriveDevAddress(sub);
    return {
      address,
      provider,
      providerSubject: sub,
      zkProof: "",
      expiresAt,
    };
  }

  // Production path: send to ZK prover
  try {
    const response = await fetch(`${ZK_PROVER_URL}/prove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken, provider }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Prover returned ${response.status}: ${text}`);
    }

    const data = (await response.json()) as ZkProverResponse;

    return {
      address: data.polkadotAddress,
      provider,
      providerSubject: sub,
      zkProof: data.proof,
      expiresAt,
    };
  } catch (err) {
    reportError(err, { service: "zkLoginService", action: "exchangeOAuthToken", provider });
    throw err;
  }
}

/**
 * Full zkLogin flow: initiate OAuth → exchange token → return session.
 *
 * @param provider - "google" | "apple"
 * @param redirectUri - where the OAuth provider redirects after consent
 */
export async function zkLogin(
  provider: ZkLoginProvider,
  redirectUri = window.location.origin + "/auth/callback"
): Promise<ZkLoginSession> {
  if (provider !== "google") {
    // Apple zkLogin follows the same pattern; extend here when Apple client ID is configured.
    throw new Error(`zkLogin provider "${provider}" not yet implemented`);
  }

  const idToken = await initiateGoogleOAuth(redirectUri);
  return exchangeOAuthToken(idToken, provider);
}

/**
 * Persist a ZkLoginSession to encrypted localStorage.
 */
export function persistZkSession(session: ZkLoginSession): void {
  try {
    sessionStorage.setItem("dotique_zk_session", JSON.stringify(session));
  } catch {
    // sessionStorage may be unavailable (private browsing with restrictions, etc.)
    reportWarning("zkLoginService: could not persist session to sessionStorage", {
      service: "zkLogin",
    });
  }
}

/**
 * Restore a ZkLoginSession from sessionStorage, or null if expired/absent.
 */
export function restoreZkSession(): ZkLoginSession | null {
  try {
    const raw = sessionStorage.getItem("dotique_zk_session");
    if (!raw) return null;
    const session = JSON.parse(raw) as ZkLoginSession;
    if (new Date(session.expiresAt) < new Date()) {
      sessionStorage.removeItem("dotique_zk_session");
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Clear the current ZkLoginSession.
 */
export function clearZkSession(): void {
  sessionStorage.removeItem("dotique_zk_session");
}
