// src/screens/Profile/ProfileScreen.tsx - WITH STICKY MINIMIZED HEADER
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileSkeleton, SkeletonGrid } from '../../components/Skeletons/SkeletonLoaders';
import { 
  MoreVertical, 
  Bell, 
  Share2, 
  Link as LinkIcon, 
  VolumeX, 
  UserX, 
  Flag,
  Copy,
  Check,
  Edit,
  Settings,
  Search
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { supabase } from "../../services/supabase";
import { socialService } from "../../services/socialService";
import PostCard from "../../components/Posts/PostCard";
import NFTCard from "../../components/NFT/NFTCard";
import { getUserProfileWithCounts } from '../../services/profileService';
import "./profile.scss";

export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { user, addRepost } = useUserStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [reposts, setLocalReposts] = useState<any[]>([]);
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "tagged" | "wardrobe">("posts");
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.offsetHeight;
        setIsHeaderMinimized(window.scrollY > headerBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const refreshProfile = async () => {
    if (!profile?.id) return;
    
    try {
      const freshProfile = await getUserProfileWithCounts(profile.id);
      if (freshProfile) {
        setProfile(freshProfile);
      }
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  refreshProfile();
}, [profile?.id, setProfile]);

  // Auto-refresh user data with updated counts
  useEffect(() => {
    const refreshProfile = async () => {
      if (!profile?.id) return;
      
      try {
        const freshProfile = await socialService.getUserProfile(profile.id);
        if (freshProfile) {
          setProfile(freshProfile);
        }
      } catch (err) {
        console.error('Failed to refresh profile:', err);
      }
    };

    refreshProfile();
  }, [profile?.id, setProfile]);

  useEffect(() => {
    const refreshProfile = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        const { data, error } = await supabase
          .from("profiles")
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
      } finally {
        setLoading(false);
      }
    };

    refreshProfile();
  }, [setProfile]);

  // Load wardrobe from localStorage
  useEffect(() => {
    const loadWardrobe = () => {
      try {
        const wardrobeData = localStorage.getItem('user_wardrobe');
        if (wardrobeData) {
          const parsedNFTs = JSON.parse(wardrobeData);
          setWardrobe(parsedNFTs);
        }
      } catch (err) {
        console.error("Failed to load wardrobe:", err);
      }
    };

    loadWardrobe();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_wardrobe') {
        loadWardrobe();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const fetchProfileData = useCallback(async () => {
    try {
      setPostsLoading(true);
      
      if (!profile?.auth_uid) {
        navigate("/login");
        return;
      }

      const [postsRes, repostsRes, nftsRes] = await Promise.all([
        profile?.id ? socialService.getUserPosts(profile.id) : [],
        profile?.id && socialService.getUserReposts ? socialService.getUserReposts(profile.id) : [],
        profile?.id && (socialService as any).getUserNFTs
          ? (socialService as any).getUserNFTs(profile.id)
          : [],
      ]);

      setPosts(postsRes || dummyPosts);
      setLocalReposts(repostsRes || []);
      setWardrobe(nftsRes || []);
    } catch (err) {
      console.error("❌ Error loading profile data:", err);
      setPosts(dummyPosts);
    } finally {
      setPostsLoading(false);
    }
  }, [profile?.auth_uid, profile?.id, dummyPosts, navigate]);

  useEffect(() => {
    if (!profile?.auth_uid) return;
    fetchProfileData();
  }, [profile?.auth_uid, fetchProfileData]);

  const handleCopyWallet = async () => {
    if (!profile?.primary_wallet) return;
    
    try {
      await navigator.clipboard.writeText(profile.primary_wallet);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatWallet = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleShareProfile = async () => {
    try {
      const shareData = {
        title: `${profile?.display_name || "User"}'s DOTique Profile`,
        text: `Check out ${profile?.display_name || "my"} DOTique fashion profile 👗✨`,
        url: window.location.href
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Profile link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
    setShowDropdown(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
    setShowDropdown(false);
  };

  const dropdownItems = [
    {
      icon: <Bell size={18} />,
      label: "Turn on notifications",
      action: () => {
        alert("Notifications enabled! 🔔");
        setShowDropdown(false);
      }
    },
    {
      icon: <Share2 size={18} />,
      label: "Share profile",
      action: handleShareProfile
    },
    {
      icon: <LinkIcon size={18} />,
      label: "Copy link",
      action: handleCopyLink
    },
    {
      icon: <VolumeX size={18} />,
      label: "Mute user",
      action: () => {
        alert("User muted 🔇");
        setShowDropdown(false);
      }
    },
    {
      icon: <UserX size={18} />,
      label: "Block user",
      action: () => {
        if (confirm("Are you sure you want to block this user?")) {
          alert("User blocked 🚫");
          setShowDropdown(false);
        }
      },
      danger: true
    },
    {
      icon: <Flag size={18} />,
      label: "Report",
      action: () => {
        alert("Report submitted 🚩");
        setShowDropdown(false);
      },
      danger: true
    }
  ];

  if (loading || !profile) {
    return <ProfileSkeleton />;
  }

  const globalReposts: any[] = [];
  const allReposts = reposts.length ? reposts : globalReposts;

  return (
    <motion.div
      className="profile-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sticky Minimized Header */}
      <AnimatePresence>
        {isHeaderMinimized && (
          <motion.div
            className="profile-screen__sticky-header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky-header__content">
              <div className="sticky-header__left">
                <div className="sticky-header__avatar">
                  {profile.dotvatar_url ? (
                    <img src={profile.dotvatar_url} alt="avatar" />
                  ) : (
                    <div className="avatar-placeholder">🪞</div>
                  )}
                </div>
                <div className="sticky-header__info">
                  <h3 className="sticky-header__name">{profile.display_name || "User"}</h3>
                  <div className="sticky-header__stats">
                    <span>{profile.posts_count ?? posts.length} posts</span>
                    <span>·</span>
                    <span>{profile.followers_count ?? 0} followers</span>
                    <span>·</span>
                    <span>{profile.following_count ?? 0} following</span>
                  </div>
                </div>
              </div>
              <div className="sticky-header__actions">
                <button 
                  className="sticky-header__btn sticky-header__btn--search"
                  onClick={() => setShowSearchModal(true)}
                  title="Search posts"
                >
                  <Search size={18} />
                </button>
                <button 
                  className="sticky-header__btn sticky-header__btn--share"
                  onClick={handleShareProfile}
                  title="Share profile"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <div className="profile-screen__banner" ref={headerRef}>
        {profile.banner_url ? (
          <img src={profile.banner_url} alt="banner" className="banner-img" />
        ) : null}
      </div>

      {/* Header */}
      <div className="profile-screen__header">
        <div className="profile-screen__avatar-wrapper">
          {profile.dotvatar_url ? (
            <img src={profile.dotvatar_url} alt="avatar" className="profile-screen__avatar" />
          ) : (
            <div className="profile-screen__avatar-placeholder">🪞</div>
          )}
          {profile.verified && (
            <div className="profile-screen__verified-badge">✓</div>
          )}
        </div>

        <div className="profile-screen__name-wrapper">
          <h2 className="profile-screen__name">{profile.display_name || "User"}</h2>
          <div style={{ position: 'relative' }}>
            <button 
              className="profile-screen__more-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical size={20} />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="profile-screen__dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {dropdownItems.map((item, idx) => (
                    <button
                      key={idx}
                      className={`profile-screen__dropdown-item ${item.danger ? 'profile-screen__dropdown-item--danger' : ''}`}
                      onClick={item.action}
                    >
                      <span className="item-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="profile-screen__username">@{profile.username}</p>

        {profile.bio && (
          <p className="profile-screen__bio">{profile.bio}</p>
        )}

        {profile.primary_wallet && (
          <div className="profile-screen__wallet-info" onClick={handleCopyWallet}>
            <span className="wallet-icon">🔗</span>
            <div className="wallet-details">
              <div className="wallet-chain">
                {profile.wallet_chain || "Polkadot"}
              </div>
              <div className="wallet-address">
                {formatWallet(profile.primary_wallet)}
              </div>
            </div>
            <span className="wallet-copy">
              {copiedWallet ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </div>
        )}

        <div className="profile-screen__stats">
          <div className="profile-screen__stat" onClick={() => navigate("/followers")}>
            <div className="stat-value">{profile.followers_count ?? 0}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="profile-screen__stat" onClick={() => navigate("/followers?tab=following")}>
            <div className="stat-value">{profile.following_count ?? 0}</div>
            <div className="stat-label">Following</div>
          </div>
          <div className="profile-screen__stat">
            <div className="stat-value">
              {(profile.posts_count ?? posts.length) + (profile.tagged_count ?? 0)}
            </div>
            <div className="stat-label">Posts</div>
          </div>
        </div>

        <div className="profile-screen__actions">
          <button 
            className="profile-screen__action-btn profile-screen__action-btn--primary"
            onClick={() => navigate("/profile/edit")}
          >
            <Edit size={18} />
            Edit Profile
          </button>
          <button 
            className="profile-screen__action-btn profile-screen__action-btn--secondary"
            onClick={handleShareProfile}
          >
            <Share2 size={18} />
            Share
          </button>
          <button 
            className="profile-screen__action-btn profile-screen__action-btn--icon"
            onClick={() => navigate("/settings")}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="profile-screen__tabs">
        <button
          className={`profile-screen__tab ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          <span className="tab-icon">📸</span>
          <span>Posts</span>
        </button>
        <button
          className={`profile-screen__tab ${activeTab === "tagged" ? "active" : ""}`}
          onClick={() => setActiveTab("tagged")}
        >
          <span className="tab-icon">🏷️</span>
          <span>Tagged</span>
        </button>
        <button
          className={`profile-screen__tab ${activeTab === "wardrobe" ? "active" : ""}`}
          onClick={() => setActiveTab("wardrobe")}
        >
          <span className="tab-icon">👗</span>
          <span>Wardrobe</span>
        </button>
      </div>

      <div className="profile-screen__content">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {postsLoading ? (
                <SkeletonGrid type="post" count={3} />
              ) : posts.length === 0 && allReposts.length === 0 ? (
                <div className="profile-screen__empty-state">
                  <div className="empty-icon">📭</div>
                  <p className="empty-text">No posts yet</p>
                  <button className="empty-cta" onClick={() => navigate("/home")}>
                    Create your first post
                  </button>
                </div>
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
            </motion.div>
          )}

          {activeTab === "tagged" && (
            <motion.div
              key="tagged"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-screen__empty-state">
                <div className="empty-icon">🏷️</div>
                <p className="empty-text">No tagged posts yet</p>
              </div>
            </motion.div>
          )}

          {activeTab === "wardrobe" && (
            <motion.div
              key="wardrobe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {wardrobe.length > 0 ? (
                <div className="nft-grid">
                  {wardrobe.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>
              ) : (
                <div className="profile-screen__empty-state">
                  <div className="empty-icon">👗</div>
                  <p className="empty-text">No NFTs in wardrobe yet</p>
                  <button className="empty-cta" onClick={() => navigate("/marketplace")}>
                    Explore Marketplace
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}