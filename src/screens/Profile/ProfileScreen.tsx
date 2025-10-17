// src/screens/Profile/ProfileScreen.tsx
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = useCallback(async () => {
    if (!profile?.auth_uid) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_uid", profile.auth_uid)
        .single();
      if (error) throw error;
      if (data) setProfile(data);
    } catch (err) {
      console.error("Error refreshing profile:", err);
    } finally {
      setLoading(false);
    }
  }, [profile?.auth_uid, setProfile]);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleShareProfile = async () => {
    try {
      const message = `Check out ${profile?.display_name || "my"} DOTique fashion profile 👗✨\n\nJoin the Web3 fashion revolution on DOTique!`;
      if ((navigator as any).share) {
        await (navigator as any).share({ text: message });
      } else {
        window.prompt("Copy profile share text:", message);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  // Menu items for main profile - keep governance, CV, and wardrobe here
  const menuItems = [
    { icon: "👗", label: "Wardrobe", action: () => navigate("/profile/wardrobe") },
    { icon: "🎓", label: "Style CV", action: () => navigate("/profile/stylecv") },
    { icon: "🗳️", label: "Governance", action: () => navigate("/profile/governance") },
  ];

  return (
    <motion.div
      className="profile-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="profile-screen__header">
        {loading ? (
          <div className="profile-screen__spinner" />
        ) : profile?.dotvatar_url ? (
          <img
            src={profile.dotvatar_url}
            alt="avatar"
            className="profile-screen__avatar"
          />
        ) : (
          <div className="profile-screen__avatar-placeholder">🪞</div>
        )}

        <h2 className="profile-screen__name">
          {profile?.display_name || profile?.username || "User"}
        </h2>
        <p className="profile-screen__username">
          @{profile?.username || "username"}
        </p>

        <div className="profile-screen__buttons">
          <button
            className="profile-screen__btn-primary"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
          <button
            className="profile-screen__btn-secondary"
            onClick={handleShareProfile}
          >
            Share
          </button>
          <button
            className="profile-screen__btn-icon"
            onClick={() => navigate("/settings")}
          >
            ⚙️
          </button>
        </div>
      </div>

      <nav className="profile-screen__menu">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="profile-screen__menu-item"
            onClick={item.action}
          >
            <span className="profile-screen__menu-icon">{item.icon}</span>
            <span className="profile-screen__menu-label">{item.label}</span>
            <span className="profile-screen__menu-chevron">›</span>
          </button>
        ))}
      </nav>

      <div className="profile-screen__nav-bottom">
        <button className="profile-screen__nav-btn">🏠</button>
        <button className="profile-screen__nav-btn">💬</button>
        <button className="profile-screen__nav-btn profile-screen__nav-btn--active">
          👤
        </button>
      </div>
    </motion.div>
  );
}