"use client";

import Link from "next/link";

export default function IndustriesCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Grow Your Industry Presence?
        </h2>

        <p className="max-w-2xl mx-auto mb-10 text-white/90">
          Let MP Advertisers help your business stand out with premium branding and printing solutions.
        </p>

        <Link
          href="/Contact-Us"
          className="inline-flex items-center justify-center px-10 py-4 
          rounded-full font-semibold 
          bg-white text-black 
          hover:bg-black hover:text-white 
          transition duration-300"
        >
          Get Started
        </Link>

      </div>

    </section>
  );
}
