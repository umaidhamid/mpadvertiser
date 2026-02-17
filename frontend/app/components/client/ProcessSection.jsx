"use client";

import { motion } from "framer-motion";
import { CheckCircle, PencilRuler, Printer, Truck } from "lucide-react";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../lightswind/Accordion";

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
        <section className="relative py-16 bg-background text-foreground overflow-hidden">

            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            {/* ================= HEADING ================= */}
            <div className="text-center mb-16 relative z-10">
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
                    className="text-muted mt-6 max-w-2xl mx-auto"
                >
                    Structured. Transparent. Reliable.
                    A streamlined workflow designed for consistent results.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ================= MOBILE ================= */}
                <div className="lg:hidden">
                    <Accordion type="single" collapsible className="relative w-full">

                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                        {steps.map((step, index) => (
                            <AccordionItem
                                key={step.value}
                                value={step.value}
                                className="relative pl-16 border-none"
                            >
                                <AccordionTrigger className="group text-left hover:no-underline">

                                    {/* Circle */}
                                    <div className="absolute left-0 top-4 flex items-center justify-center">
                                        <div
                                            className="w-12 h-12 rounded-full
                      bg-card border border-border
                      flex items-center justify-center
                      transition-all duration-300
                      group-data-[state=open]:border-primary"
                                        >
                                            <span className="text-primary font-semibold">
                                                {index + 1}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="text-lg font-semibold text-foreground">
                                        {step.title}
                                    </span>

                                </AccordionTrigger>

                                <AccordionContent className="text-muted leading-relaxed pr-4">
                                    {step.description}
                                </AccordionContent>
                            </AccordionItem>
                        ))}

                    </Accordion>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:grid grid-cols-4 gap-14 relative">

                    <div className="absolute top-20 left-0 right-0 h-px bg-border" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.value}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative text-left"
                        >

                            {/* Icon Circle */}
                            <div className="relative mb-8 flex justify-start">
                                <div
                                    className="w-14 h-14 flex items-center justify-center
                  rounded-full border border-border
                  bg-card transition duration-500
                  group-hover:border-primary"
                                >
                                    <span
                                        className="absolute -top-3 -right-3 text-xs
                    w-6 h-6 flex items-center justify-center
                    rounded-full bg-primary text-primary-foreground font-semibold shadow"
                                    >
                                        {index + 1}
                                    </span>

                                    <div className="text-primary transition">
                                        {step.icon}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-4 tracking-wide">
                                {step.title}
                            </h3>

                            <p className="text-muted text-sm leading-relaxed max-w-xs">
                                {step.description}
                            </p>

                            <div className="mt-6 h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
