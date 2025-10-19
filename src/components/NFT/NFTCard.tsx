//  src/components/NFT/NFTCard.tsx
// =====================================================
import React from "react";
import "./NFTCard.scss";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  price?: number;
  owner?: string;
  onClick?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  id,
  name,
  image,
  rarity,
  price,
  owner,
  onClick,
}) => {
  const rarityColors: Record<string, string> = {
    common: "#7a7a7a",
    uncommon: "#1eff00",
    rare: "#0070dd",
    epic: "#a335ee",
    legendary: "#ff8000",
  };

  return (
    <div className="nft-card" onClick={onClick}>
      <div className="nft-card__image">
        <img src={image} alt={name} />
        <div
          className="nft-card__rarity"
          style={{ borderColor: rarityColors[rarity] }}
        >
          {rarity.toUpperCase()}
        </div>
      </div>
      <div className="nft-card__content">
        <h4 className="nft-card__name">{name}</h4>
        {price && <p className="nft-card__price">{price} DOT</p>}
        {owner && <p className="nft-card__owner">by {owner}</p>}
      </div>
    </div>
  );
};

export default NFTCard;