// src/services/notificationService.ts - COMPLETE REWRITE
import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Notification {
  id: string;
  recipient_id: string;
  actor_id?: string;
  type: 'like' | 'follow' | 'comment' | 'repost' | 'purchase' | 'donation' | 'milestone' | 'mention';
  content: string;
  action_url?: string;
  metadata?: Record<string, any>;
  read: boolean;
  created_at: string;
  updated_at: string;
  actor?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
  };
}

class NotificationService {
  private channel: RealtimeChannel | null = null;

  /**
   * Get notifications for a user
   */
  async getNotifications(userId: string, limit = 50): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          actor:actor_id (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('recipient_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', userId)
        .eq('read', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
      return 0;
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('recipient_id', userId)
        .eq('read', false);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      throw error;
    }
  }

  /**
   * Create a notification
   */
  async createNotification(
    recipientId: string,
    actorId: string,
    type: Notification['type'],
    content: string,
    actionUrl?: string,
    metadata?: Record<string, any>
  ): Promise<Notification | null> {
    try {
      // Don't notify yourself
      if (recipientId === actorId) return null;

      const { data, error } = await supabase
        .from('notifications')
        .insert({
          recipient_id: recipientId,
          actor_id: actorId,
          type,
          content,
          action_url: actionUrl,
          metadata: metadata || {}
        })
        .select(`
          *,
          actor:actor_id (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time notifications
   */
  subscribeToNotifications(
    userId: string,
    callback: (notification: Notification) => void
  ): () => void {
    // Clean up existing subscription
    if (this.channel) {
      this.channel.unsubscribe();
    }

    // Create new channel
    this.channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${userId}`
        },
        async (payload) => {
          // Fetch the complete notification with actor details
          const { data } = await supabase
            .from('notifications')
            .select(`
              *,
              actor:actor_id (
                id,
                username,
                display_name,
                avatar_url
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            callback(data as Notification);
          }
        }
      )
      .subscribe();

    // Return cleanup function
    return () => {
      if (this.channel) {
        this.channel.unsubscribe();
        this.channel = null;
      }
    };
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete notification:', error);
      throw error;
    }
  }

  /**
   * Delete all notifications for a user
   */
  async deleteAllNotifications(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('recipient_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
      throw error;
    }
  }

  /**
   * Helper: Create follow notification
   */
  async notifyFollow(followedUserId: string, followerId: string): Promise<void> {
    await this.createNotification(
      followedUserId,
      followerId,
      'follow',
      'started following you',
      `/profile/${followerId}`
    );
  }

  /**
   * Helper: Create like notification
   */
  async notifyLike(postAuthorId: string, likerId: string, postId: string): Promise<void> {
    await this.createNotification(
      postAuthorId,
      likerId,
      'like',
      'liked your post',
      `/post/${postId}`
    );
  }

  /**
   * Helper: Create comment notification
   */
  async notifyComment(
    postAuthorId: string,
    commenterId: string,
    postId: string,
    commentPreview: string
  ): Promise<void> {
    await this.createNotification(
      postAuthorId,
      commenterId,
      'comment',
      `commented: "${commentPreview}"`,
      `/post/${postId}`
    );
  }

  /**
   * Helper: Create repost notification
   */
  async notifyRepost(postAuthorId: string, reposterId: string, postId: string): Promise<void> {
    await this.createNotification(
      postAuthorId,
      reposterId,
      'repost',
      'reposted your post',
      `/post/${postId}`
    );
  }

  /**
   * Helper: Create mention notification
   */
  async notifyMention(
    mentionedUserId: string,
    mentionerId: string,
    postId: string
  ): Promise<void> {
    await this.createNotification(
      mentionedUserId,
      mentionerId,
      'mention',
      'mentioned you in a post',
      `/post/${postId}`
    );
  }
}

export const notificationService = new NotificationService();