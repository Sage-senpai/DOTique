import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileGovernance() {
  const profile = useAuthStore((s) => s.profile);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="profile-container">
      <div className="profile-section">
        <h4 className="section-title">Governance</h4>
        <p className="section-desc">DAO badges, voting records, and delegation options.</p>

        {loading ? (
          <div className="spinner" />
        ) : badges.length > 0 ? (
          badges.map((dao: any, index: number) => (
            <div key={index} className="card">
              <div className="card-label">DAO</div>
              <div className="card-value">{dao.dao_name}</div>
              <p className="section-desc">Role: {dao.role || "Member"} — Votes: {dao.votes || 0}</p>
              <button className="btn delegate" onClick={() => handleDelegateVote(dao.dao_name)}>Delegate Vote</button>
            </div>
          ))
        ) : (
          <p>No governance badges yet 🗳️</p>
        )}
      </div>
    </div>
  );
}
