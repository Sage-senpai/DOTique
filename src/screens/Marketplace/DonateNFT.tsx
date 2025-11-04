import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, DollarSign, Heart } from "lucide-react";
import { dummyNFTs } from "../../data/nftData";
import "./NFTActions.scss";

export const DonateNFT: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nft = dummyNFTs.find((n) => n.id === id);
  const [amount, setAmount] = useState("");

  if (!nft) return null;

  return (
    <div className="donate-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        className="donate-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="donate-header">
          <Heart className="donate-heart" size={64} />
          <h1>Support {nft.artist}</h1>
          <p>Show appreciation for "{nft.name}"</p>
        </div>

        <div className="donate-input-group">
          <label>Donation Amount (DOT)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <button className="donate-btn">
          <DollarSign size={20} /> Send Donation
        </button>
      </motion.div>
    </div>
  );
};
