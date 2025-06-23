"use client";
import React, { } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/constants/images";



const Footer = () => {

    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <Image height={100} width={100} src={LOGO} alt="Logo" />
                    <nav className="footer-nav">
                        <Link href="#about">About</Link>
                        <Link href="#benefits">Benefits</Link>
                        <Link href="#services">Services</Link>
                        <Link href="#impact">Impact</Link>
                        <Link href="#contact">Contact</Link>
                    </nav>
                </div>
            </footer>
        </>
    );
};

export default Footer;