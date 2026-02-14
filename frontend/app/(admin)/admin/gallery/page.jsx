"use client";

import React, { useEffect, useState, useCallback } from "react";
import Api from "../../../lib/api.js";
import {
    useMotionValue,
    Reorder,
    useDragControls,
    motion,
    animate,
} from "framer-motion";
import { GripVertical, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

export default function AdminGalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const limit = 1000;

    /* ================= FETCH IMAGES ================= */

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true);
            const res = await Api.get(
                `/gallery/get?page=${page}&limit=${limit}`
            );
            setImages(res.data.images);
            setPages(res.data.pages);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    /* ================= UPLOAD ================= */

    const onDrop = useCallback(
        async (acceptedFiles) => {
            if (!acceptedFiles.length) {
                toast.error("No files selected");
                return;
            }

            const formData = new FormData();
            acceptedFiles.forEach((file) =>
                formData.append("images", file)
            );

            try {
                setUploading(true);
                setProgress(0);

                await Api.post("/gallery/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (event) => {
                        if (event.total) {
                            const percent = Math.round(
                                (event.loaded * 100) / event.total
                            );
                            setProgress(percent);
                        }
                    },
                });

                toast.success("Images uploaded");
                fetchImages();
            } catch (err) {
                console.error(err);
                toast.error("Upload failed");
            } finally {
                setUploading(false);
            }
        },
        [fetchImages]
    );

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
            multiple: true,
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": [],
            },
            noDragEventsBubbling: true,
        });

    /* ================= DELETE ================= */

    const handleDelete = async (id) => {
        try {
            await Api.delete(`/gallery/delete/${id}`);
            setImages((prev) =>
                prev.filter((img) => img._id !== id)
            );
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    /* ================= SAVE ORDER ================= */

    const saveOrder = async () => {
        try {
            await Api.put("/gallery/reorder", {
                images: images.map((img, index) => ({
                    id: img._id,
                    order: index,
                })),
            });

            toast.success("Order saved");
        } catch {
            toast.error("Reorder failed");
        }
    };

    return (
        <section className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Gallery Management
                </h1>

                {/* ================= UPLOAD AREA ================= */}

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed p-12 text-center rounded-xl mb-12 cursor-pointer transition
          ${isDragActive
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/20"
                        }`}
                >
                    <input {...getInputProps()} />

                    {uploading ? (
                        <>
                            <p className="mb-2">
                                Uploading {progress}%
                            </p>
                            <div className="w-full bg-white/10 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-semibold">
                                Drag & drop images here
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                or click to browse
                            </p>
                        </>
                    )}
                </div>

                {/* ================= GALLERY ================= */}

                {loading ? (
                    <div className="flex justify-center">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                ) : (
                    <>
                        <Reorder.Group
                            axis="y"
                            values={images}
                            onReorder={setImages}
                            className="space-y-4 max-w-2xl mx-auto"
                        >
                            {images.map((img) => (
                                <GalleryItem
                                    key={img._id}
                                    item={img}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </Reorder.Group>

                        <div className="text-center mt-6">
                            <button
                                onClick={saveOrder}
                                className="bg-blue-600 px-6 py-2 rounded-lg"
                            >
                                Save Order
                            </button>
                        </div>

                        {/* ================= PAGINATION ================= */}

                        <div className="flex justify-center gap-4 mt-10">
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((prev) => prev - 1)
                                }
                                className="bg-white/10 px-4 py-2 rounded"
                            >
                                Prev
                            </button>

                            <span>
                                {page} / {pages}
                            </span>

                            <button
                                disabled={page === pages}
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
                                className="bg-white/10 px-4 py-2 rounded"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

/* ================= SINGLE ITEM ================= */

function GalleryItem({ item, onDelete }) {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={item}
            style={{ y, boxShadow }}
            dragListener={false}
            dragControls={dragControls}
            className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
        >
            <div className="flex items-center gap-4">
                <img
                    src={item.url}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg"
                    draggable={false}
                />
                <span className="text-sm text-gray-300">
                    {item.title || "Gallery Image"}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <ReorderHandle dragControls={dragControls} />
                <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-600 p-2 rounded-full"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </Reorder.Item>
    );
}

/* ================= DRAG HANDLE ================= */

function ReorderHandle({ dragControls }) {
    return (
        <motion.div
            whileTap={{ scale: 0.9 }}
            onPointerDown={(e) => {
                e.preventDefault();
                dragControls.start(e);
            }}
            className="cursor-grab active:cursor-grabbing text-gray-400"
        >
            <GripVertical size={18} />
        </motion.div>
    );
}

/* ================= SHADOW ANIMATION ================= */

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0)";

function useRaisedShadow(value) {
    const boxShadow = useMotionValue(inactiveShadow);

    useEffect(() => {
        const unsubscribe = value.on("change", (latest) => {
            if (latest !== 0) {
                animate(
                    boxShadow,
                    "5px 5px 15px rgba(0,0,0,0.15)"
                );
            } else {
                animate(boxShadow, inactiveShadow);
            }
        });

        return () => unsubscribe();
    }, [value, boxShadow]);

    return boxShadow;
}