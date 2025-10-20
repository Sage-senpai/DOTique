// ==================== src/stores/notificationStore.ts ====================
import { create } from "zustand";

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

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  setNotifications: (notifications: Notification[]) =>
    set(() => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    })),

  addNotification: (notification: Notification) =>
    set((state: NotificationState) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.read
        ? state.unreadCount
        : state.unreadCount + 1,
    })),

  markAsRead: (id: string) =>
    set((state: NotificationState) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllAsRead: () =>
    set((state: NotificationState) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  deleteNotification: (id: string) =>
    set((state: NotificationState) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setLoading: (loading: boolean) => set(() => ({ loading })),
}));
