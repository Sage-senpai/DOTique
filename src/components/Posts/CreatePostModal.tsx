// src/components/Post/CreatePostModal.tsx
import React, { useState } from 'react';
import { X, Camera, Image as ImageIcon, Video } from 'lucide-react';
import './CreatePostModal.scss';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [postType, setPostType] = useState<'post' | 'nft'>('post');
  const [content, setContent] = useState('');
  const [nftTitle, setNftTitle] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [nftRarity, setNftRarity] = useState('common');
  const [royalty, setRoyalty] = useState('5');

  if (!isOpen) return null;

  const handleClose = () => {
    setContent('');
    setNftTitle('');
    setNftDescription('');
    setNftPrice('');
    setNftRarity('common');
    setRoyalty('5');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create {postType === 'nft' ? 'NFT' : 'Post'}</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="post-type-tabs">
          <button
            className={`tab ${postType === 'post' ? 'active' : ''}`}
            onClick={() => setPostType('post')}
          >
            Post
          </button>
          <button
            className={`tab ${postType === 'nft' ? 'active' : ''}`}
            onClick={() => setPostType('nft')}
          >
            Mint NFT
          </button>
        </div>

        {postType === 'post' ? (
          <div className="post-form">
            <textarea
              placeholder="What's happening?!"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              className="form-textarea"
            />

            <div className="media-tools">
              <button className="media-btn" title="Camera">
                <Camera size={18} />
                <span>Camera</span>
              </button>
              <button className="media-btn" title="Gallery">
                <ImageIcon size={18} />
                <span>Gallery</span>
              </button>
              <button className="media-btn" title="Video">
                <Video size={18} />
                <span>Video</span>
              </button>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn-primary">Post</button>
            </div>
          </div>
        ) : (
          <div className="nft-form">
            <div className="form-group">
              <label>NFT Title *</label>
              <input
                type="text"
                placeholder="e.g., Cosmic Dreams #1"
                value={nftTitle}
                onChange={e => setNftTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe your NFT..."
                rows={4}
                value={nftDescription}
                onChange={e => setNftDescription(e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (DOT)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={nftPrice}
                  onChange={e => setNftPrice(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Rarity</label>
                <select
                  value={nftRarity}
                  onChange={e => setNftRarity(e.target.value)}
                  className="form-input"
                >
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Royalty %</label>
              <input
                type="number"
                placeholder="5"
                value={royalty}
                onChange={e => setRoyalty(e.target.value)}
                min="0"
                max="25"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Upload Media</label>
              <div className="media-tools">
                <button className="media-btn" title="Camera">
                  <Camera size={18} />
                  <span>Camera</span>
                </button>
                <button className="media-btn" title="Gallery">
                  <ImageIcon size={18} />
                  <span>Gallery</span>
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn-primary">Mint & Publish</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;