import React from "react";
import { motion } from "framer-motion";
import "./MintSuccess.scss";

interface MintSuccessProps {
  tokenId: string;
  transactionHash: string;
  onClose: () => void;
}

const MintSuccess: React.FC<MintSuccessProps> = ({
  tokenId,
  transactionHash,
  onClose,
}) => {
  return (
    <motion.div
      className="mint-success"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mint-success__content">
        <div className="mint-success__icon">💎</div>
        <h2>NFT Minted Successfully!</h2>
        <p>Your NFT has been minted and is ready to trade.</p>
        
        <div className="mint-success__details">
          <div>
            <span>Token ID:</span>
            <code>{tokenId}</code>
          </div>
          <div>
            <span>TX Hash:</span>
            <code>{transactionHash.slice(0, 10)}...</code>
          </div>
        </div>

        <button className="mint-success__btn" onClick={onClose}>
          ✓ Continue
        </button>
      </div>
    </motion.div>
  );
};

export default MintSuccess;