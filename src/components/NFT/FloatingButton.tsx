import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Upload, Wallet, Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FloatingButton.scss';

const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const uploadOptions = [
    {
      id: 'device',
      label: 'Upload from Device',
      icon: Upload,
      route: '/marketplace/upload/device',
      description: 'Upload images, videos, or 3D models',
    },
    {
      id: 'studio',
      label: 'NFT Studio (Mint)',
      icon: Sparkles,
      route: '/marketplace/upload/studio',
      description: 'Create and mint new NFTs',
    },
    {
      id: 'wallet',
      label: 'Import from Wallet',
      icon: Wallet,
      route: '/marketplace/upload/wallet',
      description: 'Connect your Polkadot wallet',
    },
    {
      id: 'external',
      label: 'Import from Apps',
      icon: ExternalLink,
      route: '/marketplace/upload/external',
      description: 'Link from other platforms',
    },
  ];

  const handleOptionClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-button__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="floating-button">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="floating-button__menu"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {uploadOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    className="floating-button__option"
                    onClick={() => handleOptionClick(option.route)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 400,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.05, x: -8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="floating-button__option-icon">
                      <Icon size={20} />
                    </div>
                    <div className="floating-button__option-content">
                      <span className="floating-button__option-label">
                        {option.label}
                      </span>
                      <span className="floating-button__option-description">
                        {option.description}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={`floating-button__main ${isOpen ? 'floating-button__main--open' : ''}`}
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 45 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingButton;