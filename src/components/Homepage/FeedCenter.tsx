// src/components/Homepage/FeedCenter.tsx
import React from 'react';
import PostCard from '../Posts/PostCard';
import './FeedCenter.scss';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  media?: Array<{
    type: string;
    url: string;
  }>;
  createdAt: Date;
  stats: {
    views: number;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
  userInteraction: {
    liked: boolean;
    saved: boolean;
    reposted: boolean;
  };
}

interface FeedCenterProps {
  posts: Post[];
}

const FeedCenter: React.FC<FeedCenterProps> = ({ posts }) => {
  return (
    <main className="feed-center">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
};

export default FeedCenter;