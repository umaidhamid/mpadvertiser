"use client";

import { useState, useEffect } from "react";
import Lightbox from "./Lightbox";
import Api from "../../../lib/api";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function MasonryGallery() {
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const limit = 12;

    /* ================= FETCH ================= */

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);

                const res = await Api.get(
                    `/gallery/get?page=${page}&limit=${limit}`
                );

                setImages(res.data.images);
                setPages(res.data.pages);
            } catch (error) {
                console.error("Gallery fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [page]);

    return (
        <section className="py-20 bg-black text-white relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* ================= LOADING ================= */}
                {loading ? (
                    <div className="flex justify-center py-32">
                        <Loader2
                            className="animate-spin text-white/60"
                            size={40}
                        />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-32 text-gray-500 text-lg">
                        Nothing here yet.
                    </div>
                ) : (
                    <>
                        {/* ================= MASONRY ================= */}
                        <div
                            className="
                columns-1
                sm:columns-2
                lg:columns-3
                xl:columns-4
                gap-6
                [column-fill:_balance]
              "
                        >
                            {images.map((img, index) => (
                                <div
                                    key={img._id}
                                    className="mb-6 break-inside-avoid group cursor-pointer overflow-hidden rounded-2xl"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="relative overflow-hidden rounded-2xl bg-white/5">

                                        <img
                                            src={img.url}
                                            alt=""
                                            loading="lazy"
                                            className="
                        w-full
                        h-auto
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                                        />

                                        <div
                                            className="
                        absolute inset-0
                        bg-black/30
                        opacity-0
                        group-hover:opacity-100
                        transition
                        duration-300
                      "
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ================= PAGINATION ================= */}
                        <div className="flex items-center justify-center gap-6 mt-16">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg disabled:opacity-40"
                            >
                                <ChevronLeft size={18} />
                                Prev
                            </button>

                            <span className="text-gray-400 text-sm">
                                Page {page} of {pages}
                            </span>

                            <button
                                disabled={page === pages}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg disabled:opacity-40"
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>

                        </div>

                        {/* ================= LIGHTBOX ================= */}
                        {activeIndex !== null && (
                            <Lightbox
                                images={images.map((img) => img.url)}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
