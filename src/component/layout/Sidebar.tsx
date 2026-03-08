import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  IdCardLanyard,
  BookOpenCheck,
  Landmark,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  collapsed: boolean;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
}: Props) {
  const location = useLocation();
  const { role } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      roles: ["admin", "user"],
    },
    { name: "Manage Users", path: "/users", icon: Users, roles: ["admin"] },
    {
      name: "Manage Employees",
      path: "/employees",
      icon: IdCardLanyard,
      roles: ["admin"],
    },
    {
      name: "Manage Positions",
      path: "/positions",
      icon: Sparkles,
      roles: ["admin"],
    },
    {
      name: "Manage Departements",
      path: "/departements",
      icon: Landmark,
      roles: ["admin"],
    },
    {
      name: "Manage Leave",
      path: "/leave",
      icon: BookOpenCheck,
      roles: ["admin"],
    },
  ];

  return (
    <>
      <div
        onClick={() => setMobileOpen(false)}
        className={`
  fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
  transition-opacity duration-300 lg:hidden
  ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
      />

      <aside
        className={`
  fixed top-0 left-0 z-50 h-full
  bg-white dark:bg-gray-900

  shadow-[0_10px_40px_rgba(0,0,0,0.08)]

  transition-all duration-300

  ${collapsed ? "w-20" : "w-64"}

  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

  lg:translate-x-0
  `}
      >
        <div className="h-16 flex items-center px-6 font-bold text-lg text-gray-800 dark:text-white">
          H-Care
        </div>

        <nav className="mt-6 space-y-1">
          {menus
            .filter((m) => m.roles.includes(role))
            .map((menu) => {
              const active = location.pathname === menu.path;

              return (
                <Link
                  key={menu.name}
                  to={menu.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
    flex items-center gap-3
    mx-2 px-4 py-3 rounded-xl

    transition-all duration-200

    ${
      active
        ? "bg-purple-600 text-white shadow-sm"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }
    `}
                >
                  <menu.icon size={20} />

                  {!collapsed && (
                    <span className="text-sm font-medium">{menu.name}</span>
                  )}
                </Link>
              );
            })}
        </nav>
      </aside>
    </>
  );
}
