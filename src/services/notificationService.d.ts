export declare const notificationService: {
    getNotifications(userId: string, limit?: number): Promise<any[]>;
    markAsRead(notificationId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
    subscribeToNotifications(userId: string, callback: (data: any) => void): () => Promise<"error" | "ok" | "timed out">;
};
//# sourceMappingURL=notificationService.d.ts.map