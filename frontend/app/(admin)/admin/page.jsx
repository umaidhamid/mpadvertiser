"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
    const quotes = [
        "Precision is not optional. It’s the standard.",
        "Every detail matters. Especially the small ones.",
        "Good printing delivers. Great printing persuades.",
        "Speed builds trust. Quality keeps it.",
        "Execution turns ideas into revenue.",
        "Consistency creates credibility.",
        "Deadlines are promises in disguise.",
        "Design attracts. Print convinces.",
        "Strong brands are built layer by layer.",
        "Clarity wins attention.",
        "Excellence is a habit, not a campaign.",
        "Print is permanent. Make it count.",
        "Reliable systems build reliable brands.",
        "Creativity is powerful. Precision makes it profitable.",

    ];

    return (
        <div className="px-6 py-16 bg-black min-h-screen text-white">

            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#681CA1] via-[#AA31E4] to-[#FF4081] mb-2">
                Welcome back
            </h1>
            <p className="text-gray-400 mb-10">
                A few principles worth keeping in view today.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#AA31E4]/40 transition"
                    >
                        <p className="text-gray-300 text-sm leading-relaxed">
                            "{quote}"
                        </p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
