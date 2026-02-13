import "../globals.css";
import Navbar from "../components/client/Navbar.jsx"
import ScrollProgress from "../components/client/ScrollProgress";
import FloatingWhatsApp from "../components/client/FloatingWhatsApp";
// import Footer from "@/components/client/Footer";

export const metadata = {
  title: "MP Advertisers | Advertising & Printing in Kashmir",
  description: "Complete advertising and printing solutions in Kashmir.",
};

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <ScrollProgress />
        <FloatingWhatsApp />
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>
        <section className="relative bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-white/500">

            <p>
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>

            <div className="mt-3 sm:mt-0 flex items-center gap-2">
              <span>Created & Managed by</span>
              <a
                href="https://umaidhamid."
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition"
              >
                Umaid Hamid
              </a>
            </div>

          </div>
        </section>
      </body>
    </html>
  );
}
