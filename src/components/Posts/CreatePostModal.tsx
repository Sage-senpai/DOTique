// src/components/Posts/CreatePostModal.tsx 
import React, { useState, useRef, useEffect } from "react";
import { X, Camera, Image as ImageIcon, Video as VideoIcon, AtSign } from "lucide-react";
import { supabase } from "../../services/supabase";
import "./CreatePostModal.scss";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost?: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => Promise<void>;
}

interface UserSuggestion {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
}) => {
  const [content, setContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mention autocomplete states
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState<UserSuggestion[]>([]);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  // Search for users when @ is typed
  const searchUsers = async (query: string) => {
    if (query.length < 1) {
      setMentionSuggestions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .ilike("username", `${query}%`)
        .limit(5);

      if (error) throw error;
      setMentionSuggestions(data || []);
    } catch (error) {
      console.error("Error searching users:", error);
      setMentionSuggestions([]);
    }
  };

  // Handle text change and detect @ mentions
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;

    setContent(value);
    setCursorPosition(cursorPos);

    const textBeforeCursor = value.slice(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      const query = mentionMatch[1];
      setMentionQuery(query);
      setShowMentionSuggestions(true);
      searchUsers(query);
    } else {
      setShowMentionSuggestions(false);
      setMentionSuggestions([]);
    }
  };

  const insertMention = (username: string) => {
    const textBeforeCursor = content.slice(0, cursorPosition);
    const textAfterCursor = content.slice(cursorPosition);
    const newTextBefore = textBeforeCursor.replace(/@\w*$/, `@${username} `);
    const newContent = newTextBefore + textAfterCursor;

    setContent(newContent);
    setShowMentionSuggestions(false);
    setMentionSuggestions([]);
    textareaRef.current?.focus();
  };

  const handleMediaSelect = (file: File, type: 'image' | 'video') => {
    // Validate file size (max 50MB for videos, 10MB for images)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size too large. Maximum ${type === 'video' ? '50MB' : '10MB'} allowed.`);
      return;
    }

    setMediaFile(file);
    setMediaType(type);
    const reader = new FileReader();
    reader.onloadend = () => setMediaPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = async () => {
    if (!content.trim() && !mediaFile) {
      alert("Please add some content or media");
      return;
    }

    setIsLoading(true);

    try {
      let mediaUrl: string | undefined;
      if (mediaFile) {
        // TODO: Replace with actual upload logic
        // For now, using the preview URL
        mediaUrl = mediaPreview;
        
        // const uploadResult = await uploadToIPFS({
        //   content: mediaPreview,
        //   fileName: mediaFile.name,
        //   contentType: mediaFile.type,
        // });
        // mediaUrl = uploadResult.url;
      }

      if (onCreatePost) {
        await onCreatePost(content.trim(), mediaUrl, mediaType || undefined);
      }

      setContent("");
      setMediaPreview("");
      setMediaFile(null);
      setMediaType(null);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setContent("");
    setMediaPreview("");
    setMediaFile(null);
    setMediaType(null);
    setShowMentionSuggestions(false);
    setMentionSuggestions([]);
    onClose();
  };

  return (
    <div className="create-post-modal-overlay" onClick={handleClose}>
      <div className="create-post-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Create Post</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Post Form */}
        <div className="post-form">
          <div className="textarea-wrapper">
            <textarea
              ref={textareaRef}
              placeholder="What's on your mind? 🎨 Use @ to mention users..."
              value={content}
              onChange={handleContentChange}
              rows={6}
              className="form-textarea"
              maxLength={500}
            />
            
            {/* Mention Suggestions Dropdown */}
            {showMentionSuggestions && mentionSuggestions.length > 0 && (
              <div className="mention-suggestions">
                {mentionSuggestions.map((user) => (
                  <div
                    key={user.id}
                    className="mention-suggestion-item"
                    onClick={() => insertMention(user.username)}
                  >
                    <div className="avatar-small">{user.avatar_url || "👤"}</div>
                    <div className="user-info-small">
                      <div className="display-name-small">{user.display_name}</div>
                      <div className="username-small">@{user.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="char-count">{content.length}/500</div>
          </div>

          {mediaPreview && (
            <div className="media-preview">
              {mediaType === 'image' ? (
                <img src={mediaPreview} alt="preview" />
              ) : (
                <div className="video-preview-container">
                  <video src={mediaPreview} controls />
                </div>
              )}
              <button
                className="remove-media"
                onClick={() => {
                  setMediaPreview("");
                  setMediaFile(null);
                  setMediaType(null);
                }}
              >
                ✕
              </button>
            </div>
          )}

          <div className="media-tools">
            <label className="media-btn">
              <Camera size={18} />
              <span>Camera</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMediaSelect(file, 'image');
                }}
                style={{ display: "none" }}
              />
            </label>
            <label className="media-btn">
              <ImageIcon size={18} />
              <span>Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMediaSelect(file, 'image');
                }}
                style={{ display: "none" }}
              />
            </label>
            <label className="media-btn">
              <VideoIcon size={18} />
              <span>Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMediaSelect(file, 'video');
                }}
                style={{ display: "none" }}
              />
            </label>
            <button 
              className="media-btn" 
              onClick={() => {
                const textarea = textareaRef.current;
                if (textarea) {
                  const pos = textarea.selectionStart;
                  const newContent = content.slice(0, pos) + "@" + content.slice(pos);
                  setContent(newContent);
                  setCursorPosition(pos + 1);
                  textarea.focus();
                  textarea.setSelectionRange(pos + 1, pos + 1);
                }
              }}
              title="Mention user"
            >
              <AtSign size={18} />
              <span>Mention</span>
            </button>
          </div>

          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handlePostSubmit}
              disabled={isLoading || (!content.trim() && !mediaFile)}
            >
              {isLoading ? "Posting..." : "📝 Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;