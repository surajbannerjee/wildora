"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import NewsCard from "@/components/NewsCard/NewsCard";
import { AppButton } from "@/components/Button";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import {
  HERO_IMAGE2,
  HERO_IMAGE12,
  HERO_IMAGE10,
  HERO_IMAGE11,
  HERO_IMAGE9,
  HERO_IMAGE8,
  HERO_IMAGE6,
  AVATAR,
  TEAM_3_1,
  TEAM_3_2,
  TEAM_3_3,
  TEAM_3_4,
  TIGER_BANDHAVGARH,
  SERENGETI_MIGRATION,
} from "@/constants/images";

const allArticles = [
  {
    id: "wildlife-conservation",
    category: "Conservation",
    title: "Wildlife Conservation in India: A Bold New Chapter Begins",
    excerpt: "Discover the innovative anti-poaching and forest corridor restoration initiatives safeguarding India's iconic apex predators in 2025.",
    image: SERENGETI_MIGRATION,
    date: "June 24, 2025",
    readTime: "6 min read",
    author: "Suraj Banerjee",
    userImg: AVATAR,
    link: "/news",
    featured: true,
  },
  {
    id: "top-safari-destinations",
    category: "Safari Guide",
    title: "Top 5 National Parks for Guaranteed Tiger Sightings",
    excerpt: "From Ranthambore's ancient stone ruins to Bandhavgarh's lush sal valleys, here are the prime hotspots for big cat encounters.",
    image: TIGER_BANDHAVGARH,
    date: "June 20, 2025",
    readTime: "5 min read",
    author: "Priya Sharma",
    userImg: TEAM_3_1,
    link: "/news",
    featured: false,
  },
  {
    id: "eco-tourism-india",
    category: "Eco Tourism",
    title: "Eco-Tourism & Responsible Travel: Why Low-Impact Safaris Matter",
    excerpt: "How zero-emission electric 4x4 safaris and community-led ecolodges are revolutionizing luxury wildlife expeditions.",
    image: HERO_IMAGE12,
    date: "June 18, 2025",
    readTime: "4 min read",
    author: "Wildora Editorial",
    userImg: AVATAR,
    link: "/news",
    featured: false,
  },
  {
    id: "travel-tips",
    category: "Travel Tips",
    title: "Essential Packing & Preparation Tips for Your First Jungle Safari",
    excerpt: "Everything you need to know about clothing colors, camera lenses, morning chill layers, and safari etiquette.",
    image: HERO_IMAGE10,
    date: "June 15, 2025",
    readTime: "7 min read",
    author: "Ankit Mehra",
    userImg: TEAM_3_2,
    link: "/news",
    featured: false,
  },
  {
    id: "birdwatching-paradise",
    category: "Photography",
    title: "Avian Wonders: Birdwatching Across India's Protected Wetlands",
    excerpt: "Explore Keoladeo and Kaziranga's seasonal migration marvels with tips from seasoned wildlife photographers.",
    image: HERO_IMAGE11,
    date: "June 10, 2025",
    readTime: "5 min read",
    author: "Dr. Arvind Rao",
    userImg: TEAM_3_3,
    link: "/news",
    featured: false,
  },
  {
    id: "nocturnal-expeditions",
    category: "Safari Guide",
    title: "Night Safaris: Unveiling the Secret Lives of Nocturnal Predators",
    excerpt: "What happens in the jungle when the sun goes down? Experience night drives in buffer zones with thermal optics.",
    image: HERO_IMAGE9,
    date: "June 05, 2025",
    readTime: "6 min read",
    author: "Kavita Sen",
    userImg: TEAM_3_4,
    link: "/news",
    featured: false,
  },
  {
    id: "tribal-heritage",
    category: "Conservation",
    title: "Indigenous Guardians: How Forest Tribes Coexist with Wild Elephants",
    excerpt: "Exploring the traditional wisdom and indigenous tracking techniques that keep human-wildlife conflict at historic lows.",
    image: HERO_IMAGE8,
    date: "May 28, 2025",
    readTime: "8 min read",
    author: "Suraj Banerjee",
    userImg: AVATAR,
    link: "/news",
    featured: false,
  },
  {
    id: "camera-gear-guide",
    category: "Photography",
    title: "Ultimate Wildlife Photography Gear Guide for 2025 Safaris",
    excerpt: "Fast telephoto zooms vs prime lenses, dust sealing, monopod setups, and shutter speed secrets for tracking predators in motion.",
    image: HERO_IMAGE6,
    date: "May 22, 2025",
    readTime: "9 min read",
    author: "Ankit Mehra",
    userImg: TEAM_3_2,
    link: "/news",
    featured: false,
  },
];

const categories = [
  { name: "All", icon: "solar:compass-bold" },
  { name: "Conservation", icon: "solar:leaf-bold" },
  { name: "Safari Guide", icon: "solar:cat-bold" },
  { name: "Eco Tourism", icon: "solar:globe-bold" },
  { name: "Travel Tips", icon: "solar:map-point-wave-bold" },
  { name: "Photography", icon: "solar:camera-bold" },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const filteredArticles = activeCategory === "All"
    ? allArticles
    : allArticles.filter((item) => item.category === activeCategory);

  const featuredPost = allArticles[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <main className="w-full bg-[#f9fbf8]">
      {/* Breadcrumb Header */}
      <BreadcrumbBanner
        title="Jungle Journal & News"
        breadcrumb={["Home", "News"]}
        backgroundImage={HERO_IMAGE2}
        subtitle="Field Notes & Conservation"
      />

      {/* Featured Story Section */}
      <section className="sectionPadding pb-0">
        <div className="custom-container">
          <AnimeFadeIn direction="up" delay={100}>
            <div className="relative overflow-hidden rounded-[2.4rem] md:rounded-[3.2rem] bg-white border border-[#E8ECE6] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              {/* Featured Image */}
              <div className="relative lg:col-span-7 h-[28rem] sm:h-[36rem] lg:h-full overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-6 left-6 z-10 flex gap-2">
                  <span className="bg-secondary text-dark font-bold px-4 py-2 rounded-full text-[1.2rem] sm:text-[1.4rem] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Icon icon="solar:star-fall-bold" /> Featured Story
                  </span>
                  <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[1.2rem] sm:text-[1.4rem] font-medium shadow-md">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Featured Content */}
              <div className="lg:col-span-5 p-[2.4rem] sm:p-[3.5rem] lg:p-[4.5rem] flex flex-col justify-between bg-white">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-gray-500 text-[1.3rem] sm:text-[1.5rem]">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="lets-icons:date-fill" className="text-primary text-[1.8rem]" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:clock-circle-bold" className="text-primary text-[1.8rem]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-heading-color font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-600 text-[1.4rem] sm:text-[1.6rem] leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPost.userImg}
                      alt={featuredPost.author}
                      width={60}
                      height={60}
                      className="w-[4.4rem] h-[4.4rem] rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <h4 className="text-[1.5rem] font-bold text-heading-color">{featuredPost.author}</h4>
                      <p className="text-[1.2rem] text-gray-500">Chief Field Naturalist</p>
                    </div>
                  </div>

                  <AppButton href="/news">
                    Read Article
                  </AppButton>
                </div>
              </div>
            </div>
          </AnimeFadeIn>
        </div>
      </section>

      {/* Main Articles Grid & Category Filters */}
      <section className="sectionPadding">
        <div className="custom-container flex flex-col gap-[3.5rem] md:gap-[5rem]">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <AnimeFadeIn direction="up">
              <span className="text-primary ButtonFont text-[2.8rem] sm:text-[3.5rem] leading-none font-medium">
                Articles & Dispatches
              </span>
              <h2 className="text-heading-color font-bold text-[2.4rem] sm:text-[3.2rem] mt-2">
                Latest from the <span className="text-secondary">Wildora Frontier</span>
              </h2>
            </AnimeFadeIn>

            {/* Category Pills */}
            <AnimeFadeIn direction="left" delay={150}>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((cat, idx) => {
                  const catName = typeof cat === "string" ? cat : cat.name;
                  const catIcon = typeof cat === "object" ? cat.icon : "solar:compass-bold";
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(catName)}
                      className={`px-5 py-2.5 rounded-full text-[1.3rem] sm:text-[1.5rem] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${activeCategory === catName
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-[#EAF4E6] hover:text-primary border border-gray-200"
                        }`}
                    >
                      <Icon icon={catIcon} className="text-[1.6rem]" />
                      <span>{catName}</span>
                    </button>
                  );
                })}
              </div>
            </AnimeFadeIn>
          </div>

          {/* Articles Grid */}
          <AnimeStaggerList
            staggerDelay={80}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] sm:gap-[3rem]"
          >
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-[2.2rem] overflow-hidden border border-[#E8ECE6] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 h-full"
              >
                <div className="flex-1 flex flex-col">
                  <div className="relative w-full h-[22rem] sm:h-[24rem] overflow-hidden shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/95 backdrop-blur-md text-primary font-bold px-3.5 py-1.5 rounded-full text-[1.2rem] shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-[2rem] sm:p-[2.5rem] flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 text-gray-500 text-[1.3rem] mb-2">
                        <span className="flex items-center gap-1">
                          <Icon icon="lets-icons:date-fill" className="text-primary text-[1.6rem]" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-heading-color font-bold text-[1.8rem] sm:text-[2rem] leading-snug line-clamp-2 min-h-[5.2rem] group-hover:text-primary transition-colors flex items-center">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-[1.4rem] line-clamp-2 min-h-[4.4rem] leading-relaxed mt-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-[2rem] sm:p-[2.5rem] pt-4 flex items-center justify-between border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={article.userImg}
                      alt={article.author}
                      width={40}
                      height={40}
                      className="w-[3.4rem] h-[3.4rem] rounded-full object-cover border border-secondary"
                    />
                    <span className="text-[1.3rem] font-semibold text-gray-700">{article.author}</span>
                  </div>

                  <Link
                    href={article.link}
                    className="w-[3.6rem] h-[3.6rem] rounded-full bg-[#EAF4E6] text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-[-45deg]"
                  >
                    <Icon icon="formkit:arrowright" className="text-[1.5rem]" />
                  </Link>
                </div>
              </div>
            ))}
          </AnimeStaggerList>
        </div>
      </section>

      {/* Safari Digest Newsletter Banner */}
      <section className="sectionPadding pt-0">
        <div className="custom-container">
          <AnimeFadeIn direction="up">
            <div className="relative rounded-[2.8rem] md:rounded-[3.6rem] overflow-hidden bg-gradient-to-r from-primary via-[#1c3319] to-primary p-[3rem] sm:p-[5rem] lg:p-[7rem] text-white shadow-2xl">
              <div className="relative z-10 max-w-[70rem] mx-auto text-center flex flex-col items-center gap-6">
                <span className="text-secondary ButtonFont text-[3rem] sm:text-[3.6rem] leading-none">
                  Wildora Safari Digest
                </span>
                <h2 className="text-[2.6rem] sm:text-[3.6rem] md:text-[4.2rem] font-bold leading-tight">
                  Get Wild Stories & Safari Discounts in Your Inbox
                </h2>
                <p className="text-gray-200 text-[1.5rem] sm:text-[1.7rem] max-w-[55rem]">
                  Join 28,000+ wildlife enthusiasts receiving monthly sightings reports, seasonal expedition offers, and conservation updates.
                </p>

                {subscribed ? (
                  <div className="bg-secondary/20 border border-secondary text-secondary font-bold px-6 py-4 rounded-full text-[1.6rem] flex items-center gap-2">
                    <Icon icon="solar:check-circle-bold" className="text-[2.2rem]" />
                    Thank you for subscribing! Your first dispatch is on its way.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="w-full max-w-[52rem] flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 min-h-[4.8rem] h-[4.8rem] px-6 rounded-full bg-white text-gray-800 text-[1.5rem] outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-secondary/40 shadow-inner"
                    />
                    <button
                      type="submit"
                      className="min-h-[4.8rem] h-[4.8rem] bg-secondary hover:bg-white text-dark font-bold px-8 rounded-full text-[1.6rem] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl shrink-0 flex items-center justify-center"
                    >
                      Subscribe Free
                    </button>
                  </form>
                )}
                <span className="text-gray-400 text-[1.2rem]">No spam ever. Unsubscribe with 1-click anytime.</span>
              </div>
            </div>
          </AnimeFadeIn>
        </div>
      </section>
    </main>
  );
}
