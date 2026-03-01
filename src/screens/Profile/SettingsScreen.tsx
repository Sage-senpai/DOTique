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
  Lock,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { clearAuthArtifacts, clearClientCache } from "../../services/preferencesService";
import { useTheme } from "../../contexts/ThemeContext";
import "./SettingsScreen.scss";

type SettingsItem = {
  icon: JSX.Element;
  label: string;
  action: () => void | Promise<void>;
  toggle?: boolean;
  meta?: string;
};

type SettingsGroup = {
  title: string;
  icon: JSX.Element;
  items: SettingsItem[];
};

export default function SettingsScreen() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const profile = useAuthStore((s) => s.profile);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { mode, resolvedTheme, setMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      await clearAuthArtifacts();
      resetAuth();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      window.alert("Logout failed. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "WARNING: This action cannot be undone.\n\nAre you sure you want to delete your account?"
    );
    if (!confirmed) return;

    const doubleCheck = window.prompt('Type "DELETE" to confirm account deletion:');
    if (doubleCheck !== "DELETE") {
      window.alert("Account deletion cancelled.");
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
      await clearAuthArtifacts();
      resetAuth();

      window.alert("Account deleted successfully.");
      navigate("/login", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete account";
      console.error("Delete account error:", err);
      window.alert(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleDarkMode = () => {
    if (mode === "system") {
      setMode(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }
    toggleTheme();
  };

  const handleToggleSystemMode = () => {
    if (mode === "system") {
      setMode(resolvedTheme);
      return;
    }
    setMode("system");
  };

  const settingsGroups: Record<string, SettingsGroup> = {
    appearance: {
      title: "Appearance",
      icon: <Sun size={20} />,
      items: [
        {
          icon: <Moon size={18} />,
          label: "Dark Mode",
          action: handleToggleDarkMode,
          toggle: resolvedTheme === "dark",
          meta: mode === "system" ? "System controlled" : "Manual",
        },
        {
          icon: <Sun size={18} />,
          label: "Use System Theme",
          action: handleToggleSystemMode,
          toggle: mode === "system",
          meta: `Current: ${resolvedTheme}`,
        },
      ],
    },
    content: {
      title: "Content and Media",
      icon: <Heart size={20} />,
      items: [
        { icon: <Heart size={18} />, label: "Favourites", action: () => navigate("/bookmarks") },
        { icon: <Download size={18} />, label: "Downloads", action: () => window.alert("Coming soon") },
      ],
    },
    preferences: {
      title: "Preferences",
      icon: <Globe size={20} />,
      items: [
        { icon: <Globe size={18} />, label: "Language", action: () => window.alert("Coming soon") },
        { icon: <MapPin size={18} />, label: "Location Services", action: () => window.alert("Coming soon") },
        { icon: <Bell size={18} />, label: "Notifications", action: () => navigate("/notifications") },
      ],
    },
    legal: {
      title: "Legal and Privacy",
      icon: <Shield size={20} />,
      items: [
        { icon: <FileText size={18} />, label: "Privacy Policy", action: () => window.open("/privacy", "_blank") },
        { icon: <FileText size={18} />, label: "Terms of Service", action: () => window.open("/terms", "_blank") },
        { icon: <Lock size={18} />, label: "Data and Privacy", action: () => navigate("/settings") },
      ],
    },
    data: {
      title: "Data Management",
      icon: <Trash2 size={20} />,
      items: [
        {
          icon: <Trash2 size={18} />,
          label: "Clear Cache",
          action: async () => {
            await clearClientCache();
            window.alert("Client cache cleared.");
          },
        },
        { icon: <Clock size={18} />, label: "Clear History", action: () => window.alert("History cleared.") },
      ],
    },
    features: {
      title: "Platform Features",
      icon: <GraduationCap size={20} />,
      items: [
        { icon: <GraduationCap size={18} />, label: "Style CV", action: () => navigate("/profile/stylecv") },
        { icon: <Vote size={18} />, label: "Governance", action: () => navigate("/profile/governance") },
      ],
    },
  };

  return (
    <motion.div
      className="settings-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="settings-screen__header">
        <button className="settings-screen__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="settings-screen__title">Settings</h2>
        <div className="header-glow" />
      </div>

      <div className="settings-screen__profile-summary">
        <div className="profile-avatar">
          {profile?.dotvatar_url ? (
            <img src={profile.dotvatar_url} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">DT</div>
          )}
          <div className="avatar-ring" />
        </div>
        <div className="profile-info">
          <h3>{profile?.display_name || "User"}</h3>
          <p>@{profile?.username || "dotique"}</p>
        </div>
      </div>

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
                    {item.meta && <span className="settings-item__meta">{item.meta}</span>}
                  </div>
                  {item.toggle !== undefined ? (
                    <div className={`toggle-switch ${item.toggle ? "active" : ""}`}>
                      <div className="toggle-slider" />
                    </div>
                  ) : (
                    <span className="settings-item__chevron">&gt;</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

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
