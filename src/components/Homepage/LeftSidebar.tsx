// src/components/Homepage/LeftSidebar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSidebar.scss";

const TRENDING_TAGS = [
  { tag: "#FashionNFT", posts: "45.2K" },
  { tag: "#PolkadotArtists", posts: "32.1K" },
  { tag: "#NFTMinting", posts: "28.9K" },
  { tag: "#DigitalFashion", posts: "19.5K" },
];

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: "🏠", label: "Home", path: "/home" },
    { icon: "🔍", label: "Explore", path: "/explore" },
    { icon: "💬", label: "Messages", path: "/messages" },
    { icon: "🔖", label: "Bookmarks", path: "/bookmarks" },
  ];

  return (
    <aside className="left-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={`nav-item ${
              window.location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <div className="trending-section">
        <h3>Trending Now</h3>
        {TRENDING_TAGS.map((item, i) => (
          <div key={i} className="trending-item">
            <div className="trend-tag">{item.tag}</div>
            <div className="trend-posts">{item.posts} posts</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
