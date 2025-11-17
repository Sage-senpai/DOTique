// src/screens/Communities/CommunityDetailScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Heart, MessageCircle, Share, MoreVertical, Users } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import './CommunityDetailScreen.scss';

interface Community {
  id: string;
  name: string;
  description: string;
  avatar_emoji: string;
  member_count: number;
}

interface Post {
  id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

interface ChatMessage {
  id: string;
  message: string;
  created_at: string;
  sender: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

const CommunityDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = useAuthStore((s) => s.session);
  const [activeTab, setActiveTab] = useState<'feed' | 'chat'>('feed');
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newPost, setNewPost] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCommunityData();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'feed') {
      fetchPosts();
    } else {
      fetchMessages();
      const subscription = subscribeToMessages();
      return () => subscription?.unsubscribe();
    }
  }, [id, activeTab]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCommunityData = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('communities')
      .select('id, name, description, avatar_emoji, member_count')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching community:', error);
      navigate('/communities');
    } else {
      setCommunity(data);
    }
    setLoading(false);
  };

  const fetchPosts = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        id,
        content,
        likes_count,
        comments_count,
        created_at,
        author:profiles!author_id(id, username, avatar_url)
      `)
      .eq('community_id', id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data as any);
    }
  };

  const fetchMessages = async () => {
    if (!id) return;

    const { data: chatData } = await supabase
      .from('community_chats')
      .select('id')
      .eq('community_id', id)
      .single();

    if (chatData) {
      const { data, error } = await supabase
        .from('community_chat_messages')
        .select(`
          id,
          message,
          created_at,
          sender:profiles!sender_id(id, username, avatar_url)
        `)
        .eq('chat_id', chatData.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data as any);
      }
    }
  };

  const subscribeToMessages = () => {
    if (!id) return null;

    return supabase
      .channel(`community-chat-${id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_chat_messages',
      }, () => {
        fetchMessages();
      })
      .subscribe();
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !session?.user?.id || !id) return;

    const { error } = await supabase
      .from('community_posts')
      .insert({
        community_id: id,
        author_id: session.user.id,
        content: newPost,
      });

    if (!error) {
      setNewPost('');
      fetchPosts();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !session?.user?.id || !id) return;

    const { data: chatData } = await supabase
      .from('community_chats')
      .select('id')
      .eq('community_id', id)
      .single();

    if (chatData) {
      const { error } = await supabase
        .from('community_chat_messages')
        .insert({
          chat_id: chatData.id,
          sender_id: session.user.id,
          message: newMessage,
        });

      if (!error) {
        setNewMessage('');
      }
    }
  };

  if (loading) {
    return (
      <div className="community-detail loading">
        <p>Loading community...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="community-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <header className="community-header">
        <button onClick={() => navigate('/communities')} className="back-btn">
          <ArrowLeft size={20} />
        </button>
        <div className="community-info">
          <h1>
            {community?.avatar_emoji} {community?.name}
          </h1>
          <p>
            <Users size={14} />
            {community?.member_count} members
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="community-tabs">
        <button
          className={activeTab === 'feed' ? 'active' : ''}
          onClick={() => setActiveTab('feed')}
        >
          📰 Feed
        </button>
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
      </div>

      {/* Content */}
      <div className="community-content">
        {activeTab === 'feed' ? (
          <div className="feed-tab">
            {/* Create Post */}
            <div className="create-post">
              <textarea
                placeholder="Share something with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <button onClick={handleCreatePost}>Post</button>
            </div>

            {/* Posts List */}
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="author-avatar">
                      {post.author?.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="author-info">
                      <div className="author-name">{post.author?.username || 'Unknown'}</div>
                      <div className="post-date">
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <button>
                      <Heart size={18} /> {post.likes_count || 0}
                    </button>
                    <button>
                      <MessageCircle size={18} /> {post.comments_count || 0}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="chat-tab">
            {/* Messages */}
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <div className="message-avatar">
                    {msg.sender?.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{msg.sender?.username || 'Unknown'}</span>
                      <span className="message-time">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="message-text">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="message-composer">
              <input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CommunityDetailScreen;