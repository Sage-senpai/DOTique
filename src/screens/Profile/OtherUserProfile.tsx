// src/pages/Profile/OtherUserProfile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import { supabase } from "../../services/supabase";
import PostItem from "../../components/Posts/PostCard"; 
import "./OtherUserProfile.scss";

export default function OtherUserProfile() {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { selectedUser, clearSelectedUser } = useUserStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "wardrobe" | "tagged">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedUser?.id) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("📊 Fetching posts for user:", selectedUser.id);

        const userPosts = await socialService.getTimelinePosts(
          selectedUser.id,
          50,
          0,
          "feed"
        );

        console.log("✅ Fetched posts:", userPosts);
        setPosts(userPosts || []);

        // Check if current user follows this user
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
        console.error("❌ Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedUser?.id, currentUser?.id, navigate]);

  const handleToggleFollow = async () => {
    if (!currentUser?.id || !selectedUser?.id) return;
    try {
      if (typeof socialService.toggleFollow === "function") {
        const result = await socialService.toggleFollow(currentUser.id, selectedUser.id);
        setIsFollowing(result.following);
      } else {
        if (isFollowing) {
          await supabase
            .from("follows")
            .delete()
            .eq("follower_id", currentUser.id)
            .eq("following_id", selectedUser.id);
          setIsFollowing(false);
        } else {
          await supabase
            .from("follows")
            .insert({ follower_id: currentUser.id, following_id: selectedUser.id });
          setIsFollowing(true);
        }
      }
    } catch (error) {
      console.error("❌ Failed to toggle follow:", error);
    }
  };

  if (loading) {
    return (
      <div className="other-profile-screen__spinner">
        <div className="spinner">Loading...</div>
      </div>
    );
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
      {/* HEADER */}
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
          <motion.img
            src={selectedUser.avatar}
            alt={selectedUser.username}
            className="other-profile-screen__avatar"
            whileHover={{ scale: 1.05 }}
          />
        ) : (
          <div className="other-profile-screen__avatar-placeholder">👤</div>
        )}

        <motion.h2
          className="other-profile-screen__name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedUser.display_name}
        </motion.h2>

        <p className="other-profile-screen__username">@{selectedUser.username}</p>

        {selectedUser.bio && (
          <motion.div
            className="other-profile-screen__bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{selectedUser.bio}</p>
          </motion.div>
        )}

        {/* STATS */}
        <div className="profile-follow-merged">
          <span onClick={() => navigate("/followers")} className="profile-follow-link">
            {selectedUser.followers_count ?? 0} Followers
          </span>
          <span className="dot-separator">·</span>
          <span
            onClick={() => navigate("/followers?tab=following")}
            className="profile-follow-link"
          >
            {selectedUser.following_count ?? 0} Following
          </span>
          <span className="dot-separator">·</span>
          <span className="profile-posts-count">
            {selectedUser.posts_count ?? posts.length} Posts
          </span>
        </div>

        {/* BUTTONS */}
        <div className="other-profile-screen__buttons">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`other-profile-screen__btn-primary ${
              isFollowing ? "following" : ""
            }`}
            onClick={handleToggleFollow}
          >
            {isFollowing ? "✓ Following" : "+ Follow"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="other-profile-screen__btn-secondary"
            onClick={() => {
              clearSelectedUser();
              navigate(-1);
            }}
          >
            ← Back
          </motion.button>
        </div>
      </div>

      {/* TABS */}
      <div className="other-profile-screen__tabs">
        {["posts", "wardrobe", "tagged"].map((tab) => (
          <button
            key={tab}
            className={`other-profile-screen__tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "posts" ? "📸 Posts" : tab === "wardrobe" ? "👗 Wardrobe" : "🏷️ Tagged"}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        {activeTab === "posts" && (
          <motion.div
            key="posts"
            className="other-profile-screen__posts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  showAuthor={false}
                  compact={false}
                />
              ))
            ) : (
              <p className="other-profile-screen__no-posts">No posts yet</p>
            )}
          </motion.div>
        )}

        {activeTab === "wardrobe" && (
          <motion.div
            key="wardrobe"
            className="other-profile-screen__placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p>Wardrobe coming soon 👗</p>
          </motion.div>
        )}

        {activeTab === "tagged" && (
          <motion.div
            key="tagged"
            className="other-profile-screen__placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p>Tagged posts coming soon 🏷️</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
