// src/components/Notifications/NotificationCenter.tsx - ENHANCED
import React, { useState, useEffect } from 'react';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { notificationService, type Notification } from '../../services/notificationService';
import './NotificationCenter.scss';

const NotificationCenter: React.FC = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      loadNotifications();
      
      // Subscribe to real-time notifications
      const unsubscribe = notificationService.subscribeToNotifications(
        profile.id,
        (newNotification) => {
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('DOTique', {
              body: `${newNotification.actor?.display_name} ${newNotification.content}`,
              icon: newNotification.actor?.avatar_url || '/logo.png',
              tag: newNotification.id,
            });
          }

          // Play sound (optional)
          const audio = new Audio('/notification-sound.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => {});
        }
      );

      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      return unsubscribe;
    }
  }, [profile?.id]);

  const loadNotifications = async () => {
    if (!profile?.id) return;
    
    try {
      setLoading(true);
      const data = await notificationService.getNotifications(profile.id);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await notificationService.markAsRead(notification.id);
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }

    // Navigate to action URL
    if (notification.action_url) {
      navigate(notification.action_url);
      setIsOpen(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!profile?.id) return;
    
    await notificationService.markAllAsRead(profile.id);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like': return '❤️';
      case 'follow': return '👥';
      case 'comment': return '💬';
      case 'repost': return '🔄';
      case 'purchase': return '💎';
      case 'donation': return '💰';
      case 'milestone': return '🎉';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-center">
      <button
        className="notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          <div className="notification-panel">
            <div className="notification-header">
              <h3>Notifications</h3>
              <div className="notification-actions">
                {unreadCount > 0 && (
                  <button
                    className="mark-all-btn"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                  >
                    <CheckCheck size={18} />
                  </button>
                )}
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {loading ? (
                <div className="notification-loading">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="notification-empty">
                  <div className="empty-icon">🔔</div>
                  <p>No notifications yet</p>
                  <span>When you get notifications, they'll show up here</span>
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div className="notification-icon">
                      {getNotificationIcon(notif.type)}
                    </div>

                    <div className="notification-avatar">
                      {notif.actor?.avatar_url ? (
                        <img src={notif.actor.avatar_url} alt={notif.actor.display_name} />
                      ) : (
                        notif.actor?.display_name?.charAt(0).toUpperCase() || '?'
                      )}
                    </div>

                    <div className="notification-content">
                      <div className="notification-text">
                        <strong>{notif.actor?.display_name || 'Someone'}</strong>{' '}
                        {notif.content}
                      </div>
                      <div className="notification-time">
                        {getTimeAgo(notif.created_at)}
                      </div>
                    </div>

                    {!notif.read && (
                      <div className="notification-dot"></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;