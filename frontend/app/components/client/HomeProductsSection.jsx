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

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);

                const res = await API.get("/products/get", {
                    params: {
                        featured: true,
                        limit: 6,
                    },
                });

                setProducts(res.data.products || []);
            } catch (error) {
                console.error("Featured products fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    /* ================= SLIDER LOGIC (DESKTOP) ================= */

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
        <section className="relative py-20 bg-background text-foreground overflow-hidden">

            {/* ================= HEADING ================= */}
            <div className="text-center mb-14 px-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Featured Products
                </h2>
                <p className="text-muted mt-4">
                    Premium printing solutions crafted for impact.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6">

                {loading ? (
                    <div className="text-center py-20 text-muted">
                        Loading featured products...
                    </div>
                ) : (
                    <>
                        {/* ================= MOBILE AMAZON STYLE ================= */}
                        <div className="md:hidden">
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
                                {allItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="min-w-[80%] snap-start flex-shrink-0"
                                    >
                                        {item.isViewAll ? (
                                            <Link
                                                href="/products"
                                                className="min-h-[320px] bg-card border border-border rounded-2xl flex flex-col items-center justify-center text-center p-8"
                                            >
                                                <h3 className="text-xl font-semibold mb-4">
                                                    View All Products
                                                </h3>

                                                <ArrowRight size={28} className="text-primary" />

                                                <p className="mt-4 text-muted text-sm">
                                                    Explore complete catalog
                                                </p>
                                            </Link>
                                        ) : (
                                            <ProductCard product={item} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ================= DESKTOP SLIDER ================= */}
                        <div className="hidden md:block relative">

                            {totalItems > visibleItems && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                    p-3 rounded-full bg-card border border-border
                    hover:bg-primary hover:text-primary-foreground transition"
                                    >
                                        <ChevronLeft />
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                    p-3 rounded-full bg-card border border-border
                    hover:bg-primary hover:text-primary-foreground transition"
                                    >
                                        <ChevronRight />
                                    </button>
                                </>
                            )}

                            <div className="overflow-hidden">
                                <motion.div
                                    animate={{ x: `-${current * (100 / visibleItems)}%` }}
                                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                                    className="flex"
                                >
                                    {allItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className="w-1/3 flex-shrink-0 p-4"
                                        >
                                            {item.isViewAll ? (
                                                <Link
                                                    href="/products"
                                                    className="min-h-[400px] bg-card border border-border rounded-2xl flex flex-col items-center justify-center text-center p-10 hover:shadow-xl hover:border-primary transition duration-500"
                                                >
                                                    <h3 className="text-2xl font-semibold mb-6 text-foreground">
                                                        View All Products
                                                    </h3>

                                                    <ArrowRight size={32} className="text-primary" />

                                                    <p className="mt-6 text-muted text-sm">
                                                        Explore complete catalog
                                                    </p>
                                                </Link>
                                            ) : (
                                                <ProductCard product={item} />
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
