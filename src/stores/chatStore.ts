/* eslint-disable @typescript-eslint/no-unused-vars */
// src/stores/chatStore.ts
import { create } from "zustand";

export type Message = {
  id: string;
  senderId: string;
  receiverId?: string; // for DMs
  groupId?: string; // for group chats
  content: string;
  timestamp: number;
  type?: "text" | "image" | "video" | "system";
  status?: "sent" | "delivered" | "read";
};

export type ChatThread = {
  id: string;
  name?: string;
  participants: string[];
  messages: Message[];
  unreadCount?: number;
};

type ChatStore = {
  threads: ChatThread[];
  activeThreadId: string | null;
  loading: boolean;

  // actions
  setActiveThread: (id: string | null) => void;
  addMessage: (threadId: string, message: Message) => void;
  addThread: (thread: ChatThread) => void;
  markThreadAsRead: (threadId: string) => void;
  resetChat: () => void;
};

export const useChatStore = create<ChatStore>((set, _get) => ({
  threads: [],
  activeThreadId: null,
  loading: false,

  setActiveThread: (id) => set({ activeThreadId: id }),

  addMessage: (threadId, message) =>
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === threadId
          ? { ...t, messages: [...t.messages, message], unreadCount: 0 }
          : t
      ),
    })),

  addThread: (thread) =>
    set((state) => ({
      threads: [...state.threads, thread],
    })),

  markThreadAsRead: (threadId) =>
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === threadId ? { ...t, unreadCount: 0 } : t
      ),
    })),

  resetChat: () => set({ threads: [], activeThreadId: null, loading: false }),
}));
