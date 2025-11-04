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
  media_url?: string;
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
  auth_uid: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  verified: boolean;
}

// -------------------------------------------------------------
// Helper: Get profile ID from auth UID
// -------------------------------------------------------------
async function getProfileIdFromAuthUid(authUid: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("auth_uid", authUid)
      .single();

    if (error) {
      console.error("❌ Error fetching profile ID:", error.message);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.error("❌ Exception in getProfileIdFromAuthUid:", err);
    return null;
  }
}

// -------------------------------------------------------------
// Helper: Ensure profile exists
// -------------------------------------------------------------
async function ensureProfileExists(authUid: string): Promise<string | null> {
  try {
    // First, check if profile exists
    let profileId = await getProfileIdFromAuthUid(authUid);
    
    if (profileId) {
      return profileId;
    }

    // Profile doesn't exist, create it
    console.log("🧩 Profile not found, creating new profile for auth_uid:", authUid);
    
    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email || `${authUid.slice(0, 8)}@placeholder.com`;
    
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        auth_uid: authUid,
        username: `user_${authUid.slice(0, 8)}`,
        display_name: "New User",
        email: email,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("❌ Failed to create profile:", insertError.message);
      return null;
    }

    console.log("✅ Profile created successfully:", newProfile.id);
    return newProfile.id;
  } catch (err) {
    console.error("❌ Exception in ensureProfileExists:", err);
    return null;
  }
}

// -------------------------------------------------------------
// Main Service
// -------------------------------------------------------------
export const socialService = {
  // 📝 Create a post (RLS-safe, UUID-friendly, with mention detection)
  async createPost(content: string, media_url?: string) {
    try {
      // 1. Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      console.log("📝 Creating post for auth user:", user.id);

      // 2. Ensure profile exists and get profile ID
      const profileId = await ensureProfileExists(user.id);

      if (!profileId) {
        throw new Error("Could not find or create user profile");
      }

      console.log("✅ Using profile ID:", profileId);

      // 3. Extract mentions from content (@username format)
      const mentions = this.extractMentions(content);
      console.log("📌 Mentions found:", mentions);

      // 4. Create the post with profile ID - content is already a string, don't wrap it
      const { data, error } = await supabase
        .from("posts")
        .insert([{ 
          user_id: profileId, 
          content: content, // Just pass the string directly
          media_url: media_url || null 
        }])
        .select(`
          id,
          user_id,
          content,
          media_url,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .single();

      if (error) {
        console.error("❌ createPost error:", error.message);
        throw new Error(`Cannot create post: ${error.message}`);
      }

      console.log("✅ Post created successfully:", data);

      // 5. Process mentions and create notifications (optional future feature)
      if (mentions.length > 0) {
        await this.processMentions(data.id, mentions, profileId);
      }

      // Transform to match Post interface
      return {
        ...data,
        image_url: data.media_url, // Map for compatibility
        author: {
          id: data.profiles?.id || data.user_id,
          name: data.profiles?.display_name || "User",
          username: data.profiles?.username || "user",
          avatar: data.profiles?.avatar_url || "👤",
          verified: data.profiles?.verified || false,
        },
      };
    } catch (err: any) {
      console.error("❌ createPost fatal error:", err.message);
      throw err;
    }
  },

  // 🏷️ Extract @mentions from post content
  extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]); // Extract username without @
    }
    
    return [...new Set(mentions)]; // Remove duplicates
  },

  // 📢 Process mentions and create notifications
  async processMentions(postId: string, usernames: string[], mentionerId: string) {
    try {
      // Get user IDs for mentioned usernames
      const { data: mentionedUsers, error } = await supabase
        .from("profiles")
        .select("id, username")
        .in("username", usernames);

      if (error) {
        console.error("❌ Error fetching mentioned users:", error);
        return;
      }

      console.log("👥 Found mentioned users:", mentionedUsers);

      // TODO: Create notifications for mentioned users
      // This would insert into a notifications table
      // For now, just log it
      if (mentionedUsers && mentionedUsers.length > 0) {
        console.log(`📬 Would notify ${mentionedUsers.length} users about mention in post ${postId}`);
      }
    } catch (err) {
      console.error("❌ Error processing mentions:", err);
    }
  },

  // 📚 Get timeline posts (feed/following/followers)
  async getTimelinePosts(
    profileId: string,
    limit = 20,
    offset = 0,
    tab: "feed" | "following" | "followers" = "feed"
  ) {
    try {
      let query = supabase
        .from("posts")
        .select(`
          id,
          user_id,
          content,
          media_url,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            verified
          ),
          post_likes(user_id),
          post_comments(id)
        `)
        .order("created_at", { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      if (tab === "following") {
        const { data: following } = await supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", profileId);
        const followingIds = following?.map((f) => f.following_id) || [];
        if (followingIds.length > 0) {
          query = query.in("user_id", [...followingIds, profileId]);
        } else {
          query = query.eq("user_id", profileId);
        }
      } else if (tab === "followers") {
        const { data: followers } = await supabase
          .from("follows")
          .select("follower_id")
          .eq("following_id", profileId);
        const followerIds = followers?.map((f) => f.follower_id) || [];
        if (followerIds.length > 0) {
          query = query.in("user_id", [...followerIds, profileId]);
        } else {
          query = query.eq("user_id", profileId);
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      const postsWithAuthors = data.map((post: any) => ({
        ...post,
        image_url: post.media_url, // Map media_url to image_url for compatibility
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.avatar_url || "👤",
          verified: post.profiles?.verified || false,
        },
        likes_count: post.post_likes?.length || 0,
        comments_count: post.post_comments?.length || 0,
      }));

      return postsWithAuthors;
    } catch (error) {
      console.error("❌ Failed to fetch timeline:", error);
      throw error;
    }
  },

  // 👤 Get user profile with stats by profile ID
  async getUserProfile(profileId: string): Promise<UserProfile | null> {
    try {
      const { data: user, error: userError } = await supabase
        .from("profiles")
        .select("id, auth_uid, username, display_name, avatar_url, bio, verified")
        .eq("id", profileId)
        .single();
      
      if (userError) throw userError;

      const { count: followersCount } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("following_id", profileId);
      
      const { count: followingCount } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("follower_id", profileId);
      
      const { count: postsCount } = await supabase
        .from("posts")
        .select("id", { count: "exact" })
        .eq("user_id", profileId);

      return {
        id: user.id,
        auth_uid: user.auth_uid,
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
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

  // 👤 Get user profile by auth UID
  async getUserProfileByAuthUid(authUid: string): Promise<UserProfile | null> {
    try {
      const profileId = await getProfileIdFromAuthUid(authUid);
      if (!profileId) return null;
      return await this.getUserProfile(profileId);
    } catch (error) {
      console.error("❌ Failed to fetch user profile by auth UID:", error);
      return null;
    }
  },

  // Helper to get current user's profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      return await this.getUserProfileByAuthUid(user.id);
    } catch (error) {
      console.error("❌ Failed to get current user profile:", error);
      return null;
    }
  },

  // 👥 Toggle follow/unfollow
  async toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean }> {
    try {
      // Check if already following
      const { data: existingFollow } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", followerId)
        .eq("following_id", followingId)
        .maybeSingle();

      if (existingFollow) {
        // Unfollow
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", followerId)
          .eq("following_id", followingId);

        if (error) throw error;
        console.log("✅ Unfollowed user");
        return { following: false };
      } else {
        // Follow
        const { error } = await supabase
          .from("follows")
          .insert({ follower_id: followerId, following_id: followingId });

        if (error) throw error;
        console.log("✅ Followed user");
        return { following: true };
      }
    } catch (error) {
      console.error("❌ Failed to toggle follow:", error);
      throw error;
    }
  },

  // 📝 Get user's posts (alias for getTimelinePosts for specific user)
  async getUserPosts(userId: string, limit = 50, offset = 0) {
    try {
      console.log("📝 Fetching posts for user:", userId);
      
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          user_id,
          content,
          media_url,
          created_at,
          profiles!posts_user_id_fkey (
            id,
            username,
            display_name,
            avatar_url,
            verified
          ),
          post_likes(user_id),
          post_comments(id)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const postsWithAuthors = data.map((post: any) => ({
        ...post,
        image_url: post.media_url,
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.avatar_url || "👤",
          verified: post.profiles?.verified || false,
        },
        likes_count: post.post_likes?.length || 0,
        comments_count: post.post_comments?.length || 0,
      }));

      console.log("✅ Fetched", postsWithAuthors.length, "posts");
      return postsWithAuthors;
    } catch (error) {
      console.error("❌ Failed to fetch user posts:", error);
      throw error;
    }
  },
};