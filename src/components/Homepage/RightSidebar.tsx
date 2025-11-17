// src/components/Homepage/RightSidebar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, MapPin, UserPlus } from "lucide-react";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import { useAuthStore } from "../../stores/authStore";
import "./RightSidebar.scss";

// Recommendation categories
type RecommendationType = 'topCreators' | 'mutuals' | 'topFollowed' | 'nearby';

const RECOMMENDATION_DATA = {
  topCreators: [
    {
      id: 1,
      name: "Maya Styles",
      username: "@mayastyles",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      bio: "Fashion meets the metaverse",
      followers_count: 12500,
      verified: true,
      badge: "🎨"
    },
    {
      id: 2,
      name: "Tech Fashion Co",
      username: "@techfashion",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      bio: "Wearable tech innovator",
      followers_count: 8900,
      verified: true,
      badge: "👔"
    },
    {
      id: 3,
      name: "Crypto Couture",
      username: "@cryptocouture",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      bio: "Blockchain x Style",
      followers_count: 15200,
      verified: true,
      badge: "💎"
    },
  ],
  mutuals: [
    {
      id: 4,
      name: "Alex Rivera",
      username: "@alexrivera",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      bio: "NFT artist & collector",
      followers_count: 2300,
      verified: false,
      badge: "🎭",
      mutualFriends: 8
    },
    {
      id: 5,
      name: "Jordan Chen",
      username: "@jordanchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Digital fashion enthusiast",
      followers_count: 3100,
      verified: false,
      badge: "👨‍💻",
      mutualFriends: 5
    },
    {
      id: 6,
      name: "Sam Design",
      username: "@samdesign",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      bio: "Web3 fashion pioneer",
      followers_count: 1890,
      verified: false,
      badge: "✨",
      mutualFriends: 12
    },
  ],
  topFollowed: [
    {
      id: 7,
      name: "Vogue Digital",
      username: "@voguedigital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      bio: "Official digital fashion",
      followers_count: 45000,
      verified: true,
      badge: "👗"
    },
    {
      id: 8,
      name: "NFT Runway",
      username: "@nftrunway",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      bio: "Virtual fashion shows",
      followers_count: 32000,
      verified: true,
      badge: "🎬"
    },
  ],
  nearby: [
    {
      id: 9,
      name: "Lagos Style Hub",
      username: "@lagosstyle",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
      bio: "Local fashion community",
      followers_count: 5600,
      verified: false,
      badge: "🌍",
      location: "Lagos, Nigeria"
    },
    {
      id: 10,
      name: "Naija Fashion Week",
      username: "@naijafashion",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
      bio: "African fashion excellence",
      followers_count: 8900,
      verified: true,
      badge: "🎉",
      location: "Lagos, Nigeria"
    },
  ]
};

const CATEGORY_INFO = {
  topCreators: { icon: TrendingUp, label: "Top Creators", color: "#60519b" },
  mutuals: { icon: Users, label: "People You May Know", color: "#22c55e" },
  topFollowed: { icon: UserPlus, label: "Most Followed", color: "#fbbf24" },
  nearby: { icon: MapPin, label: "Nearby Creators", color: "#3b82f6" },
};

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { setSelectedUser } = useUserStore();
  const [activeCategory, setActiveCategory] = useState<RecommendationType>('topCreators');
  const [following, setFollowing] = useState<{ [key: number]: boolean }>({});

  const handleFollowClick = async (creator: any) => {
    if (!currentUser?.id) return;

    try {
      const result = await socialService.toggleFollow(
        currentUser.id,
        creator.id
      );
      setFollowing((prev) => ({
        ...prev,
        [creator.id]: result.following,
      }));
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const handleViewProfile = (creator: any) => {
    setSelectedUser({
      id: creator.id,
      username: creator.username,
      display_name: creator.name,
      avatar: creator.avatar,
      bio: creator.bio,
      followers_count: creator.followers_count || 0,
      following_count: creator.following_count || 0,
      posts_count: creator.posts_count || 0,
      verified: creator.verified || false,
    });
    navigate("/profile/other");
  };

  const currentData = RECOMMENDATION_DATA[activeCategory];
  const CategoryIcon = CATEGORY_INFO[activeCategory].icon;

  return (
    <aside className="right-sidebar">
      <div className="recommendations">
        {/* Category Tabs */}
        <div className="category-tabs">
          {(Object.keys(CATEGORY_INFO) as RecommendationType[]).map((category) => {
            const Icon = CATEGORY_INFO[category].icon;
            return (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                title={CATEGORY_INFO[category].label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>

        {/* Header */}
        <div className="recommendations-header">
          <CategoryIcon size={18} className="header-icon" />
          <h3>{CATEGORY_INFO[activeCategory].label}</h3>
        </div>

        {/* Creator List */}
        <div className="recommendations-list">
          {currentData.map((creator) => (
            <div key={creator.id} className="recommendation-card">
              <div 
                className="rec-avatar" 
                onClick={() => handleViewProfile(creator)}
              >
                {creator.avatar.startsWith('http') ? (
                  <img src={creator.avatar} alt={creator.name} />
                ) : (
                  creator.avatar
                )}
                {creator.verified && <span className="verified-badge">✓</span>}
              </div>

              <div className="rec-info">
                <div 
                  className="rec-name"
                  onClick={() => handleViewProfile(creator)}
                >
                  {creator.name}
                  <span className="badge">{creator.badge}</span>
                </div>
                <div className="rec-username">{creator.username}</div>
                
                {/* Category-specific info */}
                {activeCategory === 'mutuals' && 'mutualFriends' in creator && (
                  <div className="rec-meta">
                    {creator.mutualFriends} mutual friends
                  </div>
                )}
                {activeCategory === 'nearby' && 'location' in creator && (
                  <div className="rec-meta">
                    <MapPin size={12} /> {creator.location}
                  </div>
                )}
                {(activeCategory === 'topCreators' || activeCategory === 'topFollowed') && (
                  <div className="rec-meta">
                    {(creator.followers_count / 1000).toFixed(1)}K followers
                  </div>
                )}
              </div>

              <button
                className="rec-btn"
                onClick={() => handleFollowClick(creator)}
              >
                {following[creator.id] ? "✓ Following" : "+ Follow"}
              </button>
            </div>
          ))}
        </div>

        <button 
          className="view-all-btn"
          onClick={() => navigate('/explore')}
        >
          View All Recommendations
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;