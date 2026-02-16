"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { Trash2 } from "lucide-react";

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const [form, setForm] = useState({
        code: "",
        type: "percentage",
        value: "",
        minOrder: "",
        usageLimit: "",
        expiresAt: "",
    });

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const res = await API.get("/coupons/get");
            setCoupons(res.data?.coupons || []);
        } catch (error) {
            console.error("Failed to fetch coupons");
            setCoupons([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleCreate = async () => {
        if (!form.code || !form.value || !form.expiresAt) {
            alert("Code, Value and Expiry Date are required");
            return;
        }

        try {
            setCreating(true);
            await API.post("/coupons/create", {
                ...form,
                value: Number(form.value),
                minOrder: Number(form.minOrder || 0),
                usageLimit: form.usageLimit
                    ? Number(form.usageLimit)
                    : null,
            });

            setForm({
                code: "",
                type: "percentage",
                value: "",
                minOrder: "",
                usageLimit: "",
                expiresAt: "",
            });

            fetchCoupons();
        } catch (error) {
            console.error("Create failed");
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        await API.delete(`/coupons/delete/${id}`);
        fetchCoupons();
    };

    const toggleActive = async (id) => {
        await API.put(`/coupons/toggle/${id}`);
        fetchCoupons();
    };

    const isExpired = (date) =>
        new Date(date) < new Date();

    return (
        <section className="min-h-screen bg-black text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-12">
                    Coupon Management
                </h1>

                {/* ================= CREATE SECTION ================= */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 backdrop-blur-xl">

                    <h2 className="text-xl font-semibold mb-6">
                        Create New Coupon
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Code */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Coupon Code
                            </label>
                            <input
                                value={form.code}
                                onChange={(e) =>
                                    setForm({ ...form, code: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg outline-none"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Discount Type
                            </label>
                            <select
                                value={form.type}
                                onChange={(e) =>
                                    setForm({ ...form, type: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg"
                            >
                                <option value="percentage" className="bg-black">
                                    Percentage (%)
                                </option>
                                <option value="flat" className="bg-black">
                                    Flat Amount (₹)
                                </option>
                            </select>
                        </div>

                        {/* Value */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Discount Value
                            </label>
                            <input
                                type="number"
                                value={form.value}
                                onChange={(e) =>
                                    setForm({ ...form, value: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg"
                            />
                        </div>

                        {/* Minimum Order */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Minimum Order Amount
                            </label>
                            <input
                                type="number"
                                value={form.minOrder}
                                onChange={(e) =>
                                    setForm({ ...form, minOrder: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg"
                            />
                        </div>

                        {/* Usage Limit
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Usage Limit (Optional)
                            </label>
                            <input
                                type="number"
                                value={form.usageLimit}
                                onChange={(e) =>
                                    setForm({ ...form, usageLimit: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg"
                            />
                        </div> */}

                        {/* Expiry */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Expiry Date
                            </label>
                            <input
                                type="date"
                                value={form.expiresAt}
                                onChange={(e) =>
                                    setForm({ ...form, expiresAt: e.target.value })
                                }
                                className="w-full bg-white/10 p-3 rounded-lg"
                            />
                        </div>

                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-lg font-medium disabled:opacity-50"
                    >
                        {creating ? "Creating..." : "Create Coupon"}
                    </button>

                </div>

                {/* ================= LIST SECTION ================= */}
                <div>
                    <h2 className="text-xl font-semibold mb-6">
                        Existing Coupons
                    </h2>

                    {loading && (
                        <p className="text-gray-400">Loading...</p>
                    )}

                    {!loading && coupons.length === 0 && (
                        <p className="text-gray-400">
                            No coupons available
                        </p>
                    )}

                    <div className="space-y-4">
                        {coupons.map((coupon) => (
                            <div
                                key={coupon._id}
                                className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center"
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <p className="font-semibold text-lg">
                                            {coupon.code}
                                        </p>

                                        {isExpired(coupon.expiresAt) && (
                                            <span className="text-xs bg-red-600 px-2 py-1 rounded">
                                                Expired
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {coupon.type === "percentage"
                                            ? `${coupon.value}% off`
                                            : `₹${coupon.value} off`}
                                    </p>

                                    {/* <p className="text-xs text-gray-500 mt-1">
                                        Min ₹{coupon.minOrder} | Used{" "}
                                        {coupon.usedCount} times
                                    </p> */}

                                    <p className="text-xs text-gray-500">
                                        Expires:{" "}
                                        {new Date(
                                            coupon.expiresAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            toggleActive(coupon._id)
                                        }
                                        className={`px-4 py-2 text-xs rounded ${coupon.isActive
                                                ? "bg-green-600"
                                                : "bg-gray-600"
                                            }`}
                                    >
                                        {coupon.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(coupon._id)
                                        }
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
