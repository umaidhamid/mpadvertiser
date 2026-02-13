"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import API from "../../lib/api";

export default function HomeProductsSection() {
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    const visibleItems = 3;

    /* ================= FETCH FEATURED PRODUCTS ================= */

    const fetchFeaturedProducts = async () => {
        try {
            setLoading(true);

            const res = await API.get("/products/get", {
                params: {
                    featured: true,
                    limit: 6,
                },
            });

            setProducts(res.data.products);
        } catch (error) {
            console.error("Featured products fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    /* ================= SLIDER LOGIC ================= */

    const allItems = [
        ...products,
        { _id: "view-all", isViewAll: true },
    ];

    const totalItems = allItems.length;
    const maxIndex = Math.max(totalItems - visibleItems, 0);

    const nextSlide = () => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="relative py-16 bg-black text-white overflow-hidden">

            {/* Heading */}
            <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Featured Products
                </h2>
                <p className="text-gray-400 mt-4">
                    Premium printing solutions crafted for impact.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Arrows */}
                {totalItems > visibleItems && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20
              p-3 rounded-full bg-white/5 border border-white/10
              hover:bg-indigo-600 transition"
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20
              p-3 rounded-full bg-white/5 border border-white/10
              hover:bg-indigo-600 transition"
                        >
                            <ChevronRight />
                        </button>
                    </>
                )}

                {/* Slider */}
                <div className="overflow-hidden">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400">
                            Loading featured products...
                        </div>
                    ) : (
                        <motion.div
                            animate={{ x: `-${current * (100 / visibleItems)}%` }}
                            transition={{ type: "spring", stiffness: 90, damping: 18 }}
                            className="flex"
                        >
                            {allItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4"
                                >
                                    {item.isViewAll ? (
                                        <Link
                                            href="/products"
                                            className="min-h-[400px]
                      bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
                      rounded-2xl flex flex-col items-center justify-center
                      text-center p-10 hover:scale-105 transition"
                                        >
                                            <h3 className="text-2xl font-semibold mb-6">
                                                View All Products
                                            </h3>
                                            <ArrowRight size={32} />
                                            <p className="mt-6 text-white/80 text-sm">
                                                Explore complete catalog
                                            </p>
                                        </Link>
                                    ) : (
                                        <ProductCard product={item} />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
