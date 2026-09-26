"use client";
import React from "react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { HERO_IMAGE3 } from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import { Icon } from "@iconify/react";

const termsData = [
  {
    icon: "solar:shield-check-bold",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or booking any wildlife tour, safari expedition, or eco-lodge accommodation through Wildora, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
  },
  {
    icon: "solar:ticket-sale-bold",
    title: "2. Booking & Payment Policy",
    content:
      "All bookings are subject to availability and forest department permit issuance. A non-refundable 30% deposit is required at the time of reservation. The remaining balance must be cleared at least 30 days prior to the scheduled safari start date.",
  },
  {
    icon: "solar:compass-bold",
    title: "3. Wildlife Regulations & Code of Conduct",
    content:
      "Guests are strictly required to adhere to all National Park and Wildlife Sanctuary rules. Loud noises, throwing litter, feeding animals, disembarking from safari vehicles outside designated zones, and using flash photography on sensitive species are strictly prohibited.",
  },
  {
    icon: "solar:refresh-circle-bold",
    title: "4. Cancellation & Rescheduling",
    content:
      "Cancellations made 45 days prior to arrival are eligible for a 70% refund of the total package value. Park entrance and safari zone permit fees issued by government forest departments are strictly non-refundable and non-transferable under any circumstances.",
  },
  {
    icon: "solar:medical-kit-bold",
    title: "5. Travel Insurance & Medical Fitness",
    content:
      "Wildora strongly mandates that all expedition participants carry comprehensive travel, medical, and emergency evacuation insurance. Participants must declare any pre-existing medical conditions before venturing into remote wilderness areas.",
  },
  {
    icon: "solar:leaf-bold",
    title: "6. Environmental & Sustainability Pledge",
    content:
      "Wildora operates on a zero-trace eco-safari principle. We reserve the right to deny service or cancel ongoing itineraries for any guest who willfully causes harm to wildlife, natural habitats, or local tribal communities.",
  },
];

export default function TermsPage() {
  return (
    <main className="w-full bg-[#f9fbf8]">
      <BreadcrumbBanner
        title="Terms & Conditions"
        breadcrumb={["Home", "Terms & Conditions"]}
        backgroundImage={HERO_IMAGE3}
        subtitle="Expedition Terms & Guidelines"
      />

      <section className="sectionPadding">
        <div className="custom-container max-w-[100rem]">
          <AnimeFadeIn direction="up">
            <div className="text-center mb-[4rem] sm:mb-[6rem]">
              <span className="text-primary ButtonFont text-[2.8rem] sm:text-[3.5rem] leading-none">
                Legal Policies
              </span>
              <h2 className="text-heading-color font-bold text-[2.4rem] sm:text-[3.4rem] mt-2">
                Terms of Safari & Booking Services
              </h2>
              <p className="text-gray-500 text-[1.4rem] sm:text-[1.6rem] mt-3">
                Last updated: January 15, 2025 • Effective immediately for all Wildora tours.
              </p>
            </div>
          </AnimeFadeIn>

          <AnimeStaggerList staggerDelay={70} className="flex flex-col gap-6">
            {termsData.map((term, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-[2.4rem] sm:p-[3.5rem] border border-[#E8ECE6] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-[4.4rem] h-[4.4rem] rounded-[1.2rem] bg-[#EAF4E6] text-primary flex items-center justify-center shrink-0 mt-1">
                    <Icon icon={term.icon} className="text-[2.2rem]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-heading-color font-bold text-[1.8rem] sm:text-[2.2rem]">
                      {term.title}
                    </h3>
                    <p className="text-gray-600 text-[1.4rem] sm:text-[1.6rem] leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </AnimeStaggerList>
        </div>
      </section>
    </main>
  );
}
