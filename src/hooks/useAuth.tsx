// src/hooks/useAuth.tsx - COMPLETE FIX
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import type { Session } from "@supabase/supabase-js";
import { saveItem, getItem, deleteItem } from "../utils/secureStore";

type AuthContextType = {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { session, profile, setSession, setProfile, setLoading, resetAuth } =
    useAuthStore();
  const [initialized, setInitialized] = useState(false);

  // Load session from secure store on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await getItem("supabase_session");
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as Session;
            if (mounted) setSession(parsed);

            // Restore session into Supabase client
            try {
              const { data: existing } = await supabase.auth.getSession();
              if (!existing?.session) {
                await supabase.auth.setSession({
                  access_token: parsed.access_token,
                  refresh_token: parsed.refresh_token,
                });
                console.log("🔐 Supabase session restored from secure store");
              }
            } catch (err) {
              console.warn("⚠️ Failed to restore Supabase session:", err);
            }
          } catch {
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
  }, [setSession]);

  // Subscribe to Supabase auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        try {
          setLoading(true);
          console.log("🔐 Auth event:", event);

          if (newSession) {
            // Update zustand session
            setSession(newSession);

            // Persist session
            try {
              await saveItem("supabase_session", JSON.stringify(newSession));
            } catch (err) {
              console.warn("⚠️ Failed to save session:", err);
            }

            // Fetch or create profile
            try {
              console.log("👤 Fetching profile for:", newSession.user.id);
              
              const { data: userProfile, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("auth_uid", newSession.user.id)
                .maybeSingle(); // Use maybeSingle to avoid errors on no rows

              if (error) {
                console.warn("⚠️ Profile fetch error:", error.message);
                
                // If profile doesn't exist (PGRST116 = no rows)
                if (error.code === 'PGRST116') {
                  console.log("🧩 Profile not found, attempting to create...");
                  
                  // Try to create profile
                  try {
                    const { data: newProfile, error: createError } = await supabase
                      .from("profiles")
                      .insert({
                        auth_uid: newSession.user.id,
                        username: `user_${newSession.user.id.slice(0, 8)}`,
                        display_name: "New User",
                        email: newSession.user.email || "",
                      })
                      .select()
                      .single();

                    if (createError) {
                      console.error("❌ Failed to create profile:", createError);
                    } else if (newProfile) {
                      console.log("✅ Profile created:", newProfile);
                      setProfile(newProfile);
                    }
                  } catch (createErr) {
                    console.error("❌ Exception creating profile:", createErr);
                  }
                } else {
                  console.error("❌ Other profile error:", error);
                }
              } else if (userProfile) {
                console.log("✅ Profile loaded:", userProfile);
                setProfile(userProfile);
              } else {
                console.warn("⚠️ No profile found and no error");
              }
            } catch (e) {
              console.error("❌ Unexpected profile fetch failure:", e);
            }
          } else {
            // Signed out
            console.log("🚪 User signed out");
            resetAuth();
            await deleteItem("supabase_session");
          }
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
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
}

export { AuthProvider };

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}