// src/hooks/useAuth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { saveItem, getItem, deleteItem } from "../utils/secureStore"; 
import { supabase } from "../services/supabase";
import { useAuthStore } from "../store/authStore";

type AuthContextType = {
  session: any | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, profile, setSession, setProfile, setLoading, resetAuth } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  // ✅ Load session from storage on mount
  useEffect(() => {
    (async () => {
      const stored = await getItem("supabase_session");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSession(parsed);
        } catch {
          await deleteItem("supabase_session"); // if corrupted
        }
      }
      setInitialized(true);
    })();
  }, []);

  // ✅ Listen for Supabase auth changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setSession(session);
        await saveItem("supabase_session", JSON.stringify(session));

        // load profile
        const { data: userProfile } = await supabase
          .from("users")
          .select("*")
          .eq("auth_uid", session.user.id)
          .single();
        if (userProfile) setProfile(userProfile);
      } else {
        resetAuth();
        await deleteItem("supabase_session");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    resetAuth();
    await deleteItem("supabase_session");
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading: useAuthStore.getState().loading, signOut }}>
      {initialized ? children : null}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
