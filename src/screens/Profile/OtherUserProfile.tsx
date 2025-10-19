// 6. NEW: src/screens/Profile/OtherUserProfile.tsx
// =====================================================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import "./OtherUserProfile.scss";

export default function OtherUserProfile() {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { selectedUser, clearSelectedUser } = useUserStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedUser) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        const userPosts = await socialService.getUserPosts(selectedUser.id);
        setPosts(userPosts);

        // Check if current user follows this user
        if (currentUser?.id) {
          const { data } = await supabase
            .from("follows")
            .select("id")
            .eq("follower_id", currentUser.id)
            .eq("following_id", selectedUser.id)
            .single();
          setIsFollowing(!!data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedUser, currentUser?.id, navigate]);

  const handleToggleFollow = async () => {
    if (!currentUser?.id || !selectedUser?.id) return;

    try {
      const result = await socialService.toggleFollow(
        currentUser.id,
        selectedUser.id
      );
      setIsFollowing(result.following);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  if (loading) {
    return (
      <div className="profile-screen__spinner" />
    );
  }

  if (!selectedUser) return null;

  return (
    <motion.div
      className="profile-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="profile-screen__header">
        <div className="profile-screen__avatar-placeholder">
          {selectedUser.avatar ? (
            <img src={selectedUser.avatar} alt={selectedUser.username} />
          ) : (
            "👤"
          )}
        </div>

        <h2 className="profile-screen__name">{selectedUser.display_name}</h2>
        <p className="profile-screen__username">@{selectedUser.username}</p>

        <div className="profile-screen__stats">
          <div className="stat">
            <span className="stat__label">Posts</span>
            <span className="stat__value">{selectedUser.posts_count}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Followers</span>
            <span className="stat__value">{selectedUser.followers_count}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Following</span>
            <span className="stat__value">{selectedUser.following_count}</span>
          </div>
        </div>

        <div className="profile-screen__buttons">
          <button
            className={`profile-screen__btn-primary ${
              isFollowing ? "following" : ""
            }`}
            onClick={handleToggleFollow}
          >
            {isFollowing ? "✓ Following" : "+ Follow"}
          </button>
          <button
            className="profile-screen__btn-secondary"
            onClick={() => clearSelectedUser()}
          >
            ← Back
          </button>
        </div>
      </div>

      {selectedUser.bio && (
        <div className="profile-screen__bio">
          <p>{selectedUser.bio}</p>
        </div>
      )}

      <div className="profile-screen__tabs">
        <button className="profile-screen__tab active">📸 Posts</button>
        <button className="profile-screen__tab">👗 Wardrobe</button>
        <button className="profile-screen__tab">🏷️ Tagged</button>
      </div>

      <div className="profile-screen__posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="profile-screen__post-card">
              <p>{post.content}</p>
              {post.image_url && (
                <img src={post.image_url} alt="post" />
              )}
            </div>
          ))
        ) : (
          <p className="profile-screen__no-posts">No posts yet</p>
        )}
      </div>
    </motion.div>
  );
}