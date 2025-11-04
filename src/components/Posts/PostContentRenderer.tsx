// src/components/Posts/PostContentRenderer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostContentRenderer.scss";

interface PostContentRendererProps {
  content: string;
  className?: string;
}

const PostContentRenderer: React.FC<PostContentRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleMentionClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const renderContentWithMentions = () => {
    const mentionRegex = /(@\w+)/g;
    const parts = content.split(mentionRegex);

    return parts.map((part, index) => {
      if (part.match(mentionRegex)) {
        const username = part.slice(1);
        return (
          <span
            key={index}
            className="mention"
            onClick={(e) => {
              e.stopPropagation();
              handleMentionClick(username);
            }}
            role="button"
            tabIndex={0}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`post-content-renderer ${className}`}>
      {renderContentWithMentions()}
    </div>
  );
};

export default PostContentRenderer;