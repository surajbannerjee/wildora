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
    // const footerRef = useRef(null);
    // const [footerStyle, setFooterStyle] = React.useState({
    //     left: '0',
    //     right: '0',
    //     zIndex: '-1',
    //     position: 'fixed',
    //     bottom: 0,
    //     top: '',
    // });

    // React.useEffect(() => {
    //     const body = document.body;
    //     const mainElement = document.querySelector('main');
    //     const footerElement = footerRef.current;
    //     if (!mainElement || !footerElement) return;

    //     function isViewportSmallerThanFooter(footerElement) {
    //         return window.innerHeight < footerElement.offsetHeight;
    //     }
    //     function getBottomY(element) {
    //         return element.offsetTop + element.offsetHeight;
    //     }
    //     function updateParallaxFooter() {
    //         if (!footerElement || !mainElement) return;
    //         if (isViewportSmallerThanFooter(footerElement)) {
    //             // Reset bottom style in case user resized window
    //             setFooterStyle((prev) => ({
    //                 ...prev,
    //                 bottom: '',
    //                 top: 0,
    //             }));
    //         } else {
    //             // Reset top style in case user resized window
    //             setFooterStyle((prev) => ({
    //                 ...prev,
    //                 top: '',
    //                 bottom: 0,
    //             }));
    //         }
    //         if (window.scrollY > getBottomY(mainElement)) {
    //             setFooterStyle((prev) => ({
    //                 ...prev,
    //                 position: 'relative',
    //             }));
    //             body.style.marginBottom = '0px';
    //         } else {
    //             body.style.marginBottom = footerElement.offsetHeight + 'px';
    //             setFooterStyle((prev) => ({
    //                 ...prev,
    //                 position: 'fixed',
    //             }));
    //         }
    //     }
    //     updateParallaxFooter();
    //     window.addEventListener('resize', updateParallaxFooter);
    //     window.addEventListener('scroll', updateParallaxFooter);
    //     return () => {
    //         window.removeEventListener('resize', updateParallaxFooter);
    //         window.removeEventListener('scroll', updateParallaxFooter);
    //     };
    // }, []);

    return (
        <footer className="transition-all duration-500">
            <section className="relative bg-dark overflow-hidden sectionPadding pb-[3rem] rounded-[5rem_5rem_0_0] border-t-[0.5rem] border-secondary">
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
                                className="mb-4 xl:w-[28rem] h-auto object-contain"
                            />
                            <p className="text-white mb-4 text-[1.6rem] leading-[1.5]">
                                Wildora is your gateway to the world’s most beautiful destinations.
                                Explore, dream, and discover with us!
                            </p>
                            <h3 className="text-secondary font-semibold mb-4 text-[2.2rem]">Follow Us</h3>
                            <div className="flex gap-4 mt-2">
                                {socialLinks.map((s, i) => (
                                    <motion.a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white h-[4rem] w-[4rem] flex items-center justify-center border-2 border-white hover:border-secondary rounded-full text-[2rem] hover:text-secondary transition"
                                        whileHover={{ scale: 1.1 }}
                                        aria-label={s.icon}
                                    >
                                        <Icon icon={s.icon} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                        {/* Menu */}
                        <motion.div className="md:pl-[5rem] pl-0" custom={1} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2.2rem]">Quick Links</h3>
                            <ul className="space-y-[1.2rem]">
                                {headerMenus.map((menu) => (
                                    <li key={menu.name} className="relative group flex gap-[1rem]  items-center">
                                        <span className="group-hover:opacity-100 transition-opacity duration-200">
                                            <Icon icon="fa6-solid:angle-right" className="text-white group-hover:text-primary text-[1.8rem]" />
                                        </span>
                                        <Link
                                            href={menu.href}
                                            className="group-hover:pl-[0.5rem] text-white hover:text-primary font-semibold transition w-full block"
                                        >
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        {/* Best Destinations */}
                        <motion.div custom={2} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2.2rem]">
                                Popular Destinations
                            </h3>
                            <ul className="space-y-[1.2rem]">
                                {bestDestinations.map((dest) => (
                                    <li key={dest.name} className="relative group flex gap-[1rem] items-center">
                                        <span className="group-hover:opacity-100 transition-opacity duration-200">
                                            <Icon icon="fa6-solid:angle-right" className="text-white group-hover:text-primary text-[1.8rem]" />
                                        </span>
                                        <Link
                                            href={dest.href}
                                            className="group-hover:pl-[0.5rem] text-gray-300 hover:text-primary font-semibold transition w-full block"
                                        >
                                            {dest.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        {/* Contact/Newsletter */}
                        <motion.div custom={3} variants={boxVariants}>
                            <h3 className="text-secondary font-semibold mb-4 text-[2.2rem]">
                                Contact
                            </h3>
                            <ul className="mb-[2rem] space-y-[1.2rem]">
                                {contactDetails.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-[1.2rem] text-white text-[1.6rem] hover:text-secondary transition-all duration-300">
                                        <span className="h-[3rem] w-[3rem] flex items-center justify-center bg-secondary rounded-full text-white text-[1.6rem]">
                                            <Icon icon={item.icon} />
                                        </span>

                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition-all duration-300">
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span>{item.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <form className="rounded-full px-5 py-2 text-[1.6rem] bg-transparent text-white relative border-1 border-secondary">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="rounded-full pr-[4rem] pl-[1.5rem] w-full min-h-[4.2rem] text-[1.6rem] bg-transparent text-white focus:outline-none focus:ring-none focus:border-secondary"
                                />
                                <button
                                    type="submit"
                                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary text-white text-[2.62rem] rounded-full h-[4.2rem] w-[4.2rem] flex items-center justify-center hover:bg-primary transition hover:rotate-45"
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
                        className="md:mt-[8rem] mt-[3rem] border-t border-gray-400 pt-6 flex flex-col md:flex-row items-center justify-between text-white text-[1.4rem] gap-2"
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