// src/components/Homepage/RightSidebar.tsx
import React from 'react';
import './RightSidebar.scss';

const RECOMMENDED_CREATORS = [
  { name: 'Maya Styles', username: '@mayastyles', avatar: '👗' },
  { name: 'Tech Fashion Co', username: '@techfashion', avatar: '👔' },
  { name: 'Crypto Couture', username: '@cryptocouture', avatar: '💎' },
];

const RightSidebar: React.FC = () => {
  return (
    <aside className="right-sidebar">
      <div className="recommendations">
        <h3>Recommended For You</h3>
        {RECOMMENDED_CREATORS.map((creator, i) => (
          <div key={i} className="recommendation-card">
            <div className="rec-avatar">{creator.avatar}</div>
            <div className="rec-info">
              <div className="rec-name">{creator.name}</div>
              <div className="rec-username">{creator.username}</div>
            </div>
            <button className="rec-btn">Follow</button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;