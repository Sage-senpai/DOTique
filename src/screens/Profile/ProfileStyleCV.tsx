import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import "./profile.scss";

export default function ProfileStyleCV() {
  const profile = useAuthStore((s) => s.profile);
  const [sbtData, setSbtData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="profile-container">
      <div className="profile-section">
        <h4 className="section-title">Style CV</h4>
        <p className="section-desc">Show your fashion achievements, badges, and credentials.</p>

        {loading ? (
          <div className="spinner" />
        ) : sbtData.length > 0 ? (
          sbtData.map((item: any, index: number) => (
            <div key={index} className="card">
              <div className="card-label">{item.category || "Credential"}</div>
              <div className="card-value">{item.title}</div>
              <p className="section-desc">{item.description || "No description provided."}</p>
            </div>
          ))
        ) : (
          <p>No SBTs or credentials yet 🎓</p>
        )}
      </div>
    </div>
  );
}
