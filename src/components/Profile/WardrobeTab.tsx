// src/components/Profile/WardrobeTab.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';
import './WardrobeTab.scss';

interface NFT {
  id: string;
  token_id: string;
  metadata: {
    name: string;
    image: string;
    description?: string;
  };
  rarity?: string;
  status?: string;
}

export default function WardrobeTab() {
  const { profile } = useAuthStore();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWardrobe();
  }, [profile?.id]);

  const loadWardrobe = async () => {
    try {
      if (!profile?.id) return;

      // Fetch user's NFTs
      const { data: nftData, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('owner_id', profile.id)
        .eq('status', 'minted')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNfts(nftData || []);
    } catch (err) {
      console.error('Failed to load wardrobe:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="wardrobe-tab">
        <div className="wardrobe-tab__loading">Loading wardrobe...</div>
      </div>
    );
  }

  return (
    <div className="wardrobe-tab">
      {/* Left Section - DotVatar Display */}
      <div className="wardrobe-tab__dotvatar-section">
        <div className="dotvatar-viewer">
          <div className="dotvatar-viewer__header">
            <h3>My DotVatar</h3>
            <button className="btn-edit" onClick={() => window.location.href = '/dotvatar'}>Edit</button>
          </div>

          <div className="dotvatar-viewer__canvas">
            {profile?.dotvatar_url ? (
              <img 
                src={profile.dotvatar_url} 
                alt="DotVatar" 
                className="dotvatar-image"
              />
            ) : (
              <div className="dotvatar-placeholder">
                <span className="placeholder-icon">🪞</span>
                <p>No DotVatar configured</p>
              </div>
            )}
          </div>

          {profile?.dotvatar_config && (
            <div className="dotvatar-viewer__customization">
              <h4>Current Customization</h4>
              <div className="customization-details">
                {Object.entries(profile.dotvatar_config).map(([key, value]) => (
                  <div key={key} className="customization-item">
                    <span className="item-label">{key}:</span>
                    <span className="item-value">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - NFT Collection */}
      <div className="wardrobe-tab__nft-section">
        <div className="nft-collection">
          <div className="nft-collection__header">
            <h3>My Fashion NFTs</h3>
            <div className="collection-stats">
              <span className="stat">
                <span className="stat-value">{nfts.length}</span>
                <span className="stat-label">Items</span>
              </span>
            </div>
          </div>

          {nfts.length > 0 ? (
            <div className="nft-collection__grid">
              {nfts.map((nft) => (
                <motion.div
                  key={nft.id}
                  className="nft-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="nft-card__image">
                    <img 
                      src={nft.metadata?.image} 
                      alt={nft.metadata?.name || `Token #${nft.token_id}`}
                    />
                    
                    {/* Ownership Badge */}
                    <div className="nft-card__ownership">
                      <Lock size={12} />
                      <span>Owned</span>
                    </div>
                  </div>

                  <div className="nft-card__info">
                    <h4 className="nft-card__name">
                      {nft.metadata?.name || `Token #${nft.token_id}`}
                    </h4>
                    
                    <div className="nft-card__details">
                      <div className="detail-row">
                        <span className="detail-label">Token ID:</span>
                        <span className="detail-value">
                          #{nft.token_id.slice(0, 8)}...
                        </span>
                      </div>
                      
                      {nft.rarity && (
                        <div className="detail-row">
                          <span className="detail-label">Rarity:</span>
                          <span className={`rarity-badge rarity-${nft.rarity.toLowerCase()}`}>
                            {nft.rarity}
                          </span>
                        </div>
                      )}

                      <div className="detail-row">
                        <span className="detail-label">Owner:</span>
                        <span className="detail-value owner-you">
                          You
                        </span>
                      </div>

                      <div className="detail-row protection-status">
                        <Shield size={14} className="protection-icon" />
                        <span className="protection-text">
                          NFT Protection Active
                        </span>
                      </div>
                    </div>

                    <div className="nft-card__actions">
                      <button className="action-btn action-btn--view">
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="nft-collection__empty">
              <div className="empty-icon">👗</div>
              <p className="empty-text">No NFTs in your wardrobe yet</p>
              <button className="btn-primary" onClick={() => window.location.href = '/nft-studio'}>
                Create Your First NFT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}