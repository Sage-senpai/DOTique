// src/hooks/useAuth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import type { Session } from "@supabase/supabase-js";
import { saveItem, getItem, deleteItem } from "../utils/secureStore";

/**
 * Auth context for React web (Vite). Uses the existing useAuthStore (Zustand)
 * for the canonical source of truth while exposing a light-weight context for
 * components that prefer useContext.
 */

type AuthContextType = {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session, profile, setSession, setProfile, setLoading, resetAuth } =
    useAuthStore();
  const [initialized, setInitialized] = useState(false);

  // load session from secure store on mount (web-friendly via saveItem/getItem abstraction)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await getItem("supabase_session");
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as Session;
            if (mounted) setSession(parsed);
          } catch {
            // corrupted — clean up
            await deleteItem("supabase_session");
          }
        }
      } catch (err) {
        // Non-fatal — log for diagnostics
        // console.warn("useAuth: failed to restore session", err);
      } finally {
        if (mounted) setInitialized(true);
      }
    })();

    return () => {
      mounted = false;
    };
    // intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // subscribe to Supabase auth state changes
  useEffect(() => {
    // supabase.auth.onAuthStateChange returns { data: { subscription } } in v2
    const listener = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      try {
        setLoading(true);
        if (newSession) {
          // update zustand session
          setSession(newSession);

          // persist session
          try {
            await saveItem("supabase_session", JSON.stringify(newSession));
          } catch {
            // ignore storage errors (non-blocking)
          }

          // fetch profile from users table (if exists)
          try {
            const { data: userProfile, error: profileError } = await supabase
              .from("users")
              .select("*")
              .eq("auth_uid", newSession.user.id)
              .single();

            if (!profileError && userProfile) {
              setProfile(userProfile);
            }
          } catch (err) {
            // ignore profile read errors (app can recover)
            // console.error("useAuth profile fetch failed", err);
          }
        } else {
          // signed out
          resetAuth();
          try {
            await deleteItem("supabase_session");
          } catch {
            // ignore storage cleanup errors
          }
        }
      } finally {
        setLoading(false);
      }
    });

    // cleanup on unmount
    return () => {
      try {
        // supabase v2: listener.data.subscription.unsubscribe()
        // but depending on client version it may expose differently
        // defensive cleanup:
        // @ts-ignore
        if (listener?.data?.subscription?.unsubscribe) {
          // v2 shape
          // @ts-ignore
          listener.data.subscription.unsubscribe();
        } else if (listener?.data?.subscription) {
  listener.data.subscription.unsubscribe();
}

      } catch {
        // swallow cleanup errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, setProfile, setSession, resetAuth]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      // Ensure local state is reset even if signOut throws
      resetAuth();
      try {
        await deleteItem("supabase_session");
      } catch {
        // ignore
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        loading: useAuthStore.getState().loading,
        signOut,
      }}
    >
      {initialized ? children : null}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export default useAuth;
