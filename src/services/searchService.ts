// src/services/socialService.ts - FIXED VERSION
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

      // Get current authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("❌ Not authenticated:", authError);
        throw new Error("You must be logged in to create a post");
      }

      console.log("🔐 Current auth user:", user.id);

      // Verify that the userId corresponds to the authenticated user
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, auth_uid")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.error("❌ Profile not found:", profileError);
        throw new Error("Profile not found for this user");
      }

      if (profile.auth_uid !== user.id) {
        console.error("❌ User ID mismatch:", {
          provided: userId,
          profile_auth_uid: profile.auth_uid,
          current_auth_uid: user.id
        });
        throw new Error("User ID does not match authenticated user");
      }

      console.log("✅ User verified:", { profile_id: profile.id, auth_uid: profile.auth_uid });

      const postData = {
        user_id: userId,  // This is profiles.id
        content: content.trim(),
        image_url: imageUrl || null,
        created_at: new Date().toISOString(),
      };

      console.log("📝 Inserting post to Supabase:", postData);

      const { data, error } = await supabase
        .from("posts")
        .insert([postData])
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            display_name,
            dotvatar_url,
            verified
          )
        `);

      if (error) {
        console.error("❌ Supabase error:", error);
        
        // Provide more helpful error messages
        if (error.code === '42501') {
          throw new Error(
            "Permission denied. Please make sure you're logged in and your profile is set up correctly."
          );
        }
        
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.error("❌ No data returned from insert");
        throw new Error("Post was not created (no data returned)");
      }

      console.log("✅ Post created successfully:", data[0]);
      return data[0];

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
          profiles:user_id (
            id,
            username,
            display_name,
            dotvatar_url,
            verified
          ),
          post_likes (
            user_id
          ),
          post_comments (
            id
          )
        `
        )
        .order("created_at", { ascending: false });

      if (tab === "following") {
        const { data: following } = await supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", userId);

        const followingIds = following?.map((f) => f.following_id) || [];
        if (followingIds.length > 0) {
          query = query.in("user_id", [...followingIds, userId]);
        } else {
          // If not following anyone, just show own posts
          query = query.eq("user_id", userId);
        }
      } else if (tab === "followers") {
        const { data: followers } = await supabase
          .from("follows")
          .select("follower_id")
          .eq("following_id", userId);

        const followerIds = followers?.map((f) => f.follower_id) || [];
        if (followerIds.length > 0) {
          query = query.in("user_id", [...followerIds, userId]);
        } else {
          // If no followers, just show own posts
          query = query.eq("user_id", userId);
        }
      } else {
        query = query.limit(limit).range(offset, offset + limit - 1);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("❌ Failed to fetch timeline:", error);
        throw error;
      }
      
      // Transform data to match Post interface
      const transformedData = data?.map(post => ({
        ...post,
        likes_count: post.post_likes?.length || 0,
        comments_count: post.post_comments?.length || 0,
        author: post.profiles ? {
          id: post.profiles.id,
          name: post.profiles.display_name || post.profiles.username,
          username: post.profiles.username,
          avatar: post.profiles.dotvatar_url,
          verified: post.profiles.verified || false,
        } : undefined
      })) || [];

      return transformedData;
    } catch (error) {
      console.error("❌ Failed to fetch timeline:", error);
      throw error;
    }
  },

  // 👤 Get user profile with stats
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // First try 'profiles' table
      let { data: user, error: userError } = await supabase
        .from("profiles")
        .select("id, username, display_name, dotvatar_url, bio, verified")
        .eq("id", userId)
        .single();

      // If not found in profiles, try 'users' table
      if (userError && userError.code === 'PGRST116') {
        const result = await supabase
          .from("users")
          .select("id, username, display_name, dotvatar_url, bio, verified")
          .eq("id", userId)
          .single();
        
        user = result.data;
        userError = result.error;
      }

      if (userError || !user) {
        console.error("❌ User not found:", userError);
        throw userError;
      }

      const { count: followersCount } = await supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", userId);

      const { count: followingCount } = await supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", userId);

      const { count: postsCount } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);

      return {
        id: user.id,
        username: user.username || 'unknown',
        display_name: user.display_name || user.username || 'User',
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
      // Try profiles first
      let { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, dotvatar_url, bio, verified")
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(limit);

      // Fallback to users table if profiles doesn't exist or is empty
      if ((error && error.code === '42P01') || !data || data.length === 0) {
        const result = await supabase
          .from("users")
          .select("id, username, display_name, dotvatar_url, bio, verified")
          .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
          .limit(limit);
        
        data = result.data;
        error = result.error;
      }

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
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            display_name,
            dotvatar_url,
            verified
          )
        `);

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("❌ Failed to add comment:", error);
      throw error;
    }
  },

  // 🗑️ Delete comment
  async deleteComment(commentId: string, userId: string) {
    try {
      const { error } = await supabase
        .from("post_comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("❌ Failed to delete comment:", error);
      throw error;
    }
  },

  // 👥 Follow / Unfollow user
  async toggleFollow(followerId: string, followingId: string) {
    try {
      if (followerId === followingId) {
        throw new Error("You cannot follow yourself");
      }

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
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            display_name,
            dotvatar_url,
            verified
          ),
          post_likes (
            user_id
          ),
          post_comments (
            id
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      // Transform data
      return data?.map(post => ({
        ...post,
        likes_count: post.post_likes?.length || 0,
        comments_count: post.post_comments?.length || 0,
      })) || [];
    } catch (error) {
      console.error("❌ Failed to fetch user posts:", error);
      throw error;
    }
  },

  // ♻️ Repost post or NFT
  async repostItem(userId: string, originalId: string, type: "post" | "nft") {
    try {
      // Check if already reposted
      const { data: existing } = await supabase
        .from("reposts")
        .select("id")
        .eq("user_id", userId)
        .eq("original_id", originalId)
        .eq("type", type)
        .maybeSingle();

      if (existing) {
        throw new Error("You have already reposted this");
      }

      const { data, error } = await supabase
        .from("reposts")
        .insert([{ user_id: userId, original_id: originalId, type }])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("❌ Failed to repost:", error);
      throw error;
    }
  },

  // 🗑️ Delete repost
  async deleteRepost(repostId: string, userId: string) {
    try {
      const { error } = await supabase
        .from("reposts")
        .delete()
        .eq("id", repostId)
        .eq("user_id", userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("❌ Failed to delete repost:", error);
      throw error;
    }
  },

  // 🧩 Fetch user reposts
  async getUserReposts(userId: string) {
    try {
      const { data, error } = await supabase
        .from("reposts")
        .select(`
          id,
          type,
          created_at,
          original_id
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Manually fetch referenced posts and NFTs
      const postIds = data?.filter(r => r.type === 'post').map(r => r.original_id) || [];
      const nftIds = data?.filter(r => r.type === 'nft').map(r => r.original_id) || [];

      let posts = [];
      let nfts = [];

      if (postIds.length > 0) {
        const { data: postsData } = await supabase
          .from("posts")
          .select(`
            *,
            profiles:user_id (
              id,
              username,
              display_name,
              dotvatar_url,
              verified
            )
          `)
          .in("id", postIds);
        posts = postsData || [];
      }

      if (nftIds.length > 0) {
        const { data: nftsData } = await supabase
          .from("nfts")
          .select("*")
          .in("id", nftIds);
        nfts = nftsData || [];
      }

      // Combine data
      return data?.map(repost => ({
        ...repost,
        post: repost.type === 'post' ? posts.find(p => p.id === repost.original_id) : null,
        nft: repost.type === 'nft' ? nfts.find(n => n.id === repost.original_id) : null,
      })) || [];
    } catch (error) {
      console.error("❌ Failed to fetch reposts:", error);
      throw error;
    }
  },

  // 🎨 Fetch user NFTs
  async getUserNFTs(userId: string) {
    try {
      const { data, error } = await supabase
        .from("nfts")
        .select("*")
        .eq("creator_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("❌ Failed to fetch NFTs:", error);
      throw error;
    }
  },

  // 📊 Get post statistics
  async getPostStats(postId: string) {
    try {
      const [likes, comments, reposts] = await Promise.all([
        supabase
          .from("post_likes")
          .select("id", { count: "exact", head: true })
          .eq("post_id", postId),
        supabase
          .from("post_comments")
          .select("id", { count: "exact", head: true })
          .eq("post_id", postId),
        supabase
          .from("reposts")
          .select("id", { count: "exact", head: true })
          .eq("original_id", postId)
          .eq("type", "post"),
      ]);

      return {
        likes: likes.count || 0,
        comments: comments.count || 0,
        reposts: reposts.count || 0,
        views: 0, // Implement view tracking separately
        shares: 0, // Implement share tracking separately
      };
    } catch (error) {
      console.error("❌ Failed to get post stats:", error);
      return {
        likes: 0,
        comments: 0,
        reposts: 0,
        views: 0,
        shares: 0,
      };
    }
  },

  // 💾 Save/unsave post (bookmark)
  async toggleSave(postId: string, userId: string) {
    try {
      const { data: existing } = await supabase
        .from("saved_posts")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existing) {
        await supabase.from("saved_posts").delete().eq("id", existing.id);
        return { saved: false };
      } else {
        await supabase.from("saved_posts").insert([{ post_id: postId, user_id: userId }]);
        return { saved: true };
      }
    } catch (error) {
      // If saved_posts table doesn't exist, create it
      if (error.code === '42P01') {
        console.log("Creating saved_posts table...");
        // You'll need to run a migration to create this table
        throw new Error("Saved posts feature not yet set up. Please contact support.");
      }
      console.error("❌ Failed to toggle save:", error);
      throw error;
    }
  },
};

export default socialService;