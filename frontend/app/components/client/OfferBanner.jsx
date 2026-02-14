"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import API from "../../lib/api";

export default function OfferPopup() {
    const [show, setShow] = useState(false);
    const [offer, setOffer] = useState(null);
    const triggerRef = useRef(null);

    // ✅ Fetch latest offer
    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const res = await API.get("/offers/latest");

                if (res.data.success) {
                    setOffer(res.data.offer);
                }
            } catch (error) {
                setOffer(null);
            }
        };

        fetchOffer();
    }, []);

    useEffect(() => {
        if (!offer) return;

        const hasSeen = localStorage.getItem("offer_seen");
        if (hasSeen === "true") return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShow(true);
                    localStorage.setItem("offer_seen", "true");
                }
            },
            { threshold: 0.4 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => observer.disconnect();
    }, [offer]);

    return (
        <>
            <div ref={triggerRef} className="h-[1px]" />

            <AnimatePresence>
                {show && offer && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, y: 40 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                        className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
                    >
                        <div className="relative rounded-2xl 
              bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 
              text-white p-6 shadow-2xl overflow-hidden">

                            <button
                                onClick={() => setShow(false)}
                                className="absolute top-3 right-4 text-white/80 hover:text-white text-lg"
                            >
                                ✕
                            </button>

                            <h3 className="text-lg font-semibold mb-2">
                                {offer.title}
                            </h3>

                            <p className="text-sm text-white/90 mb-4">
                                {offer.description}
                            </p>

                            <Link
                                href={offer.redirectUrl || "/Contact-Us"}
                                className="block text-center bg-white text-black 
                font-semibold py-2 rounded-full 
                hover:bg-black hover:text-white transition duration-300"
                            >
                                {offer.buttonText || "Claim Offer"}
                            </Link>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
