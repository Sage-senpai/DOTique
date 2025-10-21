// src/stores/authStore.ts
import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

// Strongly typed Profile for UI + Web3 metadata
export type Profile = {
  id: string;
  auth_uid: string;
  email: string;
  username?: string;
  display_name?: string;
  polkadot_address?: string;
  created_at?: string;

  // 🌈 Stats for profile screen
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  tagged_count?: number;

  // 🌈 New Metadata
  fashion_archetype?: string;
  style_tier?: string;
  signature_palette?: string[];
  verified_brands?: string[];
  location?: string;
  birthday?: string;
  bio?: string;

  // 🧩 Extended Web3 + Fashion metadata
  name?: string;
  dotvatar_url?: string;
  favorite_brands?: string[];
  primary_wallet?: string;
  connected_wallets?: string[];
  instagram_url?: string;
  twitter_url?: string;
  website_url?: string;
  profile_privacy?: "Public" | "Private" | "Friends Only";
  allow_data_sharing?: boolean;
  wardrobe_nfts?: any;
  currently_wearing?: any;
};

export type AuthState = {
  session: Session | null;
  profile: Profile | null;
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
