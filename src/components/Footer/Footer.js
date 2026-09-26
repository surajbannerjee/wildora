"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FTR_VIDEO, LOGO } from "@/constants/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";

const headerMenus = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
];

const bestDestinations = [
    { name: "Serengeti", href: "/destinations/serengeti" },
    { name: "Maasai Mara", href: "/destinations/maasai-mara" },
    { name: "Kruger Park", href: "/destinations/kruger-park" },
    { name: "Okavango Delta", href: "/destinations/okavango-delta" },
];

const socialLinks = [
    { icon: "iconoir:facebook", href: "https://facebook.com" },
    { icon: "iconoir:instagram", href: "https://instagram.com" },
    { icon: "pajamas:twitter", href: "https://twitter.com" },
    { icon: "iconoir:youtube", href: "https://youtube.com" },
];

const contactDetails = [
    {
        icon: "mdi:phone",
        label: "+1 234 567 890",
        href: "tel:+1234567890",
    },
    {
        icon: "mdi:email",
        label: "info@wildora.com",
        href: "mailto:info@wildora.com",
    },
    {
        icon: "mdi:map-marker",
        label: "123 Safari Ave, Nairobi, Kenya",
        href: "https://maps.google.com/?q=123+Safari+Ave,+Nairobi,+Kenya",
    },
];

const boxVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.18, duration: 0.7, type: "spring" },
    }),
};

const Footer = () => {


    return (
        <footer className="transition-all duration-500">
            <section className="relative bg-dark overflow-hidden sectionPadding pb-[3rem] rounded-[3rem_3rem_0_0] sm:rounded-[5rem_5rem_0_0] border-t-[0.5rem] border-secondary">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover z-[0]"
                    src={FTR_VIDEO}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 z-[1]" />
                {/* Footer Content */}
                <div className="custom-container relative z-[2]">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Logo/About/Social */}
                        <motion.div
                            custom={0}
                            variants={boxVariants}
                            className="flex flex-col items-start"
                        >
                            <Image
                                src={LOGO}
                                alt="Logo"
                                width={250}
                                height={100}
                                className="mb-4 w-[20rem] sm:w-[24rem] xl:w-[28rem] h-auto object-contain"
                            />
                            <p className="text-white mb-4 text-[1.4rem] sm:text-[1.6rem] leading-[1.5]">
                                Wildora is your gateway to the world’s most beautiful destinations.
                                Explore, dream, and discover with us!
                            </p>
                            <h3 className="text-secondary font-semibold mb-4 text-[2rem] sm:text-[2.2rem]">Follow Us</h3>
                            <div className="flex gap-4 mt-2">
                                {socialLinks.map((s, i) => (
                                    <motion.a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white h-[3.8rem] w-[3.8rem] sm:h-[4rem] sm:w-[4rem] flex items-center justify-center border-2 border-white hover:border-secondary rounded-full text-[1.8rem] sm:text-[2rem] hover:text-secondary transition"
                                        whileHover={{ scale: 1.1 }}
                                        aria-label={s.icon}
                                    >
                                        <Icon icon={s.icon} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                        {/* Menu */}
                        <motion.div className="md:pl-[3rem] lg:pl-[5rem] pl-0" custom={1} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2rem] sm:text-[2.2rem]">Quick Links</h3>
                            <ul className="space-y-[1.2rem]">
                                {headerMenus.map((menu) => (
                                    <li key={menu.name} className="relative group flex gap-[1rem] items-center">
                                        <span className="group-hover:opacity-100 transition-all duration-200">
                                            <Icon icon="fa6-solid:angle-right" className="text-white group-hover:text-primary text-[1.6rem] sm:text-[1.8rem]" />
                                        </span>
                                        <Link
                                            href={menu.href}
                                            className="group-hover:pl-[0.5rem] text-white hover:text-primary text-[1.4rem] sm:text-[1.6rem] font-semibold transition-all w-full block"
                                        >
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        {/* Best Destinations */}
                        <motion.div custom={2} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2rem] sm:text-[2.2rem]">
                                Popular Destinations
                            </h3>
                            <ul className="space-y-[1.2rem]">
                                {bestDestinations.map((dest) => (
                                    <li key={dest.name} className="relative group flex gap-[1rem] items-center">
                                        <span className="group-hover:opacity-100 transition-all duration-200">
                                            <Icon icon="fa6-solid:angle-right" className="text-white group-hover:text-primary text-[1.6rem] sm:text-[1.8rem]" />
                                        </span>
                                        <Link
                                            href={dest.href}
                                            className="group-hover:pl-[0.5rem] text-gray-300 hover:text-primary text-[1.4rem] sm:text-[1.6rem] font-semibold transition-all w-full block"
                                        >
                                            {dest.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        {/* Contact/Newsletter */}
                        <motion.div custom={3} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2rem] sm:text-[2.2rem]">
                                Contact
                            </h3>
                            <ul className="mb-[2rem] space-y-[1.2rem]">
                                {contactDetails.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-[1.2rem] text-white text-[1.4rem] sm:text-[1.6rem] hover:text-secondary transition-all duration-300">
                                        <span className="h-[3rem] w-[3rem] flex items-center justify-center bg-secondary rounded-full text-white text-[1.4rem] sm:text-[1.6rem] shrink-0">
                                            <Icon icon={item.icon} />
                                        </span>

                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition-all duration-300 break-all">
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span>{item.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <form className="rounded-full px-4 text-[1.4rem] sm:text-[1.6rem] bg-transparent text-white relative border border-secondary flex items-center min-h-[4.8rem] h-[4.8rem]">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="rounded-full pr-[4.5rem] pl-[1rem] w-full min-h-[4.8rem] h-[4.8rem] text-[1.4rem] sm:text-[1.6rem] bg-transparent text-white focus:outline-none border-none"
                                />
                                <button
                                    type="submit"
                                    className="cursor-pointer absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-secondary text-white text-[2.2rem] rounded-full h-[3.8rem] w-[3.8rem] flex items-center justify-center hover:bg-primary transition-all hover:rotate-45 shrink-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert("Thank you for subscribing!");
                                    }}
                                >
                                    <Icon icon="prime:arrow-up-right" />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                    {/* Bottom Bar */}
                    <motion.div
                        className="md:mt-[8rem] sm:mt-[5rem] mt-[3rem] border-t border-gray-400/50 pt-6 flex flex-col sm:flex-row items-center justify-between text-white text-[1.3rem] sm:text-[1.4rem] gap-3 text-center sm:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
                    >
                        <span>
                            &copy; {new Date().getFullYear()} Wildora. All rights reserved.
                        </span>
                        <div className="flex gap-4">
                            <Link href="/terms" className="hover:text-secondary transition">
                                Terms
                            </Link>
                            <Link href="/privacy" className="hover:text-secondary transition">
                                Privacy
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;