"use client";

import Sidebar from "../../components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me");
        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#AA31E4] animate-spin" />
        <p className="text-sm text-gray-400">Checking authentication...</p>
      </div>
    );
  }

  return (
     <div className="h-screen flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black">
        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}
