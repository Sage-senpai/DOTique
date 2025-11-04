// src/stores/userStore.ts
import { create } from "zustand";

export interface Repost {
  id: string;
  name?: string;
  image?: string;
  caption?: string;
  type?: "nft" | "post";
}

export interface User {
  id: string;
  username: string;
  display_name?: string;
  avatar?: string;
  bio?: string;
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
  posts: any[];
  reposts: Repost[];
}

interface UserStoreState {
  user: User;
  selectedUser: User | null;
  addPost: (post: any) => void;
  addRepost: (repost: Repost) => void;
  setSelectedUser: (user: User) => void;
  clearSelectedUser: () => void;
  clearUser: () => void;
}

const initialUser: User = {
  id: "demo-id",
  username: "demoUser",
  display_name: "Demo User",
  avatar: "",
  bio: "Exploring decentralized creativity ✨",
  posts_count: 2,
  followers_count: 900,
  following_count: 10,
  posts: [],
  reposts: [],
};

export const useUserStore = create<UserStoreState>((set) => ({
  user:
    JSON.parse(localStorage.getItem("userStore") || "null")?.user ||
    initialUser,
  selectedUser: null,

  addPost: (post) =>
    set((state) => {
      const updated = { ...state.user, posts: [post, ...state.user.posts] };
      localStorage.setItem("userStore", JSON.stringify({ user: updated }));
      return { user: updated };
    }),

  addRepost: (repost) =>
    set((state) => {
      const updated = {
        ...state.user,
        reposts: [repost, ...state.user.reposts],
      };
      localStorage.setItem("userStore", JSON.stringify({ user: updated }));
      return { user: updated };
    }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  clearSelectedUser: () => set({ selectedUser: null }),

  clearUser: () => {
    localStorage.removeItem("userStore");
    set({ user: initialUser, selectedUser: null });
  },

  
}));
