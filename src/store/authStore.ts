import { create } from 'zustand';

export type User = { 
  id: string; 
  username?: string; 
  display_name?: string; 
  polkadot_address?: string;
};

export type AuthState = {
  user: User | null;
  setUser: (u: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u: User | null) => set({ user: u }),
}));