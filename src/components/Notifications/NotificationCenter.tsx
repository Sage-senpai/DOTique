// src/components/Notifications/NotificationCenter.tsx - ENHANCED
import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { notificationService } from '../../services/notificationService';
import './NotificationCenter.scss';

const NotificationCenter = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (profile?.id) {
      loadNotifications();
      loadUnreadCount();
      
      // Subscribe to real-time notifications
      const unsubscribe = notificationService.subscribeToNotifications(
        profile.id,
        (newNotification) => {
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('DOTique', {
              body: `${newNotification.actor?.display_name} ${newNotification.content}`,
              icon: newNotification.actor?.avatar_url || '/logo.png',
              tag: newNotification.id,
            });
          }

          // Play subtle sound
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKjn77RnGAU+ltryxnMpBSl+zPLaizsIG2S57OihUxELTKXh8bllHAU2jtXzzn0vBSF1xe/glEILEl2z6+yoVxQLRZziEL');
          audio.volume = 0.2;
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

  const loadUnreadCount = async () => {
    if (!profile?.id) return;
    const count = await notificationService.getUnreadCount(profile.id);
    setUnreadCount(count);
  };

  const handleNotificationClick = async (notification) => {
    // Mark as read
    if (!notification.read) {
      await notificationService.markAsRead(notification.id);
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
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
    setUnreadCount(0);
  };

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation();
    await notificationService.deleteNotification(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    const icons = {
      like: '❤️',
      follow: '👥',
      comment: '💬',
      repost: '🔄',
      purchase: '💎',
      donation: '💰',
      milestone: '🎉',
      mention: '@'
    };
    return icons[type] || '🔔';
  };

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
                    className="action-btn"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                  >
                    <CheckCheck size={18} />
                  </button>
                )}
                <button className="action-btn" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {loading ? (
                <div className="notification-loading">
                  <div className="spinner"></div>
                  <p>Loading notifications...</p>
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
                        <div className="avatar-placeholder">
                          {notif.actor?.display_name?.charAt(0).toUpperCase() || '?'}
                        </div>
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

                    <button
                      className="delete-btn"
                      onClick={(e) => handleDeleteNotification(e, notif.id)}
                      title="Delete notification"
                    >
                      <Trash2 size={14} />
                    </button>
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