import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileWardrobe() {
  const profile = useAuthStore((s) => s.profile);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="profile-container">
      <div className="profile-section">
        <h4 className="section-title">Wardrobe Gallery</h4>
        <p className="section-desc">View your fashion NFTs and accessories.</p>

        {loading ? (
          <div className="spinner" />
        ) : nfts.length > 0 ? (
          <div className="nft-horizontal">
            {nfts.map((nft: any, index: number) => (
              <div key={index} className="nft-card">
                {nft.image_url ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={nft.image_url} alt="nft" className="nft-image" />
                ) : (
                  <div className="nft-placeholder">🧥</div>
                )}
                <div className="nft-name">{nft.name}</div>
                <div className="nft-rarity">{nft.rarity || "Common"}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No NFTs in your wardrobe yet 👗</p>
        )}
      </div>
    </div>
  );
}
