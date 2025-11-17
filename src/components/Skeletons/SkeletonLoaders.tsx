// src/components/Skeletons/SkeletonLoaders.tsx
import React from 'react';
import './SkeletonLoaders.scss';

// Post Card Skeleton
export const PostSkeleton = () => (
  <div className="skeleton-post">
    <div className="skeleton-post__header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-post__info">
        <div className="skeleton-line skeleton-line--name"></div>
        <div className="skeleton-line skeleton-line--username"></div>
      </div>
    </div>
    <div className="skeleton-post__content">
      <div className="skeleton-line skeleton-line--text"></div>
      <div className="skeleton-line skeleton-line--text-short"></div>
    </div>
    <div className="skeleton-post__media"></div>
    <div className="skeleton-post__actions">
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
    </div>
  </div>
);

// NFT Card Skeleton
export const NFTSkeleton = () => (
  <div className="skeleton-nft">
    <div className="skeleton-nft__image"></div>
    <div className="skeleton-nft__content">
      <div className="skeleton-line skeleton-line--title"></div>
      <div className="skeleton-line skeleton-line--username"></div>
      <div className="skeleton-line skeleton-line--price"></div>
    </div>
  </div>
);

// Community Card Skeleton
export const CommunitySkeleton = () => (
  <div className="skeleton-community">
    <div className="skeleton-community__cover"></div>
    <div className="skeleton-community__content">
      <div className="skeleton-line skeleton-line--title"></div>
      <div className="skeleton-line skeleton-line--text"></div>
      <div className="skeleton-line skeleton-line--text-short"></div>
      <div className="skeleton-community__meta">
        <div className="skeleton-meta-item"></div>
        <div className="skeleton-meta-item"></div>
      </div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="skeleton-profile">
    <div className="skeleton-profile__banner"></div>
    <div className="skeleton-profile__header">
      <div className="skeleton-profile__avatar"></div>
      <div className="skeleton-line skeleton-line--name"></div>
      <div className="skeleton-line skeleton-line--username"></div>
      <div className="skeleton-profile__stats">
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
      </div>
      <div className="skeleton-profile__actions">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  </div>
);

// Message Item Skeleton
export const MessageSkeleton = () => (
  <div className="skeleton-message">
    <div className="skeleton-avatar"></div>
    <div className="skeleton-message__content">
      <div className="skeleton-line skeleton-line--name"></div>
      <div className="skeleton-line skeleton-line--text-short"></div>
    </div>
  </div>
);

// Grid of Skeletons
interface SkeletonGridProps {
  type: 'post' | 'nft' | 'community' | 'message';
  count?: number;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ type, count = 6 }) => {
  const SkeletonComponent = {
    post: PostSkeleton,
    nft: NFTSkeleton,
    community: CommunitySkeleton,
    message: MessageSkeleton
  }[type];

  return (
    <div className={`skeleton-grid skeleton-grid--${type}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};