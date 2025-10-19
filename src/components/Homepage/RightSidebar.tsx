// src/components/Homepage/RightSidebar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import { useAuthStore } from "../../stores/authStore";
import "./RightSidebar.scss";

// Dummy data for recommended creators
const RECOMMENDED_CREATORS = [
  {
    id: 1,
    name: "Maya Styles",
    username: "@mayastyles",
    avatar: "👗",
    bio: "Fashion meets the metaverse.",
    followers_count: 2300,
    following_count: 145,
    posts_count: 48,
    verified: true,
  },
  {
    id: 2,
    name: "Tech Fashion Co",
    username: "@techfashion",
    avatar: "👔",
    bio: "Innovating wearable tech trends.",
    followers_count: 1890,
    following_count: 80,
    posts_count: 60,
    verified: false,
  },
  {
    id: 3,
    name: "Crypto Couture",
    username: "@cryptocouture",
    avatar: "💎",
    bio: "Blockchain x Style revolution.",
    followers_count: 4120,
    following_count: 310,
    posts_count: 90,
    verified: true,
  },
];

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { setSelectedUser } = useUserStore();
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

  return (
    <aside className="right-sidebar">
      <div className="recommendations">
        <h3>Recommended For You</h3>
        {RECOMMENDED_CREATORS.map((creator) => (
          <div key={creator.id} className="recommendation-card">
            <div
              className="rec-avatar"
              onClick={() => handleViewProfile(creator)}
            >
              {creator.avatar}
            </div>
            <div className="rec-info">
              <div
                className="rec-name"
                onClick={() => handleViewProfile(creator)}
              >
                {creator.name}
              </div>
              <div className="rec-username">{creator.username}</div>
            </div>
            <button
              className={`rec-btn ${
                following[creator.id] ? "following" : ""
              }`}
              onClick={() => handleFollowClick(creator)}
            >
              {following[creator.id] ? "✓ Following" : "+ Follow"}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
