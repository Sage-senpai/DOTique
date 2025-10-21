export declare const postService: {
    createPost(userId: string, content: string, media?: string[]): Promise<any>;
    getTimeline(_userId: string, limit?: number): Promise<any[]>;
    likePost(postId: string, userId: string): Promise<void>;
    unlikePost(postId: string, userId: string): Promise<void>;
    deletePost(postId: string): Promise<void>;
};
//# sourceMappingURL=postService.d.ts.map