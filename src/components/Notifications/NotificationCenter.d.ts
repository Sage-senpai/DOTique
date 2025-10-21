import React from 'react';
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
declare const NotificationCenter: React.FC<NotificationCenterProps>;
export default NotificationCenter;
//# sourceMappingURL=NotificationCenter.d.ts.map