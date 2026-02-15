"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import API from "../../lib/api";

export default function OfferPopup() {
    const [show, setShow] = useState(false);
    const [offer, setOffer] = useState(null);

    /* ================= FETCH OFFER ================= */

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const res = await API.get("/offers/latest");
                if (res.data.success && res.data.offer) {
                    setOffer(res.data.offer);
                }
            } catch {
                setOffer(null);
            }
        };

        fetchOffer();
    }, []);

    /* ================= SHOW LOGIC ================= */

    useEffect(() => {
        if (!offer) return;

        const lastSeen = localStorage.getItem("offer_seen_date");
        const today = new Date().toDateString();

        // Show only once per day
        if (lastSeen === today) return;

        const timer = setTimeout(() => {
            setShow(true);
        }, 4000); // show after 4 seconds

        return () => clearTimeout(timer);
    }, [offer]);

    const handleClose = () => {
        localStorage.setItem(
            "offer_seen_date",
            new Date().toDateString()
        );
        setShow(false);
    };

    if (!offer) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-50 w-[90%] sm:w-80"
                >
                    <div className="bg-white text-black rounded-2xl shadow-xl border border-gray-200 p-6">

                        {/* Close */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-4 text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <h3 className="text-base font-semibold mb-2">
                            {offer.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                            {offer.description}
                        </p>

                        <Link
                            href={offer.redirectUrl || "/Contact-Us"}
                            onClick={handleClose}
                            className="block text-center bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                        >
                            {offer.buttonText || "View Offer"}
                        </Link>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
