// src/components/Homepage/RightSidebar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, MapPin, UserPlus } from "lucide-react";
import { useUserStore } from "../../stores/userStore";
import { socialService } from "../../services/socialService";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./RightSidebar.scss";

type RecommendationType = "topCreators" | "mutuals" | "topFollowed" | "nearby";

interface ProfileRow {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  followers_count: number | null;
  is_verified: boolean | null;
}

const CATEGORY_INFO: Record<
  RecommendationType,
  { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }
> = {
  topCreators: { icon: TrendingUp, label: "Top Creators" },
  mutuals: { icon: Users, label: "People You May Know" },
  topFollowed: { icon: UserPlus, label: "Most Followed" },
  nearby: { icon: MapPin, label: "Nearby Creators" },
};

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100";

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile: currentUser } = useAuthStore();
  const { setSelectedUser } = useUserStore();
  const [activeCategory, setActiveCategory] =
    useState<RecommendationType>("topCreators");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "id, username, display_name, avatar_url, bio, followers_count, is_verified"
          )
          .neq("id", currentUser?.id ?? "")
          .order("followers_count", { ascending: false })
          .limit(12);

        if (!error && data?.length) {
          setProfiles(data as ProfileRow[]);
        }
      } catch {
        // Sidebar silently stays empty on network error
      } finally {
        setLoading(false);
      }
    };

    void fetchProfiles();
  }, [currentUser?.id]);

  const getDisplayProfiles = (): ProfileRow[] => {
    switch (activeCategory) {
      case "topCreators":
        return profiles.slice(0, 3);
      case "topFollowed":
        return profiles.slice(0, 4);
      case "mutuals":
        return profiles.slice(3, 6);
      case "nearby":
        return profiles.slice(6, 9);
      default:
        return profiles.slice(0, 3);
    }
  };

  const handleFollowClick = async (profile: ProfileRow) => {
    if (!currentUser?.id) return;
    try {
      const result = await socialService.toggleFollow(
        currentUser.id,
        profile.id
      );
      setFollowing((prev) => ({ ...prev, [profile.id]: result.following }));
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const handleViewProfile = (profile: ProfileRow) => {
    setSelectedUser({
      id: profile.id,
      username: profile.username ?? "",
      display_name: profile.display_name ?? "",
      avatar: profile.avatar_url ?? FALLBACK_AVATAR,
      bio: profile.bio ?? "",
      followers_count: profile.followers_count ?? 0,
      following_count: 0,
      posts_count: 0,
      posts: [],
      reposts: [],
    });
    navigate("/profile/other");
  };

  const currentData = getDisplayProfiles();
  const CategoryIcon = CATEGORY_INFO[activeCategory].icon;

  return (
    <aside className="right-sidebar">
      <div className="recommendations">
        {/* Category Tabs */}
        <div className="category-tabs">
          {(Object.keys(CATEGORY_INFO) as RecommendationType[]).map(
            (category) => {
              const Icon = CATEGORY_INFO[category].icon;
              return (
                <button
                  key={category}
                  className={`category-tab ${activeCategory === category ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                  title={CATEGORY_INFO[category].label}
                >
                  <Icon size={18} />
                </button>
              );
            }
          )}
        </div>

        {/* Header */}
        <div className="recommendations-header">
          <CategoryIcon size={18} className="header-icon" />
          <h3>{CATEGORY_INFO[activeCategory].label}</h3>
        </div>

        {/* Profile List */}
        <div className="recommendations-list">
          {loading ? (
            <div className="rec-loading">Loading…</div>
          ) : currentData.length === 0 ? (
            <div className="rec-empty">No suggestions yet</div>
          ) : (
            currentData.map((profile) => {
              const displayName =
                profile.display_name ?? profile.username ?? "Anonymous";
              const handle = profile.username ? `@${profile.username}` : "";
              const avatarUrl = profile.avatar_url ?? FALLBACK_AVATAR;
              const fc = profile.followers_count ?? 0;
              const followersLabel =
                fc >= 1000 ? `${(fc / 1000).toFixed(1)}K` : String(fc);
              const isFollowing = following[profile.id] ?? false;

              return (
                <div key={profile.id} className="recommendation-card">
                  <div
                    className="rec-avatar"
                    onClick={() => handleViewProfile(profile)}
                  >
                    <img src={avatarUrl} alt={displayName} />
                    {profile.is_verified && (
                      <span className="verified-badge">✓</span>
                    )}
                  </div>

                  <div className="rec-info">
                    <div
                      className="rec-name"
                      onClick={() => handleViewProfile(profile)}
                    >
                      {displayName}
                    </div>
                    <div className="rec-username">{handle}</div>
                    <div className="rec-meta">{followersLabel} followers</div>
                  </div>

                  <button
                    className={`rec-btn${isFollowing ? " following" : ""}`}
                    onClick={() => handleFollowClick(profile)}
                  >
                    {isFollowing ? "✓ Following" : "+ Follow"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/explore")}
        >
          View All Recommendations
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
