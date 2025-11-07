// src/services/notificationService.ts
import { supabase } from "./supabase";

export interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  type: "like" | "follow" | "comment" | "repost" | "purchase" | "milestone" | "donation";
  content: string;
  action_url?: string;
  read: boolean;
  created_at: string;
  actor?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
  };
}

export const notificationService = {
  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          // Fetch full notification with actor details
          const { data } = await supabase
            .from('notifications')
            .select(`
              *,
              actor:profiles!notifications_actor_id_fkey(
                id,
                username,
                display_name,
                avatar_url
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            callback(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // Get user's notifications
  async getNotifications(userId: string, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          actor:profiles!notifications_actor_id_fkey(
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ Failed to fetch notifications:', error);
      return [];
    }
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('❌ Failed to mark notification as read:', error);
    }
  },

  // Mark all notifications as read
  async markAllAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
    } catch (error) {
      console.error('❌ Failed to mark all as read:', error);
    }
  },

  // Delete notification
  async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('❌ Failed to delete notification:', error);
    }
  },

  // Create notification
  async createNotification(data: {
    user_id: string;
    actor_id: string;
    type: Notification['type'];
    content: string;
    action_url?: string;
  }) {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert(data);

      if (error) throw error;
    } catch (error) {
      console.error('❌ Failed to create notification:', error);
    }
  },

  // Helper: Create like notification
  async notifyLike(postId: string, likerId: string) {
    try {
      // Get post owner
      const { data: post } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single();

      if (!post || post.user_id === likerId) return; // Don't notify self

      await this.createNotification({
        user_id: post.user_id,
        actor_id: likerId,
        type: 'like',
        content: 'liked your post',
        action_url: `/post/${postId}`,
      });
    } catch (error) {
      console.error('❌ Failed to notify like:', error);
    }
  },

  // Helper: Create follow notification
  async notifyFollow(followedId: string, followerId: string) {
    if (followedId === followerId) return; // Don't notify self

    await this.createNotification({
      user_id: followedId,
      actor_id: followerId,
      type: 'follow',
      content: 'started following you',
      action_url: `/profile/${followerId}`,
    });
  },

  // Helper: Create comment notification
  async notifyComment(postId: string, commenterId: string) {
    try {
      const { data: post } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single();

      if (!post || post.user_id === commenterId) return;

      await this.createNotification({
        user_id: post.user_id,
        actor_id: commenterId,
        type: 'comment',
        content: 'commented on your post',
        action_url: `/post/${postId}`,
      });
    } catch (error) {
      console.error('❌ Failed to notify comment:', error);
    }
  },

  // Helper: Create purchase notification
  async notifyPurchase(nftId: string, buyerId: string, amount: string) {
    try {
      const { data: nft } = await supabase
        .from('nfts')
        .select('creator_id')
        .eq('id', nftId)
        .single();

      if (!nft || nft.creator_id === buyerId) return;

      await this.createNotification({
        user_id: nft.creator_id,
        actor_id: buyerId,
        type: 'purchase',
        content: `purchased your NFT for ${amount} DOT`,
        action_url: `/nft/${nftId}`,
      });
    } catch (error) {
      console.error('❌ Failed to notify purchase:', error);
    }
  },
};