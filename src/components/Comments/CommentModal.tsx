// src/components/Comments/CommentModal.tsx
import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import PostContentRenderer from "../Posts/PostContentRenderer";
import "./CommentModal.scss";

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
    verified: boolean;
  };
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
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  postContent,
  postAuthor,
}) => {
  const { profile } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments when modal opens
  useEffect(() => {
    if (isOpen && postId) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("post_comments")
        .select(`
          id,
          post_id,
          user_id,
          content,
          created_at,
          profiles!post_comments_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("❌ Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !profile?.id) return;

    try {
      setSubmitting(true);

      const { data, error } = await supabase
        .from("post_comments")
        .insert({
          post_id: postId,
          user_id: profile.id,
          content: newComment.trim(),
        })
        .select(`
          id,
          post_id,
          user_id,
          content,
          created_at,
          profiles!post_comments_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .single();

      if (error) throw error;

      // Add new comment to list
      setComments([...comments, data]);
      setNewComment("");
    } catch (error) {
      console.error("❌ Failed to post comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getTimeAgo = (date: string): string => {
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

  if (!isOpen) return null;

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="comment-modal-header">
          <h2>Comments</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Original Post */}
        <div className="original-post">
          <div className="post-author-info">
            <div className="avatar">{postAuthor.avatar}</div>
            <div className="author-details">
              <span className="author-name">{postAuthor.name}</span>
              <span className="author-username">{postAuthor.username}</span>
            </div>
          </div>
          <PostContentRenderer content={postContent} />
        </div>

        {/* Comments List */}
        <div className="comments-list">
          {loading ? (
            <div className="loading">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="no-comments">
              <p>No comments yet</p>
              <p className="subtext">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  {comment.profiles?.avatar_url || "👤"}
                </div>
                <div className="comment-body">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.profiles?.display_name || "User"}
                    </span>
                    <span className="comment-username">
                      @{comment.profiles?.username || "unknown"}
                    </span>
                    <span className="comment-time">
                      • {getTimeAgo(comment.created_at)}
                    </span>
                  </div>
                  <PostContentRenderer content={comment.content} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <form className="comment-input-container" onSubmit={handleSubmitComment}>
          <div className="current-user-avatar">
            {profile?.avatar_url || profile?.dotvatar_url || "👤"}
          </div>
          <input
            type="text"
            className="comment-input"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
            maxLength={500}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!newComment.trim() || submitting}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;