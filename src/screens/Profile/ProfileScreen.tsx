import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "Overview" | "Wardrobe" | "StyleCV" | "Governance"
  >("Overview");

  // used to retrigger framer-motion animations
  const [fadeKey, setFadeKey] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = useCallback(async () => {
    if (!profile?.auth_uid) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_uid", profile.auth_uid)
        .single();
      if (error) throw error;
      if (data) {
        setProfile(data);
        setFadeKey((k) => k + 1);
      }
    } catch (err) {
      console.error("Error refreshing profile:", err);
    } finally {
      setLoading(false);
    }
  }, [profile?.auth_uid, setProfile]);

  // refresh handler (can be wired to a button)
  const onRefresh = useCallback(async () => {
    if (!profile?.auth_uid) return;
    try {
      setRefreshing(true);
      await fetchProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [profile?.auth_uid, fetchProfile]);

  // refresh on route focus (approximation of useFocusEffect)
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleShareProfile = async () => {
    try {
      const message = `Check out ${profile?.display_name || "my"} DOTique fashion profile 👗✨\n\nJoin the Web3 fashion revolution on DOTique!`;
      if ((navigator as any).share) {
        await (navigator as any).share({ text: message });
      } else {
        // fallback
        window.prompt("Copy profile share text:", message);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  // render sections as small components for clarity
  const Overview = (
    <motion.div key={`overview-${fadeKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="profile-header">
        {loading ? (
          <div className="spinner" />
        ) : profile?.dotvatar_url ? (
          // image
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={profile.dotvatar_url} alt="avatar" className="profile-avatar" />
        ) : (
          <div className="profile-avatar-placeholder">🪞</div>
        )}

        <h3 className="profile-name">{profile?.display_name || profile?.username || "User"}</h3>
        <p className="profile-email">{profile?.email}</p>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-number">{profile?.followers ?? 0}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat">
            <div className="stat-number">{profile?.following ?? 0}</div>
            <div className="stat-label">Following</div>
          </div>
        </div>

        <p className="profile-bio">{profile?.bio || "Your digital fashion journey starts here ✨"}</p>

        <div className="profile-buttons">
          <button className="btn edit" onClick={() => navigate("/profile/edit")}>Edit Profile</button>
          <button className="btn share" onClick={handleShareProfile}>Share</button>
          <button className="btn settings" onClick={() => navigate("/settings")}>⚙️</button>
        </div>
      </div>

      <div className="profile-section">
        <h4 className="section-title">Fashion Identity</h4>

        <div className="card">
          <div className="card-label">Fashion Archetype</div>
          <div className="card-value">{profile?.fashion_archetype || "Unassigned"}</div>
        </div>

        <div className="card">
          <div className="card-label">Style Tier</div>
          <div className="card-value">{profile?.style_tier || "Emerging Trendsetter"}</div>
        </div>

        <div className="card">
          <div className="card-label">Signature Palette</div>
          <div className="palette-row">
            {(profile?.signature_palette || ["#7D3C98", "#2ECC71", "#E91E63"]).map((color: string, idx: number) => (
              <div key={idx} className="color-swatch" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-label">Verified Brands</div>
          <div className="card-value">{(profile?.verified_brands || ["DOTique Originals"]).join(", ")}</div>
        </div>
      </div>
    </motion.div>
  );

  const Wardrobe = (
    <motion.div key={`wardrobe-${fadeKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="profile-section">
        <h4 className="section-title">Wardrobe Gallery</h4>
        <p className="section-desc">Your NFT fashion collection appears here 👗</p>

        <div className="nft-row">
          {(profile?.wardrobe_nfts || [
            { id: "1", name: "Crystal Dress", rarity: "Epic" },
            { id: "2", name: "Neon Sneakers", rarity: "Rare" },
          ]).map((item: any) => (
            <div className="nft-card" key={item.id}>
              <div className="nft-thumb">🧥</div>
              <div className="nft-name">{item.name}</div>
              <div className="nft-rarity">{item.rarity || "Common"}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const StyleCV = (
    <motion.div key={`stylecv-${fadeKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="profile-section">
        <h4 className="section-title">Style CV</h4>
        <p className="section-desc">Your Soulbound credentials and brand affiliations.</p>

        <div className="card">
          <div className="card-label">Badges</div>
          <div className="card-value">👗 Digital Tailor, 🎨 Creator, 🗳️ DAO Voter</div>
        </div>

        <div className="card">
          <div className="card-label">Brand Ambassador SBT</div>
          <div className="card-value">DOTique Originals (Active)</div>
        </div>
      </div>
    </motion.div>
  );

  const Governance = (
    <motion.div key={`gov-${fadeKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="profile-section">
        <h4 className="section-title">Governance</h4>
        <p className="section-desc">DAO memberships and voting power breakdown.</p>

        <div className="card">
          <div className="card-label">Voting Power</div>
          <div className="card-value">$STYLE: 500 | $DIOR: 50</div>
        </div>

        <div className="card">
          <div className="card-label">Delegate Votes</div>
          <button className="btn delegate" onClick={() => alert("Delegate clicked")}>Delegate</button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="profile-container">
      <div className="profile-tabs">
        {(["Overview", "Wardrobe", "StyleCV", "Governance"] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="tab-refresh" onClick={onRefresh} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "Overview" && Overview}
        {activeTab === "Wardrobe" && Wardrobe}
        {activeTab === "StyleCV" && StyleCV}
        {activeTab === "Governance" && Governance}
      </div>
    </div>
  );
}
