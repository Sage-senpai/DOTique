// src/components/Post/PostActions.tsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Bookmark, Send } from 'lucide-react';
import './PostActions.scss';

interface PostActionsProps {
  stats: {
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
  onLike: () => void;
  onSave: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  stats,
  userInteraction,
  onLike,
  onSave,
}) => {
  const [liked, setLiked] = useState(userInteraction.liked);
  const [saved, setSaved] = useState(userInteraction.saved);
  const [showRepostMenu, setShowRepostMenu] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike();
  };

  const handleSaveClick = () => {
    setSaved(!saved);
    onSave();
  };

  return (
    <div className="post-actions">
      <button
        className={`action-btn ${liked ? 'active' : ''}`}
        onClick={handleLikeClick}
        title="Like"
      >
        <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        <span>{stats.likes}</span>
      </button>

      <button className="action-btn" title="Comment">
        <MessageCircle size={18} />
        <span>{stats.comments}</span>
      </button>

      <div className="repost-wrapper">
        <button
          className="action-btn"
          onClick={() => setShowRepostMenu(!showRepostMenu)}
          title="Repost"
        >
          <Repeat2 size={18} />
          <span>{stats.reposts}</span>
        </button>
        {showRepostMenu && (
          <div className="repost-menu">
            <button className="repost-option">Repost</button>
            <button className="repost-option">Repost with Quote</button>
          </div>
        )}
      </div>

      <button className="action-btn" title="Share">
        <Share size={18} />
        <span>{stats.shares}</span>
      </button>

      <button
        className={`action-btn ${saved ? 'active' : ''}`}
        onClick={handleSaveClick}
        title="Save"
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>

      <button className="action-btn donate" title="Donate">
        <Send size={18} />
      </button>
    </div>
  );
};

export default PostActions;