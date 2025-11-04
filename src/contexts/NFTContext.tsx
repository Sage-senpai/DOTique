// src/contexts/NFTContext.tsx
// =====================================================
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  
} from "react";
import type { ReactNode } from "react";

import { dummyNFTs } from "../data/nftData";

// =====================================================
// Types
// =====================================================
export interface NFT {
  id: string;
  name: string;
  artist: string;
  image: string;
  type: string;
  rarity: string;
  price: number;
  likes: number;
  comments: number;
  description?: string;
  metadata?: any;
  isLive?: boolean; // 👈 for newly minted/local NFTs
}

// =====================================================
// Context type definition
// =====================================================
interface NFTContextType {
  nfts: NFT[];
  filteredNfts: NFT[];
  searchQuery: string;
  activeFilter: string;
  sortBy: string;
  favorites: string[];

  setNfts: (nfts: NFT[]) => void;
  setFilteredNfts: (nfts: NFT[]) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  setSortBy: (sort: string) => void;

  getNFTById: (id: string) => NFT | undefined;
  likeNFT: (id: string) => void;
  unlikeNFT: (id: string) => void;
  isNFTLiked: (id: string) => boolean;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;

  addNFT: (newNFT: NFT) => void; // ✅ added for MintNFTModal
}

// =====================================================
// Context creation
// =====================================================
const NFTContext = createContext<NFTContextType | undefined>(undefined);

// =====================================================
// Provider
// =====================================================
export const NFTProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nfts, setNfts] = useState<NFT[]>(dummyNFTs);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>(dummyNFTs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recently-added");
  const [favorites, setFavorites] = useState<string[]>([]);

  // =====================================================
  // Load favorites from localStorage
  // =====================================================
  useEffect(() => {
    const savedFavorites = localStorage.getItem("nft-favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem("nft-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // =====================================================
  // Get NFT by ID
  // =====================================================
  const getNFTById = (id: string): NFT | undefined =>
    nfts.find((nft) => nft.id === id);

  // =====================================================
  // Like / Unlike
  // =====================================================
  const likeNFT = (id: string) =>
    setNfts((prev) =>
      prev.map((nft) =>
        nft.id === id ? { ...nft, likes: nft.likes + 1 } : nft
      )
    );

  const unlikeNFT = (id: string) =>
    setNfts((prev) =>
      prev.map((nft) =>
        nft.id === id ? { ...nft, likes: Math.max(0, nft.likes - 1) } : nft
      )
    );

  const isNFTLiked = (id: string): boolean => favorites.includes(id);

  const addToFavorites = (id: string) => {
    setFavorites((prev) => [...prev, id]);
    likeNFT(id);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f !== id));
    unlikeNFT(id);
  };

  // =====================================================
  // ✅ Add NFT (for MintNFTModal)
  // =====================================================
  const addNFT = (newNFT: NFT) => {
    setNfts((prev) => [newNFT, ...prev]);
    setFilteredNfts((prev) => [newNFT, ...prev]);
  };

  // =====================================================
  // Context value
  // =====================================================
  const value: NFTContextType = {
    nfts,
    filteredNfts,
    searchQuery,
    activeFilter,
    sortBy,
    favorites,
    setNfts,
    setFilteredNfts,
    setSearchQuery,
    setActiveFilter,
    setSortBy,
    getNFTById,
    likeNFT,
    unlikeNFT,
    isNFTLiked,
    addToFavorites,
    removeFromFavorites,
    addNFT,
  };

  return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
};

// =====================================================
// ✅ Correct hook export
// =====================================================
export const useNFT = (): NFTContextType => {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error("useNFT must be used within NFTProvider");
  }
  return context;
};
