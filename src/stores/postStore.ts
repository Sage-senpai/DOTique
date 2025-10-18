// ==================== src/stores/postStore.ts ====================
import { create } from 'zustand';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  media?: Array<{
    type: string;
    url: string;
  }>;
  createdAt: Date;
  stats: {
    views: number;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
  userInteraction: {
    liked: boolean;
    saved: boolean;
    reposted: boolean;
  };
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  setPosts: (posts) => set({ posts }),

  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts],
  })),

  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map(p => p.id === id ? { ...p, ...updates } : p),
  })),

  deletePost: (id) => set((state) => ({
    posts: state.posts.filter(p => p.id !== id),
  })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
