import { Menu, PanelLeft } from "lucide-react";
// import NotificationMenu from "../navbar/NotificationMenu";
// import ProfileMenu from "../navbar/ProfileMenu";

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
    <header
      className="
  h-16 px-6
  flex items-center justify-between

  bg-white dark:bg-gray-900

  shadow-[0_2px_20px_rgba(0,0,0,0.04)]
  "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-gray-600"
        >
          <Menu size={22} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block text-gray-600"
        >
          <PanelLeft size={20} />
        </button>

        <input
          placeholder="Search..."
          className="
    hidden md:block
    w-64 px-4 py-2 rounded-lg

    bg-gray-100 dark:bg-gray-800

    focus:outline-none
    focus:ring-2 focus:ring-purple-500
    "
        />
      </div>

      <div className="flex items-center gap-5">
        {/* <NotificationMenu />

        <ProfileMenu /> */}
      </div>
    </header>
  );
}
