// src/components/Post/PostActions.tsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Bookmark, Send } from 'lucide-react';
import './PostActions.scss';

interface PostActionsProps {
  postId?: string; // ✅ Added for comment modal
  postContent?: string; // ✅ Added for comment modal
  postAuthor?: { // ✅ Added for comment modal
    name: string;
    username: string;
    avatar: string;
  };
  stats: {
    likes?: number;
    comments?: number;
    reposts?: number;
    shares?: number;
  };
  userInteraction: {
    liked?: boolean;
    saved?: boolean;
    reposted?: boolean;
  };
  onLike: (e?: React.MouseEvent) => void;
  onSave: (e?: React.MouseEvent) => void;
  onShare?: (e?: React.MouseEvent) => void;
  onComment?: (e?: React.MouseEvent) => void; // ✅ Added
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  postContent,
  postAuthor,
  stats,
  userInteraction,
  onLike,
  onSave,
  onShare,
  onComment,
}) => {
  const [liked, setLiked] = useState<boolean>(userInteraction.liked ?? false);
  const [saved, setSaved] = useState<boolean>(userInteraction.saved ?? false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked(!liked);
    onLike(e);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSaved(!saved);
    onSave(e);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onShare?.(e);
  };

  const handleRepostClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowRepostMenu(!showRepostMenu);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onComment?.(e);
    console.log('Comment clicked');
    // TODO: Open comment modal or navigate to post detail
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Donate clicked');
    // TODO: Open donation modal
  };

  return (
    <div className="post-actions" onClick={(e) => e.stopPropagation()}>
      <button
        className={`action-btn ${liked ? 'active' : ''}`}
        onClick={handleLikeClick}
        title="Like"
        type="button"
      >
        <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        <span>{stats.likes ?? 0}</span>
      </button>

      <button
        className="action-btn"
        onClick={handleCommentClick}
        title="Comment"
        type="button"
      >
        <MessageCircle size={18} />
        <span>{stats.comments ?? 0}</span>
      </button>

      <div className="repost-wrapper">
        <button
          className="action-btn"
          onClick={handleRepostClick}
          title="Repost"
          type="button"
        >
          <Repeat2 size={18} />
          <span>{stats.reposts ?? 0}</span>
        </button>

        {showRepostMenu && (
          <div className="repost-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="repost-option"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Repost');
                setShowRepostMenu(false);
              }}
              type="button"
            >
              Repost
            </button>
            <button
              className="repost-option"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Repost with Quote');
                setShowRepostMenu(false);
              }}
              type="button"
            >
              Repost with Quote
            </button>
          </div>
        )}
      </div>

      <button
        className="action-btn"
        title="Share"
        onClick={handleShareClick}
        type="button"
      >
        <Share size={18} />
        <span>{stats.shares ?? 0}</span>
      </button>

      <button
        className={`action-btn ${saved ? 'active' : ''}`}
        onClick={handleSaveClick}
        title="Save"
        type="button"
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>

      <button
        className="action-btn donate"
        onClick={handleDonateClick}
        title="Donate"
        type="button"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default PostActions;
