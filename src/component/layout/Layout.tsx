import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen dark:bg-gray-950">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300
      ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <Navbar
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 p-6 bg-[rgb(255,255,255)] dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
