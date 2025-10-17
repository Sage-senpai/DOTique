// src/screens/Profile/ProfileGovernance.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileGovernance() {
  const profile = useAuthStore((s) => s.profile);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGovernanceBadges = async () => {
      try {
        const { data, error } = await supabase
          .from("user_governance")
          .select("*")
          .eq("auth_uid", profile?.auth_uid);

        if (error) console.error(error);
        else setBadges(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGovernanceBadges();
  }, [profile?.auth_uid]);

  const handleDelegateVote = (daoName: string) => {
    alert(`Delegated voting power in ${daoName} ✅`);
  };

  return (
    <motion.div
      className="governance-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="governance-screen__header">
        <button
          className="governance-screen__back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h2 className="governance-screen__title">Governance</h2>
      </div>

      <div className="governance-screen__content">
        <p className="governance-screen__subtitle">
          DAO badges, voting records, and delegation options.
        </p>

        {loading ? (
          <div className="governance-screen__spinner" />
        ) : badges.length > 0 ? (
          <div className="governance-screen__list">
            {badges.map((dao: any, index: number) => (
              <div key={index} className="governance-screen__card">
                <div className="governance-screen__card-header">
                  <h3 className="governance-screen__dao-name">{dao.dao_name}</h3>
                </div>
                <div className="governance-screen__card-body">
                  <p className="governance-screen__info">
                    Role: <span className="governance-screen__info-value">{dao.role || "Member"}</span>
                  </p>
                  <p className="governance-screen__info">
                    Votes: <span className="governance-screen__info-value">{dao.votes || 0}</span>
                  </p>
                </div>
                <button
                  className="governance-screen__delegate-btn"
                  onClick={() => handleDelegateVote(dao.dao_name)}
                >
                  Delegate Vote
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="governance-screen__empty">
            <div className="governance-screen__empty-icon">🗳️</div>
            <p className="governance-screen__empty-text">
              No governance badges yet
            </p>
          </div>
        )}
      </div>

      <div className="governance-screen__nav-bottom">
        <button className="governance-screen__nav-btn">🏠</button>
        <button className="governance-screen__nav-btn">💬</button>
        <button className="governance-screen__nav-btn governance-screen__nav-btn--active">
          👤
        </button>
      </div>
    </motion.div>
  );
}