"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Image,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin" },
    { name: "Gallery", icon: <Image size={18} />, href: "/admin/gallery" },
    { name: "Blogs", icon: <FileText size={18} />, href: "/admin/blogs" },
    { name: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden p-4 bg-black text-white flex justify-between items-center border-b border-white/10">
        <h2 className="font-semibold">Admin Panel</h2>
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-black text-white border-r border-white/10 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">MP Admin</h2>

            <button
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-6 space-y-2 px-4">
            {menuItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-r-md" />
                    )}

                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}