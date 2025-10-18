// ==================== src/hooks/useNotifications.ts ====================
import { useEffect } from 'react';
import { useNotificationStore } from '../stores/notificationStore';

export function useNotifications() {
  const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead } = useNotificationStore();

  useEffect(() => {
    // TODO: Subscribe to real-time notifications from Supabase
    // const unsubscribe = notificationService.subscribeToNotifications(
    //   currentUser.id,
    //   (notification) => addNotification(notification)
    // );
    // return unsubscribe;
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}