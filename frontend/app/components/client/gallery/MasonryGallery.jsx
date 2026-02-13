
"use client";

import { useState } from "react";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

export default function MasonryGallery() {
    const images = [
        "/Slide1.webp",
        "/Slide2.webp",
        "/Slide3.webp",
        "/Slide4.webp",
        "/Slide5.webp",
        "/Slide1.webp",
        "/Slide2.webp",
        "/Slide3.webp",
        "/Slide4.webp",
        "/Slide5.webp",
        "/Slide1.webp",
        "/Slide2.webp",
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-15 bg-black text-white relative">

            <div className=" mx-auto px-6">

                {/* Masonry Layout */}
                <div
                    className="
          columns-1
          sm:columns-2
          lg:columns-3
          xl:columns-4
          gap-6
          space-y-6
          "
                >
                    {images.map((img, index) => (
                        <div key={index} className="break-inside-avoid">
                            <GalleryItem
                                image={img}
                                onClick={() => setActiveIndex(index)}
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* Lightbox */}
            {activeIndex !== null && (
                <Lightbox
                    images={images}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            )}

        </section>
    );
}
