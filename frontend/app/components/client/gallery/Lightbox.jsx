"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  images,
  activeIndex,
  setActiveIndex,
}) {
  const close = () => setActiveIndex(null);

  const prev = () =>
    setActiveIndex(
      activeIndex === 0 ? images.length - 1 : activeIndex - 1
    );

  const next = () =>
    setActiveIndex(
      activeIndex === images.length - 1 ? 0 : activeIndex + 1
    );

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

      {/* Close */}
      <button
        onClick={close}
        className="absolute top-6 right-6 text-white hover:text-gray-400"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-6 text-white hover:text-gray-400"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Image */}
      <img
        src={images[activeIndex]}
        alt="Full View"
        className="max-h-[85vh] max-w-[90vw] rounded-2xl"
      />

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-6 text-white hover:text-gray-400"
      >
        <ChevronRight size={40} />
      </button>

    </div>
  );
}