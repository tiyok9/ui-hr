import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import echo from "../../../lib/echo";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const channel = echo.private(`notifications.${user.id}`);

    channel.listen(".user.notification", (e: any) => {
      setNotifications((prev) => [
        { id: crypto.randomUUID(), text: e.message },
        ...prev,
      ]);
    });

    return () => {
      echo.leave(`notifications.${user.id}`);
    };
  }, [user?.id]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <Bell size={20} />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute z-100 right-0 top-full mt-1 w-[90vw] max-w-sm md:w-72 bg-white dark:bg-gray-900 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-200">
          <div className="p-4 font-semibold border-b dark:border-gray-800">
            Notifications
          </div>

          <div className="max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                {n.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
