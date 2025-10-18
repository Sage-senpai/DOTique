// src/components/Notifications/NotificationItem.tsx
import React from 'react';
import './NotificationItem.scss';

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    actor: {
      id: string;
      name: string;
      avatar: string;
    };
    message: string;
    timestamp: Date;
    read: boolean;
  };
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getTimeAgo = (date: Date): string => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-avatar">{notification.actor.avatar}</div>
      <div className="notification-content">
        <div className="notification-text">
          <strong>{notification.actor.name}</strong> {notification.message}
        </div>
        <div className="notification-time">
          {getTimeAgo(notification.timestamp)} ago
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;