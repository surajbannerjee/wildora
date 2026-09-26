"use client";
import React, { useState, useMemo, useEffect } from "react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import PackageCard from "@/components/PackageCard/PackageCard";
import packages from "@/components/HomeComponents/PopularPackages/packagesArray";
import { HERO_IMAGE1 } from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import { Icon } from "@iconify/react";
import { AppButton } from "@/components/Button";
import { PackageGridSkeleton } from "@/components/Skeleton/SkeletonLoaders";
import CustomSelect from "@/components/CustomInputs/CustomSelect";

import AnimalsSlider from "@/components/HomeComponents/AnimalsSlider/AnimalsSlider";

const categories = [
  { name: "All", icon: "solar:compass-bold" },
  { name: "Great Migration", icon: "solar:cat-bold" },
  { name: "Tiger Dynasty", icon: "solar:paw-bold" },
  { name: "Big Five", icon: "solar:crown-bold" },
  { name: "Gorilla Tracking", icon: "solar:user-bold" },
  { name: "Jaguar Trail", icon: "solar:shield-star-bold" },
  { name: "Polar & Arctic", icon: "solar:snowflake-bold" },
  { name: "Marine Wonder", icon: "solar:droplet-bold" },
  { name: "Rainforest Expedition", icon: "solar:leaf-bold" },
  { name: "Walking Safari", icon: "solar:hiking-bold" },
  { name: "Bird Sanctuary", icon: "solar:water-sun-bold" },
  { name: "Family Friendly", icon: "solar:users-group-two-rounded-bold" },
];

const sortOptions = [
  { value: "recommended", name: "Recommended Expeditions" },
  { value: "price-low", name: "Price: Low to High" },
  { value: "price-high", name: "Price: High to Low" },
  { value: "rating", name: "Highest Guest Rating" },
  { value: "reviews", name: "Most Popular & Reviewed" },
];

const ITEMS_PER_PAGE = 12;

const wildlifeFocusOptions = [
  { value: "tigers", name: "Royal Bengal Tigers (India)", icon: "solar:cat-bold" },
  { value: "big5", name: "The Big Five (Africa)", icon: "solar:compass-bold" },
  { value: "lions", name: "Asiatic Lions (Gir)", icon: "solar:crown-bold" },
  { value: "leopards", name: "Leopards & Elephants (Sri Lanka)", icon: "solar:paw-bold" },
];

const faqs = [
  {
    q: "What is included in Wildora safari packages?",
    a: "All Wildora packages include luxury eco-lodge accommodation, all game drives in private 4x4 vehicles, dedicated naturalists, park entry and vehicle permits, all meals, and internal airport transfers.",
  },
  {
    q: "Can I customize an existing package or create a private itinerary?",
    a: "Absolutely! Every package can be extended, combined, or tailored to your specific pace, preferred accommodation tier, and wildlife focus.",
  },
  {
    q: "What is the best time of year for tiger and lion safari sightings?",
    a: "In India, October through May offers the highest sighting frequency as animals gather around perennial waterholes. For African migrations, July through October provides dramatic river crossings.",
  },
  {
    q: "Are safari tours suitable for families and young children?",
    a: "Yes, we offer specialized Family Friendly packages with child-friendly safari durations, interactive junior naturalist programs, and fenced luxury lodges.",
  },
];

const PackagesPage = () => {
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiryFocus, setInquiryFocus] = useState(wildlifeFocusOptions[0].value);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedFeature, searchQuery, sortBy]);

  const filteredPackages = useMemo(() => {
    let result = packages.filter((pkg) => {
      const matchesFeature =
        selectedFeature === "All" ||
        (pkg.feature && pkg.feature.toLowerCase().includes(selectedFeature.toLowerCase()));
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        pkg.title.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q) ||
        pkg.desc.toLowerCase().includes(q);
      return matchesFeature && matchesSearch;
    });

    // Apply sorting
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "reviews") {
      result = [...result].sort((a, b) => Number(b.reviews) - Number(a.reviews));
    }

    return result;
  }, [selectedFeature, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE) || 1;
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPackages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPackages, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setIsLoading(true);
      window.scrollTo({ top: 400, behavior: "smooth" });
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  return (
    <div className="packages-page">
      <BreadcrumbBanner
        backgroundImage={HERO_IMAGE1}
        breadcrumb={["Home", "Packages"]}
        title="Curated Safari Packages"
        subtitle="Curated Wildlife Expeditions"
      />


      {/* Main Packages Directory */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Handpicked Expeditions
            </span>
            <h2 className="text-heading-color font-semibold">
              Find Your Dream <span className="text-secondary">Wildlife Adventure</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color max-w-[75rem]">
              Browse our comprehensive collection of all-inclusive wildlife tours, from high-adrenaline predator tracking to serene riverboat safaris.
            </p>
          </AnimeFadeIn>

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-[2rem] w-full">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-[1rem] flex-wrap justify-center md:justify-start">
              {categories.map((cat, idx) => {
                const catName = typeof cat === "string" ? cat : cat.name;
                const catIcon = typeof cat === "object" ? cat.icon : "solar:compass-bold";
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedFeature(catName);
                      setIsLoading(true);
                    }}
                    className={`px-[1.8rem] py-[0.9rem] rounded-full text-[1.4rem] sm:text-[1.5rem] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${selectedFeature === catName
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

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-[26rem]">
                <Icon
                  icon="lets-icons:search"
                  className="absolute left-[1.6rem] top-1/2 -translate-y-1/2 text-gray-400 text-[2rem]"
                />
                <input
                  type="text"
                  placeholder="Search 100+ packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[4.8rem] h-[4.8rem] pl-[4.8rem] pr-[1.6rem] rounded-full bg-[#EAF4E6] text-heading-color placeholder-gray-500 text-[1.4rem] sm:text-[1.5rem] border border-transparent focus:border-primary focus:bg-white transition-all outline-none shadow-sm"
                />
              </div>

              <div className="w-full sm:w-[22rem]">
                <CustomSelect
                  options={sortOptions}
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  placeholder="Sort Expeditions"
                  icon="solar:sort-vertical-bold"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Results Counter Bar */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100">
            <span className="text-[1.4rem] sm:text-[1.5rem] font-medium text-heading-color">
              Showing{" "}
              <strong className="text-primary">
                {filteredPackages.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                –{Math.min(currentPage * ITEMS_PER_PAGE, filteredPackages.length)}
              </strong>{" "}
              of <strong className="text-heading-color">{filteredPackages.length}</strong> Handpicked Expeditions
            </span>
            {selectedFeature !== "All" && (
              <span className="text-[1.3rem] text-primary font-semibold bg-[#EAF4E6] px-3 py-1 rounded-full">
                Theme: {selectedFeature}
              </span>
            )}
          </div>

          {/* Quick Assurance Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#F7F9F6] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 p-2">
              <Icon icon="solar:shield-check-bold" className="text-primary text-[2.4rem] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[1.3rem] font-bold text-heading-color">Official Park Permits</span>
                <span className="text-[1.1rem] text-gray-500">100% verified gate pass</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Icon icon="solar:bus-bold" className="text-primary text-[2.4rem] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[1.3rem] font-bold text-heading-color">Custom 4x4 Jeeps</span>
                <span className="text-[1.1rem] text-gray-500">Open roof & bean bags</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Icon icon="solar:user-bold" className="text-primary text-[2.4rem] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[1.3rem] font-bold text-heading-color">Senior Naturalists</span>
                <span className="text-[1.1rem] text-gray-500">Decades of tracking lore</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Icon icon="solar:medal-ribbons-star-bold" className="text-primary text-[2.4rem] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[1.3rem] font-bold text-heading-color">All-Inclusive Luxury</span>
                <span className="text-[1.1rem] text-gray-500">Meals, stays & transfers</span>
              </div>
            </div>
          </div>

          {/* Packages Grid or Skeleton Loading */}
          {isLoading ? (
            <PackageGridSkeleton count={6} />
          ) : (
            <AnimeStaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] w-full">
              {paginatedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  title={pkg.title}
                  desc={pkg.desc}
                  image={pkg.image}
                  link={pkg.link}
                  linkText={pkg.linkText}
                  location={pkg.location}
                  rating={pkg.rating}
                  reviews={pkg.reviews}
                  price={pkg.price}
                  offprice={pkg.offprice}
                  duration={pkg.duration}
                  feature={pkg.feature}
                />
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

          {!isLoading && filteredPackages.length === 0 && (
            <div className="text-center py-[8rem] flex flex-col items-center gap-[1.5rem]">
              <Icon icon="solar:sad-circle-broken" className="text-primary text-[6rem]" />
              <h3 className="text-[2.4rem] font-semibold text-heading-color">No Packages Found</h3>
              <p className="text-text-color text-[1.6rem]">Try choosing another category or clearing your search term.</p>
              <button
                onClick={() => {
                  setSelectedFeature("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 min-h-[4.8rem] h-[4.8rem] rounded-full bg-primary text-white font-semibold text-[1.5rem] flex items-center justify-center cursor-pointer shadow-md hover:bg-secondary transition"
              >
                Show All Packages
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tailor-Made Custom Tour Box */}
      <section className="bg-dark sectionPadding relative overflow-hidden">
        <div className="custom-container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-[4rem]">
          <AnimeFadeIn className="lg:w-3/5 flex flex-col gap-[2rem] items-start">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Custom Safari Planning
            </span>
            <h2 className="text-white font-semibold">
              Want a Tailor-Made <span className="text-secondary">Private Itinerary?</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-200 leading-[1.6]">
              Our safari specialists create customized, private journeys tailored to your schedule, desired wildlife focus, photography requirements, and luxury accommodation preferences.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="bg-white/10 text-white text-[1.4rem] px-4 py-2 rounded-full flex items-center gap-2">
                <Icon icon="garden:check-badge-fill-12" className="text-primary" /> Private 4x4 Game Drives
              </span>
              <span className="bg-white/10 text-white text-[1.4rem] px-4 py-2 rounded-full flex items-center gap-2">
                <Icon icon="garden:check-badge-fill-12" className="text-primary" /> Flexible Dates
              </span>
              <span className="bg-white/10 text-white text-[1.4rem] px-4 py-2 rounded-full flex items-center gap-2">
                <Icon icon="garden:check-badge-fill-12" className="text-primary" /> 1-on-1 Naturalist Desk
              </span>
            </div>
            <AppButton href="/contact" classes="mt-[1.5rem]">
              Request Custom Safari
            </AppButton>
          </AnimeFadeIn>

          <AnimeFadeIn type="scaleUp" className="lg:w-2/5 w-full bg-white/5 border border-white/15 rounded-[2.8rem] p-[3rem] sm:p-[3.5rem] backdrop-blur-md">
            <h3 className="text-white text-[2.2rem] font-bold mb-4">Quick Safari Inquiry</h3>
            {inquirySent ? (
              <div className="bg-primary/20 border border-primary text-primary p-6 rounded-2xl text-center flex flex-col items-center gap-3">
                <Icon icon="solar:check-circle-bold" className="text-[4rem]" />
                <h4 className="text-[1.8rem] font-bold text-white">Inquiry Received!</h4>
                <p className="text-[1.3rem] text-gray-200">Our senior naturalist will contact you with a bespoke itinerary within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[1.3rem] font-semibold text-gray-300 flex items-center gap-1.5">
                    <Icon icon="solar:user-bold" className="text-primary text-[1.6rem]" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="w-full min-h-[4.8rem] h-[4.8rem] px-5 rounded-full bg-white/10 text-white placeholder-gray-400 text-[1.4rem] border border-white/20 focus:border-primary outline-none transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[1.3rem] font-semibold text-gray-300 flex items-center gap-1.5">
                    <Icon icon="solar:letter-bold" className="text-primary text-[1.6rem]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full min-h-[4.8rem] h-[4.8rem] px-5 rounded-full bg-white/10 text-white placeholder-gray-400 text-[1.4rem] border border-white/20 focus:border-primary outline-none transition"
                  />
                </div>

                <CustomSelect
                  options={wildlifeFocusOptions}
                  value={inquiryFocus}
                  onChange={(val) => setInquiryFocus(val)}
                  label="Preferred Wildlife Focus"
                  theme="dark"
                />

                <AppButton
                  type="submit"
                  variant="secondary"
                  classes="w-full mt-5!"
                >
                  Send Inquiry
                </AppButton>
              </form>
            )}
          </AnimeFadeIn>
        </div>
      </section>

      {/* Safari FAQ Accordion */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              Frequently Asked Questions
            </span>
            <h2 className="text-heading-color font-semibold">
              Everything You Need to Know <span className="text-secondary">Before You Go</span>
            </h2>
          </AnimeFadeIn>

          <div className="max-w-[90rem] mx-auto w-full flex flex-col gap-[1.5rem]">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-[1.8rem] overflow-hidden transition-all duration-300 bg-[#EAF4E6]/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-[2.2rem] flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-[#EAF4E6]/70 transition-colors"
                >
                  <span className="text-[1.8rem] font-bold text-heading-color">
                    {faq.q}
                  </span>
                  <span className={`w-[3.6rem] h-[3.6rem] rounded-full bg-primary text-white flex items-center justify-center text-[2rem] transition-transform duration-300 shrink-0 ${openFaq === idx ? "rotate-180 bg-secondary" : ""}`}>
                    <Icon icon="ic:round-keyboard-arrow-down" />
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-[2.2rem] pb-[2.2rem] text-[1.5rem] text-text-color leading-[1.7] border-t border-gray-200/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
