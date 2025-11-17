// src/screens/Communities/CommunitiesScreen.tsx - WITH SCROLL TO TOP
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Lock, Users, MessageCircle, Search, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';
import { SkeletonGrid } from '../../components/Skeletons/SkeletonLoaders';
import CreateCommunityModal from './CreateCommunityModal';
import './CommunitiesScreen.scss';

interface NFTCollection {
  id: string;
  name: string;
  contract_address: string;
  description: string;
  image_url: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  banner_url: string | null;
  avatar_emoji: string;
  required_nft_collection_id: string | null;
  member_count: number;
  is_public: boolean;
  created_at: string;
  nft_collection?: NFTCollection;
  is_member?: boolean;
  user_has_nft?: boolean;
}

const CommunitiesScreen: React.FC = () => {
  const { profile } = useAuthStore();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [nftCollections, setNftCollections] = useState<NFTCollection[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const categories = ['all', 'Art', 'Gaming', 'Fashion', 'Lifestyle', 'Music'];

  // Scroll detection for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fetch communities from Supabase
  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const { data: communitiesData, error } = await supabase
          .from('communities')
          .select(`
            *,
            nft_collection:nft_collections(
              id,
              name,
              contract_address,
              description,
              image_url
            ),
            members:community_members(count)
          `)
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedCommunities = (communitiesData || []).map((comm: any) => ({
          ...comm,
          member_count: comm.members?.[0]?.count || 0,
          is_member: false,
          user_has_nft: true
        }));

        if (profile?.id) {
          const { data: membershipData } = await supabase
            .from('community_members')
            .select('community_id')
            .eq('user_id', profile.id);

          const memberCommunityIds = new Set(
            (membershipData || []).map((m: any) => m.community_id)
          );

          transformedCommunities.forEach((comm: Community) => {
            comm.is_member = memberCommunityIds.has(comm.id);
          });
        }

        setCommunities(transformedCommunities);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [profile?.id]);

  useEffect(() => {
    const fetchNFTCollections = async () => {
      try {
        const { data, error } = await supabase
          .from('nft_collections')
          .select('*')
          .order('name');

        if (error) throw error;
        setNftCollections(data || []);
      } catch (error) {
        console.error('Failed to fetch NFT collections:', error);
      }
    };

    fetchNFTCollections();
  }, []);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = async (community: Community) => {
    if (!profile?.id) {
      alert('Please log in to join communities');
      return;
    }

    if (!community.user_has_nft && community.required_nft_collection_id) {
      alert('🔒 You need to own the required NFT to join this community.');
      return;
    }

    try {
      const { error: memberError } = await supabase
        .from('community_members')
        .insert({
          community_id: community.id,
          user_id: profile.id,
          role: 'member',
          joined_at: new Date().toISOString()
        });

      if (memberError) throw memberError;

      const { data: chatData, error: chatError } = await supabase
        .from('community_chats')
        .select('id')
        .eq('community_id', community.id)
        .single();

      if (chatError && chatError.code !== 'PGRST116') throw chatError;

      let chatId = chatData?.id;

      if (!chatId) {
        const { data: newChat, error: newChatError } = await supabase
          .from('community_chats')
          .insert({
            community_id: community.id,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (newChatError) throw newChatError;
        chatId = newChat.id;
      }

      await supabase
        .from('community_chat_members')
        .insert({
          chat_id: chatId,
          user_id: profile.id,
          joined_at: new Date().toISOString()
        });

      setCommunities(communities.map(c => 
        c.id === community.id 
          ? { ...c, is_member: true, member_count: c.member_count + 1 }
          : c
      ));
      
      alert('✅ Successfully joined the community! Group chat is ready.');
    } catch (error: any) {
      console.error('Failed to join community:', error);
      alert(`❌ Failed to join community: ${error.message}`);
    }
  };

  const handleViewCommunity = (communityId: string) => {
    navigate(`/communities/${communityId}`);
  };

  const handleCreateSuccess = async (newCommunity: any) => {
    try {
      setLoading(true);
      const { data: communitiesData, error } = await supabase
        .from('communities')
        .select(`
          *,
          nft_collection:nft_collections(*),
          members:community_members(count)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedCommunities = (communitiesData || []).map((comm: any) => ({
        ...comm,
        member_count: comm.members?.[0]?.count || 0,
        is_member: comm.creator_id === profile?.id,
        user_has_nft: true
      }));

      setCommunities(transformedCommunities);
      setShowCreateModal(false);
      alert('✅ Community created successfully!');
    } catch (error) {
      console.error('Failed to refresh communities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="communities-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Regular Header (NOT Sticky) */}
      <div className="communities-header">
        <h1 className="page-title">Communities</h1>
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          Create
        </button>
      </div>

      {/* Category Filters */}
      <div className="communities-controls">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      {loading ? (
        <SkeletonGrid type="community" count={6} />
      ) : (
        <div className="communities-grid">
          {filteredCommunities.map(community => (
            <motion.div
              key={community.id}
              className={`community-card ${!community.user_has_nft && community.required_nft_collection_id ? 'locked' : ''}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => community.is_member && handleViewCommunity(community.id)}
              style={{ cursor: community.is_member ? 'pointer' : 'default' }}
            >
              <div className="community-cover">
                {community.banner_url ? (
                  <img src={community.banner_url} alt={community.name} />
                ) : (
                  <div className="emoji-cover">
                    {community.avatar_emoji}
                  </div>
                )}
                {!community.user_has_nft && community.required_nft_collection_id && (
                  <div className="lock-overlay">
                    <Lock size={32} />
                  </div>
                )}
                <div className="category-badge">{community.category}</div>
              </div>

              <div className="community-content">
                <h3>{community.name}</h3>
                <p className="description">{community.description}</p>

                <div className="community-meta">
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{community.member_count} members</span>
                  </div>
                  <div className="meta-item">
                    <MessageCircle size={16} />
                    <span>Active</span>
                  </div>
                </div>

                {community.nft_collection && (
                  <div className="nft-requirement">
                    <Lock size={14} />
                    <span>Requires: {community.nft_collection.name}</span>
                  </div>
                )}

                <button
                  className={`join-btn ${community.is_member ? 'joined' : !community.user_has_nft && community.required_nft_collection_id ? 'locked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (community.is_member) {
                      handleViewCommunity(community.id);
                    } else {
                      handleJoinCommunity(community);
                    }
                  }}
                >
                  {community.is_member ? (
                    'View Community'
                  ) : !community.user_has_nft && community.required_nft_collection_id ? (
                    <>
                      <Lock size={16} />
                      Locked
                    </>
                  ) : (
                    'Join Community'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredCommunities.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No communities found matching your search</p>
        </div>
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            title="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Create Community Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateCommunityModal 
            onClose={() => setShowCreateModal(false)} 
            nftCollections={nftCollections}
            onSuccess={handleCreateSuccess}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CommunitiesScreen;