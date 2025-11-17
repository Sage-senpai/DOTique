// src/screens/Communities/CreateCommunityModal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Info, Plus, Trash2 } from 'lucide-react';
import './CommunitiesScreen.scss';

interface NFTCollection {
  id: string;
  name: string;
}

interface CreateCommunityModalProps {
  onClose: () => void;
  nftCollections: NFTCollection[];
  onSuccess: () => void;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'announcement';
}

interface CommunityFormData {
  // Basic Information
  name: string;
  handle: string;
  description: string;
  category: string;
  tags: string;
  language: string;
  region: string;

  // Branding & Design
  banner_file: File | null;
  banner_preview: string;
  logo_file: File | null;
  logo_preview: string;
  avatar_emoji: string;
  theme_color: string;
  background_style: string;

  // Access & NFT Gating
  access_type: 'nft-gated' | 'invite-only' | 'public';
  required_nft_contract_address: string;
  nft_requirement_type: 'own-at-least-1' | 'own-specific-token' | 'own-trait';
  nft_specific_tokens: string;
  nft_trait_requirement: string;
  blockchain: string;
  membership_duration: string;
  recheck_interval: string;
  guest_mode_enabled: boolean;

  // Governance & Rules
  rules: string;
  voting_enabled: boolean;
  report_system_enabled: boolean;
  verification_fail_message: string;

  // Social & Integration
  official_website: string;
  twitter_handle: string;
  discord_link: string;
  marketplace_link: string;
  community_feed_enabled: boolean;

  // Additional
  is_public: boolean;
  channels: Channel[];
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  onClose,
  nftCollections,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [creating, setCreating] = useState(false);
  
  const [formData, setFormData] = useState<CommunityFormData>({
    name: '',
    handle: '',
    description: '',
    category: 'Art',
    tags: '',
    language: 'English',
    region: 'Global',
    banner_file: null,
    banner_preview: '',
    logo_file: null,
    logo_preview: '',
    avatar_emoji: '🌐',
    theme_color: '#60519b',
    background_style: 'Dark',
    access_type: 'public',
    required_nft_contract_address: '',
    nft_requirement_type: 'own-at-least-1',
    nft_specific_tokens: '',
    nft_trait_requirement: '',
    blockchain: 'Unique Network',
    membership_duration: '',
    recheck_interval: 'every-login',
    guest_mode_enabled: false,
    rules: '',
    voting_enabled: false,
    report_system_enabled: true,
    verification_fail_message: 'You need to own the required NFT to join this community.',
    official_website: '',
    twitter_handle: '',
    discord_link: '',
    marketplace_link: '',
    community_feed_enabled: true,
    is_public: true,
    channels: [
      { id: '1', name: 'general', type: 'text' },
      { id: '2', name: 'announcements', type: 'announcement' },
    ],
  });

  const updateFormData = (field: keyof CommunityFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'name') {
      const handle = value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setFormData(prev => ({ ...prev, handle }));
    }
  };

  const handleImageUpload = (field: 'banner' | 'logo', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (field === 'banner') {
        setFormData(prev => ({
          ...prev,
          banner_file: file,
          banner_preview: e.target?.result as string,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          logo_file: file,
          logo_preview: e.target?.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addChannel = () => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: '',
      type: 'text',
    };
    setFormData(prev => ({
      ...prev,
      channels: [...prev.channels, newChannel],
    }));
  };

  const removeChannel = (id: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.filter(c => c.id !== id),
    }));
  };

  const updateChannel = (id: string, field: 'name' | 'type', value: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      // TODO: Replace with actual Supabase logic
      // 1. Upload banner and logo to Supabase Storage
      // 2. Create community record
      // 3. Create community_chat record (main chat room)
      // 4. Create community_channels records
      // 5. Add creator as admin member
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Creating community with data:', formData);
      alert('✅ Community created successfully with main chat room and channels!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const totalSteps = 5;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="create-modal comprehensive"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Create NFT-Gated Community</h2>
            <div className="step-indicator">Step {step} of {totalSteps}</div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="form-step">
              <h3>🪩 Basic Information</h3>
              
              <div className="form-field">
                <label>Community Name *</label>
                <input
                  type="text"
                  required
                  placeholder="MadDolph Society"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Handle / Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="maddolph-society"
                  value={formData.handle}
                  onChange={(e) => updateFormData('handle', e.target.value)}
                />
                <span className="field-hint">Used in community URL</span>
              </div>

              <div className="form-field">
                <label>Description *</label>
                <textarea
                  required
                  placeholder="Exclusive group for Mad Dolph NFT holders."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                  >
                    <option value="Art">Art & Culture</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Music">Music</option>
                    <option value="Tech">Tech</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Language</label>
                  <input
                    type="text"
                    placeholder="English"
                    value={formData.language}
                    onChange={(e) => updateFormData('language', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="art, nft, collectors"
                  value={formData.tags}
                  onChange={(e) => updateFormData('tags', e.target.value)}
                />
                <span className="field-hint">For discovery and filtering</span>
              </div>

              <div className="form-field">
                <label>Region</label>
                <input
                  type="text"
                  placeholder="Global"
                  value={formData.region}
                  onChange={(e) => updateFormData('region', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Branding & Design */}
          {step === 2 && (
            <div className="form-step">
              <h3>🎨 Branding & Design</h3>

              <div className="form-field">
                <label>Cover Image / Banner</label>
                <input
                  type="file"
                  accept="image/*"
                  id="banner-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload('banner', file);
                  }}
                />
                <label htmlFor="banner-upload" className="upload-box">
                  <Upload size={32} />
                  <div>{formData.banner_file ? formData.banner_file.name : 'Click to upload banner image'}</div>
                  <span className="field-hint">Recommended: 1920x400px</span>
                </label>
                {formData.banner_preview && (
                  <img src={formData.banner_preview} alt="Banner preview" className="preview-image" />
                )}
              </div>

              <div className="form-field">
                <label>Logo / Icon</label>
                <input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload('logo', file);
                  }}
                />
                <label htmlFor="logo-upload" className="upload-box">
                  <Upload size={32} />
                  <div>{formData.logo_file ? formData.logo_file.name : 'Click to upload logo image'}</div>
                  <span className="field-hint">Recommended: 512x512px</span>
                </label>
                {formData.logo_preview && (
                  <img src={formData.logo_preview} alt="Logo preview" className="preview-image logo-preview" />
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>Avatar Emoji</label>
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="🌐"
                    value={formData.avatar_emoji}
                    onChange={(e) => updateFormData('avatar_emoji', e.target.value)}
                    className="emoji-input"
                  />
                </div>

                <div className="form-field">
                  <label>Theme Color</label>
                  <input
                    type="color"
                    value={formData.theme_color}
                    onChange={(e) => updateFormData('theme_color', e.target.value)}
                    className="color-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Background Style</label>
                <select
                  value={formData.background_style}
                  onChange={(e) => updateFormData('background_style', e.target.value)}
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                  <option value="Futuristic">Futuristic</option>
                  <option value="Neon">Neon</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Access & NFT Gating */}
          {step === 3 && (
            <div className="form-step">
              <h3>🔐 Access & NFT Gating</h3>

              <div className="form-field">
                <label>Access Type *</label>
                <select
                  value={formData.access_type}
                  onChange={(e) => updateFormData('access_type', e.target.value)}
                >
                  <option value="public">Public (Anyone can join)</option>
                  <option value="nft-gated">NFT-Gated (Requires NFT)</option>
                  <option value="invite-only">Invite-Only</option>
                </select>
              </div>

              {formData.access_type === 'nft-gated' && (
                <>
                  <div className="form-field">
                    <label>NFT Collection Contract Address *</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={formData.required_nft_contract_address}
                      onChange={(e) => updateFormData('required_nft_contract_address', e.target.value)}
                    />
                    <span className="field-hint">Smart contract address of the NFT collection</span>
                  </div>

                  <div className="form-field">
                    <label>Blockchain Network *</label>
                    <select
                      value={formData.blockchain}
                      onChange={(e) => updateFormData('blockchain', e.target.value)}
                    >
                      <optgroup label="Polkadot Ecosystem">
                        <option value="Unique Network">Unique Network</option>
                        <option value="Polkadot">Polkadot</option>
                        <option value="Acala">Acala</option>
                        <option value="Astar">Astar</option>
                        <option value="Moonbeam">Moonbeam</option>
                      </optgroup>
                      <optgroup label="Kusama Parachains">
                        <option value="Kusama">Kusama</option>
                        <option value="Karura">Karura</option>
                        <option value="Shiden">Shiden</option>
                        <option value="Moonriver">Moonriver</option>
                      </optgroup>
                      <optgroup label="Other Networks">
                        <option value="Ethereum">Ethereum</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Solana">Solana</option>
                        <option value="Avalanche">Avalanche</option>
                        <option value="Arbitrum">Arbitrum</option>
                        <option value="Optimism">Optimism</option>
                      </optgroup>
                    </select>
                    <span className="field-hint">We'll verify NFT ownership across all major networks</span>
                  </div>

                  <div className="form-field">
                    <label>NFT Requirement Type</label>
                    <select
                      value={formData.nft_requirement_type}
                      onChange={(e) => updateFormData('nft_requirement_type', e.target.value)}
                    >
                      <option value="own-at-least-1">Own at least 1 NFT</option>
                      <option value="own-specific-token">Own specific token(s)</option>
                      <option value="own-trait">Own NFT with specific trait</option>
                    </select>
                  </div>

                  {formData.nft_requirement_type === 'own-specific-token' && (
                    <div className="form-field">
                      <label>Specific Token IDs (comma-separated)</label>
                      <input
                        type="text"
                        placeholder="1,2,3,100-200"
                        value={formData.nft_specific_tokens}
                        onChange={(e) => updateFormData('nft_specific_tokens', e.target.value)}
                      />
                    </div>
                  )}

                  {formData.nft_requirement_type === 'own-trait' && (
                    <div className="form-field">
                      <label>Trait Requirement</label>
                      <input
                        type="text"
                        placeholder="rarity: legendary"
                        value={formData.nft_trait_requirement}
                        onChange={(e) => updateFormData('nft_trait_requirement', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Membership Duration (days)</label>
                      <input
                        type="number"
                        placeholder="30"
                        value={formData.membership_duration}
                        onChange={(e) => updateFormData('membership_duration', e.target.value)}
                      />
                      <span className="field-hint">Leave empty for permanent</span>
                    </div>

                    <div className="form-field">
                      <label>Recheck Interval</label>
                      <select
                        value={formData.recheck_interval}
                        onChange={(e) => updateFormData('recheck_interval', e.target.value)}
                      >
                        <option value="every-login">Every Login</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field checkbox-field">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.guest_mode_enabled}
                        onChange={(e) => updateFormData('guest_mode_enabled', e.target.checked)}
                      />
                      <span>Enable Guest Mode (read-only access for non-holders)</span>
                    </label>
                  </div>

                  <div className="form-field">
                    <label>Verification Fail Message</label>
                    <textarea
                      placeholder="You need to own the required NFT to join this community."
                      value={formData.verification_fail_message}
                      onChange={(e) => updateFormData('verification_fail_message', e.target.value)}
                      rows={2}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Channels & Chat Rooms */}
          {step === 4 && (
            <div className="form-step">
              <h3>💬 Channels & Chat Rooms</h3>

              <div className="info-box">
                <Info size={18} />
                <span>A main community chat room will be created automatically. Add additional channels below for organizing discussions.</span>
              </div>

              <div className="form-field">
                <label>Community Channels</label>
                {formData.channels.map((channel) => (
                  <div key={channel.id} className="channel-item">
                    <input
                      type="text"
                      placeholder="Channel name"
                      value={channel.name}
                      onChange={(e) => updateChannel(channel.id, 'name', e.target.value)}
                    />
                    <select
                      value={channel.type}
                      onChange={(e) => updateChannel(channel.id, 'type', e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="announcement">Announcement</option>
                    </select>
                    {formData.channels.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChannel(channel.id)}
                        className="remove-btn"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChannel}
                  className="btn-secondary add-channel-btn"
                >
                  <Plus size={18} />
                  Add Channel
                </button>
              </div>

              <div className="form-field">
                <label>Community Rules / Code of Conduct</label>
                <textarea
                  placeholder="1. Respect all members&#10;2. No spam or self-promotion without permission&#10;3. Keep discussions relevant to the community"
                  value={formData.rules}
                  onChange={(e) => updateFormData('rules', e.target.value)}
                  rows={5}
                />
              </div>

              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.voting_enabled}
                    onChange={(e) => updateFormData('voting_enabled', e.target.checked)}
                  />
                  <span>Enable NFT-based Voting (1 NFT = 1 vote)</span>
                </label>
              </div>

              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.report_system_enabled}
                    onChange={(e) => updateFormData('report_system_enabled', e.target.checked)}
                  />
                  <span>Enable Report System</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Social & Integration */}
          {step === 5 && (
            <div className="form-step">
              <h3>🌐 Social & Integration</h3>

              <div className="form-field">
                <label>Official Website</label>
                <input
                  type="url"
                  placeholder="https://maddolph.io"
                  value={formData.official_website}
                  onChange={(e) => updateFormData('official_website', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Twitter / X Handle</label>
                <input
                  type="text"
                  placeholder="@maddolph"
                  value={formData.twitter_handle}
                  onChange={(e) => updateFormData('twitter_handle', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Discord Server Link</label>
                <input
                  type="url"
                  placeholder="https://discord.gg/..."
                  value={formData.discord_link}
                  onChange={(e) => updateFormData('discord_link', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>NFT Marketplace Link</label>
                <input
                  type="url"
                  placeholder="https://unique.network/..."
                  value={formData.marketplace_link}
                  onChange={(e) => updateFormData('marketplace_link', e.target.value)}
                />
              </div>

              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.community_feed_enabled}
                    onChange={(e) => updateFormData('community_feed_enabled', e.target.checked)}
                  />
                  <span>Enable Community Feed</span>
                </label>
              </div>

              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.is_public}
                    onChange={(e) => updateFormData('is_public', e.target.checked)}
                  />
                  <span>Make community visible in public listings</span>
                </label>
              </div>

              <div className="success-box">
                <div className="success-title">✅ Ready to Create!</div>
                <div className="success-text">
                  Your community will be created with:
                  <ul>
                    <li>A main community chat room</li>
                    <li>{formData.channels.length} custom channel{formData.channels.length !== 1 ? 's' : ''}</li>
                    <li>{formData.access_type === 'nft-gated' ? `NFT verification on ${formData.blockchain}` : 'Public access'}</li>
                    <li>Automatic member management</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="modal-actions">
            {step > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(step - 1)}
                disabled={creating}
              >
                Previous
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={creating}
              >
                {creating ? 'Creating...' : 'Create Community'}
              </button>
            )}
          </div>

          {/* Progress Dots */}
          <div className="step-dots">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`dot ${i + 1 === step ? 'active' : i + 1 < step ? 'completed' : ''}`}
                onClick={() => setStep(i + 1)}
              />
            ))}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateCommunityModal;