// src/services/socialService.ts - COMBINED VERSION
import { supabase } from "./supabase";
import { conversationService } from './conversationService';
import { notificationService } from './notificationService';

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
    let profileId = await getProfileIdFromAuthUid(authUid);
    
    if (profileId) {
      return profileId;
    }

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
        followers_count: 0,
        following_count: 0,
        posts_count: 0
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
  // 👥 Toggle follow - WITH CONVERSATION INITIALIZATION & COUNT UPDATES
  async toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean }> {
    try {
      const { data: existing } = await supabase
        .from('user_follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .maybeSingle();

      if (existing) {
        // Unfollow
        await supabase
          .from('user_follows')
          .delete()
          .eq('id', existing.id);

        // Update counts
        await this.updateFollowerCounts(followerId, followingId, 'decrement');

        console.log('✅ Unfollowed user');
        return { following: false };
      } else {
        // Follow
        const { error } = await supabase
          .from('user_follows')
          .insert({
            follower_id: followerId,
            following_id: followingId
          });

        if (error) throw error;

        // Update counts
        await this.updateFollowerCounts(followerId, followingId, 'increment');

        // 🆕 Initialize conversation automatically
        await conversationService.onUserFollow(followerId, followingId);

        // Send notification
        await notificationService.notifyFollow(followingId, followerId);

        console.log('✅ Followed user and initialized conversation');
        return { following: true };
      }
    } catch (error) {
      console.error('❌ Failed to toggle follow:', error);
      throw error;
    }
  },

  // 📊 Update follower counts
  async updateFollowerCounts(
    followerId: string,
    followingId: string,
    operation: 'increment' | 'decrement'
  ): Promise<void> {
    try {
      const delta = operation === 'increment' ? 1 : -1;

      // Update follower's following_count
      const { data: follower } = await supabase
        .from('profiles')
        .select('following_count')
        .eq('id', followerId)
        .single();

      if (follower) {
        await supabase
          .from('profiles')
          .update({
            following_count: Math.max(0, (follower.following_count || 0) + delta)
          })
          .eq('id', followerId);
      }

      // Update following's followers_count
      const { data: following } = await supabase
        .from('profiles')
        .select('followers_count')
        .eq('id', followingId)
        .single();

      if (following) {
        await supabase
          .from('profiles')
          .update({
            followers_count: Math.max(0, (following.followers_count || 0) + delta)
          })
          .eq('id', followingId);
      }

      console.log(`✅ Updated follower counts (${operation})`);
    } catch (error) {
      console.error('Failed to update follower counts:', error);
    }
  },

  // ✅ Check if following
  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    try {
      const { data } = await supabase
        .from('user_follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .maybeSingle();

      return !!data;
    } catch (error) {
      console.error('Failed to check follow status:', error);
      return false;
    }
  },

  // 📝 Create a post (with mention detection)
  async createPost(content: string, media_url?: string, mediaType?: 'image' | 'video') {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      const profileId = await ensureProfileExists(user.id);
      if (!profileId) {
        throw new Error("Could not find or create user profile");
      }

      // Extract mentions
      const mentions = this.extractMentions(content);

      // Create post
      const { data, error } = await supabase
        .from("posts")
        .insert([{ 
          user_id: profileId, 
          content: content,
          media_url: media_url || null,
          media_type: mediaType || null
        }])
        .select(`
          id,
          user_id,
          content,
          media_url,
          media_type,
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

      if (error) throw error;

      // Update posts count
      await supabase
        .from('profiles')
        .update({
          posts_count: supabase.rpc('increment', { x: 1 })
        })
        .eq('id', profileId);

      // Process mentions
      if (mentions.length > 0) {
        await this.processMentions(data.id, mentions, profileId);
      }

      return {
        ...data,
        image_url: data.media_url,
        author: {
          id: data.profiles?.id || data.user_id,
          name: data.profiles?.display_name || "User",
          username: data.profiles?.username || "user",
          avatar: data.profiles?.avatar_url || "👤",
          verified: data.profiles?.verified || false,
        },
      };
    } catch (err: any) {
      console.error("❌ createPost error:", err.message);
      throw err;
    }
  },

  // 🏷️ Extract mentions
  extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }
    
    return [...new Set(mentions)];
  },

  // 📢 Process mentions
  async processMentions(postId: string, usernames: string[], mentionerId: string) {
    try {
      const { data: mentionedUsers, error } = await supabase
        .from("profiles")
        .select("id, username")
        .in("username", usernames);

      if (error || !mentionedUsers) return;

      for (const user of mentionedUsers) {
        await notificationService.notifyMention(
          user.id,
          mentionerId,
          postId
        );
      }
    } catch (err) {
      console.error("❌ Error processing mentions:", err);
    }
  },

  // 📚 Get timeline posts
  async getTimelinePosts(
    userId: string,
    limit = 50,
    offset = 0,
    filter: 'feed' | 'following' | 'friends' | 'communities' = 'feed'
  ): Promise<any[]> {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:profiles!posts_user_id_fkey(*),
          post_likes(user_id),
          post_comments(id)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // Apply filters
      if (filter === 'following') {
        const { data: following } = await supabase
          .from('user_follows')
          .select('following_id')
          .eq('follower_id', userId);

        if (following && following.length > 0) {
          const followingIds = following.map(f => f.following_id);
          query = query.in('user_id', followingIds);
        } else {
          return [];
        }
      } else if (filter === 'friends') {
        const { data: following } = await supabase
          .from('user_follows')
          .select('following_id')
          .eq('follower_id', userId);

        if (following && following.length > 0) {
          const followingIds = following.map(f => f.following_id);
          
          const { data: followers } = await supabase
            .from('user_follows')
            .select('follower_id')
            .eq('following_id', userId)
            .in('follower_id', followingIds);

          if (followers && followers.length > 0) {
            const friendIds = followers.map(f => f.follower_id);
            query = query.in('user_id', friendIds);
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else if (filter === 'communities') {
        const { data: memberships } = await supabase
          .from('community_members')
          .select('community_id')
          .eq('user_id', userId);

        if (memberships && memberships.length > 0) {
          const communityIds = memberships.map(m => m.community_id);
          query = query.in('community_id', communityIds);
        } else {
          return [];
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map((post: any) => ({
        ...post,
        image_url: post.media_url,
        author: post.author || {
          id: post.user_id,
          name: "User",
          username: "user",
          avatar: "👤",
          verified: false,
        },
        likes_count: post.post_likes?.length || 0,
        comments_count: post.post_comments?.length || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch timeline posts:', error);
      return [];
    }
  },

  // 📝 Get user posts
  async getUserPosts(userId: string, limit = 50, offset = 0) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          user_id,
          content,
          media_url,
          media_type,
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

      return (data || []).map((post: any) => ({
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
    } catch (error) {
      console.error("❌ Failed to fetch user posts:", error);
      return [];
    }
  },

  // 👤 Get user profile
  async getUserProfile(profileId: string): Promise<UserProfile | null> {
    try {
      const { data: user, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single();
      
      if (userError) throw userError;

      // Get fresh counts
      const { count: followersCount } = await supabase
        .from("user_follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", profileId);
      
      const { count: followingCount } = await supabase
        .from("user_follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", profileId);
      
      const { count: postsCount } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", profileId);

      // Update profile with fresh counts
      await supabase
        .from('profiles')
        .update({
          followers_count: followersCount || 0,
          following_count: followingCount || 0,
          posts_count: postsCount || 0
        })
        .eq('id', profileId);

      return {
        ...user,
        followers_count: followersCount || 0,
        following_count: followingCount || 0,
        posts_count: postsCount || 0,
      };
    } catch (error) {
      console.error("❌ Failed to fetch user profile:", error);
      return null;
    }
  },

  // 👥 Get followers
  async getFollowers(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          follower:profiles!user_follows_follower_id_fkey(
            id,
            username,
            display_name,
            avatar_url,
            bio
          )
        `)
        .eq('following_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => item.follower);
    } catch (error) {
      console.error('Failed to fetch followers:', error);
      return [];
    }
  },

  // 👥 Get following
  async getFollowing(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          following:profiles!user_follows_following_id_fkey(
            id,
            username,
            display_name,
            avatar_url,
            bio
          )
        `)
        .eq('follower_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => item.following);
    } catch (error) {
      console.error('Failed to fetch following:', error);
      return [];
    }
  },

  // 💎 Get user NFTs (from marketplace)
  async getUserNFTs(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('creator_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch user NFTs:', error);
      return [];
    }
  },
};