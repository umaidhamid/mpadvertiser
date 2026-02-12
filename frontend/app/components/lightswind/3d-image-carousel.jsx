"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

/* --- Responsive Embedded CSS --- */
const EMBEDDED_CSS = `
.cascade-slider_container {
    position: relative;
    width: 100%;
    max-width: 1400px;
    height: 70vh;
    margin: 0 auto;
    z-index: 20;
    user-select: none;
    touch-action: pan-y;
    overflow: hidden;
}

.cascade-slider_slides {
    position: relative;
    height: 100%;
}

.cascade-slider_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    transition: all 0.7s ease;
    opacity: 0;
    z-index: 1;
}

.cascade-slider_item.now {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    z-index: 5;
}

.cascade-slider_item.next {
    transform: translate(-130%, -50%) scale(0.7);
    opacity: 1;
    z-index: 4;
}

.cascade-slider_item.prev {
    transform: translate(30%, -50%) scale(0.7);
    opacity: 1;
    z-index: 4;
}

.cascade-slider_arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    z-index: 6;
}

.cascade-slider_arrow-left { left: 2%; }
.cascade-slider_arrow-right { right: 2%; }

.cascade-slider_slides img {
    width: 100%;
    max-width: 500px;
    border-radius: 25px;
    display: block;
}

.cascade-slider_item:not(.now) img {
    filter: grayscale(0.7);
}

/* ---------- Responsive Breakpoints ---------- */

@media (max-width: 1024px) {
  .cascade-slider_container {
    height: 60vh;
  }

  .cascade-slider_slides img {
    max-width: 400px;
  }

  .cascade-slider_item.next {
    transform: translate(-110%, -50%) scale(0.6);
  }

  .cascade-slider_item.prev {
    transform: translate(20%, -50%) scale(0.6);
  }
}

@media (max-width: 768px) {
  .cascade-slider_container {
    height: 50vh;
  }

  .cascade-slider_slides img {
    max-width: 280px;
  }

  .cascade-slider_item.next,
  .cascade-slider_item.prev {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.5;
  }

  .cascade-slider_arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .cascade-slider_container {
    height: 45vh;
  }

  .cascade-slider_slides img {
    max-width: 240px;
  }
}
`;

/* --- Helper --- */
const getSlideClasses = (index, activeIndex, total) => {
  const diff = index - activeIndex;

  if (diff === 0) return "now";
  if (diff === 1 || diff === -total + 1) return "next";
  if (diff === -1 || diff === total - 1) return "prev";

  return "";
};

export default function ThreeDImageCarousel({
  slides,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const total = slides.length;

  const navigate = useCallback(
    (direction) => {
      setActiveIndex((current) =>
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total
      );
    },
    [total]
  );

  useEffect(() => {
    if (autoplay && total > 1) {
      autoplayRef.current = setInterval(() => {
        navigate("next");
      }, delay * 1000);
    }

    return () => clearInterval(autoplayRef.current);
  }, [autoplay, delay, navigate, total]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EMBEDDED_CSS }} />

      <div
        className={`cascade-slider_container ${className}`}
        onMouseEnter={() => pauseOnHover && clearInterval(autoplayRef.current)}
        onMouseLeave={() =>
          autoplay &&
          pauseOnHover &&
          (autoplayRef.current = setInterval(
            () => navigate("next"),
            delay * 1000
          ))
        }
      >
        <div className="cascade-slider_slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`cascade-slider_item ${getSlideClasses(
                index,
                activeIndex,
                total
              )}`}
            >
              <img src={slide.src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <span
              className="cascade-slider_arrow cascade-slider_arrow-left rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition"
              onClick={() => navigate("prev")}
            >
              <ArrowLeftCircle size={30} />
            </span>

            <span
              className="cascade-slider_arrow cascade-slider_arrow-right rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition"
              onClick={() => navigate("next")}
            >
              <ArrowRightCircle size={30} />
            </span>
          </>
        )}
      </div>
    </>
  );
}