// src/types/post.d.ts
export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt?: Date; // ✅ Make optional for mock data compatibility
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
