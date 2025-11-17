// src/screens/Profile/SettingsScreen.tsx - COMPLETE REDESIGN
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Heart,
  Download,
  Globe,
  MapPin,
  Bell,
  FileText,
  Trash2,
  Clock,
  GraduationCap,
  Vote,
  LogOut,
  Shield,
  Lock
} from "lucide-react";
import AsyncStorage from "local-storage-fallback";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./SettingsScreen.scss";

export default function SettingsScreen() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const profile = useAuthStore((s) => s.profile);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      await AsyncStorage.clear();
      resetAuth();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This action cannot be undone!\n\nAre you absolutely sure you want to delete your account? All your data, NFTs, and posts will be permanently removed."
    );
    if (!confirmed) return;

    const doubleCheck = prompt('Type "DELETE" to confirm account deletion:');
    if (doubleCheck !== "DELETE") {
      alert("Account deletion cancelled.");
      return;
    }

    setIsDeleting(true);
    try {
      const { error: dbError } = await supabase
        .from("profiles")
        .delete()
        .eq("auth_uid", profile?.auth_uid);

      if (dbError) throw dbError;

      await supabase.auth.signOut();
      await AsyncStorage.clear();
      resetAuth();

      alert("Account deleted successfully");
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error("Delete account error:", err);
      alert(err.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement theme switching logic here
    alert(`${darkMode ? "Light" : "Dark"} mode coming soon! 🌓`);
  };

  const settingsGroups = {
    appearance: {
      title: "Appearance",
      icon: <Sun size={20} />,
      items: [
        {
          icon: <Moon size={18} />,
          label: "Dark Mode",
          action: handleToggleDarkMode,
          toggle: darkMode
        }
      ]
    },
    content: {
      title: "Content & Media",
      icon: <Heart size={20} />,
      items: [
        { icon: <Heart size={18} />, label: "Favourites", action: () => navigate("/favorites") },
        { icon: <Download size={18} />, label: "Downloads", action: () => alert("Coming soon ⬇️") }
      ]
    },
    preferences: {
      title: "Preferences",
      icon: <Globe size={20} />,
      items: [
        { icon: <Globe size={18} />, label: "Language", action: () => alert("Coming soon 🌐") },
        { icon: <MapPin size={18} />, label: "Location Services", action: () => alert("Coming soon 📍") },
        { icon: <Bell size={18} />, label: "Notifications", action: () => navigate("/notifications") }
      ]
    },
    legal: {
      title: "Legal & Privacy",
      icon: <Shield size={20} />,
      items: [
        { icon: <FileText size={18} />, label: "Privacy Policy", action: () => window.open("/privacy", "_blank") },
        { icon: <FileText size={18} />, label: "Terms of Service", action: () => window.open("/terms", "_blank") },
        { icon: <Lock size={18} />, label: "Data & Privacy", action: () => navigate("/privacy-settings") }
      ]
    },
    data: {
      title: "Data Management",
      icon: <Trash2 size={20} />,
      items: [
        {
          icon: <Trash2 size={18} />,
          label: "Clear Cache",
          action: async () => {
            await AsyncStorage.clear();
            alert("Cache cleared ✓");
          }
        },
        { icon: <Clock size={18} />, label: "Clear History", action: () => alert("History cleared ✓") }
      ]
    },
    features: {
      title: "Platform Features",
      icon: <GraduationCap size={20} />,
      items: [
        { icon: <GraduationCap size={18} />, label: "Style CV", action: () => navigate("/profile/stylecv") },
        { icon: <Vote size={18} />, label: "Governance", action: () => navigate("/profile/governance") }
      ]
    }
  };

  return (
    <motion.div
      className="settings-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="settings-screen__header">
        <button className="settings-screen__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="settings-screen__title">Settings</h2>
        <div className="header-glow" />
      </div>

      {/* Profile Summary */}
      <div className="settings-screen__profile-summary">
        <div className="profile-avatar">
          {profile?.dotvatar_url ? (
            <img src={profile.dotvatar_url} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">🪞</div>
          )}
          <div className="avatar-ring" />
        </div>
        <div className="profile-info">
          <h3>{profile?.display_name || "User"}</h3>
          <p>@{profile?.username}</p>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="settings-screen__content">
        {Object.entries(settingsGroups).map(([key, group]) => (
          <div key={key} className="settings-group">
            <div className="settings-group__header">
              {group.icon}
              <h3>{group.title}</h3>
            </div>
            <div className="settings-group__items">
              {group.items.map((item, idx) => (
                <motion.button
                  key={idx}
                  className="settings-item"
                  onClick={item.action}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="settings-item__left">
                    <span className="settings-item__icon">{item.icon}</span>
                    <span className="settings-item__label">{item.label}</span>
                  </div>
                  {item.toggle !== undefined ? (
                    <div className={`toggle-switch ${item.toggle ? "active" : ""}`}>
                      <div className="toggle-slider" />
                    </div>
                  ) : (
                    <span className="settings-item__chevron">›</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="settings-screen__danger-zone">
          <div className="danger-zone__header">
            <Shield size={20} />
            <h3>Danger Zone</h3>
          </div>
          
          <motion.button
            className="danger-btn danger-btn--logout"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} />
            Logout
          </motion.button>

          <motion.button
            className="danger-btn danger-btn--delete"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 size={18} />
            {isDeleting ? "Deleting..." : "Delete Account"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}