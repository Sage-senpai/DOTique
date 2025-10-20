// src/services/socialService.ts
import { supabase } from "./supabase";

// -------------------------------------------------------------
// Interfaces
// -------------------------------------------------------------
export interface Post {
  id: string;
  user_id: string;
  author?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image_url?: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
  stats?: {
    views: number;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
  userInteraction?: {
    liked: boolean;
    saved: boolean;
    reposted: boolean;
  };
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar?: string;
  bio?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  verified: boolean;
}

// -------------------------------------------------------------
// Main Service
// -------------------------------------------------------------
export const socialService = {
  // 📝 Create a post
  async createPost(userId: string, content: string, imageUrl?: string) {
  try {
    // Validation
    if (!userId) {
      console.error("❌ User ID is missing");
      throw new Error("User ID is required to create a post");
    }

    if (!content || !content.trim()) {
      console.error("❌ Content is empty");
      throw new Error("Post content cannot be empty");
    }

    const postData = {
      user_id: userId,
      content: content.trim(),
      image_url: imageUrl || null,
      created_at: new Date().toISOString(),
    };

    console.log("📝 Inserting post to Supabase:", postData);

    const { data, error } = await supabase
      .from("posts")
      .insert([postData])
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.error("❌ No data returned from insert");
      throw new Error("Post was not created (no data returned)");
    }

    console.log("✅ Post created successfully:", data[0]);
    return data[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ createPost error:", error.message || error);
    throw error;
  }
},

  // 📚 Get timeline posts (feed/following/followers)
  async getTimelinePosts(
    userId: string,
    limit = 20,
    offset = 0,
    tab: "feed" | "following" | "followers" = "feed"
  ) {
    try {
      let query = supabase
        .from("posts")
        .select(
          `
          *,
          users:user_id(id, username, display_name, dotvatar_url, verified),
          post_likes(user_id),
          post_comments(id)
        `
        )
        .order("created_at", { ascending: false });

      if (tab === "following") {
        const { data: following } = await supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", userId);

        const followingIds = following?.map((f) => f.following_id) || [];
        query = query.in("user_id", [...followingIds, userId]);
      } else if (tab === "followers") {
        const { data: followers } = await supabase
          .from("follows")
          .select("follower_id")
          .eq("following_id", userId);

        const followerIds = followers?.map((f) => f.follower_id) || [];
        query = query.in("user_id", [...followerIds, userId]);
      } else {
        query = query.limit(limit).range(offset, offset + limit - 1);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("❌ Failed to fetch timeline:", error);
      throw error;
    }
  },

  // 👤 Get user profile with stats
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id, username, display_name, dotvatar_url, bio, verified")
        .eq("id", userId)
        .single();

      if (userError) throw userError;

      const { count: followersCount } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("following_id", userId);

      const { count: followingCount } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("follower_id", userId);

      const { count: postsCount } = await supabase
        .from("posts")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      return {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        avatar: user.dotvatar_url,
        bio: user.bio,
        followers_count: followersCount || 0,
        following_count: followingCount || 0,
        posts_count: postsCount || 0,
        verified: user.verified || false,
      };
    } catch (error) {
      console.error("❌ Failed to fetch user profile:", error);
      return null;
    }
  },

  // 🔍 Search users
  async searchUsers(query: string, limit = 10) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, display_name, dotvatar_url, bio, verified")
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("❌ Search failed:", error);
      throw error;
    }
  },

  // ❤️ Like or unlike a post
  async toggleLike(postId: string, userId: string) {
    try {
      const { data: existingLike } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existingLike) {
        await supabase.from("post_likes").delete().eq("id", existingLike.id);
        return { liked: false };
      } else {
        await supabase.from("post_likes").insert([{ post_id: postId, user_id: userId }]);
        return { liked: true };
      }
    } catch (error) {
      console.error("❌ Failed to toggle like:", error);
      throw error;
    }
  },

  // 💬 Add comment
  async addComment(postId: string, userId: string, content: string) {
    try {
      const { data, error } = await supabase
        .from("post_comments")
        .insert([{ post_id: postId, user_id: userId, content }])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("❌ Failed to add comment:", error);
      throw error;
    }
  },

  // 👥 Follow / Unfollow user
  async toggleFollow(followerId: string, followingId: string) {
    try {
      const { data: existing } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", followerId)
        .eq("following_id", followingId)
        .maybeSingle();

      if (existing) {
        await supabase.from("follows").delete().eq("id", existing.id);
        return { following: false };
      } else {
        await supabase
          .from("follows")
          .insert([{ follower_id: followerId, following_id: followingId }]);
        return { following: true };
      }
    } catch (error) {
      console.error("❌ Failed to toggle follow:", error);
      throw error;
    }
  },

  // 🧾 Get posts by a specific user
  async getUserPosts(userId: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("❌ Failed to fetch user posts:", error);
      throw error;
    }
  },
};
