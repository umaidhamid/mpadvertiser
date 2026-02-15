"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
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
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { cart } = useContext(CartContext);

    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

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
            {/* HEADER */}
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-300
        ${scrolled
                        ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-white text-2xl font-bold tracking-wide"
                    >
                        MP Advertisers
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8 relative">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative text-lg font-medium text-white/80 hover:text-white transition"
                                >
                                    {item.label}

                                    <span
                                        className={`absolute left-0 -bottom-2 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300
                    ${isActive ? "w-full" : "w-0"}`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* RIGHT SECTION */}
                    <div className="hidden md:flex items-center gap-4">

                        {/* CART ICON */}
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="text-white w-6 h-6 hover:text-indigo-400 transition" />

                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-[2px] rounded-full text-white">
                                    {count}
                                </span>
                            )}
                        </Link>

                        {/* SOCIAL ICONS */}
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full 
                bg-white/5 border border-white/10 
                hover:bg-indigo-600 hover:border-indigo-600 
                transition duration-300"
                            >
                                <FontAwesomeIcon
                                    icon={social.icon}
                                    className="text-white text-sm"
                                />
                            </a>
                        ))}

                    </div>

                    {/* HAMBURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1.5"
                    >
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 
              ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 
              ${menuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                        />
                    </button>

                </div>
            </header>

            {/* BACKDROP */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            {/* MOBILE MENU */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-black 
        border-l border-white/10 shadow-2xl 
        transform transition-transform duration-300 z-50 md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col mt-28 px-6 gap-6">

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-lg font-medium transition 
                ${isActive
                                        ? "text-indigo-400"
                                        : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* CART IN MOBILE */}
                    <Link
                        href="/cart"
                        className="flex items-center justify-between text-lg font-medium text-white/80 hover:text-white transition"
                    >
                        Cart
                        {count > 0 && (
                            <span className="bg-red-600 text-xs px-2 py-[2px] rounded-full text-white">
                                {count}
                            </span>
                        )}
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-white/10 pt-6 mt-6 flex gap-4">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/5 border border-white/10 
                hover:bg-indigo-600 hover:border-indigo-600 
                transition duration-300"
                            >
                                <FontAwesomeIcon
                                    icon={social.icon}
                                    className="text-white"
                                />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;
