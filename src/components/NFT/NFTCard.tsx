//src/components/NFT/NFTCard.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Repeat2,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import "./NFTCard.scss";

export interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  price?: number;
  owner?: string;
  type?: string;
  likes?: number;
  comments?: number;
  description?: string;
}

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onBuy?: () => void;
  onDonate?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  onClick = () => {},
  onLike = () => {},
  onComment = () => {},
  onRepost = () => {},
  onBuy = () => {},
  onDonate = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Disable right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Detect screenshot attempts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.warn("Possible screenshot attempt detected");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike();
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  // Unified rarity color palette
  const rarityColors: Record<string, string> = {
    common: "#7a7a7a",
    uncommon: "#1eff00",
    rare: "#0070dd",
    epic: "#a335ee",
    legendary: "#ff8000",
  };

  const rarityColor = rarityColors[nft.rarity.toLowerCase()] || "#bfc0d1";

  return (
    <motion.div
      ref={cardRef}
      className={`nft-card ${isHovered ? "nft-card--hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Protection Overlay */}
      <div className="nft-card__protection" />

      {/* Image Section */}
      <div className="nft-card__image-container">
        <img
          src={nft.image}
          alt={nft.name}
          className="nft-card__image"
          draggable="false"
          onContextMenu={handleContextMenu}
        />

        {/* Watermark */}
        <div className="nft-card__watermark">DOTIQUE</div>

        {/* Rarity Badge */}
        <div
          className="nft-card__rarity"
          style={{ borderColor: rarityColor, color: rarityColor }}
        >
          {nft.rarity.toUpperCase()}
        </div>

        {/* Hover Description */}
        <motion.div
          className="nft-card__description"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{nft.description || "Exclusive digital collectible"}</p>
        </motion.div>
      </div>

      {/* Card Info */}
      <div className="nft-card__info">
        <div className="nft-card__header">
          <h3 className="nft-card__title">{nft.name}</h3>
          {nft.owner && <p className="nft-card__artist">by {nft.owner}</p>}
        </div>

        <div className="nft-card__meta">
          {nft.type && <span className="nft-card__type">{nft.type}</span>}
          {nft.price && (
            <span className="nft-card__price">{nft.price} DOT</span>
          )}
        </div>

        {/* Actions */}
        <div className="nft-card__actions">
          <motion.button
            className={`nft-card__action ${
              liked ? "nft-card__action--liked" : ""
            }`}
            onClick={handleLikeClick}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={18} fill={liked ? "#FF6B9D" : "none"} />
            <span>{(nft.likes || 0) + (liked ? 1 : 0)}</span>
          </motion.button>

          <motion.button
            className="nft-card__action"
            onClick={(e) => handleActionClick(e, onComment)}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={18} />
            <span>{nft.comments || 0}</span>
          </motion.button>

          <motion.button
            className="nft-card__action"
            onClick={(e) => handleActionClick(e, onRepost)}
            whileTap={{ scale: 0.9 }}
          >
            <Repeat2 size={18} />
          </motion.button>

          <motion.button
            className="nft-card__action nft-card__action--primary"
            onClick={(e) => handleActionClick(e, onBuy)}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={18} />
          </motion.button>

          <motion.button
            className="nft-card__action nft-card__action--donate"
            onClick={(e) => handleActionClick(e, onDonate)}
            whileTap={{ scale: 0.9 }}
          >
            <DollarSign size={18} />
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="nft-card__glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: rarityColor }}
      />
    </motion.div>
  );
};

export default NFTCard;
