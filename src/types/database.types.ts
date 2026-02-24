/**
 * database.types.ts
 *
 * TypeScript mirror of the DOTique Supabase PostgreSQL schema.
 * Aligned with the Technical Specification & Architecture Document.
 *
 * Usage:
 *   import type { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";
 *   type Profile = Tables<"profiles">;
 *   type NewPost = TablesInsert<"posts">;
 */

// ---------------------------------------------------------------------------
// Row types — what you get back from SELECT queries
// ---------------------------------------------------------------------------

export interface DatabaseProfile {
  id: string; // UUID — matches auth.users.id
  auth_uid: string;
  username: string;
  display_name: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  dotvatar_url: string | null;
  wallet_address: string | null;
  polkadot_address: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  tagged_count: number;
  is_verified: boolean;
  zklogin_provider: "google" | "apple" | null;
  zklogin_subject: string | null; // sub from OAuth JWT
  created_at: string; // ISO 8601
  updated_at: string;
}

export interface DatabaseSocialAccount {
  id: string;
  user_id: string; // FK → profiles.id
  provider: "instagram" | "pinterest" | "x" | "figma" | "blender";
  provider_user_id: string;
  access_token: string; // Encrypted at rest
  refresh_token: string | null;
  token_expires_at: string | null;
  scopes: string[]; // granted OAuth scopes
  username: string | null; // handle on the provider platform
  connected_at: string;
  last_synced_at: string | null;
}

export interface DatabaseNFT {
  id: string;
  creator_id: string; // FK → profiles.id
  collection_id: number | null; // Unique Network collection ID
  token_id: number | null; // on-chain token ID
  tx_hash: string | null;
  name: string;
  description: string | null;
  image_url: string; // IPFS CID or gateway URL
  ipfs_cid: string | null;
  metadata_url: string | null; // IPFS metadata JSON
  attributes: NFTAttribute[]; // JSON array
  category: NFTCategory;
  price_dot: number | null; // DOT price for marketplace listings
  is_listed: boolean;
  is_wearable: boolean; // can be equipped on DOTvatar
  layer_type: WearableLayer | null; // body part if wearable
  network: "unique" | "polkadot" | "kusama";
  status: "pending" | "minting" | "minted" | "failed" | "burned";
  created_at: string;
  updated_at: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number | boolean;
  display_type?: "number" | "boost_number" | "boost_percentage" | "date";
}

export type NFTCategory =
  | "top"
  | "bottom"
  | "shoes"
  | "accessory"
  | "bag"
  | "hat"
  | "outerwear"
  | "full_outfit"
  | "background"
  | "other";

export type WearableLayer =
  | "hair"
  | "face"
  | "top"
  | "bottom"
  | "shoes"
  | "accessory"
  | "outerwear"
  | "background";

export interface DatabaseDotvatarItem {
  id: string;
  user_id: string; // FK → profiles.id
  nft_id: string | null; // FK → nfts.id (null if default/unlinked item)
  layer: WearableLayer;
  asset_url: string;
  is_equipped: boolean;
  equip_order: number; // z-index for layering
  created_at: string;
}

export interface DatabaseUserNFTOwnership {
  id: string;
  user_id: string; // FK → profiles.id
  nft_id: string; // FK → nfts.id
  acquired_at: string;
  acquisition_type: "minted" | "purchased" | "donated" | "transferred";
  purchase_price_dot: number | null;
  is_active: boolean; // false if transferred away
}

export interface DatabasePost {
  id: string;
  author_id: string; // FK → profiles.id
  content: string | null;
  image_urls: string[];
  nft_ids: string[]; // tagged NFTs
  tags: string[]; // hashtags
  like_count: number;
  comment_count: number;
  repost_count: number;
  view_count: number;
  is_pinned: boolean;
  community_id: string | null; // FK → communities.id (if a community post)
  parent_post_id: string | null; // FK → posts.id (if a reply)
  created_at: string;
  updated_at: string;
}

export interface DatabaseFollow {
  id: string;
  follower_id: string; // FK → profiles.id
  following_id: string; // FK → profiles.id
  created_at: string;
}

export interface DatabaseMessage {
  id: string;
  conversation_id: string; // FK → conversations.id
  sender_id: string; // FK → profiles.id
  content: string;
  content_type: "text" | "image" | "nft_share" | "system";
  nft_share_id: string | null; // FK → nfts.id
  image_url: string | null;
  is_read: boolean;
  created_at: string;
  edited_at: string | null;
}

export interface DatabaseConversation {
  id: string;
  participant_ids: string[]; // FK → profiles.id[]
  last_message_id: string | null;
  last_message_preview: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface DatabaseVotingSession {
  id: string;
  creator_id: string; // FK → profiles.id
  title: string;
  description: string | null;
  nft_ids: string[]; // NFTs being voted on
  voting_type: "single_choice" | "ranked" | "approval";
  start_at: string;
  end_at: string;
  min_dot_to_vote: number; // minimum DOT balance required to vote
  community_id: string | null;
  on_chain_ref: string | null; // on-chain pallet vote reference
  status: "draft" | "active" | "closed" | "cancelled";
  result_nft_id: string | null; // winning NFT after tally
  created_at: string;
}

export interface DatabaseVote {
  id: string;
  session_id: string; // FK → voting_sessions.id
  voter_id: string; // FK → profiles.id
  voter_address: string; // Polkadot address at time of vote
  choice_nft_ids: string[]; // chosen NFT(s)
  dot_weight: number; // DOT balance used as vote weight
  tx_hash: string | null; // on-chain vote tx
  created_at: string;
}

export interface DatabaseEvent {
  id: string;
  creator_id: string; // FK → profiles.id
  title: string;
  description: string | null;
  banner_url: string | null;
  location: string | null; // physical or metaverse location
  starts_at: string;
  ends_at: string;
  required_nft_collection_id: number | null; // Unique Network collection gate
  required_nft_ids: string[]; // specific NFT gate (any of)
  max_attendees: number | null;
  attendee_ids: string[]; // FK → profiles.id[]
  community_id: string | null;
  is_virtual: boolean;
  stream_url: string | null;
  status: "upcoming" | "live" | "ended" | "cancelled";
  created_at: string;
}

export interface DatabaseCommunity {
  id: string;
  owner_id: string; // FK → profiles.id
  name: string;
  slug: string;
  description: string | null;
  banner_url: string | null;
  avatar_url: string | null;
  required_nft_collection_id: number | null; // gate by collection
  required_nft_ids: string[]; // gate by specific NFTs
  member_ids: string[];
  member_count: number;
  post_count: number;
  is_public: boolean;
  tags: string[];
  created_at: string;
}

// ---------------------------------------------------------------------------
// Helper generic types (mirrors Supabase's generated pattern)
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: DatabaseProfile;
        Insert: Omit<DatabaseProfile, "id" | "created_at" | "updated_at" | "followers_count" | "following_count" | "posts_count" | "tagged_count">;
        Update: Partial<Omit<DatabaseProfile, "id" | "created_at">>;
      };
      social_accounts: {
        Row: DatabaseSocialAccount;
        Insert: Omit<DatabaseSocialAccount, "id" | "connected_at">;
        Update: Partial<Omit<DatabaseSocialAccount, "id" | "user_id" | "connected_at">>;
      };
      nfts: {
        Row: DatabaseNFT;
        Insert: Omit<DatabaseNFT, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DatabaseNFT, "id" | "creator_id" | "created_at">>;
      };
      dotvatar_items: {
        Row: DatabaseDotvatarItem;
        Insert: Omit<DatabaseDotvatarItem, "id" | "created_at">;
        Update: Partial<Omit<DatabaseDotvatarItem, "id" | "user_id" | "created_at">>;
      };
      user_nft_ownership: {
        Row: DatabaseUserNFTOwnership;
        Insert: Omit<DatabaseUserNFTOwnership, "id">;
        Update: Partial<Omit<DatabaseUserNFTOwnership, "id" | "user_id" | "nft_id">>;
      };
      posts: {
        Row: DatabasePost;
        Insert: Omit<DatabasePost, "id" | "created_at" | "updated_at" | "like_count" | "comment_count" | "repost_count" | "view_count">;
        Update: Partial<Omit<DatabasePost, "id" | "author_id" | "created_at">>;
      };
      follows: {
        Row: DatabaseFollow;
        Insert: Omit<DatabaseFollow, "id" | "created_at">;
        Update: never;
      };
      messages: {
        Row: DatabaseMessage;
        Insert: Omit<DatabaseMessage, "id" | "created_at">;
        Update: Partial<Pick<DatabaseMessage, "is_read" | "content" | "edited_at">>;
      };
      conversations: {
        Row: DatabaseConversation;
        Insert: Omit<DatabaseConversation, "id" | "created_at">;
        Update: Partial<Omit<DatabaseConversation, "id" | "created_at">>;
      };
      voting_sessions: {
        Row: DatabaseVotingSession;
        Insert: Omit<DatabaseVotingSession, "id" | "created_at" | "status">;
        Update: Partial<Omit<DatabaseVotingSession, "id" | "creator_id" | "created_at">>;
      };
      votes: {
        Row: DatabaseVote;
        Insert: Omit<DatabaseVote, "id" | "created_at">;
        Update: never;
      };
      events: {
        Row: DatabaseEvent;
        Insert: Omit<DatabaseEvent, "id" | "created_at" | "attendee_ids">;
        Update: Partial<Omit<DatabaseEvent, "id" | "creator_id" | "created_at">>;
      };
      communities: {
        Row: DatabaseCommunity;
        Insert: Omit<DatabaseCommunity, "id" | "created_at" | "member_count" | "post_count" | "member_ids">;
        Update: Partial<Omit<DatabaseCommunity, "id" | "owner_id" | "created_at">>;
      };
    };
  };
}

/** Shorthand helper: Tables<"profiles"> → DatabaseProfile */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
