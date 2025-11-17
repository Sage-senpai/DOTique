// src/services/conversationService.ts - COMPLETE IMPLEMENTATION
import { supabase } from './supabase';
import { notificationService } from './notificationService';

export interface Conversation {
  id: string;
  user_id: string;
  other_user_id?: string;
  community_id?: string;
  type: 'direct' | 'community';
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
  created_at: string;
  other_user?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
    online: boolean;
  };
  community?: {
    id: string;
    name: string;
    avatar_emoji: string;
    member_count: number;
  };
}

class ConversationService {
  /**
   * Initialize or get existing conversation between two users
   */
  async initializeDirectConversation(
    userId: string,
    otherUserId: string
  ): Promise<Conversation> {
    try {
      // Check if conversation already exists (bidirectional)
      const { data: existing, error: searchError } = await supabase
        .from('conversations')
        .select(`
          *,
          other_user:profiles!conversations_other_user_id_fkey(
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('type', 'direct')
        .or(`and(user_id.eq.${userId},other_user_id.eq.${otherUserId}),and(user_id.eq.${otherUserId},other_user_id.eq.${userId})`)
        .maybeSingle();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      if (existing) {
        console.log('✅ Found existing conversation:', existing.id);
        return existing;
      }

      // Create new conversation (create both sides for easy querying)
      const { data: newConvo, error: createError } = await supabase
        .from('conversations')
        .insert([
          {
            user_id: userId,
            other_user_id: otherUserId,
            type: 'direct',
            unread_count: 0
          },
          {
            user_id: otherUserId,
            other_user_id: userId,
            type: 'direct',
            unread_count: 0
          }
        ])
        .select(`
          *,
          other_user:profiles!conversations_other_user_id_fkey(
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .limit(1)
        .single();

      if (createError) throw createError;

      console.log('✅ Created new conversation:', newConvo.id);
      return newConvo;
    } catch (error) {
      console.error('❌ Failed to initialize conversation:', error);
      throw error;
    }
  }

  /**
   * Auto-initialize conversation when user follows someone
   */
  async onUserFollow(followerId: string, followedUserId: string): Promise<void> {
    try {
      await this.initializeDirectConversation(followerId, followedUserId);
      console.log('✅ Auto-initialized conversation on follow');
    } catch (error) {
      console.error('Failed to auto-initialize conversation:', error);
    }
  }

  /**
   * Get all conversations for a user
   */
  async getUserConversations(userId: string): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          other_user:profiles!conversations_other_user_id_fkey(
            id,
            username,
            display_name,
            avatar_url
          ),
          community:communities(
            id,
            name,
            avatar_emoji,
            member_count
          )
        `)
        .eq('user_id', userId)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    }
  }

  /**
   * Send a message
   */
  async sendMessage(
    conversationId: string,
    senderId: string,
    receiverId: string,
    content: string,
    mediaUrl?: string,
    mediaType?: 'image' | 'video'
  ): Promise<any> {
    try {
      // Insert message
      const { data: message, error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          receiver_id: receiverId,
          content,
          media_url: mediaUrl,
          media_type: mediaType
        })
        .select()
        .single();

      if (messageError) throw messageError;

      // Update conversation's last message
      await supabase
        .from('conversations')
        .update({
          last_message: content,
          last_message_at: new Date().toISOString()
        })
        .eq('id', conversationId);

      // Increment unread count for receiver
      await supabase
        .from('conversations')
        .update({
          unread_count: supabase.rpc('increment', { x: 1 })
        })
        .eq('user_id', receiverId)
        .eq('other_user_id', senderId);

      return message;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Mark conversation as read
   */
  async markConversationAsRead(userId: string, otherUserId: string): Promise<void> {
    try {
      await supabase
        .from('conversations')
        .update({ unread_count: 0 })
        .eq('user_id', userId)
        .eq('other_user_id', otherUserId);

      // Mark all messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('receiver_id', userId)
        .eq('sender_id', otherUserId)
        .eq('is_read', false);
    } catch (error) {
      console.error('Failed to mark conversation as read:', error);
    }
  }

  /**
   * Get messages for a conversation
   */
  async getMessages(
    userId: string,
    otherUserId: string,
    limit = 50
  ): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  }

  /**
   * Subscribe to new messages in a conversation
   */
  subscribeToMessages(
    userId: string,
    otherUserId: string,
    callback: (message: any) => void
  ): () => void {
    const channel = supabase
      .channel(`messages:${userId}:${otherUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        async (payload) => {
          if (payload.new.sender_id === otherUserId) {
            // Fetch complete message with sender details
            const { data } = await supabase
              .from('messages')
              .select(`
                *,
                sender:profiles!messages_sender_id_fkey(*)
              `)
              .eq('id', payload.new.id)
              .single();

            if (data) {
              callback(data);
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }

  /**
   * Delete conversation
   */
  async deleteConversation(userId: string, otherUserId: string): Promise<void> {
    try {
      // Delete messages
      await supabase
        .from('messages')
        .delete()
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`);

      // Delete conversation records
      await supabase
        .from('conversations')
        .delete()
        .eq('user_id', userId)
        .eq('other_user_id', otherUserId);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      throw error;
    }
  }
}

export const conversationService = new ConversationService();