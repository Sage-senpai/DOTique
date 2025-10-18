//src/stores/nftStore.ts
import { create } from "zustand";

// ----------------- Types -----------------
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
};

// ----------------- Store Interface -----------------
interface NFTStore {
  // NFT List State
  nfts: NFTItem[];
  loading: boolean;
  selectedNFT: NFTItem | null;

  // NFT Mint State
  nftDraft: NFTMintData | null;
  minting: boolean;
  mintError: string | null;

  // NFT List Actions
  setNFTs: (nfts: NFTItem[]) => void;
  addNFT: (nft: NFTItem) => void;
  updateNFT: (id: string, updates: Partial<NFTItem>) => void;
  removeNFT: (id: string) => void;
  setSelectedNFT: (nft: NFTItem | null) => void;
  resetNFTs: () => void;

  // Mint Actions
  setNFTDraft: (draft: NFTMintData | null) => void;
  setMinting: (minting: boolean) => void;
  setMintError: (error: string | null) => void;
}

// ----------------- Zustand Store -----------------
export const useNFTStore = create<NFTStore>((set, get) => ({
  // NFT list state
  nfts: [],
  loading: false,
  selectedNFT: null,

  // Minting state
  nftDraft: null,
  minting: false,
  mintError: null,

  // NFT list actions
  setNFTs: (nfts) => set({ nfts }),
  addNFT: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
  updateNFT: (id, updates) =>
    set((state) => ({
      nfts: state.nfts.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    })),
  removeNFT: (id) =>
    set((state) => ({
      nfts: state.nfts.filter((n) => n.id !== id),
    })),
  setSelectedNFT: (nft) => set({ selectedNFT: nft }),
  resetNFTs: () => set({ nfts: [], loading: false, selectedNFT: null }),

  // Minting actions
  setNFTDraft: (draft) => set({ nftDraft: draft }),
  setMinting: (minting) => set({ minting }),
  setMintError: (error) => set({ mintError: error }),
}));
