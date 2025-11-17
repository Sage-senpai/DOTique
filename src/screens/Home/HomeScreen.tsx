// src/screens/Home/HomeScreen.tsx - FIXED TO SHOW ALL POSTS
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
import { postService } from "../../services/postService";
import "./homescreen.scss";

const HomeScreen: React.FC = () => {
  const { profile, setProfile } = useAuthStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"feed" | "following" | "friends" | "communities">("feed");
  const [loading, setLoading] = useState(true);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  // ✅ Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

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

  // ✅ Fetch ALL posts (not filtered by user)
  useEffect(() => {
    if (!userProfileId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        console.log("📡 Fetching all posts...");
        
        // Use postService to get timeline
        const allPosts = await postService.getTimeline(userProfileId);
        
        console.log("✅ Fetched posts:", allPosts.length);
        setPosts(allPosts);
      } catch (error) {
        console.error("❌ Failed to fetch posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userProfileId]); // Remove activeTab from dependencies to prevent constant refetching

  // Fetch notifications
  useEffect(() => {
    if (!userProfileId) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select(`
            *,
            actor:profiles!notifications_actor_id_fkey(
              id,
              username,
              display_name,
              dotvatar_url,
              avatar_url
            )
          `)
          .eq("recipient_id", userProfileId)
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;

        const transformedNotifications = (data || []).map((notif: any) => ({
          id: notif.id,
          type: notif.type,
          actor: {
            id: notif.actor?.id || 'unknown',
            name: notif.actor?.display_name || 'Unknown User',
            avatar: notif.actor?.dotvatar_url || notif.actor?.avatar_url || '👤'
          },
          message: notif.content || notif.message,
          timestamp: new Date(notif.created_at),
          read: notif.read
        }));

        setNotifications(transformedNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userProfileId]);

  // ✅ Fixed post creation - adds to feed immediately
  const handleCreatePost = async (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => {
    if (!profile?.id) {
      alert("Please log in to create a post");
      return;
    }

    try {
      console.log("📝 Creating post with content:", content);
      console.log("🖼️ Media URL:", mediaUrl);
      console.log("📹 Media Type:", mediaType);
      
      // Create post using postService
      const newPost = await postService.createPost(profile.id, content, mediaUrl, mediaType);

      if (newPost) {
        console.log("✅ Post created successfully:", newPost);
        
        // Add to beginning of posts array immediately
        setPosts([newPost, ...posts]);
        
        setIsCreateModalOpen(false);
        alert("✅ Post created successfully!");
      }
    } catch (error: any) {
      console.error("❌ Post creation failed:", error);
      alert(`❌ Failed to create post: ${error.message}`);
    }
  };

  // ✅ Refresh posts function
  const handleRefresh = async () => {
    if (!userProfileId) return;
    
    setLoading(true);
    try {
      const allPosts = await postService.getTimeline(userProfileId);
      setPosts(allPosts);
      console.log("🔄 Posts refreshed");
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    } finally {
      setLoading(false);
    }
  };

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
                {profile?.dotvatar_url ? (
                  <img src={profile.dotvatar_url} alt="avatar" />
                ) : (
                  <UserIcon size={20} />
                )}
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
              className={`feed-tab ${activeTab === "friends" ? "active" : ""}`}
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
            onRefresh={handleRefresh}
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