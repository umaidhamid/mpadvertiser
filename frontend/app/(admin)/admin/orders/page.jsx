"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        status: "All",
        month: "",
        year: new Date().getFullYear(),
        page: 1,
        limit: 10,
    });

    /* ================= FETCH ================= */

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await API.get("/orders/get", {
                params: filters,
            });

            setOrders(res.data.orders);
            setStats({
                totalOrders: res.data.totalOrders,
                totalRevenue: res.data.totalRevenue,
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
            });

        } catch (err) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filters]);

    /* ================= UPDATE STATUS ================= */

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success("Status updated");
            fetchOrders();
        } catch {
            toast.error("Failed to update status");
        }
    };

    /* ================= DELETE ================= */

    const deleteOrder = async (id) => {
        if (!confirm("Delete this order?")) return;

        try {
            await API.delete(`/orders/${id}`);
            toast.success("Order deleted");
            fetchOrders();
        } catch {
            toast.error("Delete failed");
        }
    };

    /* ================= EXPORT CSV ================= */

    const exportCSV = () => {
        const headers = [
            "Invoice",
            "Customer",
            "Phone",
            "Status",
            "Total",
            "Date",
        ];

        const rows = orders.map((o) => [
            o.invoiceNumber,
            o.customerName,
            o.phone,
            o.status,
            o.total,
            new Date(o.createdAt).toLocaleDateString(),
        ]);

        const csv =
            [headers, ...rows]
                .map((row) => row.join(","))
                .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.csv";
        a.click();
    };

    /* ================= PAGINATION ================= */

    const changePage = (pageNumber) => {
        setFilters((prev) => ({
            ...prev,
            page: pageNumber,
        }));
    };

    return (
        <section className="min-h-screen bg-black text-white p-6 md:p-10">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Orders Dashboard
                </h1>

                {/* STATS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard label="Total Orders" value={stats.totalOrders || 0} />
                    <StatCard label="Total Revenue" value={`₹${stats.totalRevenue || 0}`} />
                    <StatCard label="Current Page" value={stats.currentPage || 1} />
                </div>

                {/* FILTER PANEL */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 grid md:grid-cols-4 gap-6">

                    <input
                        placeholder="Search"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value, page: 1 })
                        }
                        className="bg-white/10 p-3 rounded-xl outline-none"
                    />

                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value, page: 1 })
                        }
                        className="bg-white/10 p-3 rounded-xl"
                    >
                        <option className="bg-gray-900" value="All">All</option>
                        <option className="bg-gray-900" value="Pending">Pending</option>
                        <option className="bg-gray-900" value="Processing">Processing</option>
                        <option className="bg-gray-900" value="Completed">Completed</option>
                        <option className="bg-gray-900" value="Cancelled">Cancelled</option>
                    </select>

                    <select
                        value={filters.month}
                        onChange={(e) =>
                            setFilters({ ...filters, month: e.target.value, page: 1 })
                        }
                        className="bg-white/10 p-3 rounded-xl"
                    >
                        <option value="" className="text-black">Month</option>
                        {[...Array(12)].map((_, i) => (
                            <option className="bg-gray-900" key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={exportCSV}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 p-3 rounded-xl"
                    >
                        <Download size={16} />
                        Export
                    </button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto bg-white/5 rounded-2xl">
                    {loading ? (
                        <div className="p-10 flex justify-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-white/10">
                                <tr>
                                    <th className="p-4 text-left">Invoice</th>
                                    <th className="p-4 text-left">Customer</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Total</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-t border-white/10 hover:bg-white/5"
                                    >
                                        <td className="p-4">{order.invoiceNumber}</td>
                                        <td className="p-4">
                                            {order.customerName}
                                            <div className="text-gray-400 text-xs">
                                                {order.phone}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="relative inline-block">

                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        updateStatus(order._id, e.target.value)
                                                    }
                                                    className={`appearance-none px-4 py-2 pr-8 rounded-full text-md font-medium border outline-none cursor-pointer transition
        ${order.status === "Pending" && "bg-gray-600/20 text-gray-300 border-gray-500"}
        ${order.status === "Processing" && "bg-yellow-600/20 text-yellow-400 border-yellow-500"}
        ${order.status === "Completed" && "bg-green-600/20 text-green-400 border-green-500"}
        ${order.status === "Cancelled" && "bg-red-600/20 text-red-400 border-red-500"}
      `}
                                                >
                                                    <option className="text-black">Pending</option>
                                                    <option className="text-black">Processing</option>
                                                    <option className="text-black">Completed</option>
                                                    <option className="text-black">Cancelled</option>
                                                </select>

                                                {/* Custom Arrow */}
                                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white/50 text-xs">
                                                    ▼
                                                </div>

                                            </div>
                                        </td>

                                        <td className="p-4 text-center">
                                            ₹{order.total}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => deleteOrder(order._id)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center gap-3 mt-8">
                    {[...Array(stats.totalPages || 1)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => changePage(i + 1)}
                            className={`px-4 py-2 rounded-xl ${filters.page === i + 1
                                ? "bg-indigo-600"
                                : "bg-white/10"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}

/* ===== STAT CARD ===== */

function StatCard({ label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    );
}
