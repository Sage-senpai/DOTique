export type Message = {
    id: string;
    senderId: string;
    receiverId?: string;
    groupId?: string;
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
    setActiveThread: (id: string | null) => void;
    addMessage: (threadId: string, message: Message) => void;
    addThread: (thread: ChatThread) => void;
    markThreadAsRead: (threadId: string) => void;
    resetChat: () => void;
};
export declare const useChatStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ChatStore>>;
export {};
//# sourceMappingURL=chatStore.d.ts.map