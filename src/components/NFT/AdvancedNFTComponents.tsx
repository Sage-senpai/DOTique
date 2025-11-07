// src/components/NFT/AdvancedNFTComponents.tsx
import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import {
  Layers,
  Zap,
  TrendingUp,
  DollarSign,
  Gavel,
  Share2,
  Camera,
  Eye,
  Star,
  AlertCircle
} from 'lucide-react';
import './AdvancedNFTComponents.scss';

// ==========================================
// 3D NFT PREVIEW COMPONENT
// ==========================================

interface ThreeDPreviewProps {
  modelUrl?: string;
  imageUrl?: string;
  name: string;
}

const ThreeDModel: React.FC<{ url: string }> = ({ url }) => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#60519b" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

export const ThreeDPreview: React.FC<ThreeDPreviewProps> = ({
  modelUrl,
  imageUrl,
  name
}) => {
  const [view, setView] = useState<'2d' | '3d'>('2d');

  return (
    <div className="threed-preview">
      <div className="threed-preview__controls">
        <button
          className={`view-btn ${view === '2d' ? 'active' : ''}`}
          onClick={() => setView('2d')}
        >
          <Eye size={18} /> 2D
        </button>
        <button
          className={`view-btn ${view === '3d' ? 'active' : ''}`}
          onClick={() => setView('3d')}
        >
          <Layers size={18} /> 3D
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === '2d' ? (
          <motion.div
            key="2d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="preview-2d"
          >
            <img src={imageUrl} alt={name} />
          </motion.div>
        ) : (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="preview-3d"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Suspense fallback={null}>
                <ThreeDModel url={modelUrl || ''} />
                <Environment preset="studio" />
              </Suspense>
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// AR TRY-ON COMPONENT
// ==========================================

export const ARTryOn: React.FC<{ nft: any }> = ({ nft }) => {
  const [arActive, setArActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setArActive(true);
      }
    } catch (err) {
      console.error('Failed to start AR:', err);
      alert('Camera access required for AR try-on');
    }
  };

  const stopAR = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setArActive(false);
  };

  return (
    <div className="ar-tryon">
      {!arActive ? (
        <button className="ar-tryon__btn" onClick={startAR}>
          <Camera size={20} />
          <span>Try On with AR</span>
        </button>
      ) : (
        <div className="ar-tryon__viewer">
          <video ref={videoRef} autoPlay playsInline className="ar-video" />
          <div className="ar-overlay">
            <img src={nft.image} alt={nft.name} className="ar-nft" />
          </div>
          <button className="ar-close" onClick={stopAR}>
            Close AR
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// NFT MARKETPLACE LISTING
// ==========================================

interface ListingFormData {
  price: number;
  listingType: 'fixed' | 'auction';
  auctionDuration?: number;
  startingBid?: number;
  buyNowPrice?: number;
}

export const ListNFTModal: React.FC<{
  nft: any;
  isOpen: boolean;
  onClose: () => void;
  onList: (data: ListingFormData) => Promise<void>;
}> = ({ nft, isOpen, onClose, onList }) => {
  const [formData, setFormData] = useState<ListingFormData>({
    price: 0,
    listingType: 'fixed',
    auctionDuration: 7,
    startingBid: 0,
    buyNowPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onList(formData);
      onClose();
    } catch (err) {
      console.error('Failed to list NFT:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="list-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>List NFT for Sale</h3>
        
        <div className="nft-preview-small">
          <img src={nft.image} alt={nft.name} />
          <div>
            <h4>{nft.name}</h4>
            <p>Token ID: {nft.token_id}</p>
          </div>
        </div>

        <div className="listing-type">
          <button
            className={formData.listingType === 'fixed' ? 'active' : ''}
            onClick={() => setFormData({ ...formData, listingType: 'fixed' })}
          >
            <DollarSign size={18} /> Fixed Price
          </button>
          <button
            className={formData.listingType === 'auction' ? 'active' : ''}
            onClick={() => setFormData({ ...formData, listingType: 'auction' })}
          >
            <Gavel size={18} /> Auction
          </button>
        </div>

        {formData.listingType === 'fixed' ? (
          <div className="form-field">
            <label>Price (DOT)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder="0.00"
              step="0.01"
            />
          </div>
        ) : (
          <>
            <div className="form-field">
              <label>Starting Bid (DOT)</label>
              <input
                type="number"
                value={formData.startingBid}
                onChange={(e) => setFormData({ ...formData, startingBid: Number(e.target.value) })}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div className="form-field">
              <label>Buy Now Price (Optional)</label>
              <input
                type="number"
                value={formData.buyNowPrice}
                onChange={(e) => setFormData({ ...formData, buyNowPrice: Number(e.target.value) })}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div className="form-field">
              <label>Auction Duration (Days)</label>
              <select
                value={formData.auctionDuration}
                onChange={(e) => setFormData({ ...formData, auctionDuration: Number(e.target.value) })}
              >
                <option value={1}>1 Day</option>
                <option value={3}>3 Days</option>
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
              </select>
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Listing...' : 'List NFT'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// ANALYTICS DASHBOARD
// ==========================================

export const NFTAnalytics: React.FC = () => {
  const [analytics] = useState({
    totalMints: 1247,
    totalVolume: 8534.5,
    avgPrice: 6.84,
    topRarity: 'Epic',
    trendingAttributes: [
      { name: 'Cyberpunk', count: 342 },
      { name: 'Neon', count: 287 },
      { name: 'Holographic', count: 256 },
    ],
    recentActivity: [
      { type: 'mint', user: '0x1234...', time: '2 mins ago' },
      { type: 'sale', user: '0x5678...', time: '5 mins ago' },
      { type: 'list', user: '0x9abc...', time: '12 mins ago' },
    ],
  });

  return (
    <div className="nft-analytics">
      <h2>NFT Analytics</h2>
      
      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Mints</p>
            <h3 className="stat-value">{analytics.totalMints.toLocaleString()}</h3>
            <span className="stat-change positive">+12.5% this week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Volume</p>
            <h3 className="stat-value">{analytics.totalVolume.toLocaleString()} DOT</h3>
            <span className="stat-change positive">+8.3% this week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Avg Price</p>
            <h3 className="stat-value">{analytics.avgPrice} DOT</h3>
            <span className="stat-change negative">-2.1% this week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Top Rarity</p>
            <h3 className="stat-value">{analytics.topRarity}</h3>
            <span className="stat-change">Most popular</span>
          </div>
        </div>
      </div>

      <div className="trending-section">
        <h3>Trending Attributes</h3>
        <div className="trending-list">
          {analytics.trendingAttributes.map((attr, i) => (
            <div key={i} className="trending-item">
              <span className="trending-name">{attr.name}</span>
              <div className="trending-bar">
                <div 
                  className="trending-fill" 
                  style={{ width: `${(attr.count / analytics.trendingAttributes[0].count) * 100}%` }}
                />
              </div>
              <span className="trending-count">{attr.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {analytics.recentActivity.map((activity, i) => (
            <div key={i} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'mint' && <Zap size={16} />}
                {activity.type === 'sale' && <DollarSign size={16} />}
                {activity.type === 'list' && <AlertCircle size={16} />}
              </div>
              <span className="activity-user">{activity.user}</span>
              <span className="activity-type">{activity.type}</span>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default { ThreeDPreview, ARTryOn, ListNFTModal, NFTAnalytics };