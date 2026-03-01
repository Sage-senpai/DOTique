// src/screens/Notifications/NotificationsScreen.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, CheckCheck, Trash2 } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { notificationService } from "../../services/notificationService";
import type { Notification } from "../../services/notificationService";

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return;
    const load = async () => {
      try {
        const data = await notificationService.getNotifications(profile.id, 50);
        setNotifications(data);
      } catch {
        // ignore — empty list on error
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [profile?.id]);

  const handleMarkAllRead = async () => {
    if (!profile?.id) return;
    await notificationService.markAllAsRead(profile.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = async (id: string) => {
    await notificationService.deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unread = notifications.filter((n) => !n.read).length;

  const PAGE_STYLE: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e202c 0%, #31323e 100%)",
    fontFamily: "'Poppins', sans-serif",
    color: "#bfc0d1",
  };

  const HEADER_STYLE: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 24px",
    borderBottom: "1px solid rgba(96, 81, 155, 0.2)",
    background: "rgba(30, 32, 44, 0.8)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  const CARD_STYLE: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(96, 81, 155, 0.1)",
    transition: "background 0.2s",
    cursor: "pointer",
  };

  return (
    <div style={PAGE_STYLE}>
      <div style={HEADER_STYLE}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "#bfc0d1",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <ArrowLeft size={22} />
        </button>
        <Bell size={20} color="#60519b" />
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#fff", flex: 1 }}>
          Notifications
          {unread > 0 && (
            <span
              style={{
                marginLeft: "10px",
                background: "#60519b",
                color: "#fff",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {unread}
            </span>
          )}
        </h1>
        {unread > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              background: "rgba(96, 81, 155, 0.15)",
              border: "1px solid rgba(96, 81, 155, 0.3)",
              color: "#60519b",
              borderRadius: "8px",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "rgba(191,192,209,0.4)", fontSize: "14px" }}>
            Loading notifications…
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: "80px 24px", textAlign: "center" }}>
            <Bell size={48} color="rgba(96,81,155,0.3)" style={{ marginBottom: "16px" }} />
            <p style={{ fontSize: "16px", color: "rgba(191,192,209,0.5)", margin: 0 }}>
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map((notif: any) => (
            <div
              key={notif.id}
              style={{
                ...CARD_STYLE,
                background: notif.read ? "transparent" : "rgba(96, 81, 155, 0.06)",
              }}
            >
              {/* Actor avatar */}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(96,81,155,0.2)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "2px solid rgba(96,81,155,0.3)",
                }}
              >
                {notif.actor?.avatar_url ? (
                  <img src={notif.actor.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "18px" }}>🔔</span>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", color: notif.read ? "#bfc0d1" : "#fff", fontWeight: notif.read ? 400 : 600 }}>
                  {notif.content || notif.message || "New notification"}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(191,192,209,0.5)", marginTop: "4px" }}>
                  {notif.created_at
                    ? new Date(notif.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>

              {!notif.read && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#60519b",
                    flexShrink: 0,
                  }}
                />
              )}

              <button
                onClick={(e) => { e.stopPropagation(); void handleDelete(notif.id); }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(191,192,209,0.4)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
