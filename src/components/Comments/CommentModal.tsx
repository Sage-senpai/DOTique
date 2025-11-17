// src/components/Comments/CommentModal.tsx - ENHANCED VERSION
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Send, Image as ImageIcon, MoreVertical, Trash2, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import './CommentModal.scss';

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image_url?: string;
  likes: number;
  replies: Comment[];
  liked?: boolean;
  created_at: string;
  parent_id?: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postContent: string;
  postAuthor: {
    name: string;
    username: string;
    avatar: string;
  };
  initialCommentCount?: number;
  onCommentCountChange?: (count: number) => void;
}

// DUMMY COMMENTS - Remove when connecting to backend
const DUMMY_COMMENTS: Comment[] = [
  {
    id: '1',
    author: {
      id: 'user-1',
      name: 'Alice Johnson',
      username: 'alicejohn',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true,
    },
    content: 'This is amazing! Love the creativity 🎨',
    likes: 12,
    replies: [
      {
        id: '1-1',
        author: {
          id: 'user-2',
          name: 'Bob Smith',
          username: 'bobsmith',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        content: 'Totally agree! 🔥',
        likes: 3,
        replies: [],
        created_at: new Date(Date.now() - 300000).toISOString(),
        parent_id: '1',
      },
    ],
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '2',
    author: {
      id: 'user-3',
      name: 'Charlie Brown',
      username: 'charlieb',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'Can you share more details about this?',
    likes: 5,
    replies: [],
    created_at: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: '3',
    author: {
      id: 'user-4',
      name: 'Diana Prince',
      username: 'dprince',
      avatar: 'https://i.pravatar.cc/150?img=4',
      verified: true,
    },
    content: 'Awesome work! Keep it up 💪',
    image_url: 'https://picsum.photos/300/200',
    likes: 8,
    replies: [],
    created_at: new Date(Date.now() - 600000).toISOString(),
  },
];

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  postContent,
  postAuthor,
  initialCommentCount = 0,
  onCommentCountChange,
}) => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // TODO: Fetch comments from Supabase
      // fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    try {
      // TODO: Replace with actual Supabase call
      // const { data, error } = await supabase
      //   .from('comments')
      //   .select('*, author:profiles(*), replies:comments!parent_id(*)')
      //   .eq('post_id', postId)
      //   .is('parent_id', null)
      //   .order('created_at', { ascending: false });
      
      // if (!error) setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() && !imageFile) return;

    setLoading(true);
    try {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: {
          id: profile?.id || 'user-me',
          name: profile?.display_name || 'You',
          username: profile?.username || 'you',
          avatar: profile?.dotvatar_url || '👤',
          verified: profile?.verified || false,
        },
        content: newComment,
        image_url: imagePreview || undefined,
        likes: 0,
        replies: [],
        created_at: new Date().toISOString(),
        parent_id: replyingTo || undefined,
      };

      if (replyingTo) {
        // Add as reply
        setComments(prev => prev.map(comment => 
          comment.id === replyingTo 
            ? { ...comment, replies: [...comment.replies, newCommentObj] }
            : {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === replyingTo
                    ? { ...reply, replies: [...reply.replies, newCommentObj] }
                    : reply
                )
              }
        ));
      } else {
        // Add as top-level comment
        setComments(prev => [newCommentObj, ...prev]);
      }

      // Update comment count
      const totalComments = countAllComments([...comments, newCommentObj]);
      onCommentCountChange?.(totalComments);

      // Reset form
      setNewComment('');
      setImagePreview('');
      setImageFile(null);
      setReplyingTo(null);

      // TODO: Replace with actual Supabase call
      // await supabase.from('comments').insert({
      //   post_id: postId,
      //   author_id: profile.id,
      //   content: newComment,
      //   image_url: uploadedImageUrl,
      //   parent_id: replyingTo,
      // });
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const countAllComments = (commentsList: Comment[]): number => {
    return commentsList.reduce((count, comment) => {
      return count + 1 + countAllComments(comment.replies);
    }, 0);
  };

  const handleLikeComment = async (commentId: string, parentId?: string) => {
    const updateCommentLike = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.likes + (comment.liked ? -1 : 1),
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(updateCommentLike),
      };
    };

    setComments(prev => prev.map(updateCommentLike));

    // TODO: Update in Supabase
  };

  const handleReply = (commentId: string, username: string) => {
    setReplyingTo(commentId);
    setNewComment(`@${username} `);
    textareaRef.current?.focus();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Delete this comment?')) return;

    const removeComment = (commentsList: Comment[]): Comment[] => {
      return commentsList.filter(comment => {
        if (comment.id === commentId) return false;
        comment.replies = removeComment(comment.replies);
        return true;
      });
    };

    setComments(prev => removeComment(prev));
    setShowOptionsMenu(null);

    // TODO: Delete from Supabase
  };

  const handleNavigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
    onClose();
  };

  const getTimeAgo = (date: string): string => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className={`comment ${depth > 0 ? 'reply' : ''}`} style={{ marginLeft: `${depth * 20}px` }}>
      <div className="comment-content">
        <div 
          className="comment-avatar"
          onClick={() => handleNavigateToProfile(comment.author.id)}
          role="button"
          tabIndex={0}
        >
          {comment.author.avatar.startsWith('http') ? (
            <img src={comment.author.avatar} alt={comment.author.name} />
          ) : (
            <span>{comment.author.avatar}</span>
          )}
        </div>
        <div className="comment-body">
          <div className="comment-header">
            <div className="comment-author-info">
              <span 
                className="comment-author-name"
                onClick={() => handleNavigateToProfile(comment.author.id)}
                role="button"
                tabIndex={0}
              >
                {comment.author.name}
                {comment.author.verified && <span className="verified">✓</span>}
              </span>
              <span className="comment-username">@{comment.author.username}</span>
              <span className="comment-time">• {getTimeAgo(comment.created_at)}</span>
            </div>
            {profile?.id === comment.author.id && (
              <div className="comment-options">
                <button 
                  onClick={() => setShowOptionsMenu(showOptionsMenu === comment.id ? null : comment.id)}
                >
                  <MoreVertical size={16} />
                </button>
                {showOptionsMenu === comment.id && (
                  <div className="options-menu">
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      <Trash2 size={14} />
                      Delete
                    </button>
                    <button>
                      <Flag size={14} />
                      Report
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="comment-text">{comment.content}</p>
          {comment.image_url && (
            <div className="comment-image">
              <img src={comment.image_url} alt="comment attachment" />
            </div>
          )}
          <div className="comment-actions">
            <button 
              className={`comment-action ${comment.liked ? 'active' : ''}`}
              onClick={() => handleLikeComment(comment.id, comment.parent_id)}
            >
              <Heart size={14} fill={comment.liked ? 'currentColor' : 'none'} />
              <span>{comment.likes}</span>
            </button>
            <button 
              className="comment-action"
              onClick={() => handleReply(comment.id, comment.author.username)}
            >
              <MessageCircle size={14} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <motion.div
      className="comment-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="comment-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="comment-modal-header">
          <h3>Comments</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Original Post */}
        <div className="original-post">
          <div className="post-author-info">
            <div className="post-avatar">{postAuthor.avatar}</div>
            <div>
              <div className="post-author-name">{postAuthor.name}</div>
              <div className="post-author-username">@{postAuthor.username}</div>
            </div>
          </div>
          <p className="post-content">{postContent}</p>
        </div>

        {/* Comments List */}
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map(comment => renderComment(comment))
          ) : (
            <div className="no-comments">
              <MessageCircle size={48} />
              <p>No comments yet</p>
              <span>Be the first to comment!</span>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="comment-input-wrapper">
          {replyingTo && (
            <div className="replying-to-banner">
              <span>Replying to comment...</span>
              <button onClick={() => {
                setReplyingTo(null);
                setNewComment('');
              }}>
                <X size={16} />
              </button>
            </div>
          )}
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="preview" />
              <button
                onClick={() => {
                  setImagePreview('');
                  setImageFile(null);
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="comment-input-container">
            <div className="user-avatar">
              {profile?.dotvatar_url || '👤'}
            </div>
            <textarea
              ref={textareaRef}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
            />
            <div className="input-actions">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageSelect(file);
                }}
              />
              <button 
                className="image-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Add image"
              >
                <ImageIcon size={18} />
              </button>
              <button
                className="send-btn"
                onClick={handleSubmitComment}
                disabled={loading || (!newComment.trim() && !imageFile)}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommentModal;