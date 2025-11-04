//src/screens/Marketplace/NFTDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Repeat2,
  ShoppingBag,
  DollarSign,
  Share2,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { dummyNFTs } from "../../data/nftData";
import { useNFT } from "../../contexts/NFTContext";
import { useWallet } from "../../contexts/WalletContext";
import MintNFTModal from "../../components/NFT/MintNFTModal";
import type { MintFormData } from "../../components/NFT/MintNFTModal";

import "./NFTDetails.scss";

const NFTDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { likeNFT, unlikeNFT, isNFTLiked, getNFTById } = useNFT();
  const { isConnected, isConnecting, selectedAccount, connectWallet, balance } =
    useWallet();

  // Data
  const [nft, setNft] = useState<any>(
    getNFTById(id || "") || dummyNFTs.find((n) => n.id === id)
  );

  // UI state
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get("view") || "details");
  const [comments, setComments] = useState([
    { id: 1, user: "Collector.eth", text: "This art is 🔥🔥" },
    { id: 2, user: "MetaMuse", text: "Love the details!" },
  ]);
  const [newComment, setNewComment] = useState("");

  // Mint modal
  const [showMintModal, setShowMintModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    const found = getNFTById(id || "") || dummyNFTs.find((n) => n.id === id);
    if (found) setNft(found);
    else navigate("/marketplace");
  }, [id, getNFTById, navigate]);

  useEffect(() => {
    if (nft) setLiked(isNFTLiked(nft.id));
  }, [nft, isNFTLiked]);

  // Like handler
  const handleLike = () => {
    if (!nft) return;
    if (isNFTLiked(nft.id)) unlikeNFT(nft.id);
    else likeNFT(nft.id);
    setLiked(!liked);
  };

  // Comments
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = { id: Date.now(), user: "You", text: newComment.trim() };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  // Mint flow
  const handleMintClick = async () => {
    if (!isConnected) {
      await connectWallet("polkadot-js");
      return;
    }
    setShowMintModal(true);
  };

  const handleMintNFT = async (data: MintFormData) => {
    setIsMinting(true);
    try {
      // Simulate minting delay (replace later with real transaction)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("✅ NFT Minted:", data);
      console.log(`Minted by: ${selectedAccount?.address}`);

      alert(`NFT "${data.name}" minted successfully!`);
      setShowMintModal(false);
    } catch (err) {
      console.error("Mint failed:", err);
      alert("Mint failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  if (!nft) return null;

  const tabs = ["details", "history", "comments"];

  return (
    <div className="nft-detail">
      {/* Header */}
      <motion.div
        className="nft-detail__header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button className="nft-detail__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <div className="nft-detail__header-actions">
          <button className="nft-detail__action-btn">
            <Share2 size={20} />
          </button>
          <button className="nft-detail__action-btn">
            <MoreVertical size={20} />
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="nft-detail__content">
        {/* Image Section */}
        <motion.div
          className="nft-detail__image-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="nft-detail__image-container">
            <img
              src={nft.image}
              alt={nft.name}
              className="nft-detail__image"
              draggable="false"
            />
            <div className="nft-detail__watermark">DOTIQUE</div>
          </div>

          {/* Quick Actions */}
          <div className="nft-detail__quick-actions">
            <motion.button
              className={`nft-detail__quick-btn ${liked ? "liked" : ""}`}
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} fill={liked ? "#FF6B9D" : "none"} />
              <span>{nft.likes + (liked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              className="nft-detail__quick-btn"
              onClick={() => setActiveTab("comments")}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={20} />
              <span>{comments.length}</span>
            </motion.button>

            <motion.button
              className="nft-detail__quick-btn"
              onClick={() => navigate(`/repost/${nft.id}`)}
              whileTap={{ scale: 0.9 }}
            >
              <Repeat2 size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="nft-detail__info-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Title & Artist */}
          <div className="nft-detail__title-block">
            <h1 className="nft-detail__title">{nft.name}</h1>
            <p className="nft-detail__artist">Created by {nft.artist}</p>
            <div className="nft-detail__badges">
              <span className="nft-detail__badge nft-detail__badge--rarity">{nft.rarity}</span>
              <span className="nft-detail__badge">{nft.type}</span>
            </div>
          </div>

          {/* Price & Wallet Actions */}
          <div className="nft-detail__price-block">
            <div className="nft-detail__price-info">
              <span className="nft-detail__price-label">Current Price</span>
              <span className="nft-detail__price">{nft.price} DOT</span>
              <span className="nft-detail__price-usd">
                ≈ ${(nft.price * 7.5).toFixed(2)} USD
              </span>
            </div>

            <div className="nft-detail__action-buttons">
              <motion.button
                className="nft-detail__buy-btn"
                onClick={handleMintClick}
                disabled={isConnecting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={20} />
                <span>
                  {isConnected
                    ? "Mint / Buy NFT"
                    : isConnecting
                    ? "Connecting..."
                    : "Connect Wallet"}
                </span>
              </motion.button>

              <motion.button
                className="nft-detail__donate-btn"
                onClick={() => navigate(`/marketplace/donate/${nft.id}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <DollarSign size={20} />
                <span>Support Artist</span>
              </motion.button>
            </div>

            {isConnected && selectedAccount && (
              <p className="nft-detail__wallet">
                Connected Wallet:{" "}
                <span>{selectedAccount.address.slice(0, 10)}...</span>
                <br />
                Balance: {balance ? `${balance} DOT` : "Loading..."}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="nft-detail__tabs">
            {["details", "history", "comments"].map((tab) => (
              <button
                key={tab}
                className={`nft-detail__tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="nft-detail__tab-content">
            {activeTab === "details" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3>Description</h3>
                <p className="nft-detail__description">
                  {nft.description || "No description available."}
                </p>

                {nft.metadata && (
                  <>
                    <h3>Details</h3>
                    <div className="nft-detail__metadata">
                      {Object.entries(nft.metadata).map(([key, value]) => (
                        <div key={key} className="nft-detail__meta-item">
                          <span>{key}</span>
                          <span>{value as string}</span>
                        </div>
                      ))}
                    </div>

                    <button className="nft-detail__link-btn">
                      <ExternalLink size={16} />
                      <span>View on Polkadot Explorer</span>
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="nft-detail__history">
                  <div className="nft-detail__history-item">
                    <div className="nft-detail__history-icon">🎨</div>
                    <div className="nft-detail__history-content">
                      <p>Minted by {nft.artist}</p>
                      <span>{nft.metadata?.mintedDate}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "comments" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="nft-detail__comments">
                  {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                  ) : (
                    <div className="nft-detail__comments-list">
                      {comments.map((c) => (
                        <motion.div
                          key={c.id}
                          className="nft-detail__comment"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span className="nft-detail__comment-user">{c.user}</span>
                          <p className="nft-detail__comment-text">{c.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <textarea
                    className="nft-detail__comment-input"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <motion.button
                    className="nft-detail__comment-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePostComment}
                  >
                    Post Comment
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ✅ Use your existing MintNFTModal */}
      <MintNFTModal
        isOpen={showMintModal}
        onClose={() => setShowMintModal(false)}
        onMint={handleMintNFT}
        isLoading={isMinting}
      />
    </div>
  );
};

export default NFTDetail;
