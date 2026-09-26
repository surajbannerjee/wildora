"use client";
import React from "react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import AboutSec from "@/components/AboutComponents/AboutSec";
import AboutMission from "@/components/AboutComponents/AboutMission";
import AboutStats from "@/components/AboutComponents/AboutStats";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs/WhyChooseUs";
import TourGuide from "@/components/HomeComponents/TourGuide/TourGuide";
import TestimonialNew from "@/components/HomeComponents/TestimonialNew/TestimonialNew";
import { ABOUT_BG, CONTACT_BG_7, HERO_IMAGE1 } from "@/constants/images";

const AboutPage = () => {
  return (
    <div className="about-page bg-[#f9fbf8]">
      <BreadcrumbBanner
        backgroundImage={ABOUT_BG || CONTACT_BG_7 || HERO_IMAGE1}
        breadcrumb={["Home", "About Us"]}
        title="About Wildora"
        subtitle="Our Heritage & Conservation Legacy"
      />
      <AboutSec />
      <AboutMission />
      <AboutStats />
      <WhyChooseUs />
      <TourGuide />
      <TestimonialNew />
    </div>
  );
};

export default AboutPage;
