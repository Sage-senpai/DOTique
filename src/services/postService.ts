// ==================== src/services/postService.ts ====================
import { supabase } from './supabase';

export const postService = {
  async createPost(userId: string, content: string, media?: string[]) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: userId,
          content,
          media,
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  },

  async getTimeline(userId: string, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
      throw error;
    }
  },

  async likePost(postId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, user_id: userId }]);
      if (error) throw error;
    } catch (error) {
      console.error('Failed to like post:', error);
      throw error;
    }
  },

  async unlikePost(postId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
      if (error) throw error;
    } catch (error) {
      console.error('Failed to unlike post:', error);
      throw error;
    }
  },

  async deletePost(postId: string) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete post:', error);
      throw error;
    }
  },
};
