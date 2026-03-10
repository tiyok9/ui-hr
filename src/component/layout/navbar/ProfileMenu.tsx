import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full object-cover"
        />

        <span className=" md:block text-sm font-medium">
          {user?.username || "Name User"}
        </span>
      </div>

      {open && (
        <div
          className="
          absolute z-100 right-0 top-full mt-1 w-[90vw] max-w-xs md:w-56 bg-white dark:bg-gray-900 rounded-xl   shadow-[0_10px_40px_rgba(0,0,0,0.1)]
          animate-in fade-in zoom-in duration-200
        "
        >
          <div className="p-4 border-b dark:border-gray-800">
            <p className="text-sm font-medium">
              {user?.username || "Name User"}
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
