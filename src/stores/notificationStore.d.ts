export interface Notification {
    id: string;
    type: "like" | "follow" | "comment" | "repost" | "purchase" | "milestone";
    actor: {
        id: string;
        name: string;
        avatar: string;
    };
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}
interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    setLoading: (loading: boolean) => void;
}
export declare const useNotificationStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NotificationState>>;
export {};
//# sourceMappingURL=notificationStore.d.ts.map