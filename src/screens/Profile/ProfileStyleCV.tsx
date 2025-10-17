// src/screens/Profile/ProfileStyleCV.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileStyleCV() {
  const profile = useAuthStore((s) => s.profile);
  const [sbtData, setSbtData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSBTs = async () => {
      try {
        const { data, error } = await supabase
          .from("user_credentials")
          .select("*")
          .eq("auth_uid", profile?.auth_uid);

        if (error) console.error(error);
        else setSbtData(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSBTs();
  }, [profile?.auth_uid]);

  return (
    <motion.div
      className="stylecv-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="stylecv-screen__header">
        <button
          className="stylecv-screen__back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h2 className="stylecv-screen__title">Style CV</h2>
      </div>

      <div className="stylecv-screen__content">
        <p className="stylecv-screen__subtitle">
          Show your fashion achievements, badges, and credentials.
        </p>

        {loading ? (
          <div className="stylecv-screen__spinner" />
        ) : sbtData.length > 0 ? (
          <div className="stylecv-screen__list">
            {sbtData.map((item: any, index: number) => (
              <div key={index} className="stylecv-screen__card">
                <h3 className="stylecv-screen__credential-title">
                  {item.category || "Credential"}
                </h3>
                <p className="stylecv-screen__credential-name">{item.title}</p>
                <p className="stylecv-screen__credential-desc">
                  {item.description || "No description provided."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="stylecv-screen__empty">
            <div className="stylecv-screen__empty-icon">🎓</div>
            <p className="stylecv-screen__empty-text">
              No SBTs or credentials yet
            </p>
          </div>
        )}
      </div>

      <div className="stylecv-screen__nav-bottom">
        <button className="stylecv-screen__nav-btn">🏠</button>
        <button className="stylecv-screen__nav-btn">💬</button>
        <button className="stylecv-screen__nav-btn stylecv-screen__nav-btn--active">
          👤
        </button>
      </div>
    </motion.div>
  );
}