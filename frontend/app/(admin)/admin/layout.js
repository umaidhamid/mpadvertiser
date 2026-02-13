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
      } catch (error) {
        console.log("errr", error)
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  return (
     <div className="h-screen flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}
