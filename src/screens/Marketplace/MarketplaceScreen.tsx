import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/NFT/SearchBar';
import FilterTabs from '../../components/NFT/FilterTabs';
import NFTCard from '../../components/NFT/NFTCard';
import FloatingButton from '../../components/NFT/FloatingButton';
import { dummyNFTs } from '../../data/nftData';
import './MarketplaceScreen.scss';

interface NFT {
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
}

const Marketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>(dummyNFTs);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>(dummyNFTs);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recently-added');
  const navigate = useNavigate();

  useEffect(() => {
    filterAndSortNFTs();
  }, [searchQuery, activeFilter, sortBy]);

  const filterAndSortNFTs = () => {
    let filtered = [...nfts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter((nft) =>
        nft.type.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'rarity':
        const rarityOrder = { Legendary: 4, Epic: 3, Rare: 2, Common: 1 };
        filtered.sort(
          (a, b) =>
            (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) -
            (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0)
        );
        break;
      default:
        break;
    }

    setFilteredNfts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleNFTClick = (nftId: string) => {
    navigate(`/marketplace/nft/${nftId}`);
  };

  const handleLike = (nftId: string) => {
    setNfts((prevNfts) =>
      prevNfts.map((nft) =>
        nft.id === nftId ? { ...nft, likes: nft.likes + 1 } : nft
      )
    );
  };

  const handleComment = (nftId: string) => {
    navigate(`/marketplace/nft/${nftId}?view=comments`);
  };

  const handleRepost = (nftId: string) => {
    navigate(`/repost/${nftId}`);
  };

  const handleBuy = (nftId: string) => {
    navigate(`/marketplace/buy/${nftId}`);
  };

  const handleDonate = (nftId: string) => {
    navigate(`/marketplace/donate/${nftId}`);
  };

  return (
    <div className="marketplace">
      <div className="marketplace__header">
        <SearchBar onSearch={handleSearch} placeholder="Search NFTs, artists, collections..." />
        
        <div className="marketplace__controls">
          <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          
          <div className="marketplace__sort">
            <select
              className="marketplace__sort-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="recently-added">Recently Added</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="most-liked">Most Liked</option>
              <option value="rarity">Rarity</option>
            </select>
          </div>
        </div>
      </div>

      <motion.div
        className="marketplace__grid"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredNfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
              }}
            >
              <NFTCard
                nft={nft}
                onClick={() => handleNFTClick(nft.id)}
                onLike={() => handleLike(nft.id)}
                onComment={() => handleComment(nft.id)}
                onRepost={() => handleRepost(nft.id)}
                onBuy={() => handleBuy(nft.id)}
                onDonate={() => handleDonate(nft.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredNfts.length === 0 && (
        <motion.div
          className="marketplace__empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>No NFTs Found</h3>
          <p>Try adjusting your search or filters</p>
        </motion.div>
      )}

      <FloatingButton />
    </div>
  );
};

export default Marketplace;