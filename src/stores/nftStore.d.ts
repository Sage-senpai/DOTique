export type NFTItem = {
    id: string;
    name: string;
    description?: string;
    image: string;
    owner: string;
    tokenId?: string;
    contractAddress?: string;
    chain?: string;
    attributes?: Record<string, any>;
    isListed?: boolean;
    price?: number;
    createdAt?: number;
};
export interface NFTMintData {
    title: string;
    description: string;
    price: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    image: File;
    royalty: number;
    supply: number;
}
interface NFTStore {
    nfts: NFTItem[];
    loading: boolean;
    selectedNFT: NFTItem | null;
    nftDraft: NFTMintData | null;
    minting: boolean;
    mintError: string | null;
    setNFTs: (nfts: NFTItem[]) => void;
    addNFT: (nft: NFTItem) => void;
    updateNFT: (id: string, updates: Partial<NFTItem>) => void;
    removeNFT: (id: string) => void;
    setSelectedNFT: (nft: NFTItem | null) => void;
    resetNFTs: () => void;
    setNFTDraft: (draft: NFTMintData | null) => void;
    setMinting: (minting: boolean) => void;
    setMintError: (error: string | null) => void;
}
export declare const useNFTStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NFTStore>>;
export {};
//# sourceMappingURL=nftStore.d.ts.map