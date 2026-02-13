"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake API call simulation
    setTimeout(() => {
      setLoading(false);
      alert("Login attempt");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              required
              placeholder="Admin Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 
              focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/10 
              focus:border-indigo-500 focus:outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 
            transition font-medium disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          Secure Admin Access • MP Advertisers
        </p>
      </motion.div>
    </div>
  );
}
