// src/hooks/useDOTvatar.ts
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import { useDotvatarStore } from "../stores/dotvatarStore";

export const useDOTvatar = () => {
  const { profile } = useAuthStore();
  const { dotvatar, setDotvatar, resetDotvatar } = useDotvatarStore();
  const [loading, setLoading] = useState(false);

  // ✅ Load user's saved DOTvatar from Supabase
  useEffect(() => {
    if (!profile?.id) return;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("dotvatars")
          .select("*")
          .eq("user_id", profile.id)
          .single();
        if (data) {
          setDotvatar(data.config ?? {});
        } else if (error && error.code !== "PGRST116") {
          console.error("DOTvatar load error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [profile?.id]);

  // ✅ Save DOTvatar to Supabase
  const saveDOTvatar = async () => {
    if (!profile?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("dotvatars").upsert({
        user_id: profile.id,
        config: dotvatar,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      return true;
    } catch (err: any) {
      console.error("DOTvatar save failed:", err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    dotvatar,
    setDotvatar,
    resetDotvatar,
    saveDOTvatar,
    loading,
  };
};

export default useDOTvatar;
