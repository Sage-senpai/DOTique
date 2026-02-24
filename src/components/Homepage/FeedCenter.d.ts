import React from "react";
import "./FeedCenter.scss";

interface Post {
  id: string;
  user_id?: string;
  content: string;
  image_url?: string;
  video_url?: string;
  media?: Array<{
    type: "image" | "video";
    url: string;
  }>;
  created_at?: string;
  createdAt?: Date;
  author?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
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

interface FeedCenterProps {
  posts: Post[];
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void | Promise<void>;
  onPostLike?: (postId: string) => void;
  onPostShare?: (postId: string) => void;
  onRefresh?: () => void | Promise<void>;
}

declare const FeedCenter: React.FC<FeedCenterProps>;
export default FeedCenter;
