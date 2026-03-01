// src/components/Skeletons/SkeletonLoaders.tsx
import React from 'react';
import './SkeletonLoaders.scss';

// ─── Post Card Skeleton ─────────────────────────────────────────────────────
// Mirrors: PostCard layout (avatar / name / text lines / optional media / actions)
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
    {/* Media block — shown on every other skeleton to reflect mixed feed */}
    <div className="skeleton-post__media"></div>
    <div className="skeleton-post__actions">
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
      <div className="skeleton-action"></div>
    </div>
  </div>
);

// ─── NFT Card Skeleton ──────────────────────────────────────────────────────
// Mirrors: NFTCard layout (image / title / username / price)
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

// ─── Community Card Skeleton ────────────────────────────────────────────────
// Mirrors: Community card (cover image / title / description / meta / join button)
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

// ─── Profile Header Skeleton ─────────────────────────────────────────────────
// Mirrors: ProfileScreen header (banner / avatar / name / username / stats / actions)
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

// ─── Message Conversation Skeleton ──────────────────────────────────────────
// Mirrors: MessagesScreen conversation-item (avatar / name / preview)
export const MessageSkeleton = () => (
  <div className="skeleton-message">
    <div className="skeleton-avatar"></div>
    <div className="skeleton-message__content">
      <div className="skeleton-line skeleton-line--name"></div>
      <div className="skeleton-line skeleton-line--text-short"></div>
    </div>
  </div>
);

// ─── Trending Item Skeleton ──────────────────────────────────────────────────
// Mirrors: LeftSidebar trending-item (tag / posts count / nft thumbnail / rank)
export const TrendingSkeleton = () => (
  <div className="skeleton-trending">
    <div className="skeleton-trending__body">
      <div className="skeleton-line skeleton-line--tag"></div>
      <div className="skeleton-line skeleton-line--posts-count"></div>
    </div>
    <div className="skeleton-trending__thumb"></div>
    <div className="skeleton-trending__rank"></div>
  </div>
);

// ─── Recommendation Card Skeleton ───────────────────────────────────────────
// Mirrors: RightSidebar recommendation-card (avatar / name / username / meta / follow btn)
export const RecommendationSkeleton = () => (
  <div className="skeleton-recommendation">
    <div className="skeleton-avatar skeleton-avatar--sm"></div>
    <div className="skeleton-recommendation__info">
      <div className="skeleton-line skeleton-line--name"></div>
      <div className="skeleton-line skeleton-line--username"></div>
      <div className="skeleton-line skeleton-line--meta"></div>
    </div>
    <div className="skeleton-rec-btn"></div>
  </div>
);

// ─── Generic Grid ────────────────────────────────────────────────────────────
export type SkeletonType =
  | 'post'
  | 'nft'
  | 'community'
  | 'message'
  | 'trending'
  | 'recommendation';

interface SkeletonGridProps {
  type: SkeletonType;
  count?: number;
}

const SKELETON_MAP: Record<SkeletonType, React.FC> = {
  post: PostSkeleton,
  nft: NFTSkeleton,
  community: CommunitySkeleton,
  message: MessageSkeleton,
  trending: TrendingSkeleton,
  recommendation: RecommendationSkeleton,
};

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ type, count = 6 }) => {
  const SkeletonComponent = SKELETON_MAP[type];
  return (
    <div className={`skeleton-grid skeleton-grid--${type}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};
