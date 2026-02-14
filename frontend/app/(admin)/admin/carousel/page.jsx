"use client";

import { useEffect, useState, useCallback } from "react";
import Api from "../../../lib/api";
import {
  useMotionValue,
  Reorder,
  useDragControls,
  motion,
} from "framer-motion";
import { GripVertical, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCarouselPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");

  /* ================= FETCH ================= */

  const fetchSlides = useCallback(async () => {
    try {
      const res = await Api.get("/carousel/get");
      setSlides(res.data.slides);
    } catch {
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  /* ================= UPLOAD ================= */

  const handleUpload = async () => {
    if (!image) {
      toast.error("Select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", link);

    try {
      setUploading(true);

      await Api.post("/carousel/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Slide uploaded");
      setImage(null);
      setLink("");
      fetchSlides();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/carousel/delete/${id}`);
      setSlides((prev) =>
        prev.filter((slide) => slide._id !== id)
      );
      toast.success("Slide deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= SAVE ORDER ================= */

  const saveOrder = async () => {
    try {
      await Api.put("/carousel/reorder", {
        slides: slides.map((slide, index) => ({
          id: slide._id,
          order: index,
        })),
      });

      toast.success("Order updated");
    } catch {
      toast.error("Reorder failed");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">
          Carousel Management
        </h1>

        {/* ================= UPLOAD SECTION ================= */}

        <div className="bg-white/5 p-6 rounded-xl mb-12 border border-white/10">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-sm"
            />

            <input
              type="text"
              placeholder="Slide link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-white/10 px-4 py-2 rounded-lg flex-1"
            />

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 px-6 py-2 rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

          </div>
        </div>

        {/* ================= SLIDE LIST ================= */}

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : (
          <>
            <Reorder.Group
              axis="y"
              values={slides}
              onReorder={setSlides}
              className="space-y-4"
            >
              {slides.map((slide) => (
                <CarouselItem
                  key={slide._id}
                  slide={slide}
                  onDelete={handleDelete}
                />
              ))}
            </Reorder.Group>

            <div className="mt-6 text-center">
              <button
                onClick={saveOrder}
                className="bg-blue-600 px-6 py-2 rounded-lg"
              >
                Save Order
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ================= SINGLE ITEM ================= */

function CarouselItem({ slide, onDelete }) {
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      value={slide}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
    >
      <div className="flex items-center gap-4">
        <img
          src={slide.url}
          alt=""
          className="w-24 h-16 object-cover rounded-lg"
          draggable={false}
        />
        <span className="text-sm text-gray-300">
          {slide.link || "No link"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <ReorderHandle dragControls={dragControls} />

        <button
          onClick={() => onDelete(slide._id)}
          className="bg-red-600 p-2 rounded-full"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Reorder.Item>
  );
}

/* ================= DRAG HANDLE ================= */

function ReorderHandle({ dragControls }) {
  return (
    <motion.div
      onPointerDown={(e) => {
        e.preventDefault();
        dragControls.start(e);
      }}
      className="cursor-grab active:cursor-grabbing text-gray-400"
    >
      <GripVertical size={18} />
    </motion.div>
  );
}
