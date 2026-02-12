import "../globals.css";
import Navbar from "../components/client/Navbar.jsx"
// import Footer from "@/components/client/Footer";

export const metadata = {
  title: "MP Advertisers | Advertising & Printing in Kashmir",
  description: "Complete advertising and printing solutions in Kashmir.",
};

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>
        <h1>Client Layout</h1>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
