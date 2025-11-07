// src/components/BottomNav.tsx
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Sparkles, MessageCircle, User, LogOut } from "lucide-react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import "./BottomNav.scss";

export default function BottomTabNavigator() {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const navigate = useNavigate();
  const location = useLocation();

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

  const navItems = [
    { to: "/home", icon: Home, label: "Home", emoji: "🏠" },
    { to: "/marketplace", icon: ShoppingBag, label: "Market", emoji: "🛍️" },
    { to: "/nft-studio", icon: Sparkles, label: "Create", emoji: "✨" },
    { to: "/messages", icon: MessageCircle, label: "Messages", emoji: "💬" },
    { to: "/profile", icon: User, label: "Profile", emoji: "👤" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="bottom-nav-layout">
      <main className="main-content">
        <Outlet />
      </main>

      <nav className="bottom-nav-enhanced">
        <div className="nav-container">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`nav-item ${active ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  {active && <div className="glow-effect" />}
                  <Icon size={24} className="nav-icon" />
                  <span className="nav-emoji">{item.emoji}</span>
                </div>
                <span className="nav-label">{item.label}</span>
                {active && <div className="active-indicator" />}
              </NavLink>
            );
          })}

          <button onClick={handleSignOut} className="nav-item logout-item">
            <div className="nav-icon-wrapper">
              <LogOut size={24} className="nav-icon" />
              <span className="nav-emoji">🚪</span>
            </div>
            <span className="nav-label">Logout</span>
          </button>
        </div>

        {/* Floating indicator */}
        <div className="nav-background" />
      </nav>
    </div>
  );
}