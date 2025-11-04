// =====================================================
// src/components/Post/PostCard.tsx
// =====================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
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
  type: string;
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
  createdAt: Date;
  stats?: Stats;
  userInteraction?: UserInteraction;
}

interface PostCardProps {
  post?: Post | null;
  onLike?: () => void;
  onShare?: () => void;
}

// ✅ Fallback dummy post
const dummyPost: Post = {
  id: "dummy-1",
  author: {
    id: "user-1",
    name: "Jane Developer",
    username: "@janedev",
    avatar: "👩🏽‍💻",
    verified: true,
  },
  content:
    "Building the future of decentralized social media 🌐✨ #Web3 #React #Supabase",
  media: [{ type: "image", url: "https://placekitten.com/400/200" }],
  createdAt: new Date(Date.now() - 1000 * 60 * 15),
  stats: { views: 342, likes: 28, comments: 6, reposts: 2, shares: 3 },
  userInteraction: { liked: false, saved: false, reposted: false },
};

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onShare }) => {
  const safePost = post ?? dummyPost;
  const navigate = useNavigate();
  const { setSelectedUser } = useUserStore();

  const [stats, setStats] = useState<Stats>(safePost.stats ?? {});
  const [userInteraction, setUserInteraction] = useState<UserInteraction>(
    safePost.userInteraction ?? {}
  );
  const [showCommentModal, setShowCommentModal] = useState(false);

  const goToUserProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!safePost?.author) return;
    setSelectedUser({
      id: safePost.author.id,
      username: safePost.author.username,
      display_name: safePost.author.name,
      avatar: safePost.author.avatar,
      bio: "",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      verified: safePost.author.verified,
    });
    navigate("/profile/other");
  };

  const handleLike = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserInteraction((prev) => ({ ...prev, liked: !prev.liked }));
    setStats((prev) => ({
      ...prev,
      likes: (prev.likes ?? 0) + (userInteraction.liked ? -1 : 1),
    }));
    onLike?.();
  };

  const handleSave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserInteraction((prev) => ({ ...prev, saved: !prev.saved }));
  };

  const handleShare = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onShare?.();
  };

  const handleComment = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowCommentModal(true);
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
    return `${days}d`;
  };

  const postImage = safePost.media?.[0]?.url || safePost.image_url;

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
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToUserProfile(e as any);
                }
              }}
            >
              {safePost.author?.avatar || "👤"}
            </div>
            <div className="author-info">
              <div
                className="author-name clickable"
                onClick={goToUserProfile}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goToUserProfile(e as any);
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goToUserProfile(e as any);
                  }
                }}
              >
                {safePost.author?.username || "@unknown"}
              </div>
            </div>
          </div>
          <div className="post-menu">⋮</div>
        </div>

        <PostContentRenderer
          content={safePost.content || "No content"}
          className="post-content"
        />

        {postImage && (
          <div className="post-media">
            <img src={postImage} alt="post" className="post-image" />
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
            username: safePost.author?.username || "@unknown",
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
          username: safePost.author?.username || "@unknown",
          avatar: safePost.author?.avatar || "👤",
        }}
      />
    </>
  );
};

export default PostCard;
