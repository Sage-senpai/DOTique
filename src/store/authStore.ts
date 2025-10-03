// src/store/authStore.ts
import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  auth_uid: string;
  email: string;
  username?: string;
  display_name?: string;
  polkadot_address?: string;
  created_at?: string;
};

export type AuthState = {
  session: Session | null;       // Supabase auth session
  profile: Profile | null;       // Custom user profile
  loading: boolean;
  setSession: (s: Session | null) => void;
  setProfile: (p: Profile | null) => void;
  setLoading: (val: boolean) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  loading: false,

  setSession: (s) => set({ session: s }),
  setProfile: (p) => set({ profile: p }),
  setLoading: (val) => set({ loading: val }),

  resetAuth: () => set({ session: null, profile: null, loading: false }),
}));
