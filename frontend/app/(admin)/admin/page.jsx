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
        <div className="px-6 py-16">

            <h1 className="text-2xl font-semibold mb-10">
                Admin Principles
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                        <p className="text-gray-800 text-sm leading-relaxed">
                            “{quote}”
                        </p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}