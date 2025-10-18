// src/components/Notifications/NotificationCenter.tsx
import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import NotificationItem from './NotificationItem';
import './NotificationCenter.scss';

interface Notification {
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
}

interface NotificationCenterProps {
  notifications: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-center">
      <button
        className="notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="notification-list">
            {notifications.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;