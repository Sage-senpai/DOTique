import { supabase } from "./supabase";
import { conversationService } from "./conversationService";
import { notificationService } from "./notificationService";
import { incrementPostCount } from "./profileService";
import { executeSupabase, isTransientSupabaseError } from "./supabaseRetryService";
import { withRetry } from "./retryService";

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

async function getProfileIdFromAuthUid(authUid: string): Promise<string | null> {
  try {
    const data = await executeSupabase(() =>
      supabase
        .from("profiles")
        .select("id")
        .eq("auth_uid", authUid)
        .maybeSingle()
    );

    return data?.id ?? null;
  } catch (error) {
    console.error("Error fetching profile ID:", error);
    return null;
  }
}

async function ensureProfileExists(authUid: string): Promise<string | null> {
  try {
    const existingId = await getProfileIdFromAuthUid(authUid);
    if (existingId) {
      return existingId;
    }

    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email || `${authUid.slice(0, 8)}@placeholder.com`;

    const newProfile = await executeSupabase(() =>
      supabase
        .from("profiles")
        .insert({
          auth_uid: authUid,
          username: `user_${authUid.slice(0, 8)}`,
          display_name: "New User",
          email,
          followers_count: 0,
          following_count: 0,
          posts_count: 0,
        })
        .select("id")
        .single()
    );

    return newProfile.id;
  } catch (error) {
    console.error("Failed to ensure profile exists:", error);
    return null;
  }
}

async function fetchExactCount(
  table: string,
  column: string,
  applyFilter: (builder: any) => any
): Promise<number> {
  return withRetry(
    async () => {
      const { count, error } = await applyFilter(
        supabase.from(table).select(column, { count: "exact", head: true })
      );

      if (error) {
        throw error;
      }

      return count || 0;
    },
    {
      retries: 2,
      shouldRetry: (error) => isTransientSupabaseError(error),
    }
  );
}

function normalizePost(post: any): Post {
  return {
    ...post,
    image_url: post.media_url || post.image_url,
    author: post.author
      ? {
          id: post.author.id || post.user_id,
          name: post.author.display_name || post.author.name || "User",
          username: post.author.username || "user",
          avatar: post.author.avatar_url || post.author.dotvatar_url || "User",
          verified: Boolean(post.author.verified),
        }
      : {
          id: post.user_id,
          name: "User",
          username: "user",
          avatar: "User",
          verified: false,
        },
    likes_count: post.post_likes?.length || post.likes_count || 0,
    comments_count: post.post_comments?.length || post.comments_count || 0,
  };
}

export const socialService = {
  async toggleFollow(
    followerId: string,
    followingId: string
  ): Promise<{ following: boolean }> {
    try {
      const existing = await executeSupabase(() =>
        supabase
          .from("user_follows")
          .select("id")
          .eq("follower_id", followerId)
          .eq("following_id", followingId)
          .maybeSingle()
      );

      if (existing) {
        await executeSupabase(() =>
          supabase
            .from("user_follows")
            .delete()
            .eq("id", existing.id)
            .select("id")
        );

        await this.updateFollowerCounts(followerId, followingId, "decrement");
        return { following: false };
      }

      await executeSupabase(() =>
        supabase
          .from("user_follows")
          .insert({ follower_id: followerId, following_id: followingId })
          .select("id")
      );

      await this.updateFollowerCounts(followerId, followingId, "increment");
      await conversationService.onUserFollow(followerId, followingId);
      await notificationService.notifyFollow(followingId, followerId);

      return { following: true };
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      throw error;
    }
  },

  async updateFollowerCounts(
    followerId: string,
    followingId: string,
    operation: "increment" | "decrement"
  ): Promise<void> {
    try {
      const delta = operation === "increment" ? 1 : -1;

      const follower = await executeSupabase(() =>
        supabase
          .from("profiles")
          .select("following_count")
          .eq("id", followerId)
          .single()
      );

      await executeSupabase(() =>
        supabase
          .from("profiles")
          .update({
            following_count: Math.max(0, (follower.following_count || 0) + delta),
          })
          .eq("id", followerId)
          .select("id")
      );

      const following = await executeSupabase(() =>
        supabase
          .from("profiles")
          .select("followers_count")
          .eq("id", followingId)
          .single()
      );

      await executeSupabase(() =>
        supabase
          .from("profiles")
          .update({
            followers_count: Math.max(0, (following.followers_count || 0) + delta),
          })
          .eq("id", followingId)
          .select("id")
      );
    } catch (error) {
      console.error("Failed to update follower counts:", error);
    }
  },

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    try {
      const data = await executeSupabase(() =>
        supabase
          .from("user_follows")
          .select("id")
          .eq("follower_id", followerId)
          .eq("following_id", followingId)
          .maybeSingle()
      );

      return Boolean(data);
    } catch (error) {
      console.error("Failed to check follow status:", error);
      return false;
    }
  },

  async createPost(content: string, media_url?: string, mediaType?: "image" | "video") {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      const profileId = await ensureProfileExists(user.id);
      if (!profileId) {
        throw new Error("Could not find or create user profile");
      }

      const mentions = this.extractMentions(content);

      const data = await executeSupabase(() =>
        supabase
          .from("posts")
          .insert([
            {
              user_id: profileId,
              content,
              media_url: media_url || null,
              media_type: mediaType || null,
            },
          ])
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
          .single()
      );

      await incrementPostCount(profileId);

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
          avatar: data.profiles?.avatar_url || "User",
          verified: data.profiles?.verified || false,
        },
      };
    } catch (error) {
      console.error("createPost error:", error);
      throw error;
    }
  },

  extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }

    return [...new Set(mentions)];
  },

  async processMentions(postId: string, usernames: string[], mentionerId: string) {
    try {
      const mentionedUsers = await executeSupabase(() =>
        supabase
          .from("profiles")
          .select("id, username")
          .in("username", usernames)
      );

      if (!mentionedUsers?.length) return;

      for (const user of mentionedUsers) {
        await notificationService.notifyMention(user.id, mentionerId, postId);
      }
    } catch (error) {
      console.error("Error processing mentions:", error);
    }
  },

  async getTimelinePosts(
    userId: string,
    limit = 50,
    offset = 0,
    filter: "feed" | "following" | "friends" | "communities" = "feed"
  ): Promise<any[]> {
    try {
      let query: any = supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_user_id_fkey(*),
          post_likes(user_id),
          post_comments(id)
        `)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (filter === "following") {
        const following = await executeSupabase(() =>
          supabase
            .from("user_follows")
            .select("following_id")
            .eq("follower_id", userId)
        );

        if (!following?.length) return [];
        query = query.in(
          "user_id",
          following.map((f: any) => f.following_id)
        );
      }

      if (filter === "friends") {
        const following = await executeSupabase(() =>
          supabase
            .from("user_follows")
            .select("following_id")
            .eq("follower_id", userId)
        );

        if (!following?.length) return [];

        const followingIds = following.map((f: any) => f.following_id);
        const followers = await executeSupabase(() =>
          supabase
            .from("user_follows")
            .select("follower_id")
            .eq("following_id", userId)
            .in("follower_id", followingIds)
        );

        if (!followers?.length) return [];

        query = query.in(
          "user_id",
          followers.map((f: any) => f.follower_id)
        );
      }

      if (filter === "communities") {
        const memberships = await executeSupabase(() =>
          supabase
            .from("community_members")
            .select("community_id")
            .eq("user_id", userId)
        );

        if (!memberships?.length) return [];

        query = query.in(
          "community_id",
          memberships.map((m: any) => m.community_id)
        );
      }

      const data = await executeSupabase(() => query);

      return (data || []).map((post: any) => normalizePost(post));
    } catch (error) {
      console.error("Failed to fetch timeline posts:", error);
      return [];
    }
  },

  async getUserPosts(userId: string, limit = 50, offset = 0) {
    try {
      const data = await executeSupabase(() =>
        supabase
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
          .range(offset, offset + limit - 1)
      );

      return (data || []).map((post: any) => ({
        ...normalizePost(post),
        author: {
          id: post.profiles?.id || post.user_id,
          name: post.profiles?.display_name || "User",
          username: post.profiles?.username || "user",
          avatar: post.profiles?.avatar_url || "User",
          verified: post.profiles?.verified || false,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      return [];
    }
  },

  async getUserProfile(profileId: string): Promise<UserProfile | null> {
    try {
      const user = await executeSupabase(() =>
        supabase
          .from("profiles")
          .select("*")
          .eq("id", profileId)
          .single()
      );

      const [followersCount, followingCount, postsCount] = await Promise.all([
        fetchExactCount("user_follows", "id", (q) => q.eq("following_id", profileId)),
        fetchExactCount("user_follows", "id", (q) => q.eq("follower_id", profileId)),
        fetchExactCount("posts", "id", (q) => q.eq("user_id", profileId)),
      ]);

      await executeSupabase(() =>
        supabase
          .from("profiles")
          .update({
            followers_count: followersCount,
            following_count: followingCount,
            posts_count: postsCount,
          })
          .eq("id", profileId)
          .select("id")
      );

      return {
        ...user,
        followers_count: followersCount,
        following_count: followingCount,
        posts_count: postsCount,
      };
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }
  },

  async getFollowers(userId: string): Promise<any[]> {
    try {
      const data = await executeSupabase(() =>
        supabase
          .from("user_follows")
          .select(`
            follower:profiles!user_follows_follower_id_fkey(
              id,
              username,
              display_name,
              avatar_url,
              bio
            )
          `)
          .eq("following_id", userId)
          .order("created_at", { ascending: false })
      );

      return (data || []).map((item: any) => item.follower);
    } catch (error) {
      console.error("Failed to fetch followers:", error);
      return [];
    }
  },

  async getFollowing(userId: string): Promise<any[]> {
    try {
      const data = await executeSupabase(() =>
        supabase
          .from("user_follows")
          .select(`
            following:profiles!user_follows_following_id_fkey(
              id,
              username,
              display_name,
              avatar_url,
              bio
            )
          `)
          .eq("follower_id", userId)
          .order("created_at", { ascending: false })
      );

      return (data || []).map((item: any) => item.following);
    } catch (error) {
      console.error("Failed to fetch following:", error);
      return [];
    }
  },

  async getUserNFTs(userId: string): Promise<any[]> {
    try {
      const data = await executeSupabase(() =>
        supabase
          .from("nfts")
          .select("*")
          .eq("creator_id", userId)
          .eq("status", "active")
          .order("created_at", { ascending: false })
      );

      return data || [];
    } catch (error) {
      console.error("Failed to fetch user NFTs:", error);
      return [];
    }
  },
};
