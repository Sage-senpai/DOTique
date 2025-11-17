// src/components/Homepage/FeedCenter.tsx - UPDATED WITH SKELETON LOADERS
import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from 'lucide-react';
import PostCard from "../Posts/PostCard";
import { SkeletonGrid } from '../Skeletons/SkeletonLoaders';
import "./FeedCenter.scss";

interface Post {
  id: string;
  user_id?: string;
  content: string;
  image_url?: string;
  video_url?: string;
  media?: Array<{
    type: 'image' | 'video';
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
  onRefresh?: () => void;
}

const FeedCenter: React.FC<FeedCenterProps> = ({
  posts,
  loading = false,
  onPostLike,
  onPostShare,
  onRefresh,
}) => {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadCountRef = useRef(0);

  useEffect(() => {
    // Initialize with first batch
    if (posts.length > 0) {
      setDisplayedPosts(posts.slice(0, 10));
      setHasMore(posts.length > 10);
      loadCountRef.current = 0;
    }
  }, [posts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, displayedPosts.length]);

  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const currentLength = displayedPosts.length;
    const nextBatch = posts.slice(currentLength, currentLength + 5);

    if (nextBatch.length > 0) {
      setDisplayedPosts(prev => [...prev, ...nextBatch]);
      loadCountRef.current += 1;

      // After 3 loads or no more posts, show caught up
      if (loadCountRef.current >= 3 || currentLength + nextBatch.length >= posts.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setIsLoadingMore(false);
  };

  const handleRefresh = () => {
    setDisplayedPosts(posts.slice(0, 10));
    setHasMore(posts.length > 10);
    loadCountRef.current = 0;
    onRefresh?.();
  };

  // Transform posts to match PostCard interface
  const transformPost = (post: Post) => ({
    id: post.id,
    author: post.author || {
      id: post.user_id || 'unknown',
      name: 'Anonymous',
      username: 'anonymous',
      avatar: '👤',
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
      {/* Initial Loading State with Skeletons */}
      {loading && <SkeletonGrid type="post" count={5} />}

      {/* Posts */}
      {!loading && displayedPosts.length > 0 && (
        <>
          {displayedPosts.map((post, index) => (
            <div key={post.id} className="feed-post-item">
              <PostCard 
                post={transformPost(post)}
                onLike={() => onPostLike?.(post.id)}
                onShare={() => onPostShare?.(post.id)}
              />
              
              {/* Show loading indicator every 3 posts when scrolling */}
              {isLoadingMore && index === displayedPosts.length - 3 && (
                <div className="feed-center__loader">
                  <div className="spinner"></div>
                  <p>Loading more posts...</p>
                </div>
              )}
            </div>
          ))}

          {/* Infinite scroll trigger */}
          {hasMore && <div ref={observerTarget} style={{ height: '20px' }} />}

          {/* Loading More Skeleton at bottom */}
          {isLoadingMore && <SkeletonGrid type="post" count={2} />}

          {/* Caught Up Message */}
          {!hasMore && (
            <div className="feed-center__caught-up">
              <div className="caught-up-icon">✨</div>
              <h3>You're All Caught Up!</h3>
              <p>You've seen all the latest posts</p>
              <button className="refresh-btn" onClick={handleRefresh}>
                <RefreshCw size={18} />
                Refresh Feed
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && displayedPosts.length === 0 && (
        <div className="feed-center__empty">
          <div className="empty-icon">📭</div>
          <p>No posts to show. Follow more users or create a post!</p>
        </div>
      )}
    </div>
  );
};

export default FeedCenter;