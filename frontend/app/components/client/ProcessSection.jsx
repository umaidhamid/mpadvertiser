"use client";

import { motion } from "framer-motion";
import { CheckCircle, PencilRuler, Printer, Truck } from "lucide-react";

export default function ProcessSection() {
    const steps = [
        {
            icon: <CheckCircle size={26} />,
            title: "Consultation",
            description:
                "We understand your goals, materials, and timelines before starting.",
        },
        {
            icon: <PencilRuler size={26} />,
            title: "Design & Approval",
            description:
                "Our team crafts refined visuals and shares previews for confirmation.",
        },
        {
            icon: <Printer size={26} />,
            title: "Precision Printing",
            description:
                "Advanced printing technology ensures consistent premium quality.",
        },
        {
            icon: <Truck size={26} />,
            title: "Secure Delivery",
            description:
                "Carefully packed and delivered on time to your location.",
        },
    ];

    return (
        <section className="relative py-28 bg-black text-white overflow-hidden">

            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-24 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                    Our Process
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-400 mt-5 max-w-2xl mx-auto"
                >
                    Structured. Transparent. Reliable.
                    A streamlined workflow designed for consistent results.
                </motion.p>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">

                {/* Desktop Connecting Line */}
                <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 relative z-10">

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative text-center lg:text-left"
                        >
                            {/* Step Number Circle */}
                            <div className="relative mb-8 flex justify-center lg:justify-start">
                                <div className="w-14 h-14 flex items-center justify-center 
                  rounded-full border border-white/20 
                  bg-white/[0.03] backdrop-blur-md
                  group-hover:border-indigo-500/50 transition duration-500">

                                    <span className="absolute -top-3 -right-3 text-xs 
                    w-6 h-6 flex items-center justify-center 
                    rounded-full bg-gradient-to-br 
                    from-indigo-600 to-purple-600 text-white font-semibold shadow-md">
                                        {index + 1}
                                    </span>

                                    <div className="text-indigo-400 group-hover:text-indigo-300 transition">
                                        {step.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-4 tracking-wide">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                                {step.description}
                            </p>

                            {/* Hover Accent Line */}
                            <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r 
                from-indigo-600 to-purple-600 transition-all duration-500" />
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}