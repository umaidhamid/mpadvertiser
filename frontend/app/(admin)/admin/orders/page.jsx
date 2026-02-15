"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { Download } from "lucide-react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        status: "All",
        startDate: "",
        endDate: "",
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
            console.error("Fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    /* ================= CLEAR FILTERS ================= */

    const clearFilters = () => {
        setFilters({
            search: "",
            status: "All",
            startDate: "",
            endDate: "",
            month: "",
            year: new Date().getFullYear(),
            page: 1,
            limit: 10,
        });
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
        setFilters({ ...filters, page: pageNumber });
        fetchOrders();
    };

    return (
        <section className="min-h-screen bg-black text-white p-6 md:p-10">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Orders Dashboard
                </h1>

                {/* STATS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard label="Total Orders" value={stats.totalOrders} />
                    <StatCard label="Total Revenue" value={`₹${stats.totalRevenue}`} />
                    <StatCard label="Current Page" value={stats.currentPage} />
                </div>

                {/* FILTER PANEL */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-10">

                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

                        <Input label="Search"
                            value={filters.search}
                            onChange={(e) =>
                                setFilters({ ...filters, search: e.target.value })
                            }
                            placeholder="Invoice / Name / Phone"
                        />

                        <Select label="Status"
                            value={filters.status}
                            onChange={(e) =>
                                setFilters({ ...filters, status: e.target.value })
                            }
                            options={["All", "Pending", "Processing", "Completed", "Cancelled"]}
                        />

                        {/* <Input label="From Date"
                            type="date"
                            onChange={(e) =>
                                setFilters({ ...filters, startDate: e.target.value })
                            }
                        />

                        <Input label="To Date"
                            type="date"
                            onChange={(e) =>
                                setFilters({ ...filters, endDate: e.target.value })
                            }
                        /> */}

                        <Select label="Month"
                            value={filters.month }
                            className="text-white"
                            onChange={(e) =>
                                setFilters({ ...filters, month: e.target.value })
                            }
                            options={[
                                "",
                                "1", "2", "3", "4", "5", "6",
                                "7", "8", "9", "10", "11", "12"
                            ]}
                        />

                        <Input label="Year"
                            type="number"
                            value={filters.year}
                            onChange={(e) =>
                                setFilters({ ...filters, year: e.target.value })
                            }
                        />

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button
                            onClick={fetchOrders}
                            className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700"
                        >
                            Search
                        </button>

                        <button
                            onClick={clearFilters}
                            className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700"
                        >
                            Clear
                        </button>

                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto bg-white/5 rounded-2xl">
                    <table className="w-full text-sm">
                        <thead className="bg-white/10">
                            <tr>
                                <th className="p-4 text-left">Invoice</th>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Total</th>
                                <th className="p-4 text-center">Date</th>
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
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="p-4 text-center">
                                        ₹{order.total}
                                    </td>
                                    <td className="p-4 text-center">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

/* ===== UI COMPONENTS ===== */

function StatCard({ label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    const colors = {
        Pending: "bg-gray-600",
        Processing: "bg-yellow-600",
        Completed: "bg-green-600",
        Cancelled: "bg-red-600",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${colors[status]}`}>
            {status}
        </span>
    );
}

function Input({ label, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">{label}</label>
            <input
                {...props}
                className="bg-white/10 border border-white/10 focus:border-indigo-500 p-3 rounded-xl outline-none"
            />
        </div>
    );
}

function Select({ label, options, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg white-gray-400">{label}</label>
            <select
                {...props}
                className="bg-white/10 border border-white/10 focus:border-indigo-500 p-3 rounded-xl outline-none text-white"
            >
                {options.map((opt) => (
                    <option className="bg-black text-white" key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
