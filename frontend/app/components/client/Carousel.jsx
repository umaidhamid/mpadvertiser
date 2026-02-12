"use client";

import ThreeDImageCarousel from "../lightswind/3d-image-carousel.jsx";

export default function Carousel() {
    const slides = [
        { id: 1, src: "/Slide1.webp", href: "#" },
        { id: 2, src: "/Slide2.webp", href: "#" },
        { id: 3, src: "/Slide3.webp", href: "#" },
        { id: 4, src: "/Slide4.webp", href: "#" },
        { id: 5, src: "/Slide5.webp", href: "#" },
    ];

    return (
        <div className=" bg-black/60 text-white">

            {/* Website Main Heading */}
            {/* <header className="text-center pt-16">

                <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-wide">
                    Our Featured Work
                </h2>
            </header> */}

            {/* Carousel Section */}
            <section className="flex flex-col items-center justify-center ">
                <ThreeDImageCarousel
                    slides={slides}
                    itemCount={5}
                    autoplay={true}
                    delay={3}
                    pauseOnHover={true}
                    className="my-10"
                />
            </section>

        </div>
    );
}
