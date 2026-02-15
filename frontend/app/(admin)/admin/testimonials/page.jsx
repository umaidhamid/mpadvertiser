"use client";

import { useEffect, useState, useCallback } from "react";
import Api from "../../../lib/api";
import {
    Reorder,
    useDragControls,
    motion,
} from "framer-motion";
import {
    Trash2,
    GripVertical,
    Loader2,
    Star,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonials() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        role: "",
        company: "",
        location: "",
        project: "",
        date: "",
        text: "",
        rating: 5,
    });

    /* ================= FETCH ================= */

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await Api.get("/testimonials/get?owner=true");
            setItems(res.data.testimonials);
        } catch {
            toast.error("Failed to load testimonials");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /* ================= CREATE ================= */

    const handleCreate = async () => {
        if (!form.name || !form.text) {
            toast.error("Name and testimonial are required");
            return;
        }

        try {
            await Api.post("/testimonials/create", form);
            toast.success("Testimonial added");
            setForm({
                name: "",
                role: "",
                company: "",
                location: "",
                project: "",
                date: "",
                text: "",
                rating: 5,
            });
            fetchData();
        } catch {
            toast.error("Create failed");
        }
    };

    /* ================= DELETE ================= */

    const handleDelete = async (id) => {
        try {
            await Api.delete(`/testimonials/delete/${id}`);
            setItems((prev) =>
                prev.filter((item) => item._id !== id)
            );
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    /* ================= TOGGLE ACTIVE ================= */

    const toggleActive = async (id, current) => {
        try {
            await Api.put(`/testimonials/toggle/${id}`, {
                isActive: !current,
            });

            setItems((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, isActive: !current }
                        : item
                )
            );

            toast.success("Updated");
        } catch {
            toast.error("Update failed");
        }
    };

    /* ================= SAVE ORDER ================= */

    const saveOrder = async () => {
        try {
            await Api.put("/testimonials/reorder", {
                items: items.map((item, index) => ({
                    id: item._id,
                    order: index,
                })),
            });

            toast.success("Order saved");
        } catch {
            toast.error("Reorder failed");
        }
    };

    return (
        <section className="min-h-screen bg-black text-white p-10">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-10">
                    Manage Testimonials
                </h1>

                {/* ================= FORM ================= */}

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12 space-y-4">

                    <input
                        placeholder="Client Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="bg-white/10 p-3 rounded w-full"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            placeholder="Role"
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                            className="bg-white/10 p-3 rounded"
                        />
                        <input
                            placeholder="Company"
                            value={form.company}
                            onChange={(e) =>
                                setForm({ ...form, company: e.target.value })
                            }
                            className="bg-white/10 p-3 rounded"
                        />
                        <input
                            placeholder="Location"
                            value={form.location}
                            onChange={(e) =>
                                setForm({ ...form, location: e.target.value })
                            }
                            className="bg-white/10 p-3 rounded"
                        />
                        <input
                            placeholder="Project"
                            value={form.project}
                            onChange={(e) =>
                                setForm({ ...form, project: e.target.value })
                            }
                            className="bg-white/10 p-3 rounded"
                        />
                        <input
                            placeholder="Date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                            className="bg-white/10 p-3 rounded"
                        />
                    </div>

                    <textarea
                        placeholder="Testimonial text"
                        value={form.text}
                        onChange={(e) =>
                            setForm({ ...form, text: e.target.value })
                        }
                        className="bg-white/10 p-3 rounded w-full"
                    />

                    <div className="flex items-center gap-3">
                        <span>Rating:</span>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                                key={num}
                                size={20}
                                onClick={() =>
                                    setForm({ ...form, rating: num })
                                }
                                className={`cursor-pointer ${form.rating >= num
                                    ? "text-yellow-400"
                                    : "text-gray-500"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 px-6 py-2 rounded"
                    >
                        Add Testimonial
                    </button>
                </div>

                {/* ================= LIST ================= */}

                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <Reorder.Group
                            axis="y"
                            values={items}
                            onReorder={setItems}
                            className="space-y-4"
                        >
                            {items.map((item) => (
                                <Reorder.Item
                                    key={item._id}
                                    value={item}
                                    className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {item.company}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">

                                        <button
                                            onClick={() =>
                                                toggleActive(
                                                    item._id,
                                                    item.isActive
                                                )
                                            }
                                            className={`px-3 py-1 rounded text-xs ${item.isActive
                                                ? "bg-green-600"
                                                : "bg-gray-600"
                                                }`}
                                        >
                                            {item.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="bg-red-600 p-2 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <GripVertical size={18} />
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        <div className="mt-6">
                            <button
                                onClick={saveOrder}
                                className="bg-blue-600 px-6 py-2 rounded"
                            >
                                Save Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
