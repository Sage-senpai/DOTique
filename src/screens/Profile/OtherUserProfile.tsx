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
        setPosts(userPosts || []);

        if (currentUser?.id) {
          const { data } = await supabase
            .from("follows")
            .select("id")
            .eq("follower_id", currentUser.id)
            .eq("following_id", selectedUser.id)
            .maybeSingle();

          setIsFollowing(!!data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
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
    return <div className="other-profile-screen__spinner" />;
  }

  if (!selectedUser) return null;

  return (
    <motion.div
      className="other-profile-screen"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="other-profile-screen__header">
        <button
          className="other-profile-screen__back-btn"
          onClick={() => {
            clearSelectedUser();
            navigate(-1);
          }}
        >
          ←
        </button>

        {selectedUser.avatar ? (
          <img
            src={selectedUser.avatar}
            alt={selectedUser.username}
            className="other-profile-screen__avatar"
          />
        ) : (
          <div className="other-profile-screen__avatar-placeholder">👤</div>
        )}

        <h2 className="other-profile-screen__name">
          {selectedUser.display_name}
        </h2>
        <p className="other-profile-screen__username">
          @{selectedUser.username}
        </p>

        {selectedUser.bio && (
          <div className="other-profile-screen__bio">
            <p>{selectedUser.bio}</p>
          </div>
        )}

        <div className="other-profile-screen__stats">
          <div className="stat">
            <span className="stat__label">Posts</span>
            <span className="stat__value">{selectedUser.posts_count || 0}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Followers</span>
            <span className="stat__value">
              {selectedUser.followers_count || 0}
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">Following</span>
            <span className="stat__value">
              {selectedUser.following_count || 0}
            </span>
          </div>
        </div>

        <div className="other-profile-screen__buttons">
          <button
            className={`other-profile-screen__btn-primary ${
              isFollowing ? "following" : ""
            }`}
            onClick={handleToggleFollow}
          >
            {isFollowing ? "✓ Following" : "+ Follow"}
          </button>

          <button
            className="other-profile-screen__btn-secondary"
            onClick={() => {
              clearSelectedUser();
              navigate(-1);
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="other-profile-screen__tabs">
        <button className="other-profile-screen__tab active">📸 Posts</button>
        <button className="other-profile-screen__tab">👗 Wardrobe</button>
        <button className="other-profile-screen__tab">🏷️ Tagged</button>
      </div>

      <div className="other-profile-screen__posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post.id}
              className="other-profile-screen__post-card"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p>{post.content}</p>
              {post.image_url && <img src={post.image_url} alt="post" />}
            </motion.div>
          ))
        ) : (
          <p className="other-profile-screen__no-posts">No posts yet</p>
        )}
      </div>
    </motion.div>
  );
}
