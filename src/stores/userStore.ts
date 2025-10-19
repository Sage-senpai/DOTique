// =====================================================
// src/stores/userStore.ts
// =====================================================
import { create } from "zustand";

export interface SelectedUser {
  id: string;
  username: string;
  display_name: string;
  avatar?: string;
  bio?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  verified: boolean;
  isFollowing?: boolean;
}

interface UserStoreState {
  selectedUser: SelectedUser | null;
  isOwnProfile: boolean;
  setSelectedUser: (user: SelectedUser | null, isOwn?: boolean) => void;
  clearSelectedUser: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  selectedUser: null,
  isOwnProfile: false,

  setSelectedUser: (user, isOwn = false) =>
    set({ selectedUser: user, isOwnProfile: isOwn }),

  clearSelectedUser: () =>
    set({ selectedUser: null, isOwnProfile: false }),
}));