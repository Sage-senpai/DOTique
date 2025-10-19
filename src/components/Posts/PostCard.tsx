// src/components/Post/PostCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import PostActions from "./PostActions";
import "./PostCard.scss";

interface PostCardProps {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar: string;
      verified: boolean;
    };
    content: string;
    media?: Array<{
      type: string;
      url: string;
    }>;
    createdAt: Date;
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
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const { setSelectedUser } = useUserStore();

  const [stats, setStats] = useState(post.stats);
  const [userInteraction, setUserInteraction] = useState(post.userInteraction);

  // 🔹 Navigate to user profile when avatar clicked
  const handleAvatarClick = () => {
    setSelectedUser({
      id: post.author.id,
      username: post.author.username,
      display_name: post.author.name,
      avatar: post.author.avatar,
      bio: "",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      verified: post.author.verified,
    });
    navigate("/profile/other");
  };

  const handleLike = () => {
    setUserInteraction((prev) => ({ ...prev, liked: !prev.liked }));
    setStats((prev) => ({
      ...prev,
      likes: prev.likes + (userInteraction.liked ? -1 : 1),
    }));
  };

  const handleSave = () => {
    setUserInteraction((prev) => ({ ...prev, saved: !prev.saved }));
  };

  const getTimeAgo = (date: Date): string => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div
            className="avatar"
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
          >
            {post.author.avatar}
          </div>
          <div className="author-info">
            <div className="author-name">
              {post.author.name}
              {post.author.verified && <span className="verified">✓</span>}
            </div>
            <div className="author-username">{post.author.username}</div>
          </div>
        </div>
        <div className="post-menu">⋮</div>
      </div>

      <div className="post-content">{post.content}</div>

      {post.media && (
        <div className="post-media">
          {post.media.map((m, i) => (
            <img key={i} src={m.url} alt="post" className="post-image" />
          ))}
        </div>
      )}

      <div className="post-stats">
        <span>{post.stats.views.toLocaleString()} views</span>
        <span>•</span>
        <span>{stats.likes.toLocaleString()} likes</span>
        <span className="time-ago">• {getTimeAgo(post.createdAt)}</span>
      </div>

      <PostActions
        stats={stats}
        userInteraction={userInteraction}
        onLike={handleLike}
        onSave={handleSave}
      />
    </div>
  );
};

export default PostCard;
