"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";

export default function HomeProductsSection() {
    const [current, setCurrent] = useState(0);

    const products = [
        {
            _id: "1",
            name: "Premium Flex Banner",
            price: 250,
            discount: 20,
            finalprice: 200,
            unit: "sq.ft",
            description: "High-quality outdoor flex printing.",
            imageUrl: "/Slide1.webp",
        },
        {
            _id: "2",
            name: "Visiting Cards (Matte Finish)",
            price: 499,
            discount: 0,
            finalprice: 499,
            unit: "100 pcs",
            description: "Premium matte finish visiting cards.",
            imageUrl: "/Slide2.webp",
        },
        {
            _id: "3",
            name: "Custom Posters",
            price: 120,
            discount: 10,
            finalprice: 108,
            unit: "piece",
            description: "High-resolution custom posters.",
            imageUrl: "/Slide3.webp",
        },
        {
            _id: "4",
            name: "Outdoor Billboard Design",
            price: 5000,
            discount: 15,
            finalprice: 4250,
            unit: "project",
            description: "Creative billboard designs.",
            imageUrl: "/Slide4.webp",
        },
        {
            _id: "5",
            name: "Sticker Printing",
            price: 299,
            discount: 5,
            finalprice: 284,
            unit: "pack",
            description: "Durable waterproof stickers.",
            imageUrl: "/Slide5.webp",
        },
        {
            _id: "6",
            name: "Brand Identity Kit",
            price: 9999,
            discount: 25,
            finalprice: 7499,
            unit: "package",
            description: "Complete branding kit.",
            imageUrl: "/Slide1.webp",
        },
    ];

    // Include View All inside the slider
    const allItems = [
        ...products,
        { _id: "view-all", isViewAll: true },
    ];

    const visibleItems = 3;
    const totalItems = allItems.length;
    const maxIndex = totalItems - visibleItems;

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
                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full bg-white/5 border border-white/10
          hover:bg-indigo-600 transition"
                >
                    <ChevronLeft />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full bg-white/5 border border-white/10
          hover:bg-indigo-600 transition"
                >
                    <ChevronRight />
                </button>

                {/* Slider */}
                <div className="overflow-hidden">
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
                </div>
            </div>
        </section>
    );
}
