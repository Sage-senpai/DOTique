// src/types/search.ts
export interface SearchResult {
  id: string;
  type: "user" | "nft" | "post" | "collection" | "event";
  title: string;
  description?: string;
  image?: string;
  username?: string;
  display_name?: string;
  dotvatar_url?: string;
  bio?: string;
  verified?: boolean;
  metadata?: Record<string, any>;
}
