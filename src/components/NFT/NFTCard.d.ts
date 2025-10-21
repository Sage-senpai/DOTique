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
declare const NFTCard: React.FC<NFTCardProps>;
export default NFTCard;
//# sourceMappingURL=NFTCard.d.ts.map