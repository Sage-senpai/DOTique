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
  const [donated, setDonated] = useState(false);
  const [error, setError] = useState("");

  if (!nft) return null;

  const handleDonate = () => {
    const val = parseFloat(amount);
    if (!amount || isNaN(val) || val <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    setError("");
    setDonated(true);
  };

  if (donated) {
    return (
      <div className="donate-page">
        <motion.div
          className="donate-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="donate-header">
            <Heart className="donate-heart" size={64} />
            <h1>Thank You! 🎉</h1>
            <p>
              You donated <strong>{amount} DOT</strong> to support "{nft.name}"
              by {nft.artist}.
            </p>
          </div>
          <button className="donate-btn" onClick={() => navigate("/marketplace")}>
            Back to Marketplace
          </button>
        </motion.div>
      </div>
    );
  }

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
            onChange={(e) => { setAmount(e.target.value); setError(""); }}
            placeholder="0.00"
          />
          {error && <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "6px" }}>{error}</p>}
        </div>

        <button className="donate-btn" onClick={handleDonate}>
          <DollarSign size={20} /> Send Donation
        </button>
      </motion.div>
    </div>
  );
};
