"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

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
            <header className="w-full sticky bg-primary/10 top-0 z-50 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary shadow-brand backdrop-blur-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-white text-xl font-bold tracking-wide group-hover:text-brand-highlight transition">
                            MP Advertisers
                        </span>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-brand text-sm font-semibold uppercase tracking-wider transition-all duration-300
                  ${isActive
                                            ? "bg-brand-highlight text-brand-dark shadow-glow"
                                            : "text-white hover:bg-white/15 hover:-translate-y-1"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* SOCIAL ICONS */}
                    <div className="hidden md:flex items-center gap-3">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-brand-highlight hover:text-brand-dark transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={social.icon} className="text-white text-sm" />
                            </a>
                        ))}
                    </div>

                    {/* HAMBURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1.5"
                    >
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>
                </div>
            </header>

            {/* BACKDROP OVERLAY */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            {/* MOBILE MENU */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-brand-primary to-brand-secondary shadow-2xl transform transition-transform duration-300 z-50 md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col mt-24 px-6 gap-4">

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`px-4 py-3 rounded-brand font-semibold transition-all duration-300
                ${isActive
                                        ? "bg-brand-highlight text-brand-dark"
                                        : "text-white hover:bg-white/15"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* MOBILE SOCIAL */}
                    <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-white/20">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-brand-highlight hover:text-brand-dark transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={social.icon} className="text-white" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;