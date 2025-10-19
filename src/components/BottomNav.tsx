// src/components/BottomNav.tsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import "../styles/app.scss";

export default function BottomTabNavigator() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await supabase.auth.signOut();
        resetAuth();
        navigate("/LoginScreen");
      } catch (error) {
        console.error("Sign out error:", error);
      }
    }
  };

  return (
    <div className="bottom-nav-layout">
      <Outlet />

      <nav className="bottom-nav">
        <NavLink to="/home" className="tab" end>
          🏠 <span>Home</span>
        </NavLink>
        <NavLink to="/marketplace" className="tab">
          🛍️ <span>Marketplace</span>
        </NavLink>
        <NavLink to="/mint" className="tab">
          ➕ <span>Mint</span>
        </NavLink>
        <NavLink to="/messages" className="tab">
          💬 <span>Messages</span>
        </NavLink>
        <NavLink to="/profile" className="tab">
          👤 <span>Profile</span>
        </NavLink>
        <button className="tab logout" onClick={handleSignOut}>
          🚪 <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
