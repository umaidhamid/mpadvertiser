"use client";

import { useEffect, useState } from "react";
import ThreeDImageCarousel from "../lightswind/3d-image-carousel.jsx";
import Api from "../../lib/api";

export default function Carousel() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await Api.get("/carousel/get");

                const formatted = res.data.slides.map((slide) => ({
                    id: slide._id,
                    src: slide.url,
                    href: slide.link || "#",
                }));

                setSlides(formatted);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSlides();
    }, []);

    return (
        <div className="bg-black/60 text-white">

            <header className="text-center pt-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-wide">
                    Our Featured Work
                </h2>
            </header>

            <section className="flex flex-col items-center justify-center">
                <ThreeDImageCarousel
                    slides={slides}
                    itemCount={slides.length}
                    autoplay={true}
                    delay={3}
                    pauseOnHover={true}
                    className="my-10"
                />
            </section>

        </div>
    );
}
