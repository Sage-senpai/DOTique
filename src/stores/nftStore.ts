// src/stores/nftStore.ts
import { create } from "zustand";

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

type NFTStore = {
  nfts: NFTItem[];
  loading: boolean;
  selectedNFT: NFTItem | null;

  // actions
  setNFTs: (nfts: NFTItem[]) => void;
  addNFT: (nft: NFTItem) => void;
  updateNFT: (id: string, updates: Partial<NFTItem>) => void;
  removeNFT: (id: string) => void;
  setSelectedNFT: (nft: NFTItem | null) => void;
  resetNFTs: () => void;
};

export const useNFTStore = create<NFTStore>((set, get) => ({
  nfts: [],
  loading: false,
  selectedNFT: null,

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
}));
