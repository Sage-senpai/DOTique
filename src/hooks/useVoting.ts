// src/hooks/useVoting.ts
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";

export type VoteOption = { id: string; label: string; count: number };
export type Poll = { id: string; title: string; options: VoteOption[]; ends_at?: string };

export const useVoting = (pollId?: string) => {
  const { profile } = useAuthStore();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load poll + current user's vote
  const loadPoll = useCallback(async () => {
    if (!pollId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("polls")
        .select("*, options:poll_options(*), votes:poll_votes(user_id, option_id)")
        .eq("id", pollId)
        .single();
      if (error) throw error;
      setPoll({
        id: data.id,
        title: data.title,
        options: data.options.map((opt: any) => ({
          id: opt.id,
          label: opt.label,
          count: opt.vote_count ?? 0,
        })),
        ends_at: data.ends_at,
      });
      if (data.votes?.some((v: any) => v.user_id === profile?.id)) setVoted(true);
    } catch (err: any) {
      console.error("Load poll failed:", err.message);
    } finally {
      setLoading(false);
    }
  }, [pollId, profile?.id]);

  // ✅ Cast a vote
  const vote = async (optionId: string) => {
    if (!profile?.id || !pollId || voted) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("poll_votes").insert({
        user_id: profile.id,
        poll_id: pollId,
        option_id: optionId,
      });
      if (error) throw error;
      setVoted(true);
      await loadPoll(); // refresh tallies
    } catch (err: any) {
      console.error("Vote failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoll();
  }, [loadPoll]);

  return { poll, voted, loading, vote, reload: loadPoll };
};

export default useVoting;
