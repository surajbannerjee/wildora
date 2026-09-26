"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HAMBURGER, LOGO, AVATAR } from "@/constants/images";
import { Icon } from "@iconify/react";
import { AppButton } from "../Button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
];

const Header = () => {
    const [showShadow, setShowShadow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { cartCount, openCart } = useCart();
    const { user, isLoggedIn, logout, openAuthModal } = useAuth();

    // Only shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowShadow(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navTextColor = "text-white hover:text-secondary";
    const cartBtnBg = "bg-white/15 text-white hover:bg-white/30 backdrop-blur-md border border-white/20";

    return (
        <>
            <header
                className={`lg:pt-[3rem] sm:pt-[2rem] pt-[1.5rem] sm:pb-[2rem] pb-[1.5rem]
                    fixed top-0 left-0 w-full z-50 
                    ${showShadow ? "shadow-md backdrop-blur-xl bg-black" : "bg-transparent"}
                    translate-y-0 
                `}
                style={{ willChange: "transform" }}
            >
                <div className="custom-container flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center xl:gap-[5rem] lg:gap-[2.5rem] md:gap-[2.5rem] gap-[2rem]">
                        <Link href="/" className="flex items-center space-x-2 relative z-10">
                            <Image
                                src={LOGO}
                                alt="Wildora Logo"
                                width={180}
                                height={60}
                                className="w-[13rem] sm:w-[18rem] md:w-[16vw] xl:w-[25rem] h-auto object-contain"
                                priority
                            />
                        </Link>
                        {/* Desktop Navigation */}
                        <nav className="items-center md:gap-[1.4rem] hidden lg:flex">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`group relative text-[1.7rem] xl:text-[1.8rem] leading-1 font-medium py-[10px] transition-all duration-300 ${navTextColor}`}
                                >
                                    <span className="pl-[12px]">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Actions (Auth Icon, Cart Trigger & Booking CTA) */}
                    <div className="flex items-center gap-2.5 sm:gap-4">
                        {/* Auth Button (Desktop: Icon only) */}
                        {isLoggedIn ? (
                            <div className="relative hidden sm:block">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className={`relative flex items-center justify-center sm:w-[5rem] sm:h-[5rem] w-[4.2rem] h-[4.2rem] rounded-full transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${cartBtnBg}`}
                                    aria-label="User profile menu"
                                    title={user.name}
                                >
                                    <Image
                                        src={user.avatar || AVATAR}
                                        alt={user.name}
                                        width={36}
                                        height={36}
                                        className="w-[3.4rem] h-[3.4rem] rounded-full object-cover border-2 border-secondary"
                                    />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-[22rem] bg-white rounded-2xl shadow-2xl p-3 flex flex-col gap-2 z-50 text-heading-color border border-gray-100 animate-fadein-up">
                                        <div className="p-2 border-b border-gray-100">
                                            <p className="text-[1.4rem] font-bold truncate">{user.name}</p>
                                            <p className="text-[1.1rem] text-gray-400 truncate">{user.email}</p>
                                            <span className="inline-block mt-1 text-[1rem] bg-secondary/20 text-primary font-bold px-2 py-0.5 rounded-full">
                                                {user.membership}
                                            </span>
                                        </div>

                                        <Link
                                            href="/cart"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 p-2 hover:bg-[#EAF4E6] rounded-xl text-[1.3rem] font-medium"
                                        >
                                            <Icon icon="solar:ticket-bold" className="text-primary text-[1.6rem]" />
                                            <span>My Bookings & Cart</span>
                                        </Link>

                                        <button
                                            onClick={() => {
                                                logout();
                                                setUserMenuOpen(false);
                                            }}
                                            className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-xl text-[1.3rem] font-medium w-full text-left cursor-pointer"
                                        >
                                            <Icon icon="solar:logout-2-bold" className="text-[1.6rem]" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => openAuthModal("login")}
                                className={`hidden sm:flex items-center justify-center sm:w-[5rem] sm:h-[5rem] w-[4.2rem] h-[4.2rem] rounded-full transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${cartBtnBg} ${navTextColor}`}
                                aria-label="Sign In"
                                title="Sign In"
                            >
                                <Icon icon="solar:user-bold" className="text-[2rem] sm:text-[2.2rem]" />
                            </button>
                        )}

                        {/* Cart Button with Count Badge */}
                        <button
                            onClick={openCart}
                            className={`relative flex items-center justify-center sm:w-[5rem] sm:h-[5rem] w-[4.2rem] h-[4.2rem] rounded-full transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${cartBtnBg}`}
                            aria-label={`Open cart with ${cartCount} items`}
                            title="View Safari Itinerary"
                        >
                            <Icon icon="solar:cart-large-4-bold" className="text-[2rem] sm:text-[2.2rem]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-secondary text-white font-bold text-[1.1rem] sm:text-[1.2rem] min-w-[2.2rem] h-[2.2rem] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Desktop Book Now Button */}
                        <div className="hidden lg:flex">
                            <AppButton href="/packages">Book Tours</AppButton>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="lg:hidden flex items-center justify-center sm:w-[5rem] sm:h-[5rem] w-[4.2rem] h-[4.2rem] bg-white rounded-full transition-all duration-300 ease-in-out hover:border-primary hover:border shadow-md cursor-pointer"
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
                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-all duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden={!sidebarOpen}
            />

            {/* Sidebar Drawer */}
            <aside
                className={`fixed top-0 right-0 h-full w-[85%] max-w-[36rem] bg-[#F7F8FB] z-[100] shadow-2xl p-[2rem] sm:p-[2.5rem] overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:hidden flex flex-col justify-between`}
                style={{ willChange: "transform" }}
            >
                <div className="flex flex-col gap-[2rem]">
                    <div className="flex items-center justify-between pb-[1.5rem] border-b border-gray-200">
                        <Image
                            src={LOGO}
                            alt="Wildora Logo"
                            width={140}
                            height={45}
                            className="w-[12rem] h-auto object-contain"
                        />
                        <button
                            className="w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-full bg-white text-dark shadow-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
                            aria-label="Close menu"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* User Mobile Status */}
                    {isLoggedIn ? (
                        <div className="p-3 bg-white rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2.5">
                                <Image
                                    src={user.avatar || AVATAR}
                                    alt={user.name}
                                    width={36}
                                    height={36}
                                    className="w-[3.2rem] h-[3.2rem] rounded-full object-cover border border-secondary"
                                />
                                <div>
                                    <p className="text-[1.3rem] font-bold">{user.name}</p>
                                    <span className="text-[1.1rem] text-primary font-semibold">{user.membership}</span>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="text-red-500 text-[1.2rem] font-semibold hover:underline cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                openAuthModal("login");
                            }}
                            className="w-full py-3 bg-primary text-white rounded-2xl font-bold text-[1.4rem] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                            <Icon icon="solar:user-bold" className="text-[1.8rem]" />
                            <span>Sign In / Register</span>
                        </button>
                    )}

                    <nav className="flex flex-col gap-[1rem]">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center font-medium py-[1.2rem] px-[2rem] gap-[1rem] group rounded-full justify-start bg-white hover:bg-primary hover:text-white transition-all duration-200 text-heading-color shadow-sm"
                            >
                                <span className="text-[1.6rem] transition-colors">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="pt-[2rem] border-t border-gray-200 mt-[2rem] flex flex-col gap-3">
                    <button
                        onClick={() => {
                            setSidebarOpen(false);
                            openCart();
                        }}
                        className="w-full bg-[#EAF4E6] text-primary font-bold py-3.5 px-4 rounded-full text-[1.5rem] flex items-center justify-center gap-2 border border-primary/20 cursor-pointer"
                    >
                        <Icon icon="solar:cart-large-4-bold" className="text-[2rem]" />
                        <span>View Booked Itinerary ({cartCount})</span>
                    </button>

                    <AppButton classes="w-full justify-center" href="/packages" onClick={() => setSidebarOpen(false)}>
                        Explore Packages
                    </AppButton>
                </div>
            </aside>
        </>
    );
};

export default Header;