// 2. NEW: src/components/Search/SearchModal.tsx
// =====================================================
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUserSearch } from "../../hooks/useSearch";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import "./SearchModal.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const { results, loading } = useUserSearch();
  const { setSelectedUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 0) {
      results; // This will trigger the search via the hook
    }
  }, [query, results]);

  const handleSelectUser = (user: any) => {
    setSelectedUser({
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.dotvatar_url,
      bio: user.bio,
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      verified: user.verified || false,
    });
    navigate("/profile/other");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal__header">
          <input
            type="text"
            className="search-modal__input"
            placeholder="Search users, posts, NFTs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="search-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-modal__results">
          {loading && query.trim().length > 0 && (
            <div className="search-modal__loading">
              <Loader2 className="spinner" size={20} />
              <span>Searching...</span>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="search-modal__list">
              {results.map((user) => (
                <button
                  key={user.id}
                  className="search-modal__result-item"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="result-item__avatar">
                    {user.dotvatar_url ? (
                      <img src={user.dotvatar_url} alt={user.username} />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <div className="result-item__info">
                    <div className="result-item__name">
                      {user.display_name}
                      {user.verified && <span className="verified">✓</span>}
                    </div>
                    <div className="result-item__username">@{user.username}</div>
                    {user.bio && (
                      <div className="result-item__bio">{user.bio}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && query.trim().length > 0 && results.length === 0 && (
            <div className="search-modal__empty">
              <div className="empty-icon">🔍</div>
              <p>No users found for "{query}"</p>
            </div>
          )}

          {query.trim().length === 0 && (
            <div className="search-modal__placeholder">
              <div className="placeholder-icon">🔎</div>
              <p>Start typing to search for users</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;