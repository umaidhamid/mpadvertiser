"use client";

import GalleryHero from "../../components/client/gallery/GalleryHero";
import MasonryGallery from "../../components/client/gallery/MasonryGallery";

export default function GalleryPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">

      <div className="max-w-7xl mx-auto">
        <GalleryHero />
        <MasonryGallery />
      </div>

    </main>
  );
}
