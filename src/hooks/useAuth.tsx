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

  // load session from secure store on mount
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
            // ignore storage errors
          }

          // fetch profile
          const { data: userProfile } = await supabase
            .from("users")
            .select("*")
            .eq("auth_uid", newSession.user.id)
            .single();

          if (userProfile) {
            setProfile(userProfile);
          }
        } else {
          // signed out
          resetAuth();
          await deleteItem("supabase_session");
        }
      } finally {
        setLoading(false);
      }
    });

    // cleanup on unmount (Supabase v2 defensive cleanup)
    return () => {
      try {
        const subscription = listener?.data?.subscription;
        if (subscription?.unsubscribe) {
          subscription.unsubscribe();
        }
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, setProfile, setSession, resetAuth]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      resetAuth();
      await deleteItem("supabase_session");
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

// ✅ Export hook separately (keeps Fast Refresh happy)
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
