interface User {
    id: string;
    username: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
    verified?: boolean;
}
interface Post {
    id: string;
    author_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
    tags?: string[];
}
export declare const searchService: {
    searchAll(query: string, limit?: number): Promise<{
        users: User[];
        posts: Post[];
    }>;
    getTrendingTags(limit?: number): Promise<string[]>;
};
export {};
//# sourceMappingURL=searchService.d.ts.map