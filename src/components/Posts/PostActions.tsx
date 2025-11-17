// src/components/Post/PostActions.tsx - ENHANCED VERSION
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Bookmark, Send } from 'lucide-react';
import './PostActions.scss';

interface PostActionsProps {
  postId?: string;
  postContent?: string;
  postAuthor?: {
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
  onComment?: (e?: React.MouseEvent) => void;
  onRepost?: (withQuote: boolean) => void;
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
  onRepost,
}) => {
  const [liked, setLiked] = useState<boolean>(userInteraction.liked ?? false);
  const [saved, setSaved] = useState<boolean>(userInteraction.saved ?? false);
  const [reposted, setReposted] = useState<boolean>(userInteraction.reposted ?? false);
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

  const handleRepostOption = (withQuote: boolean) => {
    setReposted(!reposted);
    setShowRepostMenu(false);
    onRepost?.(withQuote);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onComment?.(e);
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
          className={`action-btn ${reposted ? 'active' : ''}`}
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
                handleRepostOption(false);
              }}
              type="button"
            >
              <Repeat2 size={16} />
              Repost
            </button>
            <button
              className="repost-option"
              onClick={(e) => {
                e.stopPropagation();
                handleRepostOption(true);
              }}
              type="button"
            >
              <MessageCircle size={16} />
              Quote Repost
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