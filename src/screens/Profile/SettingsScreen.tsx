import React from "react";
import { useNavigate } from "react-router-dom";
import AsyncStorage from "local-storage-fallback";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function SettingsScreen() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    try {
      await AsyncStorage.clear();
    } catch {
      // ignore
    }
    resetAuth();
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-container">
      <div className="profile-section">
        <h4 className="section-title">Settings</h4>

        <div className="card clickable" onClick={() => alert("Theme: Dark Mode coming soon 🌙")}>
          <div className="card-value">🌗 Toggle Dark Mode</div>
        </div>

        <div className="card clickable" onClick={() => alert("Notifications coming soon 🔔")}>
          <div className="card-value">🔔 Manage Notifications</div>
        </div>

        <div className="card clickable" onClick={() => alert("Opens privacy policy")}>
          <div className="card-value">📜 View Privacy Policy</div>
        </div>

        <button className="btn logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
