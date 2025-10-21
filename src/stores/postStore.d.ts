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
export declare const usePostStore: import("zustand").UseBoundStore<import("zustand").StoreApi<PostState>>;
export {};
//# sourceMappingURL=postStore.d.ts.map