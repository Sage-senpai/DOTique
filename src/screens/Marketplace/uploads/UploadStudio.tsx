// src/screens/Upload/UploadStudio.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "./UploadStudio.scss";

export const UploadStudio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-studio">
      <button className="upload-studio__back" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="upload-studio__content"
      >
        <h1 className="upload-studio__title">🎨 NFT Studio</h1>
        <p className="upload-studio__subtitle">
          Create and mint your NFT directly on Polkadot
        </p>

        <div className="upload-studio__grid">
          <div className="studio-card">
            <div className="studio-card__icon">🖼️</div>
            <h3 className="studio-card__title">Generative Art</h3>
            <p className="studio-card__text">
              Create algorithmic art with AI tools
            </p>
            <button className="studio-card__button">Start Creating</button>
          </div>

          <div className="studio-card">
            <div className="studio-card__icon">🎵</div>
            <h3 className="studio-card__title">Music NFTs</h3>
            <p className="studio-card__text">
              Mint audio tracks with visual covers
            </p>
            <button className="studio-card__button">Create Music NFT</button>
          </div>

          <div className="studio-card">
            <div className="studio-card__icon">🎭</div>
            <h3 className="studio-card__title">Avatar Builder</h3>
            <p className="studio-card__text">
              Design custom metaverse avatars
            </p>
            <button className="studio-card__button">Build Avatar</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
