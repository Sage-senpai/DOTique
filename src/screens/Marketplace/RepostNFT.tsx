// src/components/NFT/RepostNFT.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { dummyNFTs } from "../../data/nftData";
import { useUserStore } from "../../stores/userStore"; // 🔹 your user state
import "./NFTActions.scss";

export const RepostNFT: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nft = dummyNFTs.find((n) => n.id === id);
  const [caption, setCaption] = useState("");

  const { user, addRepost } = useUserStore(); // assume store tracks user & their reposts

  if (!nft) return null;

  const handleRepost = () => {
    if (!user) {
      alert("Please log in to repost NFTs.");
      navigate("/login");
      return;
    }

    const newRepost = {
      id: `${nft.id}-repost-${Date.now()}`, // unique id
      originalId: nft.id,
      name: nft.name,
      artist: nft.artist,
      image: nft.image,
      caption: caption.trim(),
      type: "repost",
      repostedBy: user.username,
      date: new Date().toISOString(),
    };

    // 🔹 Save to global store (so it shows in user's profile feed)
    addRepost(newRepost);

    // Optionally also push into dummyNFTs or feed array if you're showing reposts globally
    dummyNFTs.unshift(newRepost);

    alert("NFT successfully reposted!");
    navigate(`/profile/${user.username}`);
  };

  return (
    <div className="repost-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        className="repost-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Repost to your feed</h1>

        <div className="repost-preview">
          <img src={nft.image} alt={nft.name} />
          <h3>{nft.name}</h3>
          <p>by {nft.artist}</p>
        </div>

        <div className="repost-input-group">
          <label>Add a caption (optional)</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
          />
        </div>

        <button className="repost-btn" onClick={handleRepost}>
          Repost to Feed
        </button>
      </motion.div>
    </div>
  );
};
