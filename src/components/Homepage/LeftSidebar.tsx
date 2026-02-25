import React, { useEffect, useState } from "react";
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
import { supabase } from "../../services/supabase";
import "./Leftsidebar.scss";

type TrendDirection = "up" | "stable";

type TrendingItem = {
  tag: string;
  posts: string;
  trend: TrendDirection;
  nftImage: string;
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100",
];

const FALLBACK_TRENDS: TrendingItem[] = [
  { tag: "#CyberFashion", posts: "128.5K", trend: "up", nftImage: FALLBACK_IMAGES[0] },
  { tag: "#PolkadotArtists", posts: "89.2K", trend: "up", nftImage: FALLBACK_IMAGES[1] },
  { tag: "#MetaverseStyle", posts: "67.4K", trend: "up", nftImage: FALLBACK_IMAGES[2] },
  { tag: "#NFTMinting", posts: "54.8K", trend: "stable", nftImage: FALLBACK_IMAGES[3] },
  { tag: "#Web3Fashion", posts: "43.1K", trend: "up", nftImage: FALLBACK_IMAGES[4] },
];

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>(FALLBACK_TRENDS);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("content, tags")
          .order("created_at", { ascending: false })
          .limit(300);

        if (error || !data?.length) return;

        // Count hashtag frequency from the tags[] column + inline hashtags in content
        const tagCounts: Record<string, number> = {};
        for (const post of data) {
          if (Array.isArray(post.tags)) {
            for (const t of post.tags as string[]) {
              const key = t.startsWith("#") ? t : `#${t}`;
              tagCounts[key] = (tagCounts[key] ?? 0) + 1;
            }
          }
          const inContent = (post.content as string | null)?.match(/#[\w]+/g) ?? [];
          for (const t of inContent) {
            tagCounts[t] = (tagCounts[t] ?? 0) + 1;
          }
        }

        const sorted = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        if (!sorted.length) return;

        setTrendingItems(
          sorted.map(([tag, count], i) => ({
            tag,
            posts: count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count),
            trend: (i < 3 ? "up" : "stable") as TrendDirection,
            nftImage: FALLBACK_IMAGES[i] ?? FALLBACK_IMAGES[0],
          }))
        );
      } catch {
        // keep fallback — network down or table doesn't exist yet
      }
    };

    void fetchTrending();
  }, []);

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
  ];

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
          {trendingItems.map((item, index) => (
            <div
              key={item.tag}
              className="trending-item"
              onClick={() =>
                navigate(`/explore?tag=${encodeURIComponent(item.tag)}`)
              }
            >
              <div className="trending-content">
                <div className="trending-main">
                  <div className="trend-tag-wrapper">
                    <span className="trend-tag">{item.tag}</span>
                    <span className={`trend-indicator ${item.trend}`}>
                      {item.trend === "up" ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <Minus size={12} />
                      )}
                    </span>
                  </div>
                  <div className="trend-stats">
                    <span className="trend-posts">{item.posts} posts</span>
                  </div>
                </div>

                <div className="trending-nft">
                  <img src={item.nftImage} alt={item.tag} className="nft-thumb" />
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
