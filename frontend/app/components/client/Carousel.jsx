"use client";

import { useEffect, useState } from "react";
import ThreeDImageCarousel from "../lightswind/3d-image-carousel.jsx";
import Api from "../../lib/api";

export default function Carousel() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                setLoading(true);

                const res = await Api.get("/carousel/get");

                const formatted = (res.data.slides || []).map((slide) => ({
                    id: slide._id,
                    src: slide.url,
                    href: slide.link || "#",
                }));

                setSlides(formatted);
            } catch (err) {
                console.error("Carousel fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    return (
        <div className="bg-background text-foreground">

            {/* ================= HEADER ================= */}
            <header className="text-center pt-20 pb-8 px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Our Featured Work
                </h2>

                <p className="text-muted mt-4 text-base max-w-2xl mx-auto">
                    A showcase of precision printing and creative craftsmanship.
                </p>
            </header>

            {/* ================= CAROUSEL SECTION ================= */}
            <section className="flex flex-col items-center justify-center pb-20 px-6">

                {loading ? (
                    <div className="text-muted py-16">
                        Loading showcase...
                    </div>
                ) : slides.length === 0 ? (
                    <div className="text-muted py-16">
                        No showcase items available.
                    </div>
                ) : (
                    <div className="w-full max-w-6xl">
                        <ThreeDImageCarousel
                            slides={slides}
                            itemCount={slides.length}
                            autoplay={true}
                            delay={3}
                            pauseOnHover={true}
                            className="my-6"
                        />
                    </div>
                )}

            </section>

        </div>
    );
}
