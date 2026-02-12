"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutHero({ data }) {
    return (
        <section className="relative overflow-hidden pt-36 pb-28 px-6 text-center">

            {/* Background Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-black to-black pointer-events-none" />

            {/* Decorative Blurs */}
            <div className="absolute top-24 left-1/3 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full opacity-40 pointer-events-none" />
            <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full opacity-40 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto">

                {/* Established Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-4 
          bg-white/5 border border-white/10 
          px-6 py-2 rounded-full text-sm text-gray-300 mb-8"
                >
                    <span>{data.established}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{data.location}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
                >
                    {data.title.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className={
                                word === "Advertisers"
                                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
                                    : ""
                            }
                        >
                            {word}{" "}
                        </span>
                    ))}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-xl md:text-2xl font-medium text-white/80 mb-6"
                >
                    {data.tagline}
                </motion.p>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    {data.subtitle}
                </motion.p>

                {/* Highlight Points */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-12 flex flex-wrap justify-center gap-6"
                >
                    {data.highlights?.map((item, i) => (
                        <div
                            key={i}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/Contact-Us"
                        className="px-8 py-4 rounded-full 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-semibold shadow-lg 
            hover:shadow-indigo-500/40 transition duration-300"
                    >
                        Start Your Project
                    </Link>

                    <Link
                        href="/Products"
                        className="px-8 py-4 rounded-full border border-white/20 
            text-white hover:bg-white/10 transition duration-300"
                    >
                        Explore Our Work
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 flex justify-center"
                >
                    <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}