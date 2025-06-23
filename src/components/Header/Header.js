"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HAMBURGER, LOGO } from "@/constants/images";
import { Icon } from "@iconify/react";
import { AppButton } from "../Button";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us	", href: "#" },
    { label: "Destinations", href: "#" },
    { label: "Packages", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Contact", href: "#" },
];

const Header = () => {
    const [showShadow, setShowShadow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Only shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowShadow(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initialize on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`lg:pt-[3rem] sm:pt-[2rem] pt-[1.5rem] sm:pb-[2rem] pb-[1.5rem]
                    fixed top-0 left-0 w-full z-50 bg-transparent
                    ${showShadow ? "shadow-md backdrop-blur-xl" : ""}
                    translate-y-0 
                `}
                style={{ willChange: "transform" }}
            >
                <div className="custom-container flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center xl:gap-[6rem] lg:gap-[3rem] md:gap-[3rem] gap-[2rem]">
                        <Link href="/" className="flex items-center space-x-2 relative z-10">
                            <Image
                                src={LOGO}
                                alt="Description of image"
                                width={180}
                                height={60}
                                className="xl:w-[25rem] md:w-[16vw] w-[50vw] h-[auto] object-contain"
                            />
                        </Link>
                        {/* Desktop Navigation */}

                    </div>
                    <nav className="items-center md:gap-[1.6rem] hidden lg:flex">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="group relative text-[1.8rem] leading-1 font-medium py-[10px] transition-all duration-300 text-white hover:text-secondary"
                            >
                                <span className="pl-[15px]">{item.label}</span>
                            </a>
                        ))}
                    </nav>
                    {/* Contact Button (Desktop) */}
                    <div className="hidden lg:flex">
                        <AppButton href="/#contact">Book Now</AppButton>
                    </div>
                    {/* Sidebar Hamburger (Mobile/Tablet) */}
                    <button
                        className="lg:hidden flex items-center justify-center sm:w-[5.5rem] sm:h-[5.5rem] w-[4rem] h-[4rem] bg-white rounded-full transition-all duration-300 ease-in-out hover:border-primary hover:border-1"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Open menu"
                    >
                        <Image
                            src={HAMBURGER}
                            alt="Menu Icon"
                            width={20}
                            height={20}
                            className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] object-contain hamburger_icon"
                        />
                    </button>
                </div>
            </header>
            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-whitefade15 backdrop-blur-lg bg-opacity-40 z-[9] transition-all duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden={!sidebarOpen}
            />
            {/* Sidebar Drawer */}
            <aside
                className={`fixed sm:pt-[10rem] top-[8rem] sm:top-[0rem] px-[2rem] right-0 h-full w-[100%] bg-transparent z-[10] shadow-lg transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
                style={{ willChange: "transform" }}
                onClick={() => setSidebarOpen(false)}
            >
                <div className="flex flex-col sm:gap-[2rem] gap-[1rem] bg-[#F7F8FB] py-[3.2rem] px-[2.4rem] rounded-[2rem] sm:max-w-[85%] max-w-[100%] w-full h-auto ml-auto shadow-[0px_0px_30px_rgba(51,78,110,0.15)]">
                    <div className="flex items-center justify-between">
                        <h5 className="sm:text-[2rem] text-[1.6rem] font-semibold">Menu</h5>
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded focus:outline-none"
                            aria-label="Close menu"
                        >
                            <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col sm:gap-[1.5rem] gap-[1rem]">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="flex items-center font-medium sm:py-[1.5rem] py-[1rem] sm:px-[2rem] px-[1.5rem] gap-[1rem] group rounded-full justify-center bg-white transition-all duration-200 bg-gray-100 text-fadeGrey"
                            >
                                <span className="transition-all sm:text-[1.8rem] text-[1.6rem] duration-300 text-fadeGrey">{item.label}</span>
                            </a>
                        ))}
                        <AppButton classes="mt-[1rem] w-full" href="/#contact">Book a Demo</AppButton>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Header;