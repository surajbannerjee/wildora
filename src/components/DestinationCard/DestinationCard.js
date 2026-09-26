"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";

const DestinationCard = ({
  id,
  name,
  country,
  image,
  slug,
  desc,
  badge,
  bestTime,
  startingPrice,
  packagesCount,
  sightings = [],
  rating = 4.9,
  reviews = 120,
}) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(image || "/assets/images/Bg1.webp");

  useEffect(() => {
    if (image) {
      setImgSrc(image);
    }
  }, [image]);

  const handleQuickBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: `dest-${slug || id}`,
        title: `${name} Wildlife Expedition`,
        image: imgSrc,
        location: country || "Global Sanctuary",
        price: Number(startingPrice) || 450,
        duration: "5 Days / 4 Nights",
        date: new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0],
        guests: 2,
        tier: "Standard Safari 4x4",
        type: "destination",
      },
      true
    );
  };

  return (
    <div className="package-card w-full h-full bg-white shadow-lg xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[2rem] p-[0.6rem] sm:p-[0.8rem] md:p-[0.5rem] overflow-hidden flex flex-col justify-between group/card hover:shadow-2xl transition-all duration-300">
      <div className="flex-1 flex flex-col">
        {/* Top Image Container */}
        <div className="relative w-full xl:h-[30rem] lg:h-[26rem] md:h-[24rem] sm:h-[24rem] h-[20rem] md:mb-[2rem] mb-[1.2rem] overflow-hidden xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[1.8rem] shrink-0 bg-[#EAF4E6]">
          {badge && (
            <span className="absolute top-[1.5rem] sm:top-[2rem] left-[1.5rem] sm:left-[2rem] bg-secondary text-white px-[1.2rem] sm:px-[1.5rem] py-[0.8rem] sm:py-[1rem] leading-[1] rounded-full md:text-[1.6rem] text-[1.3rem] sm:text-[1.4rem] font-semibold z-[2] shadow-md">
              {badge}
            </span>
          )}
          <Link
            href={`/destinations/${slug}`}
            className="block w-full h-full relative"
          >
            <img
              src={imgSrc}
              alt={name}
              onError={() => setImgSrc("/assets/images/Bg1.webp")}
              className="object-cover w-full h-full transition-transform duration-500 group-hover/card:scale-105"
            />
          </Link>
          {bestTime && (
            <span className="NewFont3 absolute bottom-[1.5rem] sm:bottom-[2rem] font-semibold right-[1.5rem] sm:right-[2rem] py-[0.6rem] sm:py-[0.8rem] px-[1.2rem] sm:px-[1.5rem] md:text-[1.6rem] text-[1.3rem] sm:text-[1.4rem] bg-white/95 backdrop-blur-md text-heading-color rounded-full leading-[1] z-[2] shadow-sm flex items-center gap-1.5">
              <Icon icon="mdi:calendar-clock" className="text-primary text-[1.5rem]" />
              <span>{bestTime}</span>
            </span>
          )}
        </div>

        {/* Card Body Content */}
        <div className="package-content flex-1 flex flex-col justify-between items-stretch xl:px-[2.2rem] md:px-[2.4rem] px-[1.4rem] sm:px-[1.6rem] md:pb-[1.5rem] pb-[1.2rem] md:gap-[1.4rem] gap-[1rem]">
          <div>
            <h3 className="md:text-[2.4rem] sm:text-[2.2rem] text-[1.9rem] headingText font-bold line-clamp-1 min-h-[3rem] text-heading-color flex items-center">
              <Link
                href={`/destinations/${slug}`}
                className="hover:text-primary transition-colors line-clamp-1"
              >
                {name}
              </Link>
            </h3>

            {/* Location & Tours/Reviews Row */}
            <div className="flex justify-start gap-[0.8rem] sm:gap-[1rem] sm:flex-row flex-col sm:items-center items-start pb-[1.4rem] md:pb-[1.6rem] mt-2 border-b border-gray-200">
              <div className="flex items-center gap-[0.5rem] flex-1">
                <Icon
                  icon="hugeicons:location-04"
                  className="text-primary text-[1.6rem] shrink-0"
                />
                <span className="text-gray-600 font-semibold md:text-[1.5rem] text-[1.3rem] sm:text-[1.4rem] leading-[1.2] mr-3 line-clamp-1">
                  {country}
                </span>
              </div>

              <div className="flex items-center gap-[0.5rem] shrink-0">
                <Icon
                  icon="line-md:star-filled"
                  className="text-secondary text-[1.6rem]"
                />
                <span className="text-gray-600 font-semibold md:text-[1.5rem] text-[1.3rem] sm:text-[1.4rem] leading-[1]">
                  {rating} ({packagesCount || 6} tours)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-[1.4rem] sm:text-[1.5rem] leading-[1.5] line-clamp-2 min-h-[4.4rem] mt-3">
              {desc}
            </p>

            {/* Wildlife Sightings Badges */}
            {sightings && sightings.length > 0 && (
              <div className="flex flex-wrap items-center gap-[0.6rem] pt-[1rem]">
                {sightings.slice(0, 3).map((animal, aIdx) => (
                  <span
                    key={aIdx}
                    className="bg-[#EAF4E6] text-heading-color text-[1.2rem] font-medium px-[1rem] py-[0.35rem] rounded-full inline-flex items-center gap-1"
                  >
                    <span>🐾</span>
                    <span>{animal}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="xl:px-[2.2rem] md:px-[2.4rem] px-[1.4rem] sm:px-[1.6rem] pb-[1.8rem] pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-gray-100 mt-auto">
        <div className="flex items-start flex-col NewFont3">
          <span className="price text-[2.2rem] sm:text-[2.4rem] font-bold text-primary leading-[1]">
            ${startingPrice}
            <span className="text-[1.2rem] leading-[1] text-gray-400 font-normal">
              {" "}
              / person
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickBook}
            type="button"
            className="bg-primary hover:bg-secondary text-white font-bold px-4 py-2.5 rounded-full text-[1.3rem] sm:text-[1.4rem] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            title="Book this destination"
          >
            <Icon icon="solar:cart-large-4-bold" className="text-[1.6rem]" />
            <span>Book</span>
          </button>

          <Link
            href={`/destinations/${slug}`}
            className="bg-transparent text-gray-700 hover:text-primary hover:bg-[#EAF4E6] border border-gray-300 hover:border-primary px-3.5 py-2.5 rounded-full text-[1.3rem] sm:text-[1.4rem] font-medium transition-all duration-300 flex items-center justify-center gap-1 shrink-0"
          >
            <span>Details</span>
            <Icon icon="formkit:arrowright" className="text-[1.2rem]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
