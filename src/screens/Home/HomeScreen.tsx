/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/Home/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { Plus, Search as SearchIcon } from "lucide-react";
import LeftSidebar from "../../components/Homepage/LeftSidebar";
import FeedCenter from "../../components/Homepage/FeedCenter";
import RightSidebar from "../../components/Homepage/RightSidebar";
import NotificationCenter from "../../components/Notifications/NotificationCenter";
import CreatePostModal from "../../components/Posts/CreatePostModal";
import SearchModal from "../../components/Search/SearchModal";
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
      "Fashion is about expressing yourself. Today’s outfit is from my latest wardrobe NFTs 🔥",
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
  const { profile } = useAuthStore();
  const [posts, setPosts] = useState<any[]>(DUMMY_POSTS);
  const [notifications, _setNotifications] = useState<any[]>(DUMMY_NOTIFICATIONS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"feed" | "following" | "followers">("feed");
  const [loading, setLoading] = useState(false);

  // Fetch posts dynamically if user is logged in
  useEffect(() => {
    if (!profile?.id) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const timelinePosts = await socialService.getTimelinePosts(
          profile.id,
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
  }, [activeTab, profile?.id]);

  const handleCreatePost = async (content: string, imageUrl?: string) => {
  if (!profile?.id) {
    alert("❌ Error: You must be logged in to create a post");
    console.error("No profile.id available");
    return;
  }

  try {
    console.log("📝 Creating post for user:", profile.id);
    
    const newPost = await socialService.createPost(profile.id, content, imageUrl);
    
    if (newPost) {
      setPosts([newPost, ...posts]);
      console.log("✅ Post added to feed");
      alert("✅ Post created successfully!");
    }
  } catch (error: any) {
    console.error("❌ Post creation failed:", error);
    alert(`❌ Failed to create post: ${error.message}`);
  }
};
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-left">
          <div className="logo">DOTique</div>
        </div>
        <div className="header-center">
          <div
            className="search-bar"
            onClick={() => setIsSearchOpen(true)}
            role="button"
            tabIndex={0}
          >
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Search users, posts, NFTs..."
              readOnly
              onClick={() => setIsSearchOpen(true)}
            />
          </div>
        </div>
        <div className="header-right">
          <NotificationCenter notifications={notifications} />
          <div className="user-menu">
            <div className="avatar-small">👤</div>
          </div>
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
              🏠 Feed
            </button>
            <button
              className={`feed-tab ${activeTab === "following" ? "active" : ""}`}
              onClick={() => setActiveTab("following")}
            >
              👥 Following
            </button>
            <button
              className={`feed-tab ${activeTab === "followers" ? "active" : ""}`}
              onClick={() => setActiveTab("followers")}
            >
              ⭐ Followers
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
