// src/components/Post/PostCard.tsx - ENHANCED VERSION
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import PostActions from "./PostActions";
import PostContentRenderer from "./PostContentRenderer";
import CommentModal from "../Comments/CommentModal";
import "./PostCard.scss";

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface Stats {
  views?: number;
  likes?: number;
  comments?: number;
  reposts?: number;
  shares?: number;
}

interface UserInteraction {
  liked?: boolean;
  saved?: boolean;
  reposted?: boolean;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  media?: Media[];
  image_url?: string;
  video_url?: string;
  createdAt: Date;
  stats?: Stats;
  userInteraction?: UserInteraction;
}

interface PostCardProps {
  post?: Post | null;
  onLike?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

const dummyPost: Post = {
  id: "dummy-1",
  author: {
    id: "user-1",
    name: "Jane Developer",
    username: "janedev",
    avatar: "👩🏽‍💻",
    verified: true,
  },
  content:
    "Building the future of decentralized social media 🌐✨ #Web3 #React #Supabase",
  media: [{ type: "image", url: "https://picsum.photos/400/300" }],
  createdAt: new Date(Date.now() - 1000 * 60 * 15),
  stats: { views: 342, likes: 28, comments: 6, reposts: 2, shares: 3 },
  userInteraction: { liked: false, saved: false, reposted: false },
};

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onShare, onDelete }) => {
  const safePost = post ?? dummyPost;
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  const [stats, setStats] = useState<Stats>(safePost.stats ?? {});
  const [userInteraction, setUserInteraction] = useState<UserInteraction>(
    safePost.userInteraction ?? {}
  );
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  // Track post view
  useEffect(() => {
    if (!hasViewed && safePost.id && profile?.id) {
      trackPostView();
    }
  }, [safePost.id, profile]);

  const trackPostView = async () => {
    try {
      // TODO: Replace with actual Supabase call
      // const { error } = await supabase
      //   .from('post_views')
      //   .insert({
      //     post_id: safePost.id,
      //     user_id: profile.id,
      //   });

      // if (!error) {
        setStats(prev => ({
          ...prev,
          views: (prev.views ?? 0) + 1,
        }));
        setHasViewed(true);
      // }
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const goToUserProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!safePost?.author) return;
    navigate(`/profile/${safePost.author.id}`);
  };

  const handleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    const newLikedState = !userInteraction.liked;
    const likeChange = newLikedState ? 1 : -1;

    // Optimistic update
    setUserInteraction((prev) => ({ ...prev, liked: newLikedState }));
    setStats((prev) => ({
      ...prev,
      likes: (prev.likes ?? 0) + likeChange,
    }));

    try {
      // TODO: Replace with actual Supabase call
      // if (newLikedState) {
      //   await supabase.from('post_likes').insert({
      //     post_id: safePost.id,
      //     user_id: profile.id,
      //   });
      // } else {
      //   await supabase.from('post_likes')
      //     .delete()
      //     .eq('post_id', safePost.id)
      //     .eq('user_id', profile.id);
      // }
      
      onLike?.();
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert on error
      setUserInteraction((prev) => ({ ...prev, liked: !newLikedState }));
      setStats((prev) => ({
        ...prev,
        likes: (prev.likes ?? 0) - likeChange,
      }));
    }
  };

  const handleSave = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    const newSavedState = !userInteraction.saved;
    setUserInteraction((prev) => ({ ...prev, saved: newSavedState }));

    try {
      // TODO: Replace with actual Supabase call
      // if (newSavedState) {
      //   await supabase.from('saved_posts').insert({
      //     post_id: safePost.id,
      //     user_id: profile.id,
      //   });
      // } else {
      //   await supabase.from('saved_posts')
      //     .delete()
      //     .eq('post_id', safePost.id)
      //     .eq('user_id', profile.id);
      // }
    } catch (error) {
      console.error('Error updating save:', error);
      setUserInteraction((prev) => ({ ...prev, saved: !newSavedState }));
    }
  };

  const handleShare = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    // Update share count
    setStats((prev) => ({
      ...prev,
      shares: (prev.shares ?? 0) + 1,
    }));

    // TODO: Implement actual share logic
    onShare?.();
  };

  const handleComment = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowCommentModal(true);
  };

  const handleRepost = async (withQuote: boolean = false) => {
    try {
      const newRepostedState = !userInteraction.reposted;
      const repostChange = newRepostedState ? 1 : -1;

      setUserInteraction((prev) => ({ ...prev, reposted: newRepostedState }));
      setStats((prev) => ({
        ...prev,
        reposts: (prev.reposts ?? 0) + repostChange,
      }));

      // TODO: Replace with actual Supabase call
      // if (newRepostedState) {
      //   await supabase.from('reposts').insert({
      //     post_id: safePost.id,
      //     user_id: profile.id,
      //     with_quote: withQuote,
      //     quote_content: withQuote ? '' : null,
      //   });
      // } else {
      //   await supabase.from('reposts')
      //     .delete()
      //     .eq('post_id', safePost.id)
      //     .eq('user_id', profile.id);
      // }
    } catch (error) {
      console.error('Error updating repost:', error);
    }
  };

  const handleCommentUpdate = (newCommentCount: number) => {
    setStats((prev) => ({
      ...prev,
      comments: newCommentCount,
    }));
  };

  const getTimeAgo = (date: Date): string => {
    if (!date) return "";
    const minutes = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60)
    );
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString();
  };

  const postImage = safePost.media?.find(m => m.type === 'image')?.url || safePost.image_url;
  const postVideo = safePost.media?.find(m => m.type === 'video')?.url || safePost.video_url;

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <div className="post-author">
            <div
              className="avatar"
              onClick={goToUserProfile}
              role="button"
              tabIndex={0}
            >
              {safePost.author?.avatar || "👤"}
            </div>
            <div className="author-info">
              <div
                className="author-name clickable"
                onClick={goToUserProfile}
                role="button"
                tabIndex={0}
              >
                {safePost.author?.name || "Anonymous"}
                {safePost.author?.verified && (
                  <span className="verified">✓</span>
                )}
              </div>
              <div
                className="author-username clickable"
                onClick={goToUserProfile}
                role="button"
                tabIndex={0}
              >
                @{safePost.author?.username || "unknown"}
              </div>
            </div>
          </div>
          <div className="post-menu">⋮</div>
        </div>

        <PostContentRenderer
          content={safePost.content || "No content"}
          className="post-content"
        />

        {/* Media Section - Images and Videos */}
        {(postImage || postVideo) && (
          <div className="post-media">
            {postImage && (
              <img src={postImage} alt="post" className="post-image" />
            )}
            {postVideo && (
              <video src={postVideo} controls className="post-video" />
            )}
          </div>
        )}

        <div className="post-stats">
          <span>{stats?.views?.toLocaleString() ?? 0} views</span>
          <span>•</span>
          <span>{stats?.likes?.toLocaleString() ?? 0} likes</span>
          <span className="time-ago">• {getTimeAgo(safePost.createdAt)}</span>
        </div>

        <PostActions
          postId={safePost.id}
          postContent={safePost.content}
          postAuthor={{
            name: safePost.author?.name || "Anonymous",
            username: safePost.author?.username || "unknown",
            avatar: safePost.author?.avatar || "👤",
          }}
          stats={{
            likes: stats.likes ?? 0,
            comments: stats.comments ?? 0,
            reposts: stats.reposts ?? 0,
            shares: stats.shares ?? 0,
          }}
          userInteraction={{
            liked: userInteraction.liked ?? false,
            saved: userInteraction.saved ?? false,
            reposted: userInteraction.reposted ?? false,
          }}
          onLike={handleLike}
          onSave={handleSave}
          onShare={handleShare}
          onComment={handleComment}
          onRepost={handleRepost}
        />
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        postId={safePost.id}
        postContent={safePost.content}
        postAuthor={{
          name: safePost.author?.name || "Anonymous",
          username: safePost.author?.username || "unknown",
          avatar: safePost.author?.avatar || "👤",
        }}
        initialCommentCount={stats.comments ?? 0}
        onCommentCountChange={handleCommentUpdate}
      />
    </>
  );
};

export default PostCard;