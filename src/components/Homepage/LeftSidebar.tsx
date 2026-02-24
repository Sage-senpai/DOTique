import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Bookmark,
  Compass,
  Home,
  MessageCircle,
  Minus,
  TrendingUp,
} from "lucide-react";
import "./Leftsidebar.scss";

type TrendDirection = "up" | "stable";

type TrendingItem = {
  tag: string;
  posts: string;
  engagement: string;
  trend: TrendDirection;
  nft: {
    name: string;
    image: string;
  };
};

const TRENDING_DATA: TrendingItem[] = [
  {
    tag: "#CyberFashion",
    posts: "128.5K",
    engagement: "2.3M",
    trend: "up",
    nft: {
      name: "Neon Jacket #42",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100",
    },
  },
  {
    tag: "#PolkadotArtists",
    posts: "89.2K",
    engagement: "1.8M",
    trend: "up",
    nft: {
      name: "Digital Crown #7",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100",
    },
  },
  {
    tag: "#MetaverseStyle",
    posts: "67.4K",
    engagement: "1.2M",
    trend: "up",
    nft: {
      name: "Holographic Boots",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100",
    },
  },
  {
    tag: "#NFTMinting",
    posts: "54.8K",
    engagement: "890K",
    trend: "stable",
    nft: {
      name: "Tech Gloves v2",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100",
    },
  },
  {
    tag: "#Web3Fashion",
    posts: "43.1K",
    engagement: "720K",
    trend: "up",
    nft: {
      name: "Quantum Backpack",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100",
    },
  },
];

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
  ];

  const handleTrendClick = (tag: string) => {
    navigate(`/explore?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <aside className="left-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="trending-section">
        <div className="section-header">
          <TrendingUp size={18} className="header-icon" />
          <h3>Trending Now</h3>
        </div>

        <div className="trending-list">
          {TRENDING_DATA.map((item, index) => (
            <div
              key={item.tag}
              className="trending-item"
              onClick={() => handleTrendClick(item.tag)}
            >
              <div className="trending-content">
                <div className="trending-main">
                  <div className="trend-tag-wrapper">
                    <span className="trend-tag">{item.tag}</span>
                    <span className={`trend-indicator ${item.trend}`}>
                      {item.trend === "up" ? <ArrowUpRight size={12} /> : <Minus size={12} />}
                    </span>
                  </div>
                  <div className="trend-stats">
                    <span className="trend-posts">{item.posts} posts</span>
                    <span className="trend-separator">|</span>
                    <span className="trend-engagement">{item.engagement} engagements</span>
                  </div>
                </div>

                <div className="trending-nft">
                  <img src={item.nft.image} alt={item.nft.name} className="nft-thumb" />
                  <span className="nft-name">{item.nft.name}</span>
                </div>
              </div>

              <div className="trending-rank">#{index + 1}</div>
            </div>
          ))}
        </div>

        <button className="view-more-btn" onClick={() => navigate("/explore")}>
          View All Trends
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
