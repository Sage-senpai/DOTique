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
declare const NotificationItem: React.FC<NotificationItemProps>;
export default NotificationItem;
//# sourceMappingURL=NotificationItem.d.ts.map