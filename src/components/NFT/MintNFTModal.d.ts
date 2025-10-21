import React from "react";
import "./MintNFTModal.scss";
interface MintNFTModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMint: (data: MintFormData) => Promise<void>;
    isLoading?: boolean;
}
export interface MintFormData {
    name: string;
    description: string;
    price: string;
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
    royalty: string;
    image: File | null;
}
declare const MintNFTModal: React.FC<MintNFTModalProps>;
export default MintNFTModal;
//# sourceMappingURL=MintNFTModal.d.ts.map