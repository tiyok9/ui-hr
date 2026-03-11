import { Menu, PanelLeft } from "lucide-react";
import NotificationMenu from "./navbar/NotificationMenu";
import ProfileMenu from "./navbar/ProfileMenu";

interface Props {
  setMobileOpen: (v: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function Navbar({
  setMobileOpen,
  collapsed,
  setCollapsed,
}: Props) {
  return (
    <header className=" h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-900 shadow-[0_2px_20px_rgba(0,0,0,0.04)] max-w-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-gray-600 hover:cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block text-gray-600 hover:cursor-pointer"
        >
          <PanelLeft size={20} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <NotificationMenu />

        <ProfileMenu />
      </div>
    </header>
  );
}
