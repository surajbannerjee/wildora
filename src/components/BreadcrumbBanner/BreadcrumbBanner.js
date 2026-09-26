"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const BreadcrumbBanner = ({
  backgroundImage,
  bgImage,
  image,
  src,
  breadcrumb = [],
  currentPage,
  title,
  subtitle = "Wildora Expeditions",
}) => {
  const finalImage = backgroundImage || bgImage || image || src || "/assets/images/Bg1.webp";

  // Normalize breadcrumb items into an array
  let items = [];
  if (Array.isArray(breadcrumb) && breadcrumb.length > 0) {
    items = breadcrumb.filter(
      (item) => typeof item !== "string" || item.toLowerCase() !== "home"
    );
  } else if (typeof breadcrumb === "string" && breadcrumb.trim()) {
    items = [breadcrumb];
  } else if (currentPage) {
    items = [currentPage];
  }

  return (
    <section className="breadcrumb-banner-section relative flex items-center justify-center min-h-[32rem] sm:min-h-[40rem] md:min-h-[48rem] w-full overflow-hidden bg-dark">
      {/* Background Image with Cinematic Zoom */}
      {finalImage && (
        <div className="absolute inset-0 w-full h-full scale-105 transition-transform duration-1000">
          <Image
            src={finalImage}
            alt={title || "Safari Expedition Banner"}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Multi-layered Cinematic Gradient & Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-black/40 to-black/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[1]" />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] sm:w-[50rem] h-[20rem] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-[1]" />

      {/* Content Container */}
      <div className="custom-container relative z-[2] flex flex-col gap-[1.6rem] sm:gap-[2.2rem] items-center justify-center w-full px-4 text-center pt-[5rem] sm:pt-[6rem]">
        {/* Category / Subtitle Badge */}
        {subtitle && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-secondary font-semibold text-[1.3rem] sm:text-[1.4rem] shadow-lg animate-fadein-up">
            <Icon icon="solar:compass-bold" className="text-primary text-[1.6rem]" />
            <span>{subtitle}</span>
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 className="text-white font-bold tracking-tight drop-shadow-2xl text-center max-w-[90rem]">
            {title}
          </h1>
        )}

        {/* Glassmorphic Breadcrumb Trail */}
        <nav className="inline-flex items-center flex-wrap justify-center gap-2 bg-black/40 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-full text-white text-[1.3rem] sm:text-[1.4rem] shadow-xl">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-300 hover:text-secondary transition-colors"
          >
            <Icon icon="solar:home-2-bold" className="text-primary text-[1.6rem]" />
            <span>Home</span>
          </Link>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <span key={idx} className="flex items-center gap-2">
                <Icon icon="solar:alt-arrow-right-bold" className="text-secondary text-[1.2rem] shrink-0" />
                <span className={isLast ? "text-secondary font-bold" : "text-gray-200 hover:text-white"}>
                  {item}
                </span>
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default BreadcrumbBanner;