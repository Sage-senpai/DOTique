// src/stores/userStore.ts
import { create } from "zustand";
import { deleteItem, getItem, saveItem } from "../utils/secureStore";

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
  hydrated: boolean;
  hydrateUser: () => Promise<void>;
  addPost: (post: any) => void;
  addRepost: (repost: Repost) => void;
  setSelectedUser: (user: User) => void;
  clearSelectedUser: () => void;
  clearUser: () => void;
}

const USER_STORE_KEY = "userStore";

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
  user: initialUser,
  selectedUser: null,
  hydrated: false,

  hydrateUser: async () => {
    try {
      const raw = await getItem(USER_STORE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }

      const parsed = JSON.parse(raw) as { user?: User };
      if (parsed?.user) {
        set({ user: parsed.user, hydrated: true });
        return;
      }
    } catch (error) {
      console.warn("Failed to restore user store cache:", error);
    }

    set({ hydrated: true });
  },

  addPost: (post) =>
    set((state) => {
      const updated = { ...state.user, posts: [post, ...state.user.posts] };
      saveItem(USER_STORE_KEY, JSON.stringify({ user: updated })).catch((error) => {
        console.warn("Failed to persist user store cache:", error);
      });
      return { user: updated };
    }),

  addRepost: (repost) =>
    set((state) => {
      const updated = {
        ...state.user,
        reposts: [repost, ...state.user.reposts],
      };
      saveItem(USER_STORE_KEY, JSON.stringify({ user: updated })).catch((error) => {
        console.warn("Failed to persist user store cache:", error);
      });
      return { user: updated };
    }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  clearSelectedUser: () => set({ selectedUser: null }),

  clearUser: () => {
    deleteItem(USER_STORE_KEY).catch((error) => {
      console.warn("Failed to clear user store cache:", error);
    });
    set({ user: initialUser, selectedUser: null });
  },

  
}));

void useUserStore.getState().hydrateUser();
