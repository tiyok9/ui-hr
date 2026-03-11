import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { getEcho } from "../../../lib/echo";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllAsRead,
} from "../../../features/notification/notificationApi";

interface NotificationItem {
  id: string;
  data?: {
    message?: string;
  };
  text?: string;
  read_at?: string | null;
}

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const { data } = useNotifications();

  const notifications: NotificationItem[] = data?.data ?? [];

  const markNotification = useMarkNotificationAsRead();
  const markAllNotifications = useMarkAllAsRead();

  const [realtimeNotifications, setRealtimeNotifications] = useState<
    NotificationItem[]
  >([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const echo = getEcho();

    const channel = echo?.private(`notifications.${user.id}`);

    channel?.listen(".user.notification", (e: any) => {
      const newNotif: NotificationItem = {
        id: crypto.randomUUID(),
        data: {
          message: e.message,
        },
        read_at: null,
      };

      setRealtimeNotifications((prev) => [newNotif, ...prev]);

      toast(e.message, {
        icon: "🔔",
      });
    });

    return () => {
      echo?.leave(`notifications.${user.id}`);
    };
  }, [user?.id]);

  const allNotifications: NotificationItem[] = [
    ...realtimeNotifications,
    ...notifications,
  ];

  const unreadCount = allNotifications.filter((n) => !n.read_at).length;

  const handleRead = (id: string) => {
    markNotification.mutate(id);

    setRealtimeNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
      ),
    );
  };

  const handleMarkAll = () => {
    markAllNotifications.mutate();

    setRealtimeNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read_at: new Date().toISOString(),
      })),
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:cursor-pointer"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 right-0 top-full mt-2 w-[90vw] max-w-sm md:w-72 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <span className="font-semibold">Notifications</span>

            {allNotifications.length > 0 && (
              <button
                onClick={handleMarkAll}
                className="text-xs text-blue-500 hover:underline"
              >
                Mark all
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {allNotifications.length === 0 && (
              <div className="px-4 py-6 text-sm text-gray-400 text-center">
                No notifications
              </div>
            )}

            {allNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleRead(n.id)}
                className={`px-4 py-3 text-sm cursor-pointer border-b
                border-gray-100 dark:border-gray-800
                hover:bg-gray-100 dark:hover:bg-gray-800
                ${!n.read_at ? "font-semibold" : "text-gray-500"}`}
              >
                {typeof n.data?.message === "string"
                  ? n.data.message
                  : (n.text ?? "")}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
