"use client";
import React from "react";
import { AnimeCounter, AnimeFadeIn } from "@/components/Anime/AnimeComponents";
import { Icon } from "@iconify/react";

const stats = [
  {
    value: 52,
    suffix: "+",
    label: "Sanctuaries & Parks",
    icon: "material-symbols:forest-outline",
    desc: "Across India, Africa, and Sri Lanka",
  },
  {
    value: 14800,
    suffix: "+",
    label: "Happy Explorers",
    icon: "fluent:people-community-24-regular",
    desc: "Curated 5-star travel memories",
  },
  {
    value: 99,
    suffix: ".6%",
    label: "Sightings Record",
    icon: "material-symbols:visibility-outline",
    desc: "Tiger, lion & elephant expeditions",
  },
  {
    value: 18,
    suffix: "+",
    label: "Global Eco Awards",
    icon: "ph:trophy-bold",
    desc: "Recognized for conservation ethics",
  },
];

const AboutStats = () => {
  return (
    <section className="AboutStats w-full bg-dark sectionPadding relative overflow-hidden">
      <div className="custom-container relative z-10 flex flex-col items-center gap-[3rem] md:gap-[4.8rem]">
        <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
          <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
            Our Proven Track Record
          </span>
          <h2 className="text-white font-semibold">
            Decades of Passion for <span className="text-secondary">Wild Frontiers</span>
          </h2>
        </AnimeFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2rem] sm:gap-[3rem] w-full">
          {stats.map((stat, idx) => (
            <AnimeFadeIn
              key={idx}
              delay={idx * 120}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.2rem] p-[3rem] flex flex-col items-center text-center gap-[1.5rem] hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-primary/20 text-primary flex items-center justify-center text-[2.8rem] group-hover:scale-110 transition-transform">
                <Icon icon={stat.icon} />
              </div>
              <div className="text-[3.6rem] sm:text-[4.2rem] font-bold text-white NewFont leading-[1]">
                <AnimeCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[1.8rem] font-semibold text-secondary">
                {stat.label}
              </div>
              <p className="text-[1.3rem] text-gray-300">
                {stat.desc}
              </p>
            </AnimeFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
