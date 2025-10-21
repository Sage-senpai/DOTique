export type Message = {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
};
export declare const useMessaging: (peerId?: string) => {
    messages: Message[];
    sendMessage: (content: string) => Promise<void>;
    sending: boolean;
    loadMessages: () => Promise<void>;
};
export default useMessaging;
//# sourceMappingURL=useMessaging.d.ts.map