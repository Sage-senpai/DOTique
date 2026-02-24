import React, { useEffect, useRef } from "react";
import { RefreshCw, CheckCircle2, Inbox } from "lucide-react";
import PostCard from "../Posts/PostCard";
import { SkeletonGrid } from "../Skeletons/SkeletonLoaders";
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

const FeedCenter: React.FC<FeedCenterProps> = ({
  posts,
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  onPostLike,
  onPostShare,
  onRefresh,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore || loading || loadingMore) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, loadingMore, onLoadMore]);

  const transformPost = (post: Post) => ({
    id: post.id,
    author: post.author || {
      id: post.user_id || "unknown",
      name: "Anonymous",
      username: "anonymous",
      avatar: "User",
      verified: false,
    },
    content: post.content,
    media: post.media,
    image_url: post.image_url,
    video_url: post.video_url,
    createdAt: post.createdAt || (post.created_at ? new Date(post.created_at) : new Date()),
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
  });

  return (
    <div className="feed-center">
      {loading && posts.length === 0 && <SkeletonGrid type="post" count={5} />}

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
            <div key={post.id} className="feed-post-item">
              <PostCard
                post={transformPost(post)}
                onLike={() => onPostLike?.(post.id)}
                onShare={() => onPostShare?.(post.id)}
              />
            </div>
          ))}

          {hasMore && <div ref={observerTarget} style={{ height: "20px" }} />}

          {loadingMore && <SkeletonGrid type="post" count={2} />}

          {!hasMore && !loadingMore && (
            <div className="feed-center__caught-up">
              <CheckCircle2 size={36} className="caught-up-icon" />
              <h3>You're All Caught Up!</h3>
              <p>You've seen all the latest posts</p>
              <button className="refresh-btn" onClick={() => void onRefresh?.()}>
                <RefreshCw size={18} />
                Refresh Feed
              </button>
            </div>
          )}
        </>
      )}

      {!loading && posts.length === 0 && (
        <div className="feed-center__empty">
          <Inbox size={42} className="empty-icon" />
          <p>No posts to show. Follow more users or create a post!</p>
        </div>
      )}
    </div>
  );
};

export default FeedCenter;
