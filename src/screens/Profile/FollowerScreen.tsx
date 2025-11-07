// src/screens/Profile/FollowerScreen.tsx - ENHANCED WITH LIVE UPDATES
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { supabase } from "../../services/supabase";
import "./FollowerScreen.scss";

interface UserCard {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  dotvatar_url?: string;
  bio?: string;
  verified?: boolean;
  isFollowing?: boolean;
}

export default function FollowerScreen() {
  const { profile } = useAuthStore();
  const { setSelectedUser } = useUserStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following" | "mutual">("followers");
  const [followers, setFollowers] = useState<UserCard[]>([]);
  const [following, setFollowing] = useState<UserCard[]>([]);
  const [mutual, setMutual] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch follower/following/mutual lists
  useEffect(() => {
    if (profile?.id) {
      fetchFollowData(profile.id);
      subscribeToFollowChanges(profile.id);
    }
  }, [profile?.id]);

  // Subscribe to real-time follow changes
  const subscribeToFollowChanges = (userId: string) => {
    const channel = supabase
      .channel('follow-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'follows',
          filter: `follower_id=eq.${userId},following_id=eq.${userId}`,
        },
        (payload) => {
          console.log('🔄 Follow change detected:', payload);
          fetchFollowData(userId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchFollowData = async (userId: string) => {
    try {
      setLoading(true);

      // Fetch followers = users who follow me
      const { data: followerLinks, error: followersError } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("following_id", userId);

      if (followersError) throw followersError;

      const followerIds = followerLinks?.map((f) => f.follower_id) || [];

      // Fetch follower profiles
      let followerUsers: UserCard[] = [];
      if (followerIds.length > 0) {
        const { data } = await supabase
          .from("profiles")
          .select("id, username, display_name, avatar_url, bio, verified")
          .in("id", followerIds);
        followerUsers = data || [];
      }

      // Fetch following = users I follow
      const { data: followingLinks, error: followingError } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId);

      if (followingError) throw followingError;

      const followingIds = followingLinks?.map((f) => f.following_id) || [];

      // Fetch following profiles
      let followingUsers: UserCard[] = [];
      if (followingIds.length > 0) {
        const { data } = await supabase
          .from("profiles")
          .select("id, username, display_name, avatar_url, bio, verified")
          .in("id", followingIds);
        followingUsers = (data || []).map(user => ({
          ...user,
          isFollowing: true
        }));
      }

      // Calculate mutual = intersection of followers and following
      const mutualIds = followerIds.filter((fid) => followingIds.includes(fid));
      const mutualUsers = followerUsers
        .filter((u) => mutualIds.includes(u.id))
        .map(user => ({ ...user, isFollowing: true }));

      // Check which followers we're following back
      const enrichedFollowers = followerUsers.map(user => ({
        ...user,
        isFollowing: followingIds.includes(user.id)
      }));

      setFollowers(enrichedFollowers);
      setFollowing(followingUsers);
      setMutual(mutualUsers);
    } catch (err) {
      console.error("❌ Error fetching follow data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (targetUserId: string) => {
    if (!profile?.id) return;

    try {
      // Check if already following
      const { data: existingFollow } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", profile.id)
        .eq("following_id", targetUserId)
        .maybeSingle();

      if (existingFollow) {
        // Unfollow
        await supabase
          .from("follows")
          .delete()
          .eq("follower_id", profile.id)
          .eq("following_id", targetUserId);
      } else {
        // Follow
        await supabase
          .from("follows")
          .insert({ follower_id: profile.id, following_id: targetUserId });
      }

      // Refresh data
      fetchFollowData(profile.id);
    } catch (error) {
      console.error("❌ Follow toggle error:", error);
    }
  };

  const handleViewProfile = (user: UserCard) => {
    setSelectedUser({
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.avatar_url || user.dotvatar_url || "👤",
      bio: user.bio || "",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      verified: user.verified || false,
    });
    navigate("/profile/other");
  };

  const renderUserCard = (user: UserCard) => (
    <motion.div
      key={user.id}
      className="follower-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => handleViewProfile(user)}
    >
      <div className="follower-card__avatar-wrapper">
        {user.avatar_url || user.dotvatar_url ? (
          <img
            src={user.avatar_url || user.dotvatar_url}
            alt={user.display_name}
            className="follower-card__avatar"
          />
        ) : (
          <div className="follower-card__avatar-placeholder">
            {user.display_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="follower-card__info">
        <div className="follower-card__name">
          {user.display_name}
          {user.verified && <span className="follower-card__badge">✔️</span>}
        </div>
        <div className="follower-card__username">@{user.username}</div>
        {user.bio && <div className="follower-card__bio">{user.bio}</div>}
      </div>

      {user.id !== profile?.id && (
        <button
          className={`follower-card__action ${user.isFollowing ? "following" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleFollowToggle(user.id);
          }}
        >
          {user.isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </motion.div>
  );

  const activeList =
    activeTab === "followers"
      ? followers
      : activeTab === "following"
      ? following
      : mutual;

  return (
    <motion.div
      className="followers-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="followers-screen__header">
        <button onClick={() => navigate(-1)} className="followers-screen__back">
          ←
        </button>
        <h2 className="followers-screen__title">Connections</h2>
      </div>

      <div className="followers-screen__tabs">
        <button
          className={`followers-screen__tab ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => setActiveTab("followers")}
        >
          <span className="tab-label">Followers</span>
          <span className="tab-count">{followers.length}</span>
        </button>
        <button
          className={`followers-screen__tab ${activeTab === "following" ? "active" : ""}`}
          onClick={() => setActiveTab("following")}
        >
          <span className="tab-label">Following</span>
          <span className="tab-count">{following.length}</span>
        </button>
        <button
          className={`followers-screen__tab ${activeTab === "mutual" ? "active" : ""}`}
          onClick={() => setActiveTab("mutual")}
        >
          <span className="tab-label">Mutual</span>
          <span className="tab-count">{mutual.length}</span>
        </button>
      </div>

      <div className="followers-screen__list">
        {loading ? (
          <div className="followers-screen__loading">
            <div className="spinner"></div>
            <p>Loading connections...</p>
          </div>
        ) : activeList.length > 0 ? (
          activeList.map((user) => renderUserCard(user))
        ) : (
          <div className="followers-screen__empty">
            <p className="empty-icon">👥</p>
            <p className="empty-text">
              {activeTab === "followers" && "No followers yet"}
              {activeTab === "following" && "Not following anyone yet"}
              {activeTab === "mutual" && "No mutual connections yet"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}