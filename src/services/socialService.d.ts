export interface Post {
    id: string;
    user_id: string;
    author?: {
        id: string;
        name: string;
        username: string;
        avatar: string;
        verified: boolean;
    };
    content: string;
    image_url?: string;
    created_at: string;
    likes_count?: number;
    comments_count?: number;
    stats?: {
        views: number;
        likes: number;
        comments: number;
        reposts: number;
        shares: number;
    };
    userInteraction?: {
        liked: boolean;
        saved: boolean;
        reposted: boolean;
    };
}
export interface Comment {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: string;
}
export interface UserProfile {
    id: string;
    username: string;
    display_name: string;
    avatar?: string;
    bio?: string;
    followers_count: number;
    following_count: number;
    posts_count: number;
    verified: boolean;
}
export declare const socialService: {
    createPost(userId: string, content: string, imageUrl?: string): Promise<any>;
    getTimelinePosts(userId: string, limit?: number, offset?: number, tab?: "feed" | "following" | "followers"): Promise<any[]>;
    getUserProfile(userId: string): Promise<UserProfile | null>;
    searchUsers(query: string, limit?: number): Promise<{
        id: any;
        username: any;
        display_name: any;
        dotvatar_url: any;
        bio: any;
        verified: any;
    }[]>;
    toggleLike(postId: string, userId: string): Promise<{
        liked: boolean;
    }>;
    addComment(postId: string, userId: string, content: string): Promise<any>;
    toggleFollow(followerId: string, followingId: string): Promise<{
        following: boolean;
    }>;
    getUserPosts(userId: string, limit?: number): Promise<any[]>;
};
//# sourceMappingURL=socialService.d.ts.map