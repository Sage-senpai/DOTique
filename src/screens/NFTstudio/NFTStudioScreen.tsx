// src/screens/Studio/NFTStudioScreen.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Upload, Layers, Zap, Star } from 'lucide-react';
import { ThreeDPreview, ARTryOn, ListNFTModal } from '../../components/NFT/AdvancedNFTComponents';
import CanvasStudio from './CanvasStudio';
import './NFTStudioScreen.scss';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  svg?: string;
  attributes: Array<{ trait_type: string; value: string }>;
  royalties?: {
    version: number;
    splitPercentage: Array<{ address: string; percent: number }>;
  };
  level?: number;
  experience?: number;
  nestable?: boolean;
  composable?: boolean;
  external_url?: string;
}

interface Draft {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  layers: any;
  rarity: string;
  royalty: number;
  price: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// ==========================================
// NFT STUDIO MAIN COMPONENT
// ==========================================

const NFTStudioScreen: React.FC = () => {
  const [currentView, setCurrentView] = useState<'studio' | 'drafts' | 'wardrobe'>('studio');
  const [metadata, setMetadata] = useState<NFTMetadata>({
    name: '',
    description: '',
    image: '',
    attributes: [
      { trait_type: 'Category', value: 'Fashion' },
      { trait_type: 'Style', value: 'Digital' }
    ],
    level: 1,
    experience: 0,
    nestable: false,
    composable: false,
  });
  const [royalty, setRoyalty] = useState(5);
  const [price, setPrice] = useState(0);
  const [edition, setEdition] = useState(1);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [wardrobeNFTs, setWardrobeNFTs] = useState<any[]>([]);
  const [mintedNFT, setMintedNFT] = useState<any>(null);
  
  const canvasRef = useRef<any>(null);

  // Load drafts and wardrobe from localStorage with dummy data
  React.useEffect(() => {
    const savedDrafts = localStorage.getItem('nft_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }

    let wardrobeData = localStorage.getItem('user_wardrobe');
    if (!wardrobeData) {
      // Add dummy wardrobe data
      const dummyWardrobe = [
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
          ipfs_hash: 'Qm123abc',
          tx_hash: '0xabc123',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: true
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
          ipfs_hash: 'Qm456def',
          tx_hash: '0xdef456',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: false
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
          ipfs_hash: 'Qm789ghi',
          tx_hash: '0xghi789',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: true
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
          ipfs_hash: 'Qm012jkl',
          tx_hash: '0xjkl012',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: false
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
          ipfs_hash: 'Qm345mno',
          tx_hash: '0xmno345',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: false
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
          ipfs_hash: 'Qm678pqr',
          tx_hash: '0xpqr678',
          created_at: new Date().toISOString(),
          status: 'minted',
          is_featured: true
        }
      ];
      localStorage.setItem('user_wardrobe', JSON.stringify(dummyWardrobe));
      setWardrobeNFTs(dummyWardrobe);
    } else {
      setWardrobeNFTs(JSON.parse(wardrobeData));
    }
  }, []);

  // Save draft
  const handleSaveDraft = async () => {
    try {
      const exported = await canvasRef.current?.exportAssets?.({ size: 1000 });
      if (!exported) throw new Error('Export failed');
      
      const draft: Draft = {
        id: Date.now().toString(),
        user_id: 'current_user',
        title: metadata.name || 'Untitled',
        description: metadata.description,
        image_url: exported.pngBase64,
        layers: [],
        rarity: 'common',
        royalty,
        price,
        tags: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const updatedDrafts = [...drafts, draft];
      setDrafts(updatedDrafts);
      localStorage.setItem('nft_drafts', JSON.stringify(updatedDrafts));
      
      alert('✅ Draft saved successfully!');
    } catch (err: any) {
      console.error('Save draft error:', err);
      alert('❌ Failed to save draft: ' + err.message);
    }
  };

  // ==========================================
// LOAD DRAFT INTO STUDIO
// ==========================================
const handleEditDraft = (draft: Draft) => {
  setMetadata({
    name: draft.title,
    description: draft.description,
    image: draft.image_url,
    attributes: [
      { trait_type: 'Category', value: 'Fashion' },
      { trait_type: 'Rarity', value: draft.rarity },
    ],
  });

  setRoyalty(draft.royalty);
  setPrice(draft.price);

  // Step 1 — switch view first
  setCurrentView('studio');

  // Step 2 — then wait for CanvasStudio to mount
  setTimeout(() => {
    if (canvasRef.current) {
      if (draft.layers?.length > 0) {
        canvasRef.current.loadLayers(draft.layers);
      } else if (draft.image_url) {
        canvasRef.current.loadImageFromDataURL(draft.image_url);
      }
    }
  }, 250); // delay just enough for the canvas to render
};


  // Export and prepare for mint
  const handleExportAndMint = async () => {
    try {
      setIsExporting(true);
      const exported = await canvasRef.current?.exportAssets?.({ size: 1000 });
      if (!exported) throw new Error('Export failed');
      
      setMetadata(prev => ({
        ...prev,
        image: exported.pngBase64,
        svg: exported.svgString
      }));
      
      setShowMetadataModal(true);
    } catch (err: any) {
      console.error('Export error:', err);
      alert('❌ Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Add attribute
  const addAttribute = () => {
    setMetadata(prev => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }]
    }));
  };

  // Update attribute
  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    setMetadata(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  // Remove attribute
  const removeAttribute = (index: number) => {
    setMetadata(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  // Proceed to mint
  const handleProceedToMint = () => {
    if (!metadata.name) {
      alert('Please enter a name for your NFT');
      return;
    }
    setShowMetadataModal(false);
    setShowMintModal(true);
  };

  // Mock mint function
  const handleMint = async () => {
    setIsMinting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newNFT = {
        id: Date.now().toString(),
        token_id: `TOKEN_${Date.now()}`,
        chain: 'unique-network',
        metadata,
        ipfs_hash: `Qm${Math.random().toString(36).substring(7)}`,
        tx_hash: `0x${Math.random().toString(36).substring(7)}`,
        created_at: new Date().toISOString(),
        status: 'minted'
      };
      
      const updatedWardrobe = [...wardrobeNFTs, newNFT];
      setWardrobeNFTs(updatedWardrobe);
      localStorage.setItem('user_wardrobe', JSON.stringify(updatedWardrobe));
      
      setMintedNFT(newNFT);
      alert(`✅ Successfully minted! Token ID: ${newNFT.token_id}`);
      setShowMintModal(false);
      setShowListModal(true);
      
      canvasRef.current?.clearCanvas?.();
      setMetadata({
        name: '',
        description: '',
        image: '',
        attributes: [
          { trait_type: 'Category', value: 'Fashion' },
          { trait_type: 'Style', value: 'Digital' }
        ],
        level: 1,
        experience: 0,
        nestable: false,
        composable: false,
      });
    } catch (err: any) {
      console.error('Mint error:', err);
      alert('❌ Mint failed: ' + err.message);
    } finally {
      setIsMinting(false);
    }
  };

  // Handle listing
  const handleListNFT = async (listingData: any) => {
    try {
      console.log('Listing NFT:', mintedNFT, listingData);
      alert('NFT listed successfully!');
      setShowListModal(false);
      setCurrentView('wardrobe');
    } catch (err) {
      console.error('Failed to list NFT:', err);
      alert('Failed to list NFT');
    }
  };

  return (
    <div className="nft-studio-app">
      {/* Navigation */}
      <nav className="studio-nav">
        <button
          className={currentView === 'studio' ? 'active' : ''}
          onClick={() => setCurrentView('studio')}
        >
          🎨 Studio
        </button>
        <button
          className={currentView === 'drafts' ? 'active' : ''}
          onClick={() => setCurrentView('drafts')}
        >
          📝 Drafts ({drafts.length})
        </button>
        <button
          className={currentView === 'wardrobe' ? 'active' : ''}
          onClick={() => setCurrentView('wardrobe')}
        >
          👗 Wardrobe ({wardrobeNFTs.length})
        </button>
      </nav>

      {/* Studio View */}
      {currentView === 'studio' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="studio-view"
        >
          <h2 className="studio-title">🎨 NFT Design Studio</h2>
          <p className="studio-subtitle">Create unique fashion NFTs on Unique Network</p>

          <div className="studio-content">
            <CanvasStudio ref={canvasRef} />
            
            <div className="studio-properties">
              <h3>Properties</h3>
              
              <div className="property-field">
                <label>Name *</label>
                <input
                  type="text"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="My Fashion NFT"
                />
              </div>
              
              <div className="property-field">
                <label>Description</label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Describe your NFT..."
                  rows={3}
                />
              </div>
              
              <div className="property-row">
                <div className="property-field">
                  <label>Royalty %</label>
                  <input
                    type="number"
                    value={royalty}
                    onChange={(e) => setRoyalty(Number(e.target.value))}
                    min="0"
                    max="50"
                  />
                </div>
                
                <div className="property-field">
                  <label>Edition</label>
                  <input
                    type="number"
                    value={edition}
                    onChange={(e) => setEdition(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>

              {/* Advanced Features */}
              <div className="property-section">
                <h4><Zap size={16} /> Dynamic Attributes</h4>
                <div className="property-row">
                  <div className="property-field">
                    <label>Level</label>
                    <input
                      type="number"
                      value={metadata.level}
                      onChange={(e) => setMetadata({ ...metadata, level: Number(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div className="property-field">
                    <label>Experience</label>
                    <input
                      type="number"
                      value={metadata.experience}
                      onChange={(e) => setMetadata({ ...metadata, experience: Number(e.target.value) })}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="property-section">
                <h4><Layers size={16} /> Composability</h4>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={metadata.nestable}
                    onChange={(e) => setMetadata({ ...metadata, nestable: e.target.checked })}
                  />
                  <span>Nestable (can own other NFTs)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={metadata.composable}
                    onChange={(e) => setMetadata({ ...metadata, composable: e.target.checked })}
                  />
                  <span>Composable (can be combined)</span>
                </label>
              </div>

              {/* Attributes */}
              <div className="property-section">
                <div className="section-header">
                  <h4><Star size={16} /> Attributes</h4>
                  <button className="btn-add" onClick={addAttribute}>+ Add</button>
                </div>

                {metadata.attributes.map((attr, index) => (
                  <div key={index} className="attribute-row">
                    <input
                      type="text"
                      placeholder="Trait"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    />
                    <button className="btn-remove" onClick={() => removeAttribute(index)}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="studio-actions">
            <button className="btn-secondary" onClick={handleSaveDraft}>
              <Save size={18} /> Save Draft
            </button>
            <button className="btn-primary" onClick={handleExportAndMint} disabled={isExporting}>
              {isExporting ? '⏳ Processing...' : '🚀 Export & Mint'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Drafts View */}
      {currentView === 'drafts' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="drafts-view"
        >
          <h2>📝 Your Drafts</h2>
          <div className="drafts-grid">
            {drafts.map(draft => (
              <div key={draft.id} className="draft-card">
                <img src={draft.image_url} alt={draft.title} />
                <h3>{draft.title}</h3>
                <p>{draft.description}</p>
                <div className="draft-meta">
                  <span className="rarity">{draft.rarity}</span>
                  <span className="royalty">{draft.royalty}% royalty</span>
                </div>
               <button className="btn-edit" onClick={() => handleEditDraft(draft)}>
  Edit
</button>


              </div>
            ))}
            {drafts.length === 0 && (
              <p className="empty-state">No drafts yet. Start creating!</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Wardrobe View */}
      {currentView === 'wardrobe' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="wardrobe-view"
        >
          <h2>👗 Your Wardrobe</h2>
          <div className="wardrobe-grid">
            {wardrobeNFTs.map(nft => (
              <div key={nft.id} className="wardrobe-card">
                <img src={nft.metadata.image} alt={nft.metadata.name} />
                <h3>{nft.metadata.name}</h3>
                <p className="token-id">Token: {nft.token_id}</p>
                <div className="nft-status">
                  <span className={`status ${nft.status}`}>{nft.status}</span>
                </div>
              </div>
            ))}
            {wardrobeNFTs.length === 0 && (
              <p className="empty-state">No NFTs in your wardrobe yet. Mint your first!</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Metadata Modal */}
      <AnimatePresence>
        {showMetadataModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMetadataModal(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>NFT Metadata</h3>
              
              <div className="modal-preview">
                <img src={metadata.image} alt="Preview" />
              </div>

              <div className="modal-field">
                <label>Name *</label>
                <input
                  type="text"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="My Fashion NFT"
                />
              </div>

              <div className="modal-field">
                <label>Description</label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Describe your NFT..."
                  rows={3}
                />
              </div>

              <div className="modal-section">
                <div className="section-header">
                  <label>Attributes</label>
                  <button className="btn-add" onClick={addAttribute}>+ Add</button>
                </div>
                
                {metadata.attributes.map((attr, index) => (
                  <div key={index} className="attribute-row">
                    <input
                      type="text"
                      placeholder="Trait"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    />
                    <button className="btn-remove" onClick={() => removeAttribute(index)}>✕</button>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowMetadataModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleProceedToMint}>
                  Continue to Mint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mint Modal */}
      <AnimatePresence>
        {showMintModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isMinting && setShowMintModal(false)}
          >
            <motion.div
              className="modal mint-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Mint NFT</h3>
              
              <ThreeDPreview
                imageUrl={metadata.image}
                name={metadata.name}
              />

              <ARTryOn nft={{ image: metadata.image, name: metadata.name }} />
              
              <div className="mint-summary">
                <h4>{metadata.name}</h4>
                <div className="mint-details">
                  <div className="detail-row">
                    <span>Royalty:</span>
                    <span>{royalty}%</span>
                  </div>
                  <div className="detail-row">
                    <span>Edition:</span>
                    <span>{edition}</span>
                  </div>
                  <div className="detail-row">
                    <span>Level:</span>
                    <span>{metadata.level}</span>
                  </div>
                  <div className="detail-row">
                    <span>Nestable:</span>
                    <span>{metadata.nestable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Composable:</span>
                    <span>{metadata.composable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Network:</span>
                    <span>Unique Network (Polkadot)</span>
                  </div>
                </div>
              </div>

              <div className="mint-info">
                <p>💡 Your NFT will be minted with:</p>
                <ul>
                  <li>✅ On-chain metadata</li>
                  <li>✅ Royalty enforcement</li>
                  <li>✅ IPFS storage</li>
                  <li>✅ Cross-chain compatibility</li>
                </ul>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-secondary" 
                  onClick={() => setShowMintModal(false)}
                  disabled={isMinting}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleMint}
                  disabled={isMinting}
                >
                  {isMinting ? '⏳ Minting...' : '🎨 Mint NFT'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List Modal */}
      {mintedNFT && (
        <ListNFTModal
          nft={mintedNFT}
          isOpen={showListModal}
          onClose={() => {
            setShowListModal(false);
            setCurrentView('wardrobe');
          }}
          onList={handleListNFT}
        />
      )}
    </div>
  );
};

export default NFTStudioScreen;