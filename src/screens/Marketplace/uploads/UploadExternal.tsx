// src/screens/UploadExternal.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "./UploadExternal.scss";

export const UploadExternal: React.FC = () => {
  const navigate = useNavigate();

  const platforms = [
    { name: "OpenSea", icon: "🌊", color: "#2081E2" },
    { name: "Rarible", icon: "🎨", color: "#FEDA03" },
    { name: "Foundation", icon: "⚡", color: "#000000" },
    { name: "SuperRare", icon: "💎", color: "#000000" },
    { name: "Zora", icon: "⚫", color: "#000000" },
    { name: "Magic Eden", icon: "🪄", color: "#E42575" },
  ];

  return (
    <div className="upload-external">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        className="external-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="external-title">Import from Other Platforms</h1>
        <p className="external-subtitle">
          Bridge your NFTs from other marketplaces to Polkadot
        </p>

        <div className="external-grid">
          {platforms.map((platform) => (
            <button key={platform.name} className="external-card">
              <div className="external-icon">{platform.icon}</div>
              <h3 className="external-name">{platform.name}</h3>
            </button>
          ))}
        </div>

        <div className="how-it-works">
          <h3>How it works</h3>
          <ol>
            <li>Select the platform where your NFT is currently listed</li>
            <li>Connect your wallet that holds the NFT</li>
            <li>Select the NFTs you want to bridge to Polkadot</li>
            <li>Confirm the bridge transaction (fees apply)</li>
            <li>Your NFTs will appear in your Dotique wallet</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
};
