"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { destinationsData } from "@/constants/destinationsData";
import { HERO_IMAGE11, HERO_IMAGE6 } from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import { AppButton } from "@/components/Button";
import { DestinationGridSkeleton } from "@/components/Skeleton/SkeletonLoaders";
import DestinationCard from "@/components/DestinationCard/DestinationCard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const categories = [
  "All",
  "African Savannahs",
  "Indian Jungles",
  "Sri Lankan Sanctuaries",
  "Wetlands & Rainforests",
  "Polar & Arctic Tundras",
  "Island & Marine Reserves",
  "Mountain & High Altitude",
];

const ITEMS_PER_PAGE = 12;

const DestinationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  useEffect(() => {
    setCurrentPage(1);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        (item.sightings && item.sightings.some((s) => s.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE) || 1;
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDestinations, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setIsLoading(true);
      window.scrollTo({ top: 400, behavior: "smooth" });
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  const handleQuickBookDestination = (e, dest) => {
    e.preventDefault();
    e.stopPropagation();

    const doAdd = () => {
      addToCart({
        id: `dest-${dest.slug}`,
        title: `${dest.name} Safari Expedition`,
        slug: dest.slug,
        image: dest.image,
        location: `${dest.country}, ${dest.region}`,
        price: dest.startingPrice,
        duration: "4 Days / 3 Nights",
        date: new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0],
        guests: 2,
        tier: "Standard Safari 4x4",
        type: "destination",
      }, true);
    };

    if (!isLoggedIn) {
      openAuthModal("login", doAdd);
      return;
    }
    doAdd();
  };

  return (
    <div className="destinations-page">
      <BreadcrumbBanner
        backgroundImage={HERO_IMAGE11}
        breadcrumb={["Home", "Destinations"]}
        title="Iconic Safari Destinations"
        subtitle="Protected Sanctuaries & Reserves"
      />


      {/* Intro & Filter Section */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Where Adventures Come Alive
            </span>
            <h2 className="text-heading-color font-semibold">
              Explore Our <span className="text-secondary">Protected Sanctuaries</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color max-w-[75rem]">
              From the great wildebeest migration across the Serengeti to the royal tiger trails of Bandhavgarh, discover nature's greatest sanctuaries curated with sustainable luxury.
            </p>
          </AnimeFadeIn>

          {/* Controls (Search & Category Tabs) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-[2rem] w-full">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-[1rem] flex-wrap justify-center md:justify-start">
              {categories.map((cat, idx) => {
                const catIcons = {
                  "All": "solar:compass-bold",
                  "African Savannahs": "solar:cat-bold",
                  "Indian Jungles": "solar:paw-bold",
                  "Sri Lankan Sanctuaries": "solar:crown-bold",
                  "Wetlands & Rainforests": "solar:water-sun-bold",
                  "Polar & Arctic Tundras": "solar:snowflake-bold",
                  "Island & Marine Reserves": "solar:droplet-bold",
                  "Mountain & High Altitude": "solar:mountains-bold",
                };
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsLoading(true);
                    }}
                    className={`px-[1.8rem] py-[0.9rem] rounded-full text-[1.4rem] sm:text-[1.5rem] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      selectedCategory === cat
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-[#EAF4E6] text-heading-color hover:bg-primary/20"
                    }`}
                  >
                    <Icon icon={catIcons[cat] || "solar:paw-bold"} className="text-[1.6rem]" />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Total Count */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-[32rem]">
                <Icon
                  icon="lets-icons:search"
                  className="absolute left-[1.6rem] top-1/2 -translate-y-1/2 text-gray-400 text-[2rem]"
                />
                <input
                  type="text"
                  placeholder="Search 100+ sanctuaries or animals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[4.8rem] h-[4.8rem] pl-[4.8rem] pr-[1.6rem] rounded-full bg-[#EAF4E6] text-heading-color placeholder-gray-500 text-[1.4rem] sm:text-[1.5rem] border border-transparent focus:border-primary focus:bg-white transition-all outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Results Counter Bar */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100">
            <span className="text-[1.4rem] sm:text-[1.5rem] font-medium text-heading-color">
              Showing{" "}
              <strong className="text-primary">
                {filteredDestinations.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                –{Math.min(currentPage * ITEMS_PER_PAGE, filteredDestinations.length)}
              </strong>{" "}
              of <strong className="text-heading-color">{filteredDestinations.length}</strong> Protected Sanctuaries
            </span>
            {selectedCategory !== "All" && (
              <span className="text-[1.3rem] text-primary font-semibold bg-[#EAF4E6] px-3 py-1 rounded-full">
                Filter: {selectedCategory}
              </span>
            )}
          </div>

          {/* Destination Cards Grid or Skeleton Loader */}
          {isLoading ? (
            <DestinationGridSkeleton count={6} />
          ) : (
            <AnimeStaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] w-full">
              {paginatedDestinations.map((dest) => (
                <DestinationCard key={dest.id} {...dest} />
              ))}
            </AnimeStaggerList>
          )}

          {/* Pagination Bar */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-8 pb-4 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2.5 rounded-full border border-gray-200 text-[1.4rem] font-semibold text-heading-color hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1"
              >
                <Icon icon="solar:alt-arrow-left-bold" className="text-[1.8rem]" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                // Show first, last, current, and surrounding pages
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-[4.2rem] min-w-[4.2rem] px-3 rounded-full text-[1.4rem] sm:text-[1.5rem] font-bold transition cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-primary text-white shadow-md scale-105"
                          : "bg-[#EAF4E6] text-heading-color hover:bg-primary/20"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 3 ||
                  pageNum === currentPage + 3
                ) {
                  return (
                    <span key={pageNum} className="text-gray-400 px-1 text-[1.6rem]">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2.5 rounded-full border border-gray-200 text-[1.4rem] font-semibold text-heading-color hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <Icon icon="solar:alt-arrow-right-bold" className="text-[1.8rem]" />
              </button>
            </div>
          )}

          {!isLoading && filteredDestinations.length === 0 && (
            <div className="text-center py-[8rem] flex flex-col items-center gap-[1.5rem]">
              <Icon icon="solar:sad-circle-broken" className="text-primary text-[6rem]" />
              <h3 className="text-[2.4rem] font-semibold text-heading-color">No Destinations Found</h3>
              <p className="text-text-color text-[1.6rem]">Try adjusting your search terms or filter category.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-3 rounded-full bg-primary text-white font-semibold text-[1.5rem]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Spotlight: Serengeti Deep Dive */}
      <section className="w-full bg-gradient-to-br from-primary/20 to-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col lg:flex-row items-center justify-between gap-[4rem] relative z-10">
          <AnimeFadeIn className="lg:w-1/2 flex flex-col gap-[2rem] items-start">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Destination Spotlight
            </span>
            <h2 className="text-dark font-semibold">
              The Grand Serengeti <span className="text-secondary">Migration Trail</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color leading-[1.6]">
              Every year, over two million wildebeest, zebras, and gazelles traverse the Serengeti eco-system in a thunderous trek across crocodile-rich rivers and predator valleys. Experience this timeless natural epic in our luxury 4x4 open-roof mobile camps.
            </p>
            <div className="grid grid-cols-2 gap-[2rem] w-full pt-2">
              <div className="border-l-2 border-primary pl-4">
                <span className="text-secondary font-bold text-[2rem]">Over 2M</span>
                <p className="text-text-color text-[1.4rem]">Migrating herbivores annually</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <span className="text-secondary font-bold text-[2rem]">3,000+</span>
                <p className="text-text-color text-[1.4rem]">Asiatic & African Lions tracked</p>
              </div>
            </div>
            <AppButton href="/packages" classes="mt-[1.5rem]">
              Explore Migration Packages
            </AppButton>
          </AnimeFadeIn>

          <AnimeFadeIn type="scaleUp" className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-[50rem] h-[34rem] sm:h-[40rem] rounded-[2.8rem] overflow-hidden shadow-2xl border-2 border-white/10">
              <Image
                src={HERO_IMAGE6}
                alt="Serengeti Safari"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-[2.5rem]">
                <span className="text-white font-bold text-[2.2rem]">Serengeti National Park</span>
                <span className="text-secondary text-[1.4rem]">Tanzania • UNESCO World Heritage</span>
              </div>
            </div>
          </AnimeFadeIn>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
