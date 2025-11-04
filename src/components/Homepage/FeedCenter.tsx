// =====================================================
// src/components/Homepage/FeedCenter.tsx
// =====================================================
import React from "react";
import PostCard from "../Posts/PostCard";
import PostContentRenderer from '../Posts/PostContentRenderer'; 
import "./FeedCenter.scss";

interface Post {
  id: string;
  user_id?: string;
  content: string;
  image_url?: string;
  media?: Array<{
    type: string;
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
  onPostLike?: (postId: string) => void;
  onPostShare?: (postId: string) => void;
  isEnd?: boolean; // ✅ Optional: end-of-feed indicator
}

const FeedCenter: React.FC<FeedCenterProps> = ({
  posts,
  loading = false,
  onPostLike,
  onPostShare,
  isEnd = false,
}) => {
  return (
    <main className="feed-center">
      {/* ========== LOADING STATE ========== */}
      {loading && (
        <div className="feed-center__loader">
          <div className="spinner" />
          <p>Loading posts...</p>
        </div>
      )}

     {/* ========== POSTS ========== */}
      {!loading && posts.length > 0 && (
        <>
          {posts.map((post) => (
           <PostCard
  key={post.id}
  post={{
    ...post,
    createdAt: post.createdAt || (post.created_at ? new Date(post.created_at) : new Date()),
    author: post.author || {
      id: post.user_id || "unknown",
      name: post.display_name || post.name || "Anonymous",
      username: post.username || "unknown_user",
      avatar: post.avatar_url || post.avatar || "👤",
      verified: post.verified || false,
    },
    stats: post.stats || {
      views: 0,
      likes: 0,
      comments: 0,
      reposts: 0,
      shares: 0,
    },
    userInteraction: post.userInteraction || {
      liked: false,
      saved: false,
      reposted: false,
    },
    media:
      post.media ||
      (post.image_url ? [{ type: "image", url: post.image_url }] : []),
  }}
  onLike={() => onPostLike?.(post.id)}
  onShare={() => onPostShare?.(post.id)}
/>

          ))}

          {/* ✅ Optional: End of Feed Message */}
          {isEnd && (
            <div className="feed-center__end">
              <div className="end-icon">✨</div>
              <p>You’re all caught up!</p>
            </div>
          )}
        </>
      )}

      {/* ========== EMPTY STATE ========== */}
      {!loading && posts.length === 0 && (
        <div className="feed-center__empty">
          <div className="empty-icon">📭</div>
          <p>No posts to show. Follow more users or create a post!</p>
        </div>
      )}
    </main>
  );
};

export default FeedCenter;
