// src/screens/Profile/ProfileWardrobe.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Grid, List, Star, Eye, EyeOff, Layers, TrendingUp } from 'lucide-react';
import { ThreeDPreview, ListNFTModal, NFTAnalytics } from '../../components/NFT/AdvancedNFTComponents';
import './ProfileWardrobe.scss';

interface WardrobeNFT {
  id: string;
  nfts: {
    id: string;
    token_id: string;
    metadata: {
      name: string;
      image: string;
      glb?: string;
      nestable?: boolean;
      composable?: boolean;
      level?: number;
      experience?: number;
    };
    rarity?: string;
  };
  is_featured: boolean;
}

export default function ProfileWardrobe() {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<WardrobeNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'featured' | 'nestable' | 'composable'>('all');
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [composing, setComposing] = useState(false);

  // Load NFTs from localStorage with dummy data
  useEffect(() => {
    const loadWardrobe = () => {
      try {
        let wardrobeData = localStorage.getItem('user_wardrobe');
        
        // If no data exists, create dummy data
        if (!wardrobeData) {
          const dummyNFTs = [
            {
              id: '1',
              token_id: 'TOKEN_001',
              chain: 'unique-network',
              metadata: {
                name: 'Cyber Punk Jacket',
                description: 'A futuristic neon jacket for the metaverse',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
                level: 5,
                experience: 250,
                nestable: true,
                composable: true,
              },
              rarity: 'Epic',
              is_featured: true,
              status: 'minted'
            },
            {
              id: '2',
              token_id: 'TOKEN_002',
              chain: 'unique-network',
              metadata: {
                name: 'Holographic Sneakers',
                description: 'Limited edition holographic footwear',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                level: 3,
                experience: 120,
                nestable: false,
                composable: true,
              },
              rarity: 'Rare',
              is_featured: false,
              status: 'minted'
            },
            {
              id: '3',
              token_id: 'TOKEN_003',
              chain: 'unique-network',
              metadata: {
                name: 'Neon Visor',
                description: 'High-tech AR visor with neon accents',
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
                level: 7,
                experience: 480,
                nestable: true,
                composable: false,
              },
              rarity: 'Legendary',
              is_featured: true,
              status: 'minted'
            },
            {
              id: '4',
              token_id: 'TOKEN_004',
              chain: 'unique-network',
              metadata: {
                name: 'Digital Gloves',
                description: 'Interactive haptic feedback gloves',
                image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
                level: 2,
                experience: 75,
                nestable: false,
                composable: true,
              },
              rarity: 'Common',
              is_featured: false,
              status: 'minted'
            },
            {
              id: '5',
              token_id: 'TOKEN_005',
              chain: 'unique-network',
              metadata: {
                name: 'Tech Pants',
                description: 'Smart fabric pants with LED strips',
                image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
                level: 4,
                experience: 180,
                nestable: false,
                composable: true,
              },
              rarity: 'Rare',
              is_featured: false,
              status: 'minted'
            },
            {
              id: '6',
              token_id: 'TOKEN_006',
              chain: 'unique-network',
              metadata: {
                name: 'Quantum Backpack',
                description: 'Infinite storage quantum backpack',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                level: 6,
                experience: 350,
                nestable: true,
                composable: false,
              },
              rarity: 'Epic',
              is_featured: true,
              status: 'minted'
            },
            {
              id: '7',
              token_id: 'TOKEN_007',
              chain: 'unique-network',
              metadata: {
                name: 'Cyber Goggles',
                description: 'Night vision cyber goggles',
                image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400',
                level: 5,
                experience: 220,
                nestable: true,
                composable: true,
              },
              rarity: 'Epic',
              is_featured: false,
              status: 'minted'
            },
            {
              id: '8',
              token_id: 'TOKEN_008',
              chain: 'unique-network',
              metadata: {
                name: 'Neon Boots',
                description: 'Glowing neon boots with hover capability',
                image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
                level: 8,
                experience: 520,
                nestable: false,
                composable: true,
              },
              rarity: 'Legendary',
              is_featured: true,
              status: 'minted'
            }
          ];
          
          localStorage.setItem('user_wardrobe', JSON.stringify(dummyNFTs));
          wardrobeData = JSON.stringify(dummyNFTs);
        }
        
        const parsedNFTs = JSON.parse(wardrobeData);
        // Transform to match expected structure
        const transformedNFTs = parsedNFTs.map((nft: any) => ({
          id: nft.id,
          nfts: {
            id: nft.id,
            token_id: nft.token_id,
            metadata: nft.metadata,
            rarity: nft.rarity || 'Common'
          },
          is_featured: nft.is_featured || false
        }));
        setNfts(transformedNFTs);
      } catch (err) {
        console.error('Failed to load wardrobe:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWardrobe();
  }, []);

  const filteredNFTs = nfts.filter((item) => {
    const nft = item.nfts;
    if (filter === 'featured') return item.is_featured;
    if (filter === 'nestable') return nft.metadata?.nestable;
    if (filter === 'composable') return nft.metadata?.composable;
    return true;
  });

  const handleSelectNFT = (nftId: string) => {
    setSelectedNFTs((prev) =>
      prev.includes(nftId) ? prev.filter((id) => id !== nftId) : [...prev, nftId]
    );
  };

  const handleComposeNFTs = async () => {
    if (selectedNFTs.length < 2) {
      alert('Select at least 2 NFTs to compose');
      return;
    }

    setComposing(true);
    try {
      // Simulate composition
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const composedNFT = {
        id: Date.now().toString(),
        token_id: `COMPOSED_${Date.now()}`,
        metadata: {
          name: 'Composite Fashion NFT',
          image: nfts.find(n => selectedNFTs.includes(n.id))?.nfts.metadata.image || '',
          composable: true,
          level: 1,
          experience: 0
        },
        rarity: 'Epic',
        is_featured: false,
        created_at: new Date().toISOString(),
        status: 'minted'
      };

      // Add to wardrobe
      const updatedWardrobe = [...nfts, {
        id: composedNFT.id,
        nfts: {
          id: composedNFT.id,
          token_id: composedNFT.token_id,
          metadata: composedNFT.metadata,
          rarity: composedNFT.rarity
        },
        is_featured: false
      }];

      setNfts(updatedWardrobe);
      localStorage.setItem('user_wardrobe', JSON.stringify(updatedWardrobe));
      
      alert(`✅ Composed successfully! Token ID: ${composedNFT.token_id}`);
      setSelectedNFTs([]);
      setShowCompose(false);
    } catch (err) {
      console.error('Failed to compose:', err);
      alert('Failed to compose NFTs');
    } finally {
      setComposing(false);
    }
  };

  const setFeatured = (nftId: string, featured: boolean) => {
    const updatedNFTs = nfts.map(nft => 
      nft.id === nftId ? { ...nft, is_featured: featured } : nft
    );
    setNfts(updatedNFTs);
    
    // Save to localStorage
    const wardrobeData = updatedNFTs.map(item => ({
      ...item.nfts,
      is_featured: item.is_featured
    }));
    localStorage.setItem('user_wardrobe', JSON.stringify(wardrobeData));
  };

  const handleListNFT = async (listingData: any) => {
    try {
      console.log('Listing NFT:', selectedNFT, listingData);
      alert('NFT listed successfully!');
      setShowListModal(false);
    } catch (err) {
      console.error('Failed to list NFT:', err);
      alert('Failed to list NFT');
    }
  };

  if (loading) {
    return (
      <div className="wardrobe-screen">
        <div className="wardrobe-screen__loading">
          <div className="spinner"></div>
          <p>Loading wardrobe...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="wardrobe-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="wardrobe-screen__header">
        <button className="wardrobe-screen__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="wardrobe-screen__title">Wardrobe Gallery</h2>
        <button
          className="wardrobe-screen__analytics"
          onClick={() => setShowAnalytics(!showAnalytics)}
          title="Toggle Analytics"
        >
          <TrendingUp size={20} />
        </button>
      </div>

      {/* Analytics */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="analytics-container"
          >
            <NFTAnalytics />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="wardrobe-screen__controls">
        <div className="filter-buttons">
          {(['all', 'featured', 'nestable', 'composable'] as const).map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && <Filter size={16} />}
              {f === 'featured' && <Star size={16} />}
              {f === 'nestable' && <Layers size={16} />}
              {f === 'composable' && <Layers size={16} />}
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="view-buttons">
          <button
            className={view === 'grid' ? 'active' : ''}
            onClick={() => setView('grid')}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Composition Mode */}
      <AnimatePresence>
        {selectedNFTs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="composition-bar"
          >
            <span>{selectedNFTs.length} NFTs selected</span>
            <div className="composition-actions">
              <button 
                className="btn-compose" 
                onClick={handleComposeNFTs} 
                disabled={composing || selectedNFTs.length < 2}
              >
                {composing ? '⏳ Composing...' : '🔗 Compose Selected'}
              </button>
              <button className="btn-cancel" onClick={() => setSelectedNFTs([])}>
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NFT Grid/List */}
      <div className={`wardrobe-screen__content wardrobe-screen__content--${view}`}>
        {filteredNFTs.length > 0 ? (
          filteredNFTs.map((item) => {
            const nft = item.nfts;
            const isSelected = selectedNFTs.includes(nft.id);

            return (
              <motion.div
                key={nft.id}
                className={`nft-card ${isSelected ? 'nft-card--selected' : ''} ${view === 'list' ? 'nft-card--list' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  if (showCompose) {
                    handleSelectNFT(nft.id);
                  } else {
                    navigate(`/marketplace/nft/${nft.id}`);
                  }
                }}
              >
                {/* Preview */}
                <div className="nft-card__image">
                  {nft.metadata?.glb ? (
                    <ThreeDPreview
                      modelUrl={nft.metadata.glb}
                      imageUrl={nft.metadata.image}
                      name={nft.metadata.name}
                    />
                  ) : (
                    <img src={nft.metadata?.image} alt={nft.token_id} />
                  )}

                  {/* Selection Overlay */}
                  {showCompose && (
                    <div className="nft-card__select-overlay">
                      <div className={`select-checkbox ${isSelected ? 'checked' : ''}`}>
                        {isSelected && '✓'}
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="nft-card__badges">
                    {item.is_featured && (
                      <span className="badge badge--featured">
                        <Star size={14} /> Featured
                      </span>
                    )}
                    {nft.metadata?.nestable && (
                      <span className="badge badge--nestable">
                        <Layers size={14} /> Nestable
                      </span>
                    )}
                    {nft.metadata?.composable && (
                      <span className="badge badge--composable">
                        <Layers size={14} /> Composable
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="nft-card__info">
                  <h4>{nft.metadata?.name || `Token #${nft.token_id}`}</h4>
                  <p className="nft-card__rarity">{nft.rarity || 'Common'}</p>

                  {/* Dynamic Stats */}
                  {nft.metadata?.level && (
                    <div className="nft-stats">
                      <div className="stat">
                        <span className="stat-label">Level</span>
                        <span className="stat-value">{nft.metadata.level}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">XP</span>
                        <span className="stat-value">{nft.metadata.experience || 0}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="nft-card__actions">
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeatured(nft.id, !item.is_featured);
                      }}
                      title={item.is_featured ? 'Unfeature' : 'Feature'}
                    >
                      {item.is_featured ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      className="action-btn action-btn--primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNFT(nft);
                        setShowListModal(true);
                      }}
                    >
                      List for Sale
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <motion.div 
            className="wardrobe-screen__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="wardrobe-screen__empty-icon">👗</div>
            <p className="wardrobe-screen__empty-text">
              {filter === 'all' 
                ? 'No NFTs in your wardrobe yet' 
                : `No ${filter} NFTs found`}
            </p>
            {filter === 'all' && (
              <button className="btn-primary" onClick={() => navigate('/nft-studio')}>
                Create Your First NFT
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        className={`fab ${showCompose ? 'fab--active' : ''}`}
        onClick={() => {
          setShowCompose(!showCompose);
          if (showCompose) setSelectedNFTs([]);
        }}
        title={showCompose ? 'Exit Compose Mode' : 'Enter Compose Mode'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Layers size={24} />
      </motion.button>

      {/* List Modal */}
      {selectedNFT && (
        <ListNFTModal
          nft={selectedNFT}
          isOpen={showListModal}
          onClose={() => setShowListModal(false)}
          onList={handleListNFT}
        />
      )}
    </motion.div>
  );
}