"use client";

import { useEffect, useState, useCallback } from "react";
import Api from "../../../lib/api";
import { Reorder, useDragControls, motion } from "framer-motion";
import {
    GripVertical,
    Trash2,
    Loader2,
    Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminTeamPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        role: "",
        bio: "",
    });

    /* ================= FETCH ================= */

    const fetchMembers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await Api.get("/team/get");
            setMembers(res.data.members);
        } catch {
            toast.error("Failed to load team");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    /* ================= CREATE ================= */

    const handleCreate = async () => {
        if (!image || !form.name || !form.role) {
            toast.error("Image, name and role required");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", form.name);
        formData.append("role", form.role);
        formData.append("bio", form.bio);

        try {
            setUploading(true);

            await Api.post("/team/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Team member added");

            setImage(null);
            setPreview(null);
            setForm({ name: "", role: "", bio: "" });

            fetchMembers();
        } catch {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    /* ================= DELETE ================= */

    const handleDelete = async (id) => {
        try {
            await Api.delete(`/team/delete/${id}`);
            setMembers((prev) => prev.filter((m) => m._id !== id));
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    /* ================= TOGGLE ================= */

    const toggleActive = async (id, current) => {
        try {
            await Api.put(`/team/toggle/${id}`, {
                isActive: !current,
            });

            setMembers((prev) =>
                prev.map((m) =>
                    m._id === id ? { ...m, isActive: !current } : m
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
            await Api.put("/team/reorder", {
                items: members.map((m, index) => ({
                    id: m._id,
                    order: index,
                })),
            });

            toast.success("Order saved");
        } catch {
            toast.error("Reorder failed");
        }
    };

    return (
        <section className="min-h-screen bg-black text-white px-6 py-12">
            <div className="max-w-6xl mx-auto">

                {/* ================= HEADER ================= */}

                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">
                        Team Management
                    </h1>

                    <button
                        onClick={saveOrder}
                        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-sm"
                    >
                        Save Order
                    </button>
                </div>

                {/* ================= FORM CARD ================= */}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-14">

                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Plus size={18} />
                        Add Team Member
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <div className="border border-white/10 rounded-xl p-4 bg-white/5 text-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-400 text-sm">
                                        Image Preview
                                    </p>
                                )}
                            </div>

                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                                className="text-sm"
                            />
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4">

                            <input
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="bg-white/10 p-3 rounded-lg w-full"
                            />

                            <input
                                placeholder="Role"
                                value={form.role}
                                onChange={(e) =>
                                    setForm({ ...form, role: e.target.value })
                                }
                                className="bg-white/10 p-3 rounded-lg w-full"
                            />

                            <textarea
                                placeholder="Bio"
                                value={form.bio}
                                onChange={(e) =>
                                    setForm({ ...form, bio: e.target.value })
                                }
                                className="bg-white/10 p-3 rounded-lg w-full h-28"
                            />

                            <button
                                onClick={handleCreate}
                                disabled={uploading}
                                className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg font-medium transition"
                            >
                                {uploading ? "Uploading..." : "Add Member"}
                            </button>

                        </div>
                    </div>
                </div>

                {/* ================= LIST ================= */}

                {loading ? (
                    <div className="flex justify-center">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                ) : (
                    <Reorder.Group
                        axis="y"
                        values={members}
                        onReorder={setMembers}
                        className="space-y-4"
                    >
                        {members.map((member) => (
                            <TeamItem
                                key={member._id}
                                member={member}
                                onDelete={handleDelete}
                                onToggle={toggleActive}
                            />
                        ))}
                    </Reorder.Group>
                )}

            </div>
        </section>
    );
}

/* ================= ITEM CARD ================= */

function TeamItem({ member, onDelete, onToggle }) {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={member}
            dragListener={false}
            dragControls={dragControls}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
        >
            <div className="flex items-center gap-4">
                <img
                    src={member.image}
                    className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-400">
                        {member.role}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">

                <button
                    onClick={() =>
                        onToggle(member._id, member.isActive)
                    }
                    className={`px-3 py-1 text-xs rounded ${member.isActive
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }`}
                >
                    {member.isActive ? "Active" : "Inactive"}
                </button>

                <button
                    onClick={() => onDelete(member._id)}
                    className="bg-red-600 p-2 rounded-lg"
                >
                    <Trash2 size={16} />
                </button>

                <motion.div
                    onPointerDown={(e) => {
                        e.preventDefault();
                        dragControls.start(e);
                    }}
                    className="cursor-grab active:cursor-grabbing text-gray-400"
                >
                    <GripVertical size={18} />
                </motion.div>

            </div>
        </Reorder.Item>
    );
}
