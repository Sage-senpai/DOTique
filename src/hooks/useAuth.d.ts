import React from "react";
import type { Session } from "@supabase/supabase-js";
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
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare function useAuth(): AuthContextType;
export {};
//# sourceMappingURL=useAuth.d.ts.map