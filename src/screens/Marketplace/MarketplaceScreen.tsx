import { motion } from "framer-motion";
import "./MarketplaceScreen.scss";

export default function MarketplaceScreen() {
  return (
    <motion.div
      className="marketplace"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="marketplace__content">
        <h2 className="marketplace__title">NFT Marketplace</h2>
        <p className="marketplace__subtitle">Browse and collect fashion NFTs</p>

        <div className="marketplace__placeholder">
          <div className="marketplace__emoji">🛍️</div>
          <div className="marketplace__desc">Marketplace coming soon</div>
        </div>
      </div>
    </motion.div>
  );
}
