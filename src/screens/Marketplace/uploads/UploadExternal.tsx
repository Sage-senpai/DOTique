// src/screens/UploadExternal.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import "./UploadExternal.scss";

const platforms = [
  { name: "OpenSea", icon: "🌊", color: "#2081E2" },
  { name: "Rarible", icon: "🎨", color: "#FEDA03" },
  { name: "Foundation", icon: "⚡", color: "#1A1A1A" },
  { name: "SuperRare", icon: "💎", color: "#3B3B3B" },
  { name: "Zora", icon: "⚫", color: "#3D3D3D" },
  { name: "Magic Eden", icon: "🪄", color: "#E42575" },
];

export const UploadExternal: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

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
            <button
              key={platform.name}
              className={`external-card ${selectedPlatform === platform.name ? "selected" : ""}`}
              onClick={() => setSelectedPlatform(platform.name)}
            >
              <div className="external-icon">{platform.icon}</div>
              <h3 className="external-name">{platform.name}</h3>
            </button>
          ))}
        </div>

        {/* Bridge panel shown after selecting a platform */}
        <AnimatePresence>
          {selectedPlatform && (
            <motion.div
              key="bridge-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                overflow: "hidden",
                marginTop: "24px",
                padding: "24px",
                background: "rgba(96, 81, 155, 0.08)",
                border: "1px solid rgba(96, 81, 155, 0.25)",
                borderRadius: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, color: "#fff", fontSize: "17px" }}>
                  Connect to {selectedPlatform}
                </h3>
                <button
                  onClick={() => setSelectedPlatform(null)}
                  style={{ background: "transparent", border: "none", color: "#bfc0d1", cursor: "pointer" }}
                >
                  <X size={18} />
                </button>
              </div>
              <p style={{ color: "#bfc0d1", fontSize: "14px", marginBottom: "20px" }}>
                Cross-chain NFT bridging from {selectedPlatform} to Polkadot is coming soon.
                In the meantime, you can mint directly from the NFT Studio.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => navigate("/nft-studio")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "linear-gradient(135deg, #60519b 0%, #7d6bb3 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  🎨 Go to NFT Studio
                </button>
                <button
                  onClick={() => navigate("/marketplace/upload/wallet")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "rgba(96,81,155,0.15)",
                    border: "1px solid rgba(96,81,155,0.3)",
                    borderRadius: "10px",
                    color: "#bfc0d1",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  🔗 Import via Wallet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="how-it-works">
          <h3>How it works</h3>
          <ol>
            <li>Select the platform where your NFT is currently listed</li>
            <li>Connect your wallet that holds the NFT</li>
            <li>Select the NFTs you want to bridge to Polkadot</li>
            <li>Confirm the bridge transaction (fees apply)</li>
            <li>Your NFTs will appear in your DOTique wardrobe</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
};
