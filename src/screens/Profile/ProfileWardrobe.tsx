// src/screens/Profile/ProfileWardrobe.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileWardrobe() {
  const profile = useAuthStore((s) => s.profile);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const { data, error } = await supabase
          .from("user_nfts")
          .select("*")
          .eq("auth_uid", profile?.auth_uid);

        if (error) console.error(error);
        else setNfts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNFTs();
  }, [profile?.auth_uid]);

  return (
    <motion.div
      className="wardrobe-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="wardrobe-screen__header">
        <button
          className="wardrobe-screen__back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h2 className="wardrobe-screen__title">Wardrobe Gallery</h2>
      </div>

      <div className="wardrobe-screen__content">
        <p className="wardrobe-screen__subtitle">
          View your fashion NFTs and accessories.
        </p>

        {loading ? (
          <div className="wardrobe-screen__spinner" />
        ) : nfts.length > 0 ? (
          <div className="wardrobe-screen__grid">
            {nfts.map((nft: any, index: number) => (
              <div key={index} className="wardrobe-screen__nft-card">
                {nft.image_url ? (
                  <img
                    src={nft.image_url}
                    alt={nft.name}
                    className="wardrobe-screen__nft-image"
                  />
                ) : (
                  <div className="wardrobe-screen__nft-placeholder">🧥</div>
                )}
                <h4 className="wardrobe-screen__nft-name">{nft.name}</h4>
                <p className="wardrobe-screen__nft-rarity">
                  {nft.rarity || "Common"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="wardrobe-screen__empty">
            <div className="wardrobe-screen__empty-icon">👗</div>
            <p className="wardrobe-screen__empty-text">
              No NFTs in your wardrobe yet
            </p>
          </div>
        )}
      </div>

      <div className="wardrobe-screen__nav-bottom">
        <button className="wardrobe-screen__nav-btn">🏠</button>
        <button className="wardrobe-screen__nav-btn">💬</button>
        <button className="wardrobe-screen__nav-btn wardrobe-screen__nav-btn--active">
          👤
        </button>
      </div>
    </motion.div>
  );
}