export interface Post {
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
    type: 'image' | 'video' | 'carousel';
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

export interface Notification {
  id: string;
  type: 'like' | 'follow' | 'comment' | 'repost' | 'purchase' | 'milestone';
  actor: {
    id: string;
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface NFTMintData {
  title: string;
  description: string;
  image: File;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  royalty: number;
}