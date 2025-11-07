/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/Home/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { Plus, Search as SearchIcon, Bell, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/Homepage/LeftSidebar";
import FeedCenter from "../../components/Homepage/FeedCenter";
import RightSidebar from "../../components/Homepage/RightSidebar";
import NotificationCenter from "../../components/Notifications/NotificationCenter";
import CreatePostModal from "../../components/Posts/CreatePostModal";
import SearchModal from "../../components/Search/SearchModal";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import { socialService } from "../../services/socialService";
import "./homescreen.scss";

// ==================== DUMMY FALLBACK DATA ====================
const DUMMY_POSTS = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "Alex Rivera",
      username: "@alexrivera",
      avatar: "👩‍🎨",
      verified: true,
    },
    content:
      'Just dropped my latest NFT collection! "Neon Dreams" - featuring 50 hand-crafted digital artworks. Limited edition 1/1s 🎨✨',
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1578926314433-3e4b9b8b8b8?w=600&h=400&fit=crop",
      },
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    stats: { views: 2450, likes: 342, comments: 89, reposts: 156, shares: 45 },
    userInteraction: { liked: false, saved: false, reposted: false },
  },
  {
    id: "2",
    author: {
      id: "u2",
      name: "Jordan Chen",
      username: "@jordanchen",
      avatar: "👨‍💻",
      verified: true,
    },
    content:
      "Fashion is about expressing yourself. Today's outfit is from my latest wardrobe NFTs 🔥",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      },
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    stats: { views: 1890, likes: 267, comments: 54, reposts: 98, shares: 32 },
    userInteraction: { liked: true, saved: true, reposted: false },
  },
  {
    id: "3",
    author: {
      id: "u3",
      name: "Sam Design",
      username: "@samdesign",
      avatar: "🎨",
      verified: false,
    },
    content:
      "Web3 fashion is democratizing design. Anyone can create, mint, and sell their work. The future is now! 🚀",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    stats: { views: 3120, likes: 445, comments: 127, reposts: 234, shares: 78 },
    userInteraction: { liked: false, saved: false, reposted: false },
  },
];

const DUMMY_NOTIFICATIONS = [
  {
    id: "n1",
    type: "like",
    actor: { id: "u1", name: "Alex Rivera", avatar: "👩‍🎨" },
    message: "liked your post",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
  },
  {
    id: "n2",
    type: "follow",
    actor: { id: "u3", name: "Sam Design", avatar: "🎨" },
    message: "started following you",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: "n3",
    type: "comment",
    actor: { id: "u2", name: "Jordan Chen", avatar: "👨‍💻" },
    message: 'commented on your NFT: "Love the design!"',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "n4",
    type: "purchase",
    actor: { id: "u4", name: "Maya Styles", avatar: "👗" },
    message: "purchased your NFT for 25 DOT",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
  },
];

// =====================================================
// MAIN COMPONENT
// =====================================================
const HomeScreen: React.FC = () => {
  const { profile, setProfile } = useAuthStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>(DUMMY_POSTS);
  const [notifications, _setNotifications] = useState<any[]>(DUMMY_NOTIFICATIONS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"feed" | "following" | "followers">("feed");
  const [loading, setLoading] = useState(false);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  // ✅ Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        // Get profile from profiles table using auth_uid
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_uid", userData.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (profileData) {
          console.log("🔄 User profile loaded:", profileData);
          setProfile(profileData);
          setUserProfileId(profileData.id);
        }
      } catch (err) {
        console.error("Failed to refresh user profile:", err);
      }
    };

    fetchProfile();
  }, [setProfile]);

  // Fetch posts dynamically when profile ID is available
  useEffect(() => {
    if (!userProfileId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const timelinePosts = await socialService.getTimelinePosts(
          userProfileId,
          50,
          0,
          activeTab
        );
        setPosts(timelinePosts);
      } catch (error) {
        console.warn("Failed to fetch posts, using dummy data:", error);
        setPosts(DUMMY_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, userProfileId]);

  // ✅ Fixed post creation
  const handleCreatePost = async (content: string, imageUrl?: string) => {
    try {
      console.log("📝 Creating post with content:", content);
      console.log("🖼️ Image URL:", imageUrl);
      
      const newPost = await socialService.createPost(content, imageUrl);

      if (newPost) {
        setPosts([newPost, ...posts]);
        console.log("✅ Post added to feed");
        setIsCreateModalOpen(false);
      }
    } catch (error: any) {
      console.error("❌ Post creation failed:", error);
      alert(`❌ Failed to create post: ${error.message}`);
    }
  };

  // Navigate to user profile
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="home-page">
      {/* Enhanced Header */}
      <header className="home-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">DOTique</span>
            <div className="logo-glow" />
          </div>
        </div>
        
        <div className="header-center">
          <div
            className="search-bar"
            onClick={() => setIsSearchOpen(true)}
            role="button"
            tabIndex={0}
          >
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search users, posts, NFTs..."
              readOnly
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="search-glow" />
          </div>
        </div>
        
        <div className="header-right">
          <NotificationCenter notifications={notifications} />
          
          <button 
            className="user-menu" 
            onClick={handleProfileClick}
            title="View Profile"
          >
            <div className="avatar-wrapper">
              <div className="avatar-small">
                {profile?.avatar_url || <UserIcon size={20} />}
              </div>
              <div className="avatar-glow" />
            </div>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="home-container">
        <LeftSidebar />

        <div className="feed-wrapper">
          <div className="feed-tabs">
            <button
              className={`feed-tab ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => setActiveTab("feed")}
            >
              <span className="tab-icon">🏠</span>
              <span className="tab-text">Feed</span>
              {activeTab === "feed" && <div className="tab-indicator" />}
            </button>
            <button
              className={`feed-tab ${activeTab === "following" ? "active" : ""}`}
              onClick={() => setActiveTab("following")}
            >
              <span className="tab-icon">👥</span>
              <span className="tab-text">Following</span>
              {activeTab === "following" && <div className="tab-indicator" />}
            </button>
            <button
              className={`feed-tab ${activeTab === "followers" ? "active" : ""}`}
              onClick={() => setActiveTab("friends")}
            >
              <span className="tab-icon">⭐</span>
              <span className="tab-text">Friends</span>
              {activeTab === "friends" && <div className="tab-indicator" />}
            </button>
          </div>

          <FeedCenter
            posts={posts}
            loading={loading}
            onPostLike={(id) => console.log("Like post:", id)}
            onPostShare={(id) => console.log("Share post:", id)}
          />
        </div>

        <RightSidebar />
      </div>

      {/* Floating Action Button */}
      <button
        className="fab"
        onClick={() => setIsCreateModalOpen(true)}
        title="Create Post or Mint NFT"
      >
        <Plus size={28} />
        <div className="fab-glow" />
      </button>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomeScreen;