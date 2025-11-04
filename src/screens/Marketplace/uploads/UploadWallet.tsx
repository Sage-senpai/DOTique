// src/screens/UploadWallet.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "./UploadWallet.scss";

export const UploadWallet: React.FC = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="upload-wallet">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        className="wallet-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="wallet-title">Import from Wallet</h1>
        <p className="wallet-subtitle">
          Connect your Polkadot wallet to import existing NFTs
        </p>

        <div className="wallet-options">
          {["Polkadot.js", "Talisman", "SubWallet", "Nova Wallet"].map(
            (wallet) => (
              <button
                key={wallet}
                className="wallet-option"
                onClick={() => setConnecting(true)}
              >
                <span>🦊 {wallet}</span>
                <span className="arrow">→</span>
              </button>
            )
          )}
        </div>

        {connecting && (
          <motion.div
            className="wallet-connecting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Connecting to wallet...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
