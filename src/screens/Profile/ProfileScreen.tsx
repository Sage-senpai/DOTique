// src/screens/Profile/ProfileScreen.tsx
// =====================================
import  { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { socialService } from "../../services/socialService";
import PostCard from "../../components/Posts/PostCard";
import "./Profile.scss";

export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🧩 Dummy placeholders for dev preview
  const dummyProfile = {
    id: "dummy123",
    display_name: "Jane Doe",
    username: "janedoe",
    bio: "Building decentralized futures ✨",
    dotvatar_url: "https://placehold.co/100x100?text=JD",
    followers_count: 128,
    following_count: 76,
    posts_count: 3,
    tagged_count: 2,
  };

  const dummyPosts = [
    {
      id: "p1",
      author: dummyProfile,
      content: "Exploring Web3 and creativity through code 🚀",
      media: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "p2",
      author: dummyProfile,
      content: "Every block tells a story — let's write ours on-chain 🧠",
      media: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "p3",
      author: dummyProfile,
      content: "Decentralization isn’t just tech — it’s a mindset 🌍",
      media: null,
      created_at: new Date().toISOString(),
    },
  ];

  // 🧠 Fetch profile from Supabase + IPFS
  const fetchProfile = useCallback(async () => {
    try {
      if (!profile?.auth_uid) {
        setProfile(dummyProfile);
        setPosts(dummyPosts);
        return;
      }

      setLoading(true);

      // Fetch user row
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_uid", profile.auth_uid)
        .single();

      if (error) throw error;

      let combinedProfile = data;

      // Merge IPFS metadata if available
      if (data?.ipfs_metadata) {
        try {
          const res = await fetch(data.ipfs_metadata);
          const meta = await res.json();
          combinedProfile = { ...data, ...meta };
        } catch (err) {
          console.warn("Failed to load IPFS metadata:", err);
        }
      }

      setProfile(combinedProfile);

      // Fetch posts for this user
      const { data: userPosts } = await socialService.getUserPosts(
        data?.id || profile.id
      );
      setPosts(userPosts || dummyPosts);
    } catch (err) {
      console.error("❌ Error refreshing profile:", err);
      setProfile(dummyProfile);
      setPosts(dummyPosts);
    } finally {
      setLoading(false);
    }
  }, [profile?.auth_uid, setProfile]);

  // 🔁 Re-fetch on navigation or after editing
  useEffect(() => {
    fetchProfile();
  }, [location.key, fetchProfile]);

  // 📤 Share profile
  const handleShareProfile = async () => {
    try {
      const message = `Check out ${profile?.display_name || "my"} DOTique fashion profile 👗✨\n\nJoin the Web3 fashion revolution on DOTique!`;
      if ((navigator as any).share) {
        await (navigator as any).share({ text: message });
      } else {
        window.prompt("Copy profile share text:", message);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const menuItems = [
    { icon: "👗", label: "Wardrobe", action: () => navigate("/profile/wardrobe") },
    { icon: "🎓", label: "Style CV", action: () => navigate("/profile/stylecv") },
    { icon: "🗳️", label: "Governance", action: () => navigate("/profile/governance") },
  ];

  // 🌀 Loading or null profile state
  if (loading || !profile) {
    return (
      <motion.div
        className="profile-screen__loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>Loading profile...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="profile-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* === HEADER === */}
      <div className="profile-screen__header">
        {profile.dotvatar_url ? (
          <img
            src={profile.dotvatar_url}
            alt="avatar"
            className="profile-screen__avatar"
          />
        ) : (
          <div className="profile-screen__avatar-placeholder">🪞</div>
        )}

        <h2 className="profile-screen__name">
          {profile.display_name || profile.username || "User"}
        </h2>
        <p className="profile-screen__username">@{profile.username || "username"}</p>
        {profile.bio && <p className="profile-screen__bio">{profile.bio}</p>}

        {/* === MERGED FOLLOW + STATS LINE === */}
        <div className="profile-follow-merged">
          <span
            className="profile-follow-link"
            onClick={() => navigate("/followers")}
            role="button"
          >
            {profile.followers_count ?? 0}{" "}
            Follower{(profile.followers_count ?? 0) === 1 ? "" : "s"}
          </span>
          <span className="dot-separator">·</span>
          <span
            className="profile-follow-link"
            onClick={() => navigate("/followers?tab=following")}
            role="button"
          >
            {profile.following_count ?? 0} Following
          </span>
          <span className="dot-separator">·</span>
          <span className="profile-posts-count">
            {(profile.posts_count ?? posts.length) + (profile.tagged_count ?? 0)}{" "}
            Posts
          </span>
        </div>

        <div className="profile-screen__buttons">
          <button
            className="profile-screen__btn-primary"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
          <button
            className="profile-screen__btn-secondary"
            onClick={handleShareProfile}
          >
            Share
          </button>
          <button
            className="profile-screen__btn-icon"
            onClick={() => navigate("/settings")}
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* === POSTS FEED === */}
      <div className="profile-posts">
        {posts.length > 0 ? (
          posts.map((post) => {
            try {
              if (!post || !post.id) return null; // invalid post
              return <PostCard key={post.id} post={post} />;
            } catch (err) {
              console.error("Error rendering PostCard:", err, post);
              return (
                <div key={post?.id || Math.random()} className="post-error-fallback">
                  ⚠️ Failed to load post
                </div>
              );
            }
          })
        ) : (
          <p className="no-posts-text">No posts yet</p>
        )}
      </div>

      {/* === MENU === */}
      <nav className="profile-screen__menu">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="profile-screen__menu-item"
            onClick={item.action}
          >
            <span className="profile-screen__menu-icon">{item.icon}</span>
            <span className="profile-screen__menu-label">{item.label}</span>
            <span className="profile-screen__menu-chevron">›</span>
          </button>
        ))}
      </nav>

      {/* === NAV BOTTOM === */}
      <div className="profile-screen__nav-bottom">
        <button className="profile-screen__nav-btn">🏠</button>
        <button className="profile-screen__nav-btn">💬</button>
        <button className="profile-screen__nav-btn profile-screen__nav-btn--active">
          👤
        </button>
      </div>
    </motion.div>
  );
}
