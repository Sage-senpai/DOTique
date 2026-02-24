// src/hooks/useMessaging.ts
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../stores/authStore";
import { executeSupabase } from "../services/supabaseRetryService";

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

export const useMessaging = (peerId?: string) => {
  const { profile } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);

  const appendUniqueMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      if (prev.some((existing) => existing.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  // ✅ Load history between user and peer
  const loadMessages = useCallback(async () => {
    if (!profile?.id || !peerId) return;
    const data = await executeSupabase(() =>
      supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${profile.id},receiver_id.eq.${peerId}),and(sender_id.eq.${peerId},receiver_id.eq.${profile.id})`
        )
        .order("created_at", { ascending: true })
    );
    setMessages(data ?? []);
  }, [profile?.id, peerId]);

  // ✅ Send new message
  const sendMessage = async (content: string) => {
    if (!profile?.id || !peerId || !content.trim()) return;
    setSending(true);
    try {
      const data = await executeSupabase(() =>
        supabase
          .from("messages")
          .insert({
            sender_id: profile.id,
            receiver_id: peerId,
            content,
          })
          .select()
          .single()
      );

      if (data) appendUniqueMessage(data);
    } finally {
      setSending(false);
    }
  };

  // ✅ Subscribe to realtime updates
  useEffect(() => {
    if (!profile?.id || !peerId) return;
    loadMessages();
    const channel = supabase
      .channel(`chat:${profile.id}-${peerId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          if (
            (newMsg.sender_id === profile.id && newMsg.receiver_id === peerId) ||
            (newMsg.sender_id === peerId && newMsg.receiver_id === profile.id)
          ) {
            appendUniqueMessage(newMsg);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [appendUniqueMessage, loadMessages, peerId, profile?.id]);

  return { messages, sendMessage, sending, loadMessages };
};

export default useMessaging;
