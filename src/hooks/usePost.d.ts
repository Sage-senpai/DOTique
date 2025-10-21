import type { Post } from '../stores/postStore';
export declare function usePost(): {
    posts: Post[];
    isLoading: boolean;
    createPost: (content: string) => Promise<Post>;
    likePost: (postId: string) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
};
//# sourceMappingURL=usePost.d.ts.map