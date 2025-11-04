// src/components/Search/SearchModal.tsx
import React, { useState, useEffect, useCallback } from "react";
import { X, Loader2, MessageCircle, UserPlus } from "lucide-react";
import { supabase } from "../../services/supabase";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import PostContentRenderer from "../Posts/PostContentRenderer";
import "./SearchModal.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = "all" | "users" | "posts" | "nfts";

interface SearchResult {
  type: "user" | "post" | "nft";
  data: any;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedUser } = useUserStore();
  const { profile: currentUser } = useAuthStore();
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        performSearch(query, activeFilter);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, activeFilter]);

  const performSearch = useCallback(async (searchQuery: string, filter: FilterType) => {
    try {
      setLoading(true);
      const allResults: SearchResult[] = [];

      // Search users
      if (filter === "all" || filter === "users") {
        const { data: users, error: usersError } = await supabase
          .from("profiles")
          .select("id, username, display_name, avatar_url, bio, verified")
          .or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`)
          .limit(10);

        if (!usersError && users) {
          allResults.push(...users.map(user => ({ type: "user" as const, data: user })));
        }
      }

      // Search posts
      if (filter === "all" || filter === "posts") {
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select(`
            id,
            content,
            media_url,
            created_at,
            profiles!posts_user_id_fkey (
              id,
              username,
              display_name,
              avatar_url,
              verified
            )
          `)
          .ilike("content", `%${searchQuery}%`)
          .limit(10);

        if (!postsError && posts) {
          allResults.push(...posts.map(post => ({ type: "post" as const, data: post })));
        }
      }

      // Search NFTs
      if (filter === "all" || filter === "nfts") {
        // Assuming you have an nfts table
        const { data: nfts, error: nftsError } = await supabase
          .from("nfts")
          .select("*")
          .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
          .limit(10);

        if (!nftsError && nfts) {
          allResults.push(...nfts.map(nft => ({ type: "nft" as const, data: nft })));
        }
      }

      setResults(allResults);
    } catch (error) {
      console.error("❌ Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectUser = (user: any) => {
    setSelectedUser({
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.avatar_url,
      bio: user.bio,
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      verified: user.verified || false,
    });
    navigate("/profile/other");
    onClose();
  };

  const handleFollowUser = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser?.id) return;

    try {
      const { error } = await supabase
        .from("follows")
        .insert({ follower_id: currentUser.id, following_id: userId });

      if (error) throw error;
      alert("Followed!");
    } catch (error) {
      console.error("Failed to follow:", error);
    }
  };

  const handleMessageUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/messages/${userId}`);
    onClose();
  };

  const handleViewPost = (post: any) => {
    // Navigate to post detail or open modal
    console.log("View post:", post);
    onClose();
  };

  const handleViewNFT = (nft: any) => {
    navigate(`/nft/${nft.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
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

        {/* Filters */}
        <div className="search-filters">
          {(["all", "users", "posts", "nfts"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              className={`search-filters__filter ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" && "🔍"}
              {filter === "users" && "👥"}
              {filter === "posts" && "📝"}
              {filter === "nfts" && "💎"}
              {" "}
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="search-modal__results">
          {loading && query.trim().length > 0 && (
            <div className="search-modal__loading">
              <Loader2 className="spinner" size={20} />
              Searching...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="search-modal__list">
              {results.map((result, index) => {
                if (result.type === "user") {
                  const user = result.data;
                  return (
                    <button
                      key={`user-${user.id}-${index}`}
                      className="search-modal__result-item"
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="result-item__avatar">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.username} />
                        ) : (
                          "👤"
                        )}
                      </div>
                      <div className="result-item__info">
                        <p className="result-item__name">
                          {user.display_name}
                          {user.verified && <span className="verified">✓</span>}
                        </p>
                        <p className="result-item__username">@{user.username}</p>
                        {user.bio && <p className="result-item__bio">{user.bio}</p>}
                      </div>
                      <div className="result-item__actions">
                        <button
                          className="action-btn"
                          onClick={(e) => handleMessageUser(user.id, e)}
                          title="Message"
                        >
                          <MessageCircle size={18} />
                        </button>
                        <button
                          className="action-btn"
                          onClick={(e) => handleFollowUser(user.id, e)}
                          title="Follow"
                        >
                          <UserPlus size={18} />
                        </button>
                      </div>
                    </button>
                  );
                } else if (result.type === "post") {
                  const post = result.data;
                  return (
                    <button
                      key={`post-${post.id}-${index}`}
                      className="search-modal__result-item search-modal__result-item--post"
                      onClick={() => handleViewPost(post)}
                    >
                      <div className="result-item__avatar">
                        {post.profiles?.avatar_url || "👤"}
                      </div>
                      <div className="result-item__info">
                        <p className="result-item__name">
                          {post.profiles?.display_name || "User"}
                          <span className="result-item__username">
                            @{post.profiles?.username || "unknown"}
                          </span>
                        </p>
                        <div className="result-item__content">
                          <PostContentRenderer content={post.content} />
                        </div>
                        {post.media_url && (
                          <img
                            src={post.media_url}
                            alt="post"
                            className="result-item__image"
                          />
                        )}
                      </div>
                    </button>
                  );
                } else if (result.type === "nft") {
                  const nft = result.data;
                  return (
                    <button
                      key={`nft-${nft.id}-${index}`}
                      className="search-modal__result-item search-modal__result-item--nft"
                      onClick={() => handleViewNFT(nft)}
                    >
                      <div className="result-item__nft-image">
                        {nft.image_url && (
                          <img src={nft.image_url} alt={nft.name} />
                        )}
                      </div>
                      <div className="result-item__info">
                        <p className="result-item__name">{nft.name}</p>
                        <p className="result-item__description">{nft.description}</p>
                        {nft.price && (
                          <p className="result-item__price">💎 {nft.price} DOT</p>
                        )}
                      </div>
                    </button>
                  );
                }
                return null;
              })}
            </div>
          )}

          {!loading && query.trim().length > 0 && results.length === 0 && (
            <div className="search-modal__empty">
              <div className="empty-icon">🔍</div>
              <p>No results found for "{query}"</p>
            </div>
          )}

          {query.trim().length === 0 && (
            <div className="search-modal__placeholder">
              <div className="placeholder-icon">🔎</div>
              <p>Start typing to search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;