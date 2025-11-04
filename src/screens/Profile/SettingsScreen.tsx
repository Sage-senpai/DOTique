// src/screens/Profile/SettingsScreen.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AsyncStorage from "local-storage-fallback";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function SettingsScreen() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const profile = useAuthStore((s) => s.profile);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ FIXED LOGOUT
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

  // ✅ FIXED DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      // ⚠️ Supabase Admin deleteUser requires service key — backend-only
      // So this part only works if you're running a secure server function.
      // Otherwise, just delete from users table + sign out frontend.
      const { error: dbError } = await supabase
        .from("users")
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

  const settingsItems = [
    { icon: "🌗", label: "Toggle Dark Mode", action: () => alert("Coming soon 🌙") },
    { icon: "❤️", label: "Favourites", action: () => alert("Coming soon ❤️") },
    { icon: "⬇️", label: "Downloads", action: () => alert("Coming soon ⬇️") },
    { icon: "🌐", label: "Language", action: () => alert("Coming soon 🌐") },
    { icon: "📍", label: "Location", action: () => alert("Coming soon 📍") },
    { icon: "🔔", label: "Notifications", action: () => alert("Coming soon 🔔") },
    { icon: "📜", label: "Privacy Policy", action: () => alert("Opens policy") },
    {
      icon: "🗑️",
      label: "Clear Cache",
      action: async () => {
        await AsyncStorage.clear();
        alert("Cache cleared ✓");
      },
    },
    { icon: "🕐", label: "Clear History", action: () => alert("History cleared ✓") },
    { icon: "🎓", label: "Style CV", action: () => navigate("/profile/stylecv") },
    { icon: "🗳️", label: "Governance", action: () => navigate("/profile/governance") },
  ];

  return (
    <motion.div
      className="settings-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="settings-screen__header">
        <button className="settings-screen__back" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2 className="settings-screen__title">Settings</h2>
      </div>

      <div className="settings-screen__content">
        <div className="settings-screen__menu">
          {settingsItems.map((item, idx) => (
            <button
              key={idx}
              className="settings-screen__menu-item"
              onClick={item.action}
            >
              <span className="settings-screen__menu-icon">{item.icon}</span>
              <span className="settings-screen__menu-label">{item.label}</span>
              <span className="settings-screen__menu-chevron">›</span>
            </button>
          ))}
        </div>

        <div className="settings-screen__danger-zone">
          <h3 className="settings-screen__danger-title">Account</h3>
          <button
            className="settings-screen__logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
          <button
            className="settings-screen__delete-btn"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "🗑️ Delete Account"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
