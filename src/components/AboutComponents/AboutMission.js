"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";

const pillars = [
  {
    icon: "material-symbols:nature-people-outline",
    title: "Eco-First Exploration",
    desc: "Every tour is crafted to minimize ecological footprints while directly supporting local community rangers and animal habitat preservation programs.",
  },
  {
    icon: "hugeicons:safari",
    title: "Unrivaled Field Expertise",
    desc: "Our senior naturalists and licensed trackers bring decades of jungle lore, ensuring safe, thrilling, and respectful wildlife observation.",
  },
  {
    icon: "fluent:shield-checkmark-24-filled",
    title: "Bespoke Luxury & Comfort",
    desc: "From private open-top 4x4 safaris to secluded eco-resorts under starlit canopies, we blend rugged wilderness with tailored elegance.",
  },
];

const AboutMission = () => {
  return (
    <section className="AboutMission w-full white-bg-section bg-white sectionPadding relative overflow-hidden">
      <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
        <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
          <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
            Our Guiding Principles
          </span>
          <h2 className="text-heading-color font-semibold">
            Connecting You with the <span className="text-secondary">Wilderness</span>
          </h2>
          <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color max-w-[75rem]">
            We believe that true adventure leaves a lasting impression on the soul while preserving the wild ecosystems that make our planet extraordinary.
          </p>
        </AnimeFadeIn>

        <AnimeStaggerList className="grid grid-cols-1 md:grid-cols-3 gap-[2.5rem] sm:gap-[3rem] w-full mt-[1rem]">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#EAF4E6] rounded-[2.2rem] p-[3rem] sm:p-[3.5rem] flex flex-col items-start gap-[2rem] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/40 group"
            >
              <div className="w-[6rem] h-[6rem] rounded-full bg-white text-primary flex items-center justify-center text-[3rem] shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                <Icon icon={item.icon} />
              </div>
              <h3 className="text-[2.2rem] font-semibold text-heading-color group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[1.5rem] text-heading-color leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </AnimeStaggerList>
      </div>
    </section>
  );
};

export default AboutMission;
