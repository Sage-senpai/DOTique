import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import "./HomeScreen.scss";

export default function HomeScreen() {
  const profile = useAuthStore((s) => s.profile);
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      resetAuth();
    } catch (error: any) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="home__header">
        <div>
          <h1 className="home__welcome">Welcome Back!</h1>
          <p className="home__username">
            {profile?.display_name || profile?.username || profile?.email}
          </p>
        </div>
      </header>

      <main className="home__grid">
        <motion.button
          className="card card--primary"
          onClick={() => navigate("/dotvatar")}
          whileHover={{ y: -6 }}
        >
          <div className="card__icon">👗</div>
          <h3 className="card__title">Create DOTvatar</h3>
          <p className="card__desc">Customize your 3D avatar</p>
        </motion.button>

        <motion.button
          className="card card--secondary"
          onClick={() => navigate("/nftstudio")}
          whileHover={{ y: -6 }}
        >
          <div className="card__icon">🎨</div>
          <h3 className="card__title">NFT Studio</h3>
          <p className="card__desc">Design fashion NFTs</p>
        </motion.button>

        <motion.button className="card card--accent" whileHover={{ y: -6 }}>
          <div className="card__icon">🛍️</div>
          <h3 className="card__title">Marketplace</h3>
          <p className="card__desc">Browse & buy NFTs</p>
        </motion.button>

        <motion.button className="card card--info" whileHover={{ y: -6 }}>
          <div className="card__icon">🗳️</div>
          <h3 className="card__title">Vote</h3>
          <p className="card__desc">Fashion DAO voting</p>
        </motion.button>
      </main>

      <motion.button
        className="home__signout"
        whileTap={{ scale: 0.98 }}
        onClick={handleSignOut}
      >
        Sign Out
      </motion.button>
    </motion.div>
  );
}
