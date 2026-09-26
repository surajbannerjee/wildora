"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import AnimalsSlider from "@/components/HomeComponents/AnimalsSlider/AnimalsSlider";
import {
  HERO_IMAGE1,
  HERO_IMAGE2,
  HERO_IMAGE3,
  HERO_IMAGE4,
  HERO_IMAGE6,
  HERO_IMAGE7,
  HERO_IMAGE8,
  HERO_IMAGE9,
  HERO_IMAGE10,
  HERO_IMAGE11,
  HERO_IMAGE12,
  HERO_IMAGE13,
  HERO_IMAGE14,
  HERO_IMAGE15,
  HERO_IMAGE16,
  RHINO_KAZIRANGA,
  SNOW_LEOPARD,
  SERENGETI_MIGRATION,
  TIGER_BANDHAVGARH,
  CHEETAH_SAVANNAH,
} from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import { AppButton } from "@/components/Button";
import CustomGalleryLightbox from "@/components/Gallery/CustomGalleryLightbox";

const galleryItems = [
  {
    id: 1,
    title: "Great Wildebeest Mara River Crossing",
    location: "Serengeti National Park, Tanzania",
    category: "Safari Action",
    image: SERENGETI_MIGRATION,
    camera: "Sony A1 • 70-200mm f/2.8 GM II",
    photographer: "Marcus Vance",
  },
  {
    id: 2,
    title: "Royal Bengal Tiger Prowl in Sal Forest",
    location: "Bandhavgarh National Park, India",
    category: "Big Cats",
    image: TIGER_BANDHAVGARH,
    camera: "Canon R5 • 400mm f/2.8L IS",
    photographer: "Priya Sharma",
  },
  {
    id: 3,
    title: "Great Indian One-Horned Rhino in Morning Mist",
    location: "Kaziranga National Park, India",
    category: "Wilderness",
    image: RHINO_KAZIRANGA,
    camera: "Nikon Z9 • 600mm f/4 TC VR",
    photographer: "Anita Roy",
  },
  {
    id: 4,
    title: "Himalayan Snow Leopard on Cliff Ridge",
    location: "Hemis National Park, Ladakh",
    category: "Big Cats",
    image: SNOW_LEOPARD,
    camera: "Sony A1 • 600mm f/4 GM",
    photographer: "Tenzing Norgay",
  },
  {
    id: 5,
    title: "African Cheetah Scanning Savannah Horizon",
    location: "Maasai Mara, Kenya",
    category: "Big Cats",
    image: CHEETAH_SAVANNAH,
    camera: "Canon 1D X Mark III • 300mm f/2.8",
    photographer: "Tom Becker",
  },
  {
    id: 6,
    title: "Sunrise Lion Pride on Patrol",
    location: "Masai Mara, Kenya",
    category: "Big Cats",
    image: HERO_IMAGE6,
    camera: "Sony A7R V • 400mm f/2.8",
    photographer: "David K.",
  },
  {
    id: 7,
    title: "African Elephant Herd at Dusk",
    location: "Amboseli National Park, Kenya",
    category: "Safari Action",
    image: HERO_IMAGE3,
    camera: "Nikon Z8 • 70-200mm f/2.8",
    photographer: "Elena Rostova",
  },
  {
    id: 8,
    title: "Pure Asiatic Lion in Gir Forest Ravine",
    location: "Gir National Park, Gujarat",
    category: "Big Cats",
    image: HERO_IMAGE10,
    camera: "Sony A7R V • 200-600mm G",
    photographer: "Suraj Banerjee",
  },
  {
    id: 9,
    title: "Great Hornbill in Misty Rainforest Canopy",
    location: "Western Ghats, India",
    category: "Exotic Birds",
    image: HERO_IMAGE12,
    camera: "Canon R6 • 800mm f/5.6",
    photographer: "Liam Chen",
  },
  {
    id: 10,
    title: "Luxury Tented Eco-Camp Under Starlight",
    location: "Serengeti Reserve, Tanzania",
    category: "Jungle Lodges",
    image: HERO_IMAGE4,
    camera: "Sony A7S III • 24mm f/1.4 GM",
    photographer: "Elena Rostova",
  },
  {
    id: 11,
    title: "Estuarine Crocodile in Tidal Mangroves",
    location: "Sundarbans Delta, India",
    category: "Wilderness",
    image: HERO_IMAGE7,
    camera: "Nikon Z8 • 500mm f/5.6 PF",
    photographer: "Rajat Sen",
  },
  {
    id: 12,
    title: "Painted Storks in Wetland Breeding Colony",
    location: "Keoladeo Bird Sanctuary, India",
    category: "Exotic Birds",
    image: HERO_IMAGE16,
    camera: "Canon R5 • 100-500mm IS",
    photographer: "Sarah Jenkins",
  },
  {
    id: 13,
    title: "African Leopard Resting on Baobab Tree",
    location: "Kruger National Park, South Africa",
    category: "Big Cats",
    image: HERO_IMAGE1,
    camera: "Sony A1 • 600mm f/4 GM",
    photographer: "Marcus Vance",
  },
  {
    id: 14,
    title: "Morning Safari 4x4 Cruiser Expedition",
    location: "Tarangire National Park, Tanzania",
    category: "Safari Action",
    image: HERO_IMAGE2,
    camera: "Canon R5 • 24-70mm f/2.8L",
    photographer: "Tom Becker",
  },
  {
    id: 15,
    title: "Mountain Gorilla Silverback in Rainforest Mist",
    location: "Bwindi Impenetrable National Park, Uganda",
    category: "Wilderness",
    image: "/assets/images/destinations/bwindi-gorilla-reserve.jpg",
    camera: "Sony A7R V • 70-200mm f/2.8",
    photographer: "Jean-Pierre Mugisha",
  },
  {
    id: 16,
    title: "Svalbard Polar Bear Mother and Cub on Ice Floe",
    location: "Svalbard Archipelago, Norway",
    category: "Wilderness",
    image: "/assets/images/destinations/svalbard-polar-bear-arctic.jpg",
    camera: "Nikon Z9 • 400mm f/2.8 TC",
    photographer: "Erik Lindqvist",
  },
  {
    id: 17,
    title: "Whale Shark Gliding Along Coral Reef",
    location: "Ningaloo Marine Park, Australia",
    category: "Wilderness",
    image: "/assets/images/destinations/ningaloo-marine-park.jpg",
    camera: "Canon R5 Underwater Housing",
    photographer: "Chloe Martin",
  },
  {
    id: 18,
    title: "Luxury Eco-Treehouse Lodge Above Canopy",
    location: "Kabini Forest Reserve, India",
    category: "Jungle Lodges",
    image: HERO_IMAGE8,
    camera: "Sony A7S III • 16-35mm f/2.8",
    photographer: "Priya Sharma",
  },
];

const categories = [
  { name: "All", icon: "solar:compass-bold" },
  { name: "Big Cats", icon: "solar:cat-bold" },
  { name: "Safari Action", icon: "solar:running-bold" },
  { name: "Exotic Birds", icon: "solar:water-sun-bold" },
  { name: "Jungle Lodges", icon: "solar:home-2-bold" },
  { name: "Wilderness", icon: "solar:leaf-bold" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="gallery-page">
      <BreadcrumbBanner
        backgroundImage={HERO_IMAGE6}
        breadcrumb={["Home", "Gallery"]}
        title="Wildlife Moments in the Wild"
        subtitle="Lens on the Wild"
      />

      {/* Gallery Section */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Visual Chronicles
            </span>
            <h2 className="text-heading-color font-semibold">
              Untamed Beauty <span className="text-secondary">Through the Lens</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color max-w-[75rem]">
              A curated photographic celebration of unforgettable predator encounters, rare avian migrations, and serene eco-sanctuaries captured on our expeditions.
            </p>
          </AnimeFadeIn>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-[1rem] flex-wrap justify-center">
            {categories.map((cat, idx) => {
              const catName = typeof cat === "string" ? cat : cat.name;
              const catIcon = typeof cat === "object" ? cat.icon : "solar:compass-bold";
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(catName);
                    setLightboxIndex(0);
                  }}
                  className={`px-[2rem] py-[1rem] rounded-full text-[1.4rem] sm:text-[1.5rem] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${activeCategory === catName
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-[#EAF4E6] text-heading-color hover:bg-primary/20"
                    }`}
                >
                  <Icon icon={catIcon} className="text-[1.6rem]" />
                  <span>{catName}</span>
                </button>
              );
            })}
          </div>

          {/* Photographic Grid */}
          <AnimeStaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] sm:gap-[3rem] w-full">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-[2.2rem] overflow-hidden bg-dark aspect-[4/3] shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2 h-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-[2rem] sm:p-[2.5rem]">
                  <div className="flex justify-between items-center">
                    <span className="bg-secondary text-white text-[1.2rem] font-semibold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                    <span className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-[1.8rem] shadow-lg group-hover:scale-110 transition-transform">
                      <Icon icon="solar:magnifer-zoom-in-bold" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-white">
                    <span className="text-[1.8rem] font-bold">{item.title}</span>
                    <span className="text-gray-300 text-[1.3rem] flex items-center gap-1">
                      <Icon icon="hugeicons:location-04" className="text-primary text-[1.4rem]" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </AnimeStaggerList>
        </div>
      </section>

      {/* Luxury Gallery Lightbox Slider */}
      <CustomGalleryLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />

    </div>
  );
};

export default GalleryPage;
