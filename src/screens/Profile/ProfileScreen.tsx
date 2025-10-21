// src/screens/Profile/ProfileScreen.tsx
// =====================================
import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { socialService } from "../../services/socialService";
import PostCard from "../../components/Posts/PostCard";
import "./Profile.scss";

// ✅ Define Profile type with all fields used
type ProfileUI = {
  auth_uid: string;
  email: string;
  id: string;
  display_name: string;
  username: string;
  bio: string;
  dotvatar_url: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  tagged_count: number;
  ipfs_metadata?: string;
};

export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🧩 Dummy placeholders for dev preview
  const dummyProfile = useMemo<ProfileUI>(
    () => ({
      auth_uid: "dummy-auth-uid",
      email: "dummy@example.com",
      id: "dummy123",
      display_name: "Jane Doe",
      username: "janedoe",
      bio: "Building decentralized futures ✨",
      dotvatar_url: "https://placehold.co/100x100?text=JD",
      followers_count: 128,
      following_count: 76,
      posts_count: 3,
      tagged_count: 2,
    }),
    []
  );

  const dummyPosts = useMemo(
    () => [
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
    ],
    [dummyProfile]
  );

  // 🧠 Fetch profile from Supabase + IPFS
  const fetchProfile = useCallback(async () => {
    try {
      if (!profile?.auth_uid) {
        setProfile(dummyProfile);
        setPosts(dummyPosts);
        return;
      }

      setLoading(true);

      // ✅ Add second type argument to fix TS2558
     const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("auth_uid", profile.auth_uid)
  .single<ProfileUI>();


      if (error) throw error;

      const userData = data as ProfileUI;
      let combinedProfile = userData ?? dummyProfile;

      // ✅ Merge IPFS metadata if available
      if (userData?.ipfs_metadata) {
        try {
          const res = await fetch(userData.ipfs_metadata);
          const meta = await res.json();
          combinedProfile = { ...combinedProfile, ...meta };
        } catch (err) {
          console.warn("Failed to load IPFS metadata:", err);
        }
      }

      setProfile(combinedProfile);

      const userPosts = await socialService.getUserPosts(userData?.id || profile.id);
      setPosts(userPosts || dummyPosts);
    } catch (err) {
      console.error("❌ Error refreshing profile:", err);
      setProfile(dummyProfile);
      setPosts(dummyPosts);
    } finally {
      setLoading(false);
    }
  }, [profile?.auth_uid, profile?.id, setProfile, dummyProfile, dummyPosts]);

  // 🔁 Re-fetch on navigation or after editing
  useEffect(() => {
    fetchProfile();
  }, [location.key, fetchProfile]);

  // 📤 Share profile
  const handleShareProfile = async () => {
    try {
      const message = `Check out ${
        profile?.display_name || "my"
      } DOTique fashion profile 👗✨\n\nJoin the Web3 fashion revolution on DOTique!`;
      if ((navigator as any).share) {
        await (navigator as any).share({ text: message });
      } else {
        window.prompt("Copy profile share text:", message);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  // ✅ Menu items (now rendered *inside* JSX)
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
            {(profile.posts_count ?? posts.length) + (profile.tagged_count ?? 0)} Posts
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

        {/* ✅ RENDER MENU ITEMS PROPERLY */}
        <div className="profile-screen__menu">
          {menuItems.map((item, index) => (
            <button key={index} onClick={item.action} className="profile-menu__button">
              <span className="profile-menu__icon">{item.icon}</span>
              <span className="profile-menu__label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* === POSTS FEED === */}
      <div className="profile-posts">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="no-posts-text">No posts yet</p>
        )}
      </div>
    </motion.div>
  );
}
