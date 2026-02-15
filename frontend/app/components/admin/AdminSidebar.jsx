"use client";

import { useState } from "react";
import {
  Image,
  FileText,
  Settings,
  LogOut,
  Menu,
  Package,
  Layers,
  Users,
  UserCheck,
  Ticket,
  ShoppingCart,
  LayoutDashboard,
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

    {
      label: "Products",
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Coupons",
      icon: Ticket,
      href: "/admin/coupons",
    },
    {
      label: "Offers",
      icon: FileText,
      href: "/admin/offers",
    },
    {
      label: "Carousel",
      icon: Layers,
      href: "/admin/carousel",
    },
    {
      label: "Gallery",
      icon: Image,
      href: "/admin/gallery",
    },
    {
      label: "Testimonials",
      icon: UserCheck,
      href: "/admin/testimonials",
    },
    {
      label: "Team",
      icon: Users,
      href: "/admin/team",
    },
    {
      label: "Clients",
      icon: Users,
      href: "/admin/clients",
    },
 
  ];

  const isActiveRoute = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-black text-white">

      {/* ===== MOBILE TOP BAR ===== */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/10 flex items-center justify-between px-4 z-40">
        <Link
          href="/admin"
          className="text-lg font-bold text-white"
        >
          MP Admin
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>
      </header>

      <div className="lg:hidden h-16" />

      {/* ===== MOBILE OVERLAY ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/10">
            <Link
              href="/admin"
              className="text-xl font-bold text-white"
            >
              MP Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-6 px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm
                  ${active
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

        </div>
      </aside>

    </div>
  );
}
