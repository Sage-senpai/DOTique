// src/services/postService.ts - FIXED VERSION
import { supabase } from "./supabase";
import { incrementPostCount } from "./profileService";

type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  dotvatar_url: string | null;
  verified: boolean;
};

type Post = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string | null;
  media_url?: string | null;
  media_type?: string | null;
  created_at: string;
  profiles?: Profile | null;
};

export const postService = {
  /**
   * Create a new post
   */
  async createPost(userId: string, content: string, mediaUrl?: string, mediaType?: 'image' | 'video') {
    try {
      console.log("📝 Creating post:", { userId, content, mediaUrl, mediaType });

      // Build insert object dynamically based on what columns exist
      const insertData: any = {
        user_id: userId,
        content,
        created_at: new Date().toISOString(),
      };

      // Add media fields if provided
      if (mediaUrl) {
        insertData.image_url = mediaType === 'image' ? mediaUrl : null;
        
        // Try to add media_url and media_type if columns exist
        try {
          insertData.media_url = mediaUrl;
          insertData.media_type = mediaType;
        } catch (e) {
          console.warn("media_url/media_type columns may not exist, using image_url only");
        }
      }

      // Insert post
      const { data, error } = await supabase
        .from("posts")
        .insert([insertData])
        .select(`
          id,
          user_id,
          content,
          media_url,
          media_type,
          image_url,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            dotvatar_url,
            verified
          )
        `)
        .single();

      if (error) {
        console.error("❌ Post creation error:", error);
        throw error;
      }

      console.log("✅ Post created successfully:", data);

      // Increment post count
      await incrementPostCount(userId);

      // Format the response
      return {
        ...data,
        author: {
          id: data.profiles?.id || data.user_id,
          name: data.profiles?.display_name || "User",
          username: data.profiles?.username || "user",
          avatar: data.profiles?.dotvatar_url || data.profiles?.avatar_url || "👤",
          verified: data.profiles?.verified || false,
        },
        stats: {
          views: 0,
          likes: 0,
          comments: 0,
          reposts: 0,
          shares: 0
        },
        userInteraction: {
          liked: false,
          saved: false,
          reposted: false
        }
      };
    } catch (error) {
      console.error("❌ Failed to create post:", error);
      throw error;
    }
  },

  /**
   * Get timeline posts with proper formatting
   */
  async getTimeline(userId: string, limit = 50) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          user_id,
          content,
          image_url,
          media_url,
          media_type,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            dotvatar_url,
            verified
          ),
          post_likes(user_id),
          post_comments(id)
        `
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data as Post[] || []).map((post: any) => ({
        ...post,
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.dotvatar_url || post.profiles?.avatar_url || "👤",
          verified: post.profiles?.verified || false,
        },
        stats: {
          views: 0,
          likes: post.post_likes?.length || 0,
          comments: post.post_comments?.length || 0,
          reposts: 0,
          shares: 0
        },
        userInteraction: {
          liked: post.post_likes?.some((like: any) => like.user_id === userId) || false,
          saved: false,
          reposted: false
        }
      }));
    } catch (error) {
      console.error("❌ Failed to fetch timeline:", error);
      throw error;
    }
  },

  /**
   * Get user's posts
   */
  async getUserPosts(userId: string, limit = 50) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          user_id,
          content,
          media_url,
          media_type,
          image_url,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            dotvatar_url,
            verified
          ),
          post_likes(user_id),
          post_comments(id)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || []).map((post: any) => ({
        ...post,
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.dotvatar_url || post.profiles?.avatar_url || "👤",
          verified: post.profiles?.verified || false,
        },
        stats: {
          views: 0,
          likes: post.post_likes?.length || 0,
          comments: post.post_comments?.length || 0,
          reposts: 0,
          shares: 0
        },
        userInteraction: {
          liked: false,
          saved: false,
          reposted: false
        }
      }));
    } catch (error) {
      console.error("❌ Failed to fetch user posts:", error);
      return [];
    }
  },

  /**
   * Like a post
   */
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

  /**
   * Unlike a post
   */
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

  /**
   * Delete a post
   */
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