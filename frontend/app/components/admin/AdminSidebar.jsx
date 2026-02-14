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
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import API from "../../lib/api";
import { toast } from "sonner";


export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Gallery", icon: Image, href: "/admin/gallery" },
    { label: "offers", icon: FileText, href: "/admin/offers" },
    { label: "Carousel", icon: Settings, href: "/admin/carousel" },
    { label: "Testimonials", icon: Settings, href: "/admin/testimonials" },
  ];

  const isActiveRoute = (href) =>
    pathname === href || pathname.startsWith(href + "/");


  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      toast.success("Logged out successfully");
      setTimeout(() => {
        router.push("/login")
      }, 100)
    } catch (error) {
      toast.error("Logout failed");
    }
  };

return (
  <>
    {/* ===== MOBILE TOP BAR ===== */}
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-200 flex items-center justify-between px-4 z-40">
      <h1 className="font-bold text-black">
        <Link href="/admin" className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition">
          MP Admin
        </Link>
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <Menu size={22} />
      </button>
    </header>

    {/* Spacer for mobile */}
    <div className="lg:hidden h-16" />

    {/* ===== MOBILE OVERLAY ===== */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setIsOpen(false)}
      />
    )}

    {/* ===== SIDEBAR ===== */}
    <aside
      className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">
            <Link href="/admin" className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition">
              MP Admin
            </Link>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-black hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside >
  </>
);
}
