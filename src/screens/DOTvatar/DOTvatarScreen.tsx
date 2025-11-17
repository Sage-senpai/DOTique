// src/screens/DOTvatar/DOTvatarScreen.tsx - PRODUCTION READY
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, ShoppingBag, Shirt, User, Palette, Smile, Camera, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';
import html2canvas from 'html2canvas';
import './DOTvatarScreen.scss';

interface DOTvatarConfig {
  skinTone: string;
  bodyType: string;
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  eyebrowShape: string;
  noseShape: string;
  mouthShape: string;
  hairStyle: string;
  hairColor: string;
  shirt: string | null;
  pants: string | null;
  shoes: string | null;
  accessories: string[];
  pose: string;
}

const DEFAULT_CONFIG: DOTvatarConfig = {
  skinTone: '#FFE0BD',
  bodyType: 'average',
  faceShape: 'oval',
  eyeShape: 'almond',
  eyeColor: '#4A3C2F',
  eyebrowShape: 'natural',
  noseShape: 'average',
  mouthShape: 'smile',
  hairStyle: 'short',
  hairColor: '#3D2314',
  shirt: 'basic-tee',
  pants: 'jeans',
  shoes: 'sneakers',
  accessories: [],
  pose: 'neutral'
};

const SKIN_TONES = [
  { name: 'Fair', value: '#FFE0BD' },
  { name: 'Light', value: '#F1C27D' },
  { name: 'Medium', value: '#C68642' },
  { name: 'Olive', value: '#8D5524' },
  { name: 'Brown', value: '#5C3317' },
  { name: 'Dark', value: '#3D2314' }
];

const EYE_SHAPES = ['almond', 'round', 'hooded', 'upturned', 'downturned'];
const EYE_COLORS = [
  { name: 'Brown', value: '#4A3C2F' },
  { name: 'Blue', value: '#5B9BD5' },
  { name: 'Green', value: '#70AD47' },
  { name: 'Hazel', value: '#806517' },
  { name: 'Gray', value: '#808080' }
];

const HAIR_STYLES = [
  'bald', 'short', 'medium', 'long', 'curly', 'wavy', 
  'straight', 'afro', 'braids', 'bun', 'ponytail'
];

const HAIR_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Brown', value: '#3D2314' },
  { name: 'Brown', value: '#6F4E37' },
  { name: 'Blonde', value: '#F4C430' },
  { name: 'Red', value: '#C04000' },
  { name: 'Auburn', value: '#A52A2A' },
  { name: 'Gray', value: '#808080' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Pink', value: '#FF69B4' },
  { name: 'Blue', value: '#0080FF' },
  { name: 'Purple', value: '#9B30FF' },
  { name: 'Green', value: '#00FF00' }
];

const FREE_CLOTHING = {
  shirts: [
    { id: 'basic-tee', name: 'Basic T-Shirt', color: '#FFFFFF', isFree: true },
    { id: 'tank-top', name: 'Tank Top', color: '#000000', isFree: true },
    { id: 'hoodie', name: 'Hoodie', color: '#808080', isFree: true },
    { id: 'button-up', name: 'Button-Up', color: '#4A90E2', isFree: true }
  ],
  pants: [
    { id: 'jeans', name: 'Blue Jeans', color: '#1E3A8A', isFree: true },
    { id: 'shorts', name: 'Shorts', color: '#6B7280', isFree: true },
    { id: 'joggers', name: 'Joggers', color: '#1F2937', isFree: true }
  ],
  shoes: [
    { id: 'sneakers', name: 'Sneakers', color: '#FFFFFF', isFree: true },
    { id: 'boots', name: 'Boots', color: '#3D2314', isFree: true },
    { id: 'sandals', name: 'Sandals', color: '#8B4513', isFree: true }
  ]
};

export default function DOTvatarScreen() {
  const { profile, setProfile } = useAuthStore();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<DOTvatarConfig>(DEFAULT_CONFIG);
  const [activeCategory, setActiveCategory] = useState<'body' | 'face' | 'hair' | 'clothing'>('body');
  const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved DOTvatar
  useEffect(() => {
    if (!profile?.id) return;
    
    const loadDOTvatar = async () => {
      try {
        // Check if profile has dotvatar_config
        if (profile.dotvatar_config) {
          setConfig({ ...DEFAULT_CONFIG, ...profile.dotvatar_config });
        }
      } catch (error) {
        console.error('Failed to load DOTvatar:', error);
      }
    };

    loadDOTvatar();
  }, [profile?.id, profile?.dotvatar_config]);

  // Load user's wardrobe NFTs
  useEffect(() => {
    const loadWardrobe = async () => {
      try {
        if (!profile?.id) return;

        // Try to fetch from database first
        const { data: nftData, error } = await supabase
          .from('nfts')
          .select('*')
          .eq('owner_id', profile.id)
          .eq('status', 'minted');

        if (!error && nftData && nftData.length > 0) {
          setOwnedNFTs(nftData);
        } else {
          // Fallback to localStorage
          const wardrobeData = localStorage.getItem('user_wardrobe');
          if (wardrobeData) {
            const nfts = JSON.parse(wardrobeData);
            const clothingNFTs = nfts.filter((nft: any) => 
              ['clothing', 'accessory', 'fashion'].includes(nft.category?.toLowerCase())
            );
            setOwnedNFTs(clothingNFTs);
          }
        }
      } catch (error) {
        console.error('Failed to load wardrobe:', error);
      }
    };

    loadWardrobe();
  }, [profile?.id]);

  // ✅ Generate preview image using html2canvas
  const generatePreviewImage = async (): Promise<string> => {
    if (!canvasRef.current) throw new Error("Canvas ref not available");

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#1e202c',
        scale: 2,
        logging: false
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to generate preview:', error);
      throw error;
    }
  };

  // ✅ Upload image to Supabase Storage
  const uploadToStorage = async (base64Image: string): Promise<string> => {
    try {
      // Convert base64 to blob
      const response = await fetch(base64Image);
      const blob = await response.blob();

      const fileName = `dotvatar_${profile?.id}_${Date.now()}.png`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Failed to upload to storage:', error);
      throw error;
    }
  };

  // ✅ Save DOTvatar
  const handleSave = async () => {
    if (!profile?.id) {
      alert("Please log in to save your DOTvatar");
      return;
    }

    setSaving(true);
    try {
      console.log("📸 Generating preview image...");
      const previewDataUrl = await generatePreviewImage();

      console.log("☁️ Uploading to Supabase Storage...");
      const publicUrl = await uploadToStorage(previewDataUrl);

      console.log("💾 Saving configuration to database...");
      // Update profile with DOTvatar config and URL
      const { error } = await supabase
        .from('profiles')
        .update({
          dotvatar_url: publicUrl,
          dotvatar_config: config,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update local profile state
      setProfile({
        ...profile,
        dotvatar_url: publicUrl,
        dotvatar_config: config
      });

      setHasChanges(false);
      alert('✅ DOTvatar saved successfully!');
      
      // Optionally redirect to profile
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error: any) {
      console.error('Failed to save DOTvatar:', error);
      alert(`❌ Failed to save DOTvatar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your DOTvatar to default?')) {
      setConfig(DEFAULT_CONFIG);
      setHasChanges(true);
    }
  };

  const handleDownload = async () => {
    try {
      const previewDataUrl = await generatePreviewImage();
      
      // Create download link
      const link = document.createElement('a');
      link.href = previewDataUrl;
      link.download = `DOTvatar_${Date.now()}.png`;
      link.click();
      
      alert('✅ DOTvatar downloaded!');
    } catch (error) {
      console.error('Failed to download:', error);
      alert('❌ Failed to download DOTvatar');
    }
  };

  const updateConfig = (key: keyof DOTvatarConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  return (
    <motion.div
      className="dotvatar-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="dotvatar-header">
        <div className="dotvatar-header__left">
          <h1>DOTvatar Studio</h1>
          <p>Customize your digital avatar</p>
          {hasChanges && <span className="unsaved-badge">Unsaved changes</span>}
        </div>
        <div className="dotvatar-header__actions">
          <button className="dotvatar-btn dotvatar-btn--secondary" onClick={handleReset}>
            <RotateCcw size={18} />
            Reset
          </button>
          <button className="dotvatar-btn dotvatar-btn--secondary" onClick={handleDownload}>
            <Download size={18} />
            Download
          </button>
          <button 
            className="dotvatar-btn dotvatar-btn--primary" 
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save & Apply'}
          </button>
          <button 
            className="dotvatar-btn dotvatar-btn--secondary"
            onClick={() => navigate('/marketplace?filter=clothing')}
          >
            <ShoppingBag size={18} />
            Shop NFTs
          </button>
        </div>
      </div>

      <div className="dotvatar-content">
        {/* Left Sidebar - Preview */}
        <div className="dotvatar-preview">
          <div className="dotvatar-preview__canvas" ref={canvasRef}>
            <DOTvatarRenderer config={config} />
          </div>
          <div className="dotvatar-preview__info">
            <h3>Preview</h3>
            <p>This is how your DOTvatar will appear across DOTique</p>
          </div>
        </div>

        {/* Right Panel - Customization */}
        <div className="dotvatar-customizer">
          {/* Category Tabs */}
          <div className="customizer-tabs">
            <button
              className={`customizer-tab ${activeCategory === 'body' ? 'active' : ''}`}
              onClick={() => setActiveCategory('body')}
            >
              <User size={20} />
              <span>Body</span>
            </button>
            <button
              className={`customizer-tab ${activeCategory === 'face' ? 'active' : ''}`}
              onClick={() => setActiveCategory('face')}
            >
              <Smile size={20} />
              <span>Face</span>
            </button>
            <button
              className={`customizer-tab ${activeCategory === 'hair' ? 'active' : ''}`}
              onClick={() => setActiveCategory('hair')}
            >
              <Palette size={20} />
              <span>Hair</span>
            </button>
            <button
              className={`customizer-tab ${activeCategory === 'clothing' ? 'active' : ''}`}
              onClick={() => setActiveCategory('clothing')}
            >
              <Shirt size={20} />
              <span>Clothing</span>
            </button>
          </div>

          {/* Customization Options */}
          <div className="customizer-content">
            <AnimatePresence mode="wait">
              {/* BODY */}
              {activeCategory === 'body' && (
                <motion.div
                  key="body"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="customizer-section"
                >
                  <div className="customizer-group">
                    <h3>Skin Tone</h3>
                    <div className="color-grid">
                      {SKIN_TONES.map((tone) => (
                        <button
                          key={tone.value}
                          className={`color-swatch ${config.skinTone === tone.value ? 'active' : ''}`}
                          style={{ backgroundColor: tone.value }}
                          onClick={() => updateConfig('skinTone', tone.value)}
                          title={tone.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="customizer-group">
                    <h3>Body Type</h3>
                    <div className="option-buttons">
                      {['slim', 'average', 'athletic', 'curvy'].map((type) => (
                        <button
                          key={type}
                          className={`option-btn ${config.bodyType === type ? 'active' : ''}`}
                          onClick={() => updateConfig('bodyType', type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FACE */}
              {activeCategory === 'face' && (
                <motion.div
                  key="face"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="customizer-section"
                >
                  <div className="customizer-group">
                    <h3>Eye Shape</h3>
                    <div className="option-buttons">
                      {EYE_SHAPES.map((shape) => (
                        <button
                          key={shape}
                          className={`option-btn ${config.eyeShape === shape ? 'active' : ''}`}
                          onClick={() => updateConfig('eyeShape', shape)}
                        >
                          {shape.charAt(0).toUpperCase() + shape.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customizer-group">
                    <h3>Eye Color</h3>
                    <div className="color-grid">
                      {EYE_COLORS.map((color) => (
                        <button
                          key={color.value}
                          className={`color-swatch ${config.eyeColor === color.value ? 'active' : ''}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => updateConfig('eyeColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* HAIR */}
              {activeCategory === 'hair' && (
                <motion.div
                  key="hair"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="customizer-section"
                >
                  <div className="customizer-group">
                    <h3>Hair Style</h3>
                    <div className="option-buttons">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style}
                          className={`option-btn ${config.hairStyle === style ? 'active' : ''}`}
                          onClick={() => updateConfig('hairStyle', style)}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customizer-group">
                    <h3>Hair Color</h3>
                    <div className="color-grid color-grid--large">
                      {HAIR_COLORS.map((color) => (
                        <button
                          key={color.value}
                          className={`color-swatch ${config.hairColor === color.value ? 'active' : ''}`}
                          style={{ backgroundColor: color.value, border: color.value === '#FFFFFF' ? '2px solid #666' : 'none' }}
                          onClick={() => updateConfig('hairColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CLOTHING */}
              {activeCategory === 'clothing' && (
                <motion.div
                  key="clothing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="customizer-section"
                >
                  <div className="customizer-group">
                    <div className="group-header">
                      <h3>Shirts</h3>
                      <span className="badge badge--free">Free</span>
                    </div>
                    <div className="clothing-grid">
                      {FREE_CLOTHING.shirts.map((item) => (
                        <button
                          key={item.id}
                          className={`clothing-item ${config.shirt === item.id ? 'active' : ''}`}
                          onClick={() => updateConfig('shirt', item.id)}
                        >
                          <div className="clothing-item__preview" style={{ backgroundColor: item.color }}>
                            <Shirt size={24} />
                          </div>
                          <span className="clothing-item__name">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customizer-group">
                    <div className="group-header">
                      <h3>Pants</h3>
                      <span className="badge badge--free">Free</span>
                    </div>
                    <div className="clothing-grid">
                      {FREE_CLOTHING.pants.map((item) => (
                        <button
                          key={item.id}
                          className={`clothing-item ${config.pants === item.id ? 'active' : ''}`}
                          onClick={() => updateConfig('pants', item.id)}
                        >
                          <div className="clothing-item__preview" style={{ backgroundColor: item.color }} />
                          <span className="clothing-item__name">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customizer-group">
                    <div className="group-header">
                      <h3>Shoes</h3>
                      <span className="badge badge--free">Free</span>
                    </div>
                    <div className="clothing-grid">
                      {FREE_CLOTHING.shoes.map((item) => (
                        <button
                          key={item.id}
                          className={`clothing-item ${config.shoes === item.id ? 'active' : ''}`}
                          onClick={() => updateConfig('shoes', item.id)}
                        >
                          <div className="clothing-item__preview" style={{ backgroundColor: item.color }} />
                          <span className="clothing-item__name">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* NFT Clothing */}
                  {ownedNFTs.length > 0 && (
                    <div className="customizer-group">
                      <div className="group-header">
                        <h3>Your NFT Wardrobe</h3>
                        <span className="badge badge--nft">NFT</span>
                      </div>
                      <div className="clothing-grid">
                        {ownedNFTs.map((nft) => (
                          <button
                            key={nft.id}
                            className={`clothing-item ${config.shirt === nft.id ? 'active' : ''}`}
                            onClick={() => updateConfig('shirt', nft.id)}
                          >
                            <div className="clothing-item__preview">
                              <img src={nft.metadata?.image || nft.image} alt={nft.metadata?.name || nft.name} />
                            </div>
                            <span className="clothing-item__name">{nft.metadata?.name || nft.name}</span>
                            <span className="clothing-item__nft-badge">NFT</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced SVG Renderer
function DOTvatarRenderer({ config }: { config: DOTvatarConfig }) {
  return (
    <svg viewBox="0 0 200 300" className="dotvatar-svg">
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e202c" />
          <stop offset="100%" stopColor="#31323e" />
        </linearGradient>
      </defs>
      
      <rect width="200" height="300" fill="url(#bgGradient)" />
      
      {/* Body */}
      <ellipse cx="100" cy="200" rx="40" ry="60" fill={config.skinTone} />
      
      {/* Head */}
      <circle cx="100" cy="80" r="50" fill={config.skinTone} />
      
      {/* Hair */}
      {config.hairStyle !== 'bald' && (
        <path
          d="M 50 70 Q 50 30 100 30 Q 150 30 150 70 L 140 80 Q 100 75 60 80 Z"
          fill={config.hairColor}
        />
      )}
      
      {/* Eyes */}
      <ellipse cx="80" cy="75" rx="8" ry="12" fill={config.eyeColor} />
      <ellipse cx="120" cy="75" rx="8" ry="12" fill={config.eyeColor} />
      
      {/* Pupils */}
      <circle cx="80" cy="75" r="4" fill="#000" />
      <circle cx="120" cy="75" r="4" fill="#000" />
      
      {/* Mouth */}
      <path
        d="M 85 100 Q 100 110 115 100"
        stroke="#000"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      
      {/* Clothing - Simple representation */}
      <rect x="60" y="130" width="80" height="70" fill="#4A90E2" rx="5" />
      
      {/* Watermark */}
      <text x="100" y="280" textAnchor="middle" fontSize="10" fill="white" opacity="0.3">
        DOTique
      </text>
    </svg>
  );
}