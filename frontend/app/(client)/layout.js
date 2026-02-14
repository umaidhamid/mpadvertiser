import "../globals.css";
import Navbar from "../components/client/Navbar.jsx"
import ScrollProgress from "../components/client/ScrollProgress";
import FloatingWhatsApp from "../components/client/FloatingWhatsApp";
import Link from "next/link";

// import Footer from "@/components/client/Footer";

export const metadata = {
  metadataBase: new URL("https://mpadvertisers.umaidhamid.in"),

  title: {
    default: "MP Advertisers | Advertising & Printing in Kashmir",
    template: "%s | MP Advertisers",
  },

  description:
    "Complete advertising and printing solutions in Kashmir including hoardings, LED boards, branding, and large format printing.",

  keywords: [
    "Advertising in Kashmir",
    "Printing services Kashmir",
    "Hoardings Kashmir",
    "Branding Kashmir",
    "MP Advertisers",
  ],

  authors: [{ name: "MP Advertisers" }],

  creator: "MP Advertisers",

  openGraph: {
    title: "MP Advertisers | Advertising & Printing in Kashmir",
    description:
      "Complete advertising and printing solutions in Kashmir.",
    url: "https://mpadvertisers.umaidhamid.in",
    siteName: "MP Advertisers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/mplogo.png", // add inside public folder
        width: 1200,
        height: 630,
        alt: "MP Advertisers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MP Advertisers | Advertising & Printing in Kashmir",
    description:
      "Complete advertising and printing solutions in Kashmir.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};


export default function ClientLayout({ children }) {

  return (
    <html lang="en">
      <body className=" text-gray-800">
        <ScrollProgress />
        <FloatingWhatsApp />
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>
        <section className="relative bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">

            {/* Copyright */}
            <p>
              © {new Date().getFullYear()} MP Advertisers. All rights reserved.
            </p>

            {/* Developer Credit */}
            <div className="mt-3 sm:mt-0 flex items-center gap-2">
              <span>Created & Managed by</span>

              <Link
                href="/login"
                className="text-white hover:text-indigo-400 transition"
              >
                Umaid Hamid
              </Link>
            </div>

          </div>
        </section>
      </body>
    </html>
  );
}
