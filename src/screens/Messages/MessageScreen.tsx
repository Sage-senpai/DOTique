// src/screens/Messages/MessagesScreen.tsx - REVAMPED SPLIT VIEW
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle, Users, UserPlus, Search, Send, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';
import { executeSupabase } from '../../services/supabaseRetryService';
import { SkeletonGrid } from '../../components/Skeletons/SkeletonLoaders';
import './MessagesScreen.scss';

interface Conversation {
  id: string;
  type: 'direct' | 'community';
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline?: boolean;
  participants?: any[];
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    id: string;
    display_name: string;
    dotvatar_url: string;
    avatar_url: string;
  };
}

function toConversationListItem(conv: any, currentUserId: string): Conversation {
  const otherUser = conv.participants?.find((p: any) => p.user.id !== currentUserId)?.user;
  return {
    id: conv.id,
    type: 'direct',
    name: otherUser?.display_name || 'Unknown User',
    avatar: otherUser?.dotvatar_url || otherUser?.avatar_url || '👤',
    lastMessage: conv.last_message?.[0]?.content || 'No messages yet',
    lastMessageTime: new Date(conv.last_message?.[0]?.created_at || conv.created_at),
    unreadCount: 0,
    isOnline: false,
  };
}

export default function MessagesScreen() {
  const { profile } = useAuthStore();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'conversations' | 'communities' | 'requests'>('conversations');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const appendUniqueMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      if (prev.some((existing) => existing.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const data = await executeSupabase(() =>
        supabase
          .from('messages')
          .select(`
            *,
            sender:profiles(id, display_name, dotvatar_url, avatar_url)
          `)
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })
      );
      setMessages(data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    if (!profile?.id) return;

    try {
      setLoading(true);

      if (activeTab === 'conversations') {
        const data = await executeSupabase(() =>
          supabase
            .from('conversations')
            .select(`
              *,
              participants:conversation_participants(
                user:profiles(id, display_name, dotvatar_url, avatar_url)
              ),
              last_message:messages(content, created_at)
            `)
            .eq('type', 'direct')
            .contains('participant_ids', [profile.id])
            .order('updated_at', { ascending: false })
        );

        const transformedConversations = (data || []).map((conv: any) =>
          toConversationListItem(conv, profile.id)
        );

        setConversations(transformedConversations);
      } else if (activeTab === 'communities') {
        const data = await executeSupabase(() =>
          supabase
            .from('community_chats')
            .select(`
              *,
              community:communities(name, avatar_emoji),
              last_message:messages(content, created_at)
            `)
            .order('updated_at', { ascending: false })
        );

        const transformedConversations = (data || []).map((chat: any) => ({
          id: chat.id,
          type: 'community',
          name: chat.community.name,
          avatar: chat.community.avatar_emoji,
          lastMessage: chat.last_message?.[0]?.content || 'No messages yet',
          lastMessageTime: new Date(chat.last_message?.[0]?.created_at || chat.created_at),
          unreadCount: 0,
        }));

        setConversations(transformedConversations);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, profile?.id]);

  const initializeDirectConversation = useCallback(
    async (otherUserId: string) => {
      if (!profile?.id) return;

      try {
        const existingConv = await executeSupabase(() =>
          supabase
            .from('conversations')
            .select('*')
            .eq('type', 'direct')
            .contains('participant_ids', [profile.id, otherUserId])
            .maybeSingle()
        );

        let conversationId = existingConv?.id;

        if (!conversationId) {
          const newConv = await executeSupabase(() =>
            supabase
              .from('conversations')
              .insert({
                type: 'direct',
                participant_ids: [profile.id, otherUserId],
                created_at: new Date().toISOString(),
              })
              .select()
              .single()
          );

          conversationId = newConv.id;

          await executeSupabase(() =>
            supabase
              .from('conversation_participants')
              .insert([
                { conversation_id: conversationId, user_id: profile.id },
                { conversation_id: conversationId, user_id: otherUserId },
              ])
              .select('conversation_id')
          );
        }

        if (!conversationId) return;

        const conversationRecord = await executeSupabase(() =>
          supabase
            .from('conversations')
            .select(`
              *,
              participants:conversation_participants(
                user:profiles(id, display_name, dotvatar_url, avatar_url)
              ),
              last_message:messages(content, created_at)
            `)
            .eq('id', conversationId)
            .single()
        );

        const mapped = toConversationListItem(conversationRecord, profile.id);
        setSelectedConversation(mapped);

        await fetchConversations();
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
        alert('Failed to start conversation');
      }
    },
    [fetchConversations, profile?.id]
  );

  const initializeCommunityChat = useCallback(async (communityId: string) => {
    try {
      const chatData = await executeSupabase(() =>
        supabase
          .from('community_chats')
          .select(`
            *,
            community:communities(name, avatar_emoji)
          `)
          .eq('community_id', communityId)
          .single()
      );

      const conversation: Conversation = {
        id: chatData.id,
        type: 'community',
        name: chatData.community.name,
        avatar: chatData.community.avatar_emoji,
        lastMessage: '',
        lastMessageTime: new Date(),
        unreadCount: 0,
      };

      setSelectedConversation(conversation);
      setActiveTab('communities');
    } catch (error) {
      console.error('Failed to load community chat:', error);
    }
  }, []);

  // Initialize conversation from URL params
  useEffect(() => {
    const userId = searchParams.get('user');
    const communityId = searchParams.get('community');

    if (userId && profile?.id) {
      void initializeDirectConversation(userId);
    } else if (communityId) {
      void initializeCommunityChat(communityId);
    }
  }, [initializeCommunityChat, initializeDirectConversation, profile?.id, searchParams]);

  // Fetch conversations
  useEffect(() => {
    if (!profile?.id) return;
    void fetchConversations();
  }, [fetchConversations, profile?.id]);

  // Fetch messages + realtime subscribe for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    void fetchMessages(selectedConversation.id);

    const channel = supabase
      .channel(`conversation:${selectedConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        (payload) => {
          appendUniqueMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [appendUniqueMessage, fetchMessages, selectedConversation]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation || !profile?.id) return;

    try {
      setSending(true);

      const insertedMessage = await executeSupabase(() =>
        supabase
          .from('messages')
          .insert({
            conversation_id: selectedConversation.id,
            sender_id: profile.id,
            content: messageInput.trim(),
            created_at: new Date().toISOString(),
          })
          .select('*')
          .single()
      );

      appendUniqueMessage(insertedMessage as Message);
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="messages-screen">
      {/* Left Sidebar - Conversations List */}
      <div className="messages-sidebar">
        {/* Header */}
        <div className="messages-sidebar__header">
          <h2 className="messages-sidebar__title">Messages</h2>
          <button className="messages-sidebar__new-btn" title="New Message">
            <UserPlus size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="messages-sidebar__search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Tabs */}
        <div className="messages-sidebar__tabs">
          <button
            className={`tab ${activeTab === 'conversations' ? 'active' : ''}`}
            onClick={() => setActiveTab('conversations')}
          >
            <MessageCircle size={18} />
            <span>Chats</span>
          </button>
          <button
            className={`tab ${activeTab === 'communities' ? 'active' : ''}`}
            onClick={() => setActiveTab('communities')}
          >
            <Users size={18} />
            <span>Groups</span>
          </button>
          <button
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <UserPlus size={18} />
            <span>Requests</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="messages-sidebar__list">
          {loading ? (
            <SkeletonGrid type="message" count={5} />
          ) : filteredConversations.length === 0 ? (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>No conversations yet</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="conversation-item__avatar">
                  {typeof conv.avatar === 'string' && conv.avatar.startsWith('http') ? (
                    <img src={conv.avatar} alt={conv.name} />
                  ) : (
                    <div className="avatar-emoji">{conv.avatar}</div>
                  )}
                  {conv.isOnline && <div className="online-indicator" />}
                </div>
                <div className="conversation-item__content">
                  <div className="conversation-item__header">
                    <h4 className="conversation-item__name">{conv.name}</h4>
                    <span className="conversation-item__time">
                      {formatTime(conv.lastMessageTime)}
                    </span>
                  </div>
                  <div className="conversation-item__message">{conv.lastMessage}</div>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="conversation-item__badge">{conv.unreadCount}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Chat View */}
      <div className="messages-chat">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="messages-chat__header">
              <div className="chat-header__left">
                <div className="chat-header__avatar">
                  {typeof selectedConversation.avatar === 'string' &&
                  selectedConversation.avatar.startsWith('http') ? (
                    <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                  ) : (
                    <div className="avatar-emoji">{selectedConversation.avatar}</div>
                  )}
                  {selectedConversation.isOnline && <div className="online-indicator" />}
                </div>
                <div className="chat-header__info">
                  <h3 className="chat-header__name">{selectedConversation.name}</h3>
                  <span className="chat-header__status">
                    {selectedConversation.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="chat-header__actions">
                <button className="chat-header__btn" title="Voice Call">
                  <Phone size={20} />
                </button>
                <button className="chat-header__btn" title="Video Call">
                  <Video size={20} />
                </button>
                <button className="chat-header__btn" title="Info">
                  <Info size={20} />
                </button>
                <button className="chat-header__btn" title="More">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-chat__content">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender_id === profile?.id ? 'message--sent' : 'message--received'}`}
                >
                  {msg.sender_id !== profile?.id && (
                    <div className="message__avatar">
                      {msg.sender?.dotvatar_url ? (
                        <img src={msg.sender.dotvatar_url} alt={msg.sender.display_name} />
                      ) : (
                        <div className="avatar-placeholder">👤</div>
                      )}
                    </div>
                  )}
                  <div className="message__bubble">
                    {msg.sender_id !== profile?.id && (
                      <div className="message__sender">{msg.sender?.display_name}</div>
                    )}
                    <div className="message__content">{msg.content}</div>
                    <div className="message__time">{formatTime(new Date(msg.created_at))}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="messages-chat__input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={sending}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || sending}
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="messages-chat__empty">
            <MessageCircle size={64} />
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
}
