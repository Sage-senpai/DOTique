// ==================== src/services/postService.ts ====================
import { supabase } from "./supabase";

// 🔹 Define types for clarity and safety
type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
};

type Post = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string | null;
  media?: string[] | null;
  created_at: string;
  profiles?: Profile | null;
};

export const postService = {
  // =====================================================
  // 🟢 CREATE POST
  // =====================================================
  async createPost(userId: string, content: string, media?: string[]) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: userId,
            content,
            media,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("❌ Failed to create post:", error);
      throw error;
    }
  },

  // =====================================================
  // 🟣 GET TIMELINE (with joined profile info)
  // =====================================================
  async getTimeline(_userId: string, limit = 50) {
    try {
      // 🔗 Fetch posts joined with their author profile
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          user_id,
          content,
          image_url,
          media,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      // 🧩 Format posts to match what FeedCenter expects
      const formatted = (data as Post[] || []).map((post) => ({
        ...post,
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.avatar_url || "👤",
          verified: false,
        },
      }));

      return formatted;
    } catch (error) {
      console.error("❌ Failed to fetch timeline:", error);
      throw error;
    }
  },

  // =====================================================
  // 💖 LIKE A POST
  // =====================================================
  async likePost(postId: string, userId: string) {
    try {
      const { error } = await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: userId }]);
      if (error) throw error;
    } catch (error) {
      console.error("❌ Failed to like post:", error);
      throw error;
    }
  },

  // =====================================================
  // 💔 UNLIKE A POST
  // =====================================================
  async unlikePost(postId: string, userId: string) {
    try {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      if (error) throw error;
    } catch (error) {
      console.error("❌ Failed to unlike post:", error);
      throw error;
    }
  },

  // =====================================================
  // 🗑️ DELETE POST
  // =====================================================
  async deletePost(postId: string) {
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
    } catch (error) {
      console.error("❌ Failed to delete post:", error);
      throw error;
    }
  },
};
