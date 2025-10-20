import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./FollowerScreen.scss";

interface UserCard {
  id: string;
  username: string;
  display_name: string;
  dotvatar_url?: string;
  verified?: boolean;
}

export default function FollowerScreen() {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"followers" | "following" | "mutual">("followers");
  const [followers, setFollowers] = useState<UserCard[]>([]);
  const [following, setFollowing] = useState<UserCard[]>([]);
  const [mutual, setMutual] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for development preview
  const dummyUsers: UserCard[] = [
    {
      id: "1",
      username: "ayetu_dev",
      display_name: "Ayetu Dev",
      dotvatar_url: "/dummy-avatar1.png",
      verified: true,
    },
    {
      id: "2",
      username: "sui_network",
      display_name: "Sui Network",
      dotvatar_url: "/dummy-avatar2.png",
    },
    {
      id: "3",
      username: "core_labs",
      display_name: "Core Labs",
      dotvatar_url: "/dummy-avatar3.png",
      verified: true,
    },
  ];

  // Fetch follower/following/mutual lists
  useEffect(() => {
    if (profile?.id) {
      fetchFollowData(profile.id);
    } else {
      // show dummy preview for dev
      setFollowers(dummyUsers);
      setFollowing(dummyUsers.slice(0, 2));
      setMutual(dummyUsers.slice(0, 1));
      setLoading(false);
    }
  }, [profile?.id]);

  // Refetch when returning from navigation (simulate live update)
  useEffect(() => {
    const handleFocus = () => {
      if (profile?.id) fetchFollowData(profile.id);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [profile?.id]);

  const fetchFollowData = async (userId: string) => {
    try {
      setLoading(true);

      // followers = users who follow me
      const { data: followerLinks, error: followersError } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("following_id", userId);
      if (followersError) throw followersError;

      const followerIds = followerLinks.map((f) => f.follower_id);
      const { data: followerUsers } = await supabase
        .from("users")
        .select("id, username, display_name, dotvatar_url, verified")
        .in("id", followerIds);

      // following = users I follow
      const { data: followingLinks, error: followingError } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId);
      if (followingError) throw followingError;

      const followingIds = followingLinks.map((f) => f.following_id);
      const { data: followingUsers } = await supabase
        .from("users")
        .select("id, username, display_name, dotvatar_url, verified")
        .in("id", followingIds);

      // mutual = intersection of followers and following
      const mutualIds = followerIds.filter((fid) => followingIds.includes(fid));
      const mutualUsers = (followerUsers || []).filter((u) => mutualIds.includes(u.id));

      setFollowers(followerUsers || []);
      setFollowing(followingUsers || []);
      setMutual(mutualUsers || []);
    } catch (err) {
      console.error("❌ Error fetching follow data:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderUserCard = (user: UserCard) => (
    <motion.div
      key={user.id}
      className="follower-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={user.dotvatar_url || "/default-avatar.png"}
        alt={user.display_name}
        className="follower-card__avatar"
      />
      <div className="follower-card__info">
        <div className="follower-card__name">
          {user.display_name}
          {user.verified && <span className="follower-card__badge">✔️</span>}
        </div>
        <div className="follower-card__username">@{user.username}</div>
      </div>
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
        <button onClick={() => window.history.back()} className="followers-screen__back">
          ←
        </button>
        <h2 className="followers-screen__title">Connections</h2>
      </div>

      <div className="followers-screen__tabs">
        <button
          className={`followers-screen__tab ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => setActiveTab("followers")}
        >
          Followers ({followers.length})
        </button>
        <button
          className={`followers-screen__tab ${activeTab === "following" ? "active" : ""}`}
          onClick={() => setActiveTab("following")}
        >
          Following ({following.length})
        </button>
        <button
          className={`followers-screen__tab ${activeTab === "mutual" ? "active" : ""}`}
          onClick={() => setActiveTab("mutual")}
        >
          Mutual ({mutual.length})
        </button>
      </div>

      <div className="followers-screen__list">
        {loading ? (
          <p className="followers-screen__loading">Loading...</p>
        ) : activeList.length > 0 ? (
          activeList.map((user) => renderUserCard(user))
        ) : (
          <p className="followers-screen__empty">No users found.</p>
        )}
      </div>
    </motion.div>
  );
}
