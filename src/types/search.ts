//src/types/search.ts
export type SearchResult = {
  id: string;
  type: "user" | "post";
  username?: string;
  display_name?: string;
  dotvatar_url?: string;
  bio?: string;
  verified?: boolean;
  title?: string;
  content?: string;
};
