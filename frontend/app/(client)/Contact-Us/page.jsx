"use client";

import ContactSection from "../../components/client/contact/ContactSection";
import { motion } from "framer-motion";
// import MapSection from "../../components/client/MapSection";
import Link from "next/link";

export default function ContactPage() {
   const embedMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.025067312882!2d74.8295589!3d34.017567500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f73e7aec7ab%3A0xb9be760e73ea35ce!2sMP%20Advertisers!5e0!3m2!1sen!2sin!4v1761542575986!5m2!1sen!2sin";

    const googleMapsLink = "https://maps.app.goo.gl/8mkpm5o7K3m6MEdk8";
    return (
        <main className="bg-black text-white min-h-screen overflow-hidden">

            {/* ================= HERO HEADER ================= */}
            <section className="relative py-28 border-b border-white/10">

                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">

                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-gray-400">
                        <Link href="/" className="hover:text-white transition">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Contact</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Let’s Build Something Bold
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Whether it’s banners, billboards, business cards, or complete branding —
                        we’re ready to bring your vision to life.
                    </p>

                    {/* Trust Badges */}
                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <span>✔ Fast Turnaround</span>
                        <span>✔ Premium Print Quality</span>
                        <span>✔ Trusted by 200+ Businesses</span>
                    </div>

                </div>
            </section>

            {/* ================= CONTACT FORM SECTION ================= */}
            <ContactSection />

            {/* ================= MAP SECTION ================= */}
            <section className="relative py-24 border-t border-white/10">

                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Visit Our Office
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        1st Floor Bhat Complex, Aribagh Stop, Nowgam,
                        Srinagar J&K - 190015
                    </p>
                </div>

                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <a
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition duration-500 group-hover:border-indigo-500">

                                <iframe
                                    title="MP Advertisers Location"
                                    src={embedMap}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    allowFullScreen
                                    className="w-full h-full grayscale group-hover:grayscale-0 transition duration-700"
                                ></iframe>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                            </div>
                        </a>
                    </motion.div>
                </div>

            </section>

            {/* ================= FINAL MINI CTA ================= */}
            <section className="relative py-20 border-t border-white/10 text-center">

                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl opacity-20"></div>

                <div className="relative max-w-3xl mx-auto px-6">

                    <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                        Need urgent printing?
                    </h3>

                    <p className="text-gray-400 mb-8">
                        Call us directly for quick assistance and same-day project consultation.
                    </p>

                    <a
                        href="tel:+919149455296"
                        className="inline-flex items-center gap-3 px-8 py-3 rounded-full 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
            text-white font-semibold hover:opacity-90 transition"
                    >
                        Call Now
                    </a>

                </div>
            </section>

        </main>
    );
}
