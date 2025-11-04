import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, ShoppingBag, Check, AlertCircle } from 'lucide-react';
import { dummyNFTs } from '../../data/nftData';
import './BuyNFT.scss';

// Import PAPI (or @polkadot/api) utilities
import { createClient,} from 'polkadot-api';         // example PAPI import
// @ts-ignore - descriptor exports not properly typed
import  { dot }  from '@polkadot-api/descriptors';                   // descriptor import
import { chainSpec } from 'polkadot-api/chains/polkadot';
import { startFromWorker } from 'polkadot-api/smoldot/from-worker';
import SmWorker from 'polkadot-api/smoldot/worker?worker';

const BuyNFT: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nft, setNft] = useState(dummyNFTs.find((n) => n.id === id));
  const [walletConnected, setWalletConnected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [api, setApi] = useState<any>(null);

  const wallets = [
    { id: 'polkadot-js', name: 'Polkadot.js', logo: '🔵' },
    { id: 'talisman', name: 'Talisman', logo: '🦊' },
    { id: 'subwallet', name: 'SubWallet', logo: '💎' },
  ];

  useEffect(() => {
    if (!nft) {
      navigate('/marketplace');
    }
  }, [nft, navigate]);

  useEffect(() => {
    // Initialize PAPI client on mount
    async function initApi() {
      try {
        const worker = new SmWorker();
        const smoldot = await startFromWorker(worker);
        const chain = await smoldot.addChain({ chainSpec });
         const client = createClient(chain);
        const typedApi = await client.getTypedApi(dot);
        setApi(typedApi);
        console.log('✅ Polkadot API connected', typedApi);
      } catch (err) {
        console.error('❌ Polkadot API init failed', err);
      }
    }
    initApi();
  }, []);

  const handleConnectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true);
    }, 1000);
  };

  const handlePurchase = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!api) {
      alert('Blockchain API not ready.');
      return;
    }
    try {
      setProcessing(true);

      // Example: Use api to submit transaction
      // Replace the pallet, method, and params with your chain logic
      const tx = api.tx.balances.transferKeepAlive(/* dest */ 'DEST_ADDRESS', /* value */ BigInt(nft.price * 1e12));
      const hash = await tx.signAndSend(selectedWallet /* or account address from wallet */, { /* options */ });
      console.log('Transaction hash', hash);

      setSuccess(true);
      setProcessing(false);

      // Redirect after success
      setTimeout(() => {
        navigate(`/marketplace/nft/${id}`);
      }, 3000);

    } catch (err) {
      console.error('Purchase transaction failed', err);
      setProcessing(false);
      alert('Transaction failed: ' + (err as Error).message);
    }
  };

  if (!nft) return null;

  return (
    <div className="buy-nft">
      <motion.div
        className="buy-nft__header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button className="buy-nft__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        <h1 className="buy-nft__title">Complete Purchase</h1>
      </motion.div>

      <div className="buy-nft__content">
        {/* Left Section - NFT Preview */}
        <motion.div
          className="buy-nft__preview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="buy-nft__preview-image">
            <img src={nft.image} alt={nft.name} />
          </div>
          <div className="buy-nft__preview-info">
            <h2>{nft.name}</h2>
            <p>by {nft.artist}</p>
            <div className="buy-nft__preview-badges">
              <span className="badge">{nft.rarity}</span>
              <span className="badge">{nft.type}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Purchase Flow */}
        <motion.div
          className="buy-nft__transaction"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!success ? (
            <>
              {/* Step 1: Connect Wallet */}
              <div className="buy-nft__step">
                <div className="buy-nft__step-header">
                  <div className="buy-nft__step-number">1</div>
                  <h3>Connect Wallet</h3>
                  {walletConnected && <Check className="buy-nft__check" size={20} />}
                </div>

                {!walletConnected ? (
                  <div className="buy-nft__wallets">
                    {wallets.map((wallet) => (
                      <motion.button
                        key={wallet.id}
                        className={`buy-nft__wallet ${selectedWallet === wallet.id ? 'selected' : ''}`}
                        onClick={() => handleConnectWallet(wallet.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="buy-nft__wallet-logo">{wallet.logo}</span>
                        <span className="buy-nft__wallet-name">{wallet.name}</span>
                        {selectedWallet === wallet.id && (
                          <motion.div className="buy-nft__wallet-connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            Connecting...
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="buy-nft__connected">
                    <Wallet size={24} />
                    <span>Wallet Connected</span>
                  </div>
                )}
              </div>

              {/* Step 2: Review & Pay */}
              <div className={`buy-nft__step ${!walletConnected ? 'disabled' : ''}`}>
                <div className="buy-nft__step-header">
                  <div className="buy-nft__step-number">2</div>
                  <h3>Review & Pay</h3>
                </div>

                <div className="buy-nft__summary">
                  <div className="buy-nft__summary-row">
                    <span>Price</span>
                    <span>{nft.price} DOT</span>
                  </div>
                  <div className="buy-nft__summary-row">
                    <span>Network Fee</span>
                    <span>0.05 DOT</span>
                  </div>
                  <div className="buy-nft__summary-row">
                    <span>Creator Royalty (5%)</span>
                    <span>{(nft.price * 0.05).toFixed(2)} DOT</span>
                  </div>
                  <div className="buy-nft__summary-divider" />
                  <div className="buy-nft__summary-row total">
                    <span>Total</span>
                    <span>{(nft.price + 0.05 + nft.price * 0.05).toFixed(2)} DOT</span>
                  </div>
                </div>

                <motion.button
                  className="buy-nft__purchase-btn"
                  onClick={handlePurchase}
                  disabled={!walletConnected || processing}
                  whileHover={walletConnected ? { scale: 1.02 } : {}}
                  whileTap={walletConnected ? { scale: 0.98 } : {}}
                >
                  <ShoppingBag size={20} />
                  <span>{processing ? 'Processing Transaction...' : 'Confirm Purchase'}</span>
                </motion.button>

                <div className="buy-nft__info">
                  <AlertCircle size={16} />
                  <span>This transaction will be recorded on the Polkadot blockchain</span>
                </div>
              </div>
            </>
          ) : (
            <motion.div className="buy-nft__success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="buy-nft__success-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                <Check size={48} />
              </motion.div>
              <h2>Purchase Successful!</h2>
              <p>Your NFT has been transferred to your wallet</p>
              <p className="buy-nft__success-redirect">Redirecting to NFT details...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BuyNFT;
