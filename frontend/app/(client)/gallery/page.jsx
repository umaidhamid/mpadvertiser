"use client";

import GalleryHero from "../../components/client/gallery/GalleryHero";
import MasonryGallery from "../../components/client/gallery/MasonryGallery";

export default function GalleryPage() {
  return (
    <main className="bg-black text-white max-w-7xl mx-auto">

      <GalleryHero />

      <MasonryGallery />

    </main>
  );
}