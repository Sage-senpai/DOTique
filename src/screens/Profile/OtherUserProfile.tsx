// src/pages/Profile/OtherUserProfile.tsx - WITH MESSAGE INITIALIZATION
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical, Bell, Share2, Link as LinkIcon, VolumeX, UserX, Flag,
  Copy, Check, MessageCircle, UserPlus, UserCheck, ArrowLeft
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import { conversationService } from "../../services/conversationService";
import { supabase } from "../../services/supabase";
import PostCard from "../../components/Posts/PostCard";
import NFTCard from "../../components/NFT/NFTCard";
import { ProfileSkeleton, SkeletonGrid } from "../../components/Skeletons/SkeletonLoaders";
import "./OtherUserProfile.scss";

export default function OtherUserProfile() {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { selectedUser, clearSelectedUser } = useUserStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "wardrobe" | "tagged">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (!selectedUser?.id) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const [userPosts, userNFTs, following] = await Promise.all([
          socialService.getUserPosts(selectedUser.id, 50, 0),
          socialService.getUserNFTs(selectedUser.id),
          currentUser?.id ? socialService.isFollowing(currentUser.id, selectedUser.id) : Promise.resolve(false)
        ]);

        setPosts(userPosts || []);
        setWardrobe(userNFTs || []);
        setIsFollowing(following);

        // Check message count
        if (currentUser?.id) {
          const { count } = await supabase
            .from("messages")
            .select("id", { count: 'exact', head: true })
            .eq("sender_id", currentUser.id)
            .eq("recipient_id", selectedUser.id);
          setMessageCount(count || 0);
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
      const result = await socialService.toggleFollow(currentUser.id, selectedUser.id);
      setIsFollowing(result.following);
      
      // Update counts in selectedUser
      if (result.following) {
        selectedUser.followers_count = (selectedUser.followers_count || 0) + 1;
      } else {
        selectedUser.followers_count = Math.max(0, (selectedUser.followers_count || 0) - 1);
      }
    } catch (error) {
      console.error("❌ Failed to toggle follow:", error);
    }
  };

  const handleMessage = async () => {
    if (!isFollowing && messageCount >= 3) {
      alert("You can only send 3 messages to users who don't follow you back.");
      return;
    }

    try {
      // Initialize conversation
      await conversationService.initializeDirectConversation(
        currentUser!.id,
        selectedUser!.id
      );
      
      // Navigate to messages with user ID
      navigate(`/messages?user=${selectedUser!.id}`);
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
      alert('Failed to start conversation');
    }
  };

  const handleCopyWallet = async () => {
    if (!selectedUser?.primary_wallet) return;
    
    try {
      await navigator.clipboard.writeText(selectedUser.primary_wallet);
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
        title: `${selectedUser?.display_name || "User"}'s DOTique Profile`,
        text: `Check out ${selectedUser?.display_name || "this"} DOTique fashion profile 👗✨`,
        url: window.location.href
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Profile link copied!");
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

  const handleMuteUser = async () => {
    try {
      await supabase
        .from("muted_users")
        .insert({
          user_id: currentUser?.id,
          muted_user_id: selectedUser?.id
        });
      alert("User muted 🔇");
      setShowDropdown(false);
    } catch (error) {
      console.error("Failed to mute user:", error);
    }
  };

  const handleBlockUser = async () => {
    if (confirm("Are you sure you want to block this user?")) {
      try {
        await supabase
          .from("blocked_users")
          .insert({
            user_id: currentUser?.id,
            blocked_user_id: selectedUser?.id
          });
        alert("User blocked 🚫");
        navigate(-1);
      } catch (error) {
        console.error("Failed to block user:", error);
      }
    }
    setShowDropdown(false);
  };

  const handleReportUser = () => {
    const reason = prompt("Please provide a reason for reporting this user:");
    if (reason) {
      alert("Report submitted 🚩");
      setShowDropdown(false);
    }
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
      action: handleMuteUser
    },
    {
      icon: <UserX size={18} />,
      label: "Block user",
      action: handleBlockUser,
      danger: true
    },
    {
      icon: <Flag size={18} />,
      label: "Report",
      action: handleReportUser,
      danger: true
    }
  ];

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!selectedUser) return null;

  return (
    <motion.div
      className="profile-screen"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="profile-screen__banner">
        {selectedUser.banner_url ? (
          <img src={selectedUser.banner_url} alt="banner" className="banner-img" />
        ) : null}
        <button
          className="profile-screen__back-btn"
          onClick={() => {
            clearSelectedUser();
            navigate(-1);
          }}
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="profile-screen__header">
        <div className="profile-screen__avatar-wrapper">
          {selectedUser.avatar_url ? (
            <img src={selectedUser.avatar_url} alt="avatar" className="profile-screen__avatar" />
          ) : (
            <div className="profile-screen__avatar-placeholder">👤</div>
          )}
          {selectedUser.verified && (
            <div className="profile-screen__verified-badge">✓</div>
          )}
        </div>

        <div className="profile-screen__name-wrapper">
          <h2 className="profile-screen__name">{selectedUser.display_name}</h2>
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

        <p className="profile-screen__username">@{selectedUser.username}</p>

        {selectedUser.bio && (
          <p className="profile-screen__bio">{selectedUser.bio}</p>
        )}

        {selectedUser.primary_wallet && (
          <div className="profile-screen__wallet-info" onClick={handleCopyWallet}>
            <span className="wallet-icon">🔗</span>
            <div className="wallet-details">
              <div className="wallet-chain">
                {selectedUser.wallet_chain || "Polkadot"}
              </div>
              <div className="wallet-address">
                {formatWallet(selectedUser.primary_wallet)}
              </div>
            </div>
            <span className="wallet-copy">
              {copiedWallet ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </div>
        )}

        <div className="profile-screen__stats">
          <div className="profile-screen__stat" onClick={() => navigate("/followers")}>
            <div className="stat-value">{selectedUser.followers_count ?? 0}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="profile-screen__stat" onClick={() => navigate("/followers?tab=following")}>
            <div className="stat-value">{selectedUser.following_count ?? 0}</div>
            <div className="stat-label">Following</div>
          </div>
          <div className="profile-screen__stat">
            <div className="stat-value">{selectedUser.posts_count ?? posts.length}</div>
            <div className="stat-label">Posts</div>
          </div>
        </div>

        <div className="profile-screen__actions">
          <button 
            className={`profile-screen__action-btn profile-screen__action-btn--primary ${isFollowing ? 'following' : ''}`}
            onClick={handleToggleFollow}
          >
            {isFollowing ? (
              <>
                <UserCheck size={18} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Follow
              </>
            )}
          </button>
          <button 
            className="profile-screen__action-btn profile-screen__action-btn--secondary"
            onClick={handleMessage}
          >
            <MessageCircle size={18} />
            Message
            {!isFollowing && messageCount >= 3 && (
              <span style={{ fontSize: '10px', marginLeft: '4px' }}>({messageCount}/3)</span>
            )}
          </button>
          <button 
            className="profile-screen__action-btn profile-screen__action-btn--icon"
            onClick={handleShareProfile}
          >
            <Share2 size={20} />
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
          className={`profile-screen__tab ${activeTab === "wardrobe" ? "active" : ""}`}
          onClick={() => setActiveTab("wardrobe")}
        >
          <span className="tab-icon">👗</span>
          <span>Wardrobe</span>
        </button>
        <button
          className={`profile-screen__tab ${activeTab === "tagged" ? "active" : ""}`}
          onClick={() => setActiveTab("tagged")}
        >
          <span className="tab-icon">🏷️</span>
          <span>Tagged</span>
        </button>
      </div>

      <div className="profile-screen__content">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    showAuthor={false}
                    compact={false}
                  />
                ))
              ) : (
                <div className="profile-screen__empty-state">
                  <div className="empty-icon">📭</div>
                  <p className="empty-text">No posts yet</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "wardrobe" && (
            <motion.div
              key="wardrobe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
                  <p className="empty-text">No wardrobe items yet</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "tagged" && (
            <motion.div
              key="tagged"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="profile-screen__empty-state">
                <div className="empty-icon">🏷️</div>
                <p className="empty-text">No tagged posts yet</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}