"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { destinationsData } from "@/constants/destinationsData";
import packages from "@/components/HomeComponents/PopularPackages/packagesArray";
import { AppButton } from "@/components/Button";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import PackageCard from "@/components/PackageCard/PackageCard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import StickyBookingBox from "@/components/Booking/StickyBookingBox";

const safariTiers = [
  { name: "Standard 4x4 Gypsy", surcharge: 0, desc: "Classic open-top 6-seater safari vehicle with government naturalist.", icon: "solar:bus-bold" },
  { name: "Luxury Panoramic Cruiser", surcharge: 65, desc: "Custom suspension 4-seater with camera beanbag mounts & cool box.", icon: "solar:crown-bold" },
  { name: "Private VIP Biologist Escort", surcharge: 140, desc: "Exclusive private vehicle with Senior Wildlife Biologist & night thermal gear.", icon: "solar:shield-star-bold" },
];

const itineraryDays = [
  {
    day: "Day 01",
    title: "Arrival, Lodge Welcome & Sunset Buffer Drive",
    desc: "Arrive at the luxury jungle lodge for a traditional welcome high tea. Briefing with our expedition director followed by an introductory sunset game drive across buffer forest edges to spot nocturnal owls, civets, and deer herds.",
    time: "3:30 PM – 6:30 PM",
  },
  {
    day: "Day 02",
    title: "Deep Core Zone Predator Tracking (Morning & Afternoon)",
    desc: "Pre-dawn tea and enter the deep core reserve at first light. Follow fresh pugmarks and listen to langur alarm calls to track apex predators during their active morning hunt. Afternoon drive targeting hidden waterholes.",
    time: "6:00 AM – 10:30 AM & 3:00 PM – 6:00 PM",
  },
  {
    day: "Day 03",
    title: "Wetland Avian Cruise & Walking Nature Trail",
    desc: "Boat or walking safari through protected wetlands and riverine corridors. Discover migratory waterfowl, marsh crocodiles, and rare endemic flora accompanied by our tribal botanist.",
    time: "7:00 AM – 11:00 AM",
  },
  {
    day: "Day 04",
    title: "Final Sunrise Safari & Departure",
    desc: "One last thrilling morning game drive across the mist-shrouded grasslands. Enjoy a bush breakfast in the wild before checking out with unforgettable memories and wildlife photographs.",
    time: "6:00 AM – 9:30 AM",
  },
];

const wildlifeSightings = [
  { name: "Bengal Tiger / Big Cats", chance: "95%", season: "Nov – May", icon: "solar:cat-bold" },
  { name: "Asian Elephant Herds", chance: "90%", season: "Year-round", icon: "solar:compass-bold" },
  { name: "Indian Leopard", chance: "82%", season: "Oct – Jun", icon: "solar:eye-bold" },
  { name: "Sloth Bear & Honey Badgers", chance: "75%", season: "Dec – May", icon: "solar:paw-bold" },
  { name: "300+ Avian & Raptor Species", chance: "98%", season: "Nov – Feb", icon: "solar:cloud-sun-bold" },
];

export default function TourDetailPage({ forcedSlug }) {
  const params = useParams();
  const router = useRouter();
  const rawSlug = forcedSlug || params?.slug || "";
  const cleanSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const { addToCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  // 1. Find in packagesArray
  const pkgMatch = packages.find(
    (p) =>
      p.slug === cleanSlug ||
      p.link === `/${cleanSlug}` ||
      p.link === `/packages/${cleanSlug}` ||
      p.link === cleanSlug ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanSlug
  );

  // 2. Find in destinationsData
  const destMatch = destinationsData.find(
    (d) =>
      d.slug === cleanSlug ||
      `destinations/${d.slug}` === cleanSlug ||
      `/destinations/${d.slug}` === cleanSlug ||
      d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanSlug
  );

  // Normalize Tour Item
  const tour = pkgMatch
    ? {
      id: pkgMatch.id,
      name: pkgMatch.title,
      tagline: `${pkgMatch.title} — ${pkgMatch.location}`,
      desc: `${pkgMatch.desc} Experience the ultimate wild encounters with dedicated 4x4 open safari jeeps, certified government naturalists, and luxury jungle lodge stays.`,
      image: pkgMatch.image,
      location: pkgMatch.location,
      country: pkgMatch.location.split(",").pop()?.trim() || "Global",
      region: pkgMatch.location.split(",")[0]?.trim() || "Wilderness Reserve",
      badge: pkgMatch.feature || "Featured Expedition",
      startingPrice: parseInt(pkgMatch.price, 10) || 450,
      duration: pkgMatch.duration || "4 Days / 3 Nights",
      rating: pkgMatch.rating || 4.9,
      reviews: pkgMatch.reviews || 210,
      slug: cleanSlug,
      type: "package",
    }
    : destMatch
      ? {
        id: destMatch.id,
        name: destMatch.name,
        tagline: destMatch.tagline,
        desc: `${destMatch.desc} Wildora provides fully guided private game drives, luxury tented camps, park entry permits, and custom sunrise & night safari tracking expeditions.`,
        image: destMatch.image,
        location: `${destMatch.country}, ${destMatch.region}`,
        country: destMatch.country,
        region: destMatch.region,
        badge: destMatch.badge || "Premier Destination",
        startingPrice: destMatch.startingPrice || 550,
        duration: "4 Days / 3 Nights",
        rating: 4.98,
        reviews: 142,
        slug: destMatch.slug,
        type: "destination",
      }
      : {
        // Fallback to first package / destination
        id: packages[0].id,
        name: packages[0].title,
        tagline: `${packages[0].title} — ${packages[0].location}`,
        desc: packages[0].desc,
        image: packages[0].image,
        location: packages[0].location,
        country: "Wilderness Reserve",
        region: "Safari Habitat",
        badge: packages[0].feature || "Featured Expedition",
        startingPrice: parseInt(packages[0].price, 10) || 620,
        duration: packages[0].duration || "6 Days – 5 Nights",
        rating: packages[0].rating || 4.9,
        reviews: packages[0].reviews || 410,
        slug: "big-five-safari",
        type: "package",
      };

  const [activeTab, setActiveTab] = useState("itinerary");
  const relatedPackages = packages.slice(0, 3);

  return (
    <div className="tour-detail-page bg-[#f9fbf8]">
      <BreadcrumbBanner
        backgroundImage={tour.image}
        breadcrumb={["Home", "Safaris", tour.name]}
        title={tour.name}
        subtitle="All-Inclusive Safari Expedition"
      />

      {/* Main Section */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-visible">
        <div className="custom-container flex flex-col lg:flex-row items-start justify-between gap-[4rem] lg:gap-[6rem] relative">
          {/* Left Column: Rich Tour Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-[4rem]">
            {/* Header / Intro */}
            <AnimeFadeIn className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-secondary text-white font-bold text-[1.3rem] sm:text-[1.4rem] px-4 py-1.5 rounded-full shadow-sm">
                  {tour.badge}
                </span>
                <span className="text-primary font-bold text-[1.5rem] flex items-center gap-1.5">
                  <Icon icon="hugeicons:location-04" className="text-[1.8rem]" />
                  {tour.location}
                </span>
                <span className="bg-primary/10 text-primary font-semibold text-[1.3rem] px-3.5 py-1 rounded-full flex items-center gap-1">
                  <Icon icon="solar:star-bold" className="text-secondary" /> {tour.rating} / 5 ({tour.reviews} Reviews)
                </span>
              </div>

              <h1 className="text-[3.2rem] sm:text-[4.2rem] md:text-[5rem] font-bold text-heading-color leading-[1.15]">
                {tour.tagline}
              </h1>

              <p className="text-[1.6rem] sm:text-[1.7rem] text-gray-600 leading-relaxed">
                {tour.desc}
              </p>
            </AnimeFadeIn>

            {/* Visual Hero Gallery */}
            <AnimeFadeIn type="scaleUp" className="relative w-full h-[32rem] sm:h-[44rem] md:h-[50rem] rounded-[2.4rem] md:rounded-[3.2rem] overflow-hidden shadow-xl group">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 bg-dark/85 backdrop-blur-md p-4 sm:p-6 rounded-[2rem] text-white flex flex-wrap items-center justify-between gap-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-[4.4rem] h-[4.4rem] rounded-full bg-primary/20 text-secondary flex items-center justify-center text-[2.2rem]">
                    <Icon icon="solar:shield-check-bold" />
                  </div>
                  <div>
                    <h4 className="text-[1.6rem] font-bold">100% Guaranteed Safari Gate Passes</h4>
                    <p className="text-[1.2rem] text-gray-300">Official National Forest entry permits secured in advance</p>
                  </div>
                </div>
                <span className="text-secondary font-bold text-[1.4rem]">Peak Sighting Season Active</span>
              </div>
            </AnimeFadeIn>

            {/* Interactive Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
              {[
                { id: "itinerary", label: "Expedition Itinerary", icon: "solar:routing-2-bold" },
                { id: "wildlife", label: "Wildlife Probability", icon: "solar:eye-bold" },
                { id: "packing", label: "Field Gear & Tips", icon: "solar:camera-bold" },
                { id: "inclusions", label: "Inclusions & Perks", icon: "solar:check-circle-bold" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-full text-[1.4rem] sm:text-[1.5rem] font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === tab.id
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-[#f4f7f2] text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <Icon icon={tab.icon} className="text-[1.8rem]" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Day-by-Day Itinerary */}
            {activeTab === "itinerary" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[2.6rem] font-bold text-heading-color">
                    Signature Expedition Itinerary ({tour.duration})
                  </h2>
                  <p className="text-gray-500 text-[1.4rem] mt-1">
                    Every game drive is coordinated with real-time ranger radio communications for maximum predator sightings.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {itineraryDays.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f9fbf8] rounded-[2rem] p-[2.2rem] sm:p-[2.8rem] border border-gray-200/80 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 relative"
                    >
                      <div className="sm:w-[12rem] shrink-0 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
                        <span className="bg-primary text-white font-bold text-[1.3rem] px-3 py-1 rounded-full">
                          {item.day}
                        </span>
                        <span className="text-[1.2rem] font-semibold text-secondary mt-1 flex items-center gap-1">
                          <Icon icon="solar:clock-circle-bold" /> {item.time}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-[1.8rem] sm:text-[2rem] font-bold text-heading-color">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-[1.4rem] sm:text-[1.5rem] leading-relaxed mt-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Wildlife Probability Matrix */}
            {activeTab === "wildlife" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[2.6rem] font-bold text-heading-color">
                    Wildlife Sighting Probability & Seasonality
                  </h2>
                  <p className="text-gray-500 text-[1.4rem] mt-1">
                    Historical sighting probability logged over 1,200+ Wildora game drives in {tour.location}.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wildlifeSightings.map((animal, i) => (
                    <div
                      key={i}
                      className="bg-[#f9fbf8] p-5 rounded-[2rem] border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-[4.6rem] h-[4.6rem] rounded-[1.4rem] bg-primary/10 text-primary flex items-center justify-center text-[2.4rem]">
                          <Icon icon={animal.icon} />
                        </div>
                        <div>
                          <h4 className="text-[1.6rem] font-bold text-heading-color">{animal.name}</h4>
                          <span className="text-[1.2rem] text-gray-500">Peak: {animal.season}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[2.2rem] font-bold text-secondary NewFont">{animal.chance}</span>
                        <span className="block text-[1.1rem] text-gray-400 font-semibold">Success Rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Field Gear & Tips */}
            {activeTab === "packing" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[2.6rem] font-bold text-heading-color">
                    Naturalist Gear & Packing Recommendations
                  </h2>
                  <p className="text-gray-500 text-[1.4rem] mt-1">
                    Carefully curated by our field trackers for maximum comfort and stealth in the bush.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Earthy Safari Clothing",
                      desc: "Khaki, olive, brown, or stone hues. Avoid bright reds, blues, or pure whites that startle wildlife.",
                      icon: "solar:hanger-bold",
                    },
                    {
                      title: "Optical Gear & Lenses",
                      desc: "Recommended 100-400mm or 200-600mm telephoto zoom. 8x42 or 10x42 roof-prism binoculars.",
                      icon: "solar:camera-bold",
                    },
                    {
                      title: "Morning Chill Layers",
                      desc: "Open 4x4 morning breezes can be very cold (8°C–14°C). Pack a fleece jacket, buff, and beanie.",
                      icon: "solar:cloud-sun-bold",
                    },
                    {
                      title: "Eco Essentials",
                      desc: "Reusable stainless flask, polarized UV sunglasses, organic insect repellent, and dust bags.",
                      icon: "solar:shield-check-bold",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#f9fbf8] p-5 rounded-[2rem] border border-gray-200 flex gap-4">
                      <div className="w-[4.4rem] h-[4.4rem] rounded-full bg-[#EAF4E6] text-primary flex items-center justify-center text-[2.2rem] shrink-0">
                        <Icon icon={item.icon} />
                      </div>
                      <div>
                        <h4 className="text-[1.6rem] font-bold text-heading-color">{item.title}</h4>
                        <p className="text-[1.3rem] text-gray-600 leading-snug mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Inclusions & Perks */}
            {activeTab === "inclusions" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[2.6rem] font-bold text-heading-color">
                    What's Included in Your Expedition
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#EAF4E6] p-6 rounded-[2rem] flex flex-col gap-3">
                    <h4 className="text-[1.8rem] font-bold text-primary flex items-center gap-2">
                      <Icon icon="solar:check-circle-bold" className="text-[2.2rem]" /> Included Perks
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-[1.4rem] text-gray-700">
                      <li>✓ All National Forest entry permits & zone fees</li>
                      <li>✓ Private customized 4x4 open-top safari vehicle</li>
                      <li>✓ Certified English-speaking naturalist & tribal tracker</li>
                      <li>✓ 5-star eco-lodge luxury accommodation</li>
                      <li>✓ Gourmet breakfast, bush lunches & dinner buffets</li>
                      <li>✓ High-speed optical binoculars provided during drives</li>
                    </ul>
                  </div>

                  <div className="bg-[#fff3f0] p-6 rounded-[2rem] flex flex-col gap-3">
                    <h4 className="text-[1.8rem] font-bold text-red-600 flex items-center gap-2">
                      <Icon icon="solar:close-circle-bold" className="text-[2.2rem]" /> Not Included
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-[1.4rem] text-gray-700">
                      <li>✕ International / Domestic commercial flights</li>
                      <li>✕ Personal travel & emergency medical insurance</li>
                      <li>✕ Gratuities for safari drivers and lodge staff</li>
                      <li>✕ Professional commercial film camera video fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Safari Highlights Grid */}
            <div className="flex flex-col gap-6 pt-4 border-t border-gray-200">
              <h2 className="text-[2.6rem] font-bold text-heading-color">
                Exclusive Safari Perks
              </h2>
              <AnimeStaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "material-symbols:camera-outdoor-outline",
                    title: "Dedicated Photography Mounts",
                    desc: "Specially equipped 4x4 open-top jeeps with beanbags and 360° camera swivel mounts.",
                  },
                  {
                    icon: "material-symbols:nature-people",
                    title: "Indigenous Field Trackers",
                    desc: "Accompany native guides who read fresh pugmarks, alarm calls, and territory markers.",
                  },
                  {
                    icon: "fluent:weather-sunny-28-filled",
                    title: "Sunrise & Twilight Golden Hours",
                    desc: "Catch peak predator hunting activity in crisp morning light and dramatic sunset glows.",
                  },
                  {
                    icon: "ri:hotel-line",
                    title: "Solar-Powered Luxury Ecolodges",
                    desc: "Handpicked 5-star luxury jungle retreats with organic local cuisine and plunge pools.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#f9fbf8] p-[2.2rem] rounded-[2rem] border border-gray-200/80 flex flex-col gap-2 hover:shadow-md transition-shadow">
                    <div className="w-[4.4rem] h-[4.4rem] rounded-full bg-white text-primary flex items-center justify-center text-[2.2rem] shadow-sm">
                      <Icon icon={item.icon} />
                    </div>
                    <h3 className="text-[1.7rem] font-bold text-heading-color">{item.title}</h3>
                    <p className="text-[1.3rem] text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </AnimeStaggerList>
            </div>
          </div>

          {/* Right Sidebar: STICKY Booking Box Component */}
          <StickyBookingBox
            tour={tour}
            safariTiers={safariTiers}
            className="w-full lg:w-1/3"
          />
        </div>
      </section>

      {/* Related Tour Packages */}
      <section className="bg-[#f2f6f0] sectionPadding relative">
        <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Tailored Itineraries
            </span>
            <h2 className="text-heading-color font-semibold">
              Popular Packages in <span className="text-secondary">{tour.name}</span>
            </h2>
          </AnimeFadeIn>

          <AnimeStaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem]">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </AnimeStaggerList>
        </div>
      </section>
    </div>
  );
}
