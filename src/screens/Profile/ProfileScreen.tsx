// src/screens/Profile/ProfileScreen.tsx
// =====================================
import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { supabase } from "../../services/supabase";
import { socialService } from "../../services/socialService";
import PostCard from "../../components/Posts/PostCard";
import NFTCard from "../../components/NFT/NFTCard";
import "./profile.scss";

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------
export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { user, addRepost } = useUserStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [reposts, setLocalReposts] = useState<any[]>([]);
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "tagged" | "wardrobe">("posts");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

    // ✅ Auto-refresh user data from Supabase on mount
  useEffect(() => {
    const refreshProfile = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("auth_uid", userData.user.id)
          .single();

        if (error) console.warn("⚠️ Could not refresh profile:", error);
        if (data) {
          console.log("🔄 Latest profile fetched from Supabase:", data);
          setProfile(data);
        }
      } catch (err) {
        console.error("❌ Error refreshing profile:", err);
      }
    };

    refreshProfile();
  }, []);


  // -------------------------------------------------------------
  // Dummy Posts Only (for layout testing)
  // -------------------------------------------------------------
  const dummyPosts = useMemo(
    () => [
      {
        id: "p1",
        author: profile,
        content: "Exploring Web3 and creativity through code 🚀",
        media: null,
        created_at: new Date().toISOString(),
      },
      {
        id: "p2",
        author: profile,
        content: "Every block tells a story — let's write ours on-chain 🧠",
        media: null,
        created_at: new Date().toISOString(),
      },
    ],
    [profile]
  );

  // -------------------------------------------------------------
  // Fetch Profile Data (Stable Version)
  // -------------------------------------------------------------
  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("👤 Fetching profile data for:", profile?.auth_uid, profile?.id);

      if (!profile?.auth_uid) {
        console.warn("⚠️ No auth_uid found, please log in again.");
        navigate("/login");
        return;
      }

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("⏰ Profile load timeout")), 5000)
      );

      const [userRes, postsRes, repostsRes, nftsRes] = await Promise.race([
        Promise.all([
          supabase.from("users").select("*").eq("auth_uid", profile.auth_uid).single(),
          profile?.id ? socialService.getUserPosts(profile.id) : [],
          profile?.id && socialService.getUserReposts ? socialService.getUserReposts(profile.id) : [],
          profile?.id && (socialService as any).getUserNFTs
            ? (socialService as any).getUserNFTs(profile.id)
            : [],
        ]),
        timeout,
      ]);

      const userData = userRes?.data;
      let combinedProfile =
        userData && userData.auth_uid === profile?.auth_uid
          ? { ...profile, ...userData }
          : profile;

      // Merge IPFS metadata if present
      if (userData?.ipfs_metadata) {
        try {
          const res = await fetch(userData.ipfs_metadata);
          const meta = await res.json();
          combinedProfile = { ...combinedProfile, ...meta };
        } catch (err) {
          console.warn("⚠️ Failed to load IPFS metadata:", err);
        }
      }

      // ✅ Update store only if profile actually changed
      if (
        combinedProfile?.auth_uid === profile?.auth_uid &&
        JSON.stringify(combinedProfile) !== JSON.stringify(profile)
      ) {
        setProfile(combinedProfile);
      }

      setPosts(postsRes || dummyPosts);
      setLocalReposts(repostsRes || []);
      setWardrobe(nftsRes || []);

      console.log("✅ Profile loaded:", combinedProfile);
    } catch (err) {
      console.error("❌ Error loading profile data:", err);
      setPosts(dummyPosts);
    } finally {
      setLoading(false);
    }
  }, [profile?.auth_uid, profile?.id, setProfile, dummyPosts, navigate]);

  // -------------------------------------------------------------
  // Lifecycle (Stable: runs only once per auth_uid change)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!profile?.auth_uid) return;

    let didCancel = false;
    const load = async () => {
      if (didCancel) return;
      await fetchProfileData();
    };

    load();

    return () => {
      didCancel = true;
    };
  }, [profile?.auth_uid]); // ✅ only re-run when user changes

  // -------------------------------------------------------------
  // Share Handler
  // -------------------------------------------------------------
  const handleShareProfile = async () => {
    try {
      const message = `Check out ${profile?.display_name || "my"} DOTique fashion profile 👗✨`;
      if ((navigator as any).share) await (navigator as any).share({ text: message });
      else window.prompt("Copy profile share text:", message);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  // -------------------------------------------------------------
  // Safe guards
  // -------------------------------------------------------------
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

  const globalReposts: any[] = [];
  const allReposts = reposts.length ? reposts : globalReposts;

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
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
          <img src={profile.dotvatar_url} alt="avatar" className="profile-screen__avatar" />
        ) : (
          <div className="profile-screen__avatar-placeholder">🪞</div>
        )}

        <h2 className="profile-screen__name">{profile.display_name || "User"}</h2>
        <p className="profile-screen__username">@{profile.username}</p>
        {profile.bio && <p className="profile-screen__bio">{profile.bio}</p>}

        <div className="profile-follow-merged">
          <span onClick={() => navigate("/followers")} className="profile-follow-link">
            {profile.followers_count ?? 0} Followers
          </span>
          <span className="dot-separator">·</span>
          <span onClick={() => navigate("/followers?tab=following")} className="profile-follow-link">
            {profile.following_count ?? 0} Following
          </span>
          <span className="dot-separator">·</span>
          <span className="profile-posts-count">
            {(profile.posts_count ?? posts.length) + (profile.tagged_count ?? 0)} Posts
          </span>
        </div>

        <div className="profile-screen__buttons">
          <button className="profile-screen__btn-primary" onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
          <button className="profile-screen__btn-secondary" onClick={handleShareProfile}>
            Share
          </button>
          <button className="profile-screen__btn-icon" onClick={() => navigate("/settings")}>
            ⚙️
          </button>
        </div>
      </div>

      {/* === TABS === */}
      <div className="profile-tabs">
        {["posts", "tagged", "wardrobe"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* === TAB CONTENT === */}
      <div className="profile-tab-content">
        {activeTab === "posts" && (
          <>
            {posts.length === 0 && allReposts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              <>
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}

                {allReposts.map((r: any) =>
                  r.type === "nft" ? (
                    <NFTCard key={r.id} nft={r.nft || r} />
                  ) : (
                    <PostCard key={r.id} post={r.post || r} />
                  )
                )}
              </>
            )}
          </>
        )}

        {activeTab === "tagged" && (
          <div className="tagged-tab">
            <p>Tagged posts...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
