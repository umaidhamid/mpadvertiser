"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function OfferPopup() {
    const [show, setShow] = useState(false);
    const triggerRef = useRef(null);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem("offer_seen");
        if (hasSeen) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShow(true);
                    sessionStorage.setItem("offer_seen", "true");
                }
            },
            { threshold: 0.4 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Invisible trigger section */}
            <div ref={triggerRef} className="h-[1px]" />

            <AnimatePresence>
                {show && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                            onClick={() => setShow(false)}
                        />

                        {/* Popup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 z-50 flex items-center justify-center px-6"
                        >
                            <div className="relative w-full max-w-lg rounded-3xl 
                bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 
                text-white p-10 shadow-2xl overflow-hidden">

                                {/* Glow */}
                                <div className="absolute inset-0 bg-white/10 blur-3xl opacity-30 pointer-events-none" />

                                {/* Close Button */}
                                <button
                                    onClick={() => setShow(false)}
                                    className="absolute top-4 right-5 text-white/80 hover:text-white text-lg"
                                >
                                    ✕
                                </button>

                                {/* Content */}
                                <div className="relative text-center">

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        🎉 Big Sale Offer
                                    </h2>

                                    <p className="text-white/90 mb-6 text-sm md:text-base">
                                        Get a <span className="font-semibold">FREE Design Consultation</span>
                                        plus exclusive discounts on bulk printing orders.
                                    </p>

                                    <div className="text-sm mb-8 bg-white/20 rounded-full px-4 py-2 inline-block">
                                        Limited Time Only
                                    </div>

                                    <Link
                                        href="/Contact-Us"
                                        className="block w-full bg-white text-black 
                    font-semibold py-3 rounded-full 
                    hover:bg-black hover:text-white transition duration-300"
                                    >
                                        Claim Offer Now
                                    </Link>

                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}