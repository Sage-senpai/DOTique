// src/services/socialService.ts
import { supabase } from "./supabase";

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export const socialService = {
  // 📝 Create a post
  async createPost(userId: string, content: string, imageUrl?: string) {
    const { data, error } = await supabase.from("posts").insert([
      { user_id: userId, content, image_url: imageUrl },
    ]);
    if (error) throw error;
    return data;
  },

  // 📚 Get all posts (with optional pagination)
  async getPosts(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Post[];
  },

  // ❤️ Like or unlike a post
  async toggleLike(postId: string, userId: string) {
    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    if (existingLike) {
      await supabase.from("likes").delete().eq("id", existingLike.id);
      return { liked: false };
    } else {
      await supabase.from("likes").insert([{ post_id: postId, user_id: userId }]);
      return { liked: true };
    }
  },

  // 💬 Add comment
  async addComment(postId: string, userId: string, content: string) {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, user_id: userId, content }]);
    if (error) throw error;
    return data;
  },

  // 🔍 Get comments for a post
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data as Comment[];
  },

  // 👥 Follow / Unfollow user
  async toggleFollow(followerId: string, followingId: string) {
    const { data: existing } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .single();

    if (existing) {
      await supabase.from("follows").delete().eq("id", existing.id);
      return { following: false };
    } else {
      await supabase.from("follows").insert([{ follower_id: followerId, following_id: followingId }]);
      return { following: true };
    }
  },
};
