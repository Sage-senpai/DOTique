// src/components/Homepage/LeftSidebar.tsx
import React from 'react';
import './LeftSidebar.scss';

const TRENDING_TAGS = [
  { tag: '#FashionNFT', posts: '45.2K' },
  { tag: '#PolkadotArtists', posts: '32.1K' },
  { tag: '#NFTMinting', posts: '28.9K' },
  { tag: '#DigitalFashion', posts: '19.5K' },
];

const LeftSidebar: React.FC = () => {
  return (
    <aside className="left-sidebar">
      <nav className="sidebar-nav">
        <button className="nav-item active">🏠 Home</button>
        <button className="nav-item">🔍 Explore</button>
        <button className="nav-item">💬 Messages</button>
        <button className="nav-item">🔖 Bookmarks</button>
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

