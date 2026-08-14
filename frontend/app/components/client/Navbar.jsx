"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { cart } = useContext(CartContext);

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    const navItems = [
        { href: "/", label: "Home" },
        { href: "/AboutUs", label: "About Us" },
        { href: "/Products", label: "Products" },
        { href: "/industries", label: "Industries" },
        { href: "/gallery", label: "Gallery" },
        { href: "/Contact-Us", label: "Contact Us" },
    ];

    const socialLinks = [
        { icon: faFacebook, url: "https://facebook.com" },
        { icon: faInstagram, url: "https://instagram.com" },
        { icon: faYoutube, url: "https://youtube.com" },
        { icon: faEnvelope, url: "mailto:mpadvts@gmail.com" },
    ];

    return (
        <>
            {/* ================= HEADER ================= */}
            <header
                className={`
    fixed w-full top-0 z-50
    bg-white/80 dark:bg-black/80
    backdrop-blur-xl
    border-b border-gray-200 dark:border-gray-800
    transition-all duration-300
    ${scrolled ? "shadow-md" : "shadow-sm"}
  `}
            >
                <div
                    className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${scrolled ? "py-3" : "py-4"
                        }`}
                >

                    {/* LOGO */}
                    <Link href="/" className="group flex flex-col leading-tight">
                        <span
                            className="text-2xl font-bold tracking-wide bg-clip-text text-transparent
                            bg-gradient-to-r from-[#681CA1] via-[#AA31E4] to-[#FF4081]
                            group-hover:opacity-80 transition"
                            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                            MP Advertisers
                        </span>
                        <span className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400">
                            Print &middot; Advertise &middot; Design
                        </span>
                    </Link>


                    {/* ================= DESKTOP NAV ================= */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative text-base font-medium group"
                                >
                                    <span
                                        className={`transition ${isActive
                                            ? "text-[#681CA1] dark:text-[#AA31E4]"
                                            : "text-black dark:text-white group-hover:text-[#681CA1] dark:group-hover:text-[#AA31E4]"
                                            }`}
                                    >
                                        {item.label}
                                    </span>

                                    <span
                                        className={`absolute left-0 -bottom-2 h-[2px] bg-[#681CA1] dark:bg-[#AA31E4] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ================= DESKTOP RIGHT ================= */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* SOCIAL (wide screens only, keeps mid-size desktop uncluttered) */}
                        <div className="hidden xl:flex items-center gap-2 pr-2 mr-1 border-r border-gray-200 dark:border-gray-800">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full
                    text-gray-500 dark:text-gray-400
                    hover:text-white hover:bg-[#681CA1]
                    transition text-sm"
                                >
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>

                        {/* THEME */}
                        {mounted && (
                            <button
                                onClick={() =>
                                    setTheme(theme === "dark" ? "light" : "dark")
                                }
                                className="w-10 h-10 flex items-center justify-center rounded-full
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                hover:bg-[#681CA1] hover:text-white hover:border-[#681CA1]
                transition"
                            >
                                {theme === "dark" ? (
                                    <Sun size={18} />
                                ) : (
                                    <Moon size={18} />
                                )}
                            </button>
                        )}

                        {/* CART */}
                        <Link
                            href="/cart"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                hover:bg-[#681CA1] hover:text-white hover:border-[#681CA1]
                transition group"
                        >
                            <ShoppingCart className="w-5 h-5" />

                            {count > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#FF4081] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                                    {count}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* ================= MOBILE RIGHT ================= */}
                    <div className="flex items-center gap-4 md:hidden">

                        {/* CART */}
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="w-6 h-6 text-black dark:text-white" />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#FF4081] text-white text-xs px-2 py-[2px] rounded-full">
                                    {count}
                                </span>
                            )}
                        </Link>

                        {/* THEME */}
                        {mounted && (
                            <button
                                onClick={() =>
                                    setTheme(theme === "dark" ? "light" : "dark")
                                }
                                className="w-9 h-9 flex items-center justify-center rounded-full
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white"
                            >
                                {theme === "dark" ? (
                                    <Sun size={16} />
                                ) : (
                                    <Moon size={16} />
                                )}
                            </button>
                        )}

                        {/* BURGER */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex flex-col gap-1.5"
                        >
                            <span
                                className={`w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "rotate-45 translate-y-2" : ""
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "opacity-0" : ""
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* ================= BACKDROP ================= */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-black
        border-l border-gray-200 dark:border-gray-800
        shadow-2xl
        transform transition-transform duration-300 z-50 md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col mt-24 px-6 gap-6">

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-lg font-medium transition ${isActive
                                    ? "text-indigo-600 dark:text-indigo-400"
                                    : "text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
