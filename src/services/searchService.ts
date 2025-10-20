// ==================== src/services/searchService.ts ====================

import { supabase } from "@/services/supabase"; // ✅ Make sure supabase.ts exports your Supabase client

// Define interfaces for clarity
interface User {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  verified?: boolean;
}

interface Post {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
  likes?: number;
  comments?: number;
  tags?: string[];
}

export const searchService = {
  async searchAll(query: string, limit = 20): Promise<{
    users: User[];
    posts: Post[];
  }> {
    try {
      // Use dummy fallback when developing (if Supabase not connected)
      if (!query.trim()) {
        return {
          users: [
            {
              id: "u1",
              username: "dotique_dev",
              display_name: "Dotique Dev",
              avatar_url: "/dummy/avatar1.png",
              bio: "Building Web3 experiences on Polkadot ✦",
              verified: true,
            },
            {
              id: "u2",
              username: "satoshi",
              display_name: "Satoshi",
              avatar_url: "/dummy/avatar2.png",
              bio: "Decentralization maximalist 🧠",
              verified: false,
            },
          ],
          posts: [
            {
              id: "p1",
              author_id: "u1",
              content: "Welcome to Dotique — a decentralized social layer 🌐",
              created_at: new Date().toISOString(),
              likes: 12,
              comments: 3,
              tags: ["#dotique", "#web3"],
            },
            {
              id: "p2",
              author_id: "u2",
              content: "Interoperability is the key to the next-gen internet 🔑",
              created_at: new Date().toISOString(),
              likes: 25,
              comments: 5,
              tags: ["#polkadot", "#future"],
            },
          ],
        };
      }

      // --- Supabase query ---
      const { data: users, error: userErr } = await supabase
        .from("users")
        .select("*")
        .ilike("username", `%${query}%`)
        .limit(limit);

      const { data: posts, error: postErr } = await supabase
        .from("posts")
        .select("*")
        .ilike("content", `%${query}%`)
        .limit(limit);

      if (userErr) throw userErr;
      if (postErr) throw postErr;

      return {
        users: users || [],
        posts: posts || [],
      };
    } catch (error) {
      console.error("Search failed:", error);
      // fallback dummy data to avoid crashes in dev mode
      return {
        users: [
          {
            id: "dummy1",
            username: "fallback_user",
            display_name: "Fallback User",
            avatar_url: "/dummy/fallback.png",
            bio: "Using fallback data (check Supabase config).",
            verified: false,
          },
        ],
        posts: [
          {
            id: "dummyPost",
            author_id: "dummy1",
            content: "This is a fallback post for development.",
            created_at: new Date().toISOString(),
            likes: 0,
            comments: 0,
          },
        ],
      };
    }
  },

  async getTrendingTags(limit = 10): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("tags")
        .limit(100);

      if (error) throw error;

      const tags = (data || [])
        .flatMap((post: { tags?: string[] }) => post.tags || [])
        .reduce<Record<string, number>>((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});

      const sortedTags = Object.entries(tags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([tag]) => tag);

      return sortedTags.length ? sortedTags : ["#dotique", "#web3", "#polkadot"];
    } catch (error) {
      console.error("Failed to fetch trending tags:", error);
      return ["#fallback", "#debug", "#web3"];
    }
  },
};
