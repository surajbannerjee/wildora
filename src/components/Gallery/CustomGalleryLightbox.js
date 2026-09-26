"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CustomGalleryLightbox
 * Luxury Wildlife Gallery Lightbox Slider styled to match the Wildora primary theme.
 * High-visibility sizing, rich typography, smooth animations, and interactive controls.
 */
export default function CustomGalleryLightbox({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  setCurrentIndex,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMetadata, setShowMetadata] = useState(true);
  const thumbnailsRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = items.length;
  const currentItem = items[currentIndex] || items[0];

  // Next / Previous navigation with loop
  const handleNext = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, setCurrentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Autoplay Slideshow Timer
  useEffect(() => {
    let interval;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, handleNext]);

  // Auto scroll thumbnail rail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeEl = thumbnailsRef.current.children[currentIndex];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsPlaying(false);
      setZoomLevel(1);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : prev === 1.6 ? 2.2 : 1));
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0c1711]/95 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-primary/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-secondary/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 1. Top Utility Header Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 sm:px-12 py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Left: Category Badge & Index Counter */}
        <div className="flex items-center gap-4">
          <span className="bg-primary text-white text-[1.4rem] sm:text-[1.6rem] font-bold px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <Icon icon="solar:camera-bold" className="text-[1.8rem]" />
            <span>{currentItem.category || "Wildora"}</span>
          </span>

          <span className="text-white font-mono text-[1.4rem] sm:text-[1.6rem] bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-md">
            <strong className="text-secondary font-bold">{currentIndex + 1}</strong> / {total}
          </span>
        </div>

        {/* Center: Title & Location Pill (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center text-center max-w-[50rem]">
          <span className="text-white font-bold text-[2rem] sm:text-[2.2rem] tracking-tight line-clamp-1 drop-shadow-md">
            {currentItem.title}
          </span>
          <span className="text-secondary text-[1.4rem] sm:text-[1.5rem] font-medium flex items-center gap-1.5 mt-0.5">
            <Icon icon="hugeicons:location-04" className="text-primary text-[1.6rem]" />
            {currentItem.location}
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Slideshow Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`min-w-[4.8rem] min-h-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-full flex items-center justify-center text-[2.2rem] transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
              isPlaying
                ? "bg-secondary text-white ring-4 ring-secondary/30 animate-pulse"
                : "bg-white/15 text-white hover:bg-primary hover:text-white border border-white/20 backdrop-blur-md"
            }`}
            title={isPlaying ? "Pause Slideshow (Space)" : "Play Slideshow (Space)"}
          >
            <Icon icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} />
          </button>

          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={toggleZoom}
            className={`min-w-[4.8rem] min-h-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-full flex items-center justify-center text-[2.2rem] transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
              zoomLevel > 1
                ? "bg-primary text-white ring-4 ring-primary/30"
                : "bg-white/15 text-white hover:bg-primary hover:text-white border border-white/20 backdrop-blur-md"
            }`}
            title={`Zoom (${zoomLevel}x)`}
          >
            <Icon icon={zoomLevel > 1 ? "solar:magnifer-zoom-out-bold" : "solar:magnifer-zoom-in-bold"} />
          </button>

          {/* Toggle Metadata Drawer */}
          <button
            type="button"
            onClick={() => setShowMetadata(!showMetadata)}
            className={`min-w-[4.8rem] min-h-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-full flex items-center justify-center text-[2.2rem] transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
              showMetadata
                ? "bg-white/30 text-white"
                : "bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20 backdrop-blur-md"
            }`}
            title="Toggle Info"
          >
            <Icon icon="solar:info-circle-bold" />
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="min-w-[4.8rem] min-h-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-full bg-white/20 hover:bg-red-600 text-white flex items-center justify-center text-[2.4rem] transition-all duration-300 cursor-pointer border border-white/25 backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg"
            title="Close (Esc)"
          >
            <Icon icon="material-symbols:close-rounded" />
          </button>
        </div>
      </div>

      {/* 2. Main Center Stage with Large Floating Navigation Arrows */}
      <div className="relative flex-1 flex items-center justify-center w-full h-full px-4 sm:px-16 overflow-hidden">
        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-10 z-30 min-w-[5.8rem] min-h-[5.8rem] w-[5.8rem] h-[5.8rem] sm:w-[6.4rem] sm:h-[6.4rem] rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center text-[2.8rem] sm:text-[3.2rem] backdrop-blur-xl border border-white/25 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90 cursor-pointer"
          title="Previous (Left Arrow)"
        >
          <Icon icon="solar:alt-arrow-left-bold" />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-10 z-30 min-w-[5.8rem] min-h-[5.8rem] w-[5.8rem] h-[5.8rem] sm:w-[6.4rem] sm:h-[6.4rem] rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center text-[2.8rem] sm:text-[3.2rem] backdrop-blur-xl border border-white/25 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90 cursor-pointer"
          title="Next (Right Arrow)"
        >
          <Icon icon="solar:alt-arrow-right-bold" />
        </button>

        {/* Active Photographic Display */}
        <div className="relative w-full h-full max-h-[62vh] sm:max-h-[66vh] flex items-center justify-center p-2 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: zoomLevel }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ cursor: zoomLevel > 1 ? "zoom-out" : "zoom-in" }}
              onClick={toggleZoom}
            >
              <Image
                src={currentItem.image}
                alt={currentItem.title || "Wildora Wildlife Expedition Photo"}
                fill
                priority
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-[2rem] sm:rounded-[3rem]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Bottom Strip: Photographic Metadata Card + Thumbnail Filmstrip Rail */}
      <div className="relative z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-4 pb-6 sm:pb-8 px-6 sm:px-12 flex flex-col gap-4">
        {/* Info & Metadata Drawer */}
        {showMetadata && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-[#14261c]/90 backdrop-blur-2xl border border-white/20 rounded-[2.4rem] p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-[1280px] w-full mx-auto shadow-2xl"
          >
            {/* Title & Location */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <span className="bg-secondary text-white text-[1.3rem] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  {currentItem.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-200 text-[1.5rem] sm:text-[1.6rem] flex items-center gap-1.5 font-medium">
                  <Icon icon="hugeicons:location-04" className="text-primary text-[1.8rem]" />
                  {currentItem.location}
                </span>
              </div>
              <h3 className="text-[2.2rem] sm:text-[2.8rem] font-bold text-white tracking-tight m-0 drop-shadow-sm">
                {currentItem.title}
              </h3>
            </div>

            {/* Camera Gear & Photographer Credits */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {currentItem.camera && (
                <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/15 text-[1.3rem] sm:text-[1.4rem] font-mono text-gray-200 shadow-sm">
                  <Icon icon="solar:camera-minimalistic-bold" className="text-primary text-[1.8rem] shrink-0" />
                  <span>{currentItem.camera}</span>
                </div>
              )}
              {currentItem.photographer && (
                <div className="flex items-center gap-2 bg-[#EAF4E6] text-[#14261c] px-5 py-2.5 rounded-full text-[1.3rem] sm:text-[1.4rem] font-bold shadow-md">
                  <Icon icon="solar:user-bold" className="text-primary text-[1.8rem] shrink-0" />
                  <span>By {currentItem.photographer}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Thumbnail Filmstrip Rail */}
        <div
          ref={thumbnailsRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto py-2 px-2 max-w-[1280px] w-full mx-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white/10"
          style={{ scrollbarWidth: "thin" }}
        >
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                className={`relative shrink-0 w-[8rem] h-[5.5rem] sm:w-[11rem] sm:h-[7.2rem] rounded-[1.4rem] overflow-hidden transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "ring-4 ring-primary scale-110 shadow-2xl border-2 border-white"
                    : "opacity-40 hover:opacity-100 hover:scale-105 border border-white/20"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title || `Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
