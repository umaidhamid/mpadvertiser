"use client";

import { motion } from "framer-motion";
import { CheckCircle, PencilRuler, Printer, Truck } from "lucide-react";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../lightswind/Accordion"; // adjust path if needed

export default function ProcessSection() {
    const steps = [
        {
            value: "step-1",
            icon: <CheckCircle size={20} />,
            title: "Consultation",
            description:
                "We understand your goals, materials, and timelines before starting.",
        },
        {
            value: "step-2",
            icon: <PencilRuler size={20} />,
            title: "Design & Approval",
            description:
                "Our team crafts refined visuals and shares previews for confirmation.",
        },
        {
            value: "step-3",
            icon: <Printer size={20} />,
            title: "Precision Printing",
            description:
                "Advanced printing technology ensures consistent premium quality.",
        },
        {
            value: "step-4",
            icon: <Truck size={20} />,
            title: "Secure Delivery",
            description:
                "Carefully packed and delivered on time to your location.",
        },
    ];

    return (
        <section className="relative py-12 bg-black text-white overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-1 relative z-10">
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
                    className="text-gray-400 m-6 max-w-2xl mx-auto"
                >
                    Structured. Transparent. Reliable.
                    A streamlined workflow designed for consistent results.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ================= MOBILE ================ */}
                <div className="lg:hidden">
                    <Accordion type="single" collapsible className="relative w-full max-w-7xl mx-auto">

                        {/* Vertical timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-600/40 via-purple-600/30 to-transparent" />

                        <AccordionItem value="step-1" className="relative pl-16 border-none">
                            <AccordionTrigger className="group text-left hover:no-underline">

                                {/* Timeline Circle */}
                                <div className="absolute left-0 top-4 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black border border-white/20 
          flex items-center justify-center
          group-data-[state=open]:border-indigo-500/60
          transition-all duration-300">

                                        <span className="text-indigo-400 font-semibold">1</span>
                                    </div>
                                </div>

                                <span className="text-lg font-semibold text-white">
                                    Consultation
                                </span>

                            </AccordionTrigger>

                            <AccordionContent className="text-gray-400 leading-relaxed pr-4">
                                We understand your goals, materials, and timelines before starting.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="step-2" className="relative pl-16 border-none">
                            <AccordionTrigger className="group text-left hover:no-underline">

                                <div className="absolute left-0 top-4 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black border border-white/20 
          flex items-center justify-center
          group-data-[state=open]:border-indigo-500/60
          transition-all duration-300">

                                        <span className="text-indigo-400 font-semibold">2</span>
                                    </div>
                                </div>

                                <span className="text-lg font-semibold text-white">
                                    Design & Approval
                                </span>

                            </AccordionTrigger>

                            <AccordionContent className="text-gray-400 leading-relaxed pr-4">
                                Our team crafts refined visuals and shares previews for confirmation.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="step-3" className="relative pl-16 border-none">
                            <AccordionTrigger className="group text-left hover:no-underline">

                                <div className="absolute left-0 top-4 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black border border-white/20 
          flex items-center justify-center
          group-data-[state=open]:border-indigo-500/60
          transition-all duration-300">

                                        <span className="text-indigo-400 font-semibold">3</span>
                                    </div>
                                </div>

                                <span className="text-lg font-semibold text-white">
                                    Precision Printing
                                </span>

                            </AccordionTrigger>

                            <AccordionContent className="text-gray-400 leading-relaxed pr-4">
                                Advanced printing technology ensures consistent premium quality.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="step-4" className="relative pl-16 border-none">
                            <AccordionTrigger className="group text-left hover:no-underline">

                                <div className="absolute left-0 top-4 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black border border-white/20 
          flex items-center justify-center
          group-data-[state=open]:border-indigo-500/60
          transition-all duration-300">

                                        <span className="text-indigo-400 font-semibold">4</span>
                                    </div>
                                </div>

                                <span className="text-lg font-semibold text-white">
                                    Secure Delivery
                                </span>

                            </AccordionTrigger>

                            <AccordionContent className="text-gray-400 leading-relaxed pr-4">
                                Carefully packed and delivered on time to your location.
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>

                </div>

                {/* ================= DESKTOP ================ */}
                <div className="hidden lg:grid grid-cols-4 gap-14 relative">

                    <div className="absolute top-20 left-0 right-0 h-px bg-white/10 " />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.value}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative text-left"
                        >

                            <div className="relative mb-8 flex justify-start">
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

                            <h3 className="text-xl font-semibold mb-4 tracking-wide">
                                {step.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                {step.description}
                            </p>

                            <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r 
                from-indigo-600 to-purple-600 transition-all duration-500" />

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}
