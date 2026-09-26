"use client";
import React from "react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { HERO_IMAGE4 } from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";
import { Icon } from "@iconify/react";

const privacyData = [
  {
    icon: "solar:user-id-bold",
    title: "1. Information We Collect",
    content:
      "We collect personal identification details (names, passport numbers, email addresses, phone numbers) required strictly for government park permit reservations, flight bookings, and customized safari itinerary arrangements.",
  },
  {
    icon: "solar:lock-keyhole-bold",
    title: "2. How We Protect Your Data",
    content:
      "We implement industry-standard 256-bit SSL encryption across our booking portal and CRM. Your payment details are processed through PCI-DSS certified payment gateways and never stored on our local servers.",
  },
  {
    icon: "solar:share-circle-bold",
    title: "3. Third-Party Sharing",
    content:
      "Your personal information is only shared with official National Park forest authorities and verified accommodation partners as required by wildlife reserve permit regulations. We will never sell or rent your personal information to third-party marketers.",
  },
  {
    icon: "solar:cookie-bold",
    title: "4. Cookies and Web Analytics",
    content:
      "We use essential cookies to maintain your browsing session, remember itinerary preferences, and aggregate anonymized visitor statistics to optimize our platform's speed and user experience.",
  },
  {
    icon: "solar:shield-warning-bold",
    title: "5. Your Privacy Rights",
    content:
      "You have the right to request a copy of the personal information we hold about you, request corrections to erroneous data, or request the deletion of your account records by contacting our data protection officer at privacy@wildora.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="w-full bg-[#f9fbf8]">
      <BreadcrumbBanner
        title="Privacy Policy"
        breadcrumb={["Home", "Privacy Policy"]}
        backgroundImage={HERO_IMAGE4}
        subtitle="Data Privacy & Protection"
      />

      <section className="sectionPadding">
        <div className="custom-container max-w-[100rem]">
          <AnimeFadeIn direction="up">
            <div className="text-center mb-[4rem] sm:mb-[6rem]">
              <span className="text-primary ButtonFont text-[2.8rem] sm:text-[3.5rem] leading-none">
                Data Protection
              </span>
              <h2 className="text-heading-color font-bold text-[2.4rem] sm:text-[3.4rem] mt-2">
                Your Privacy Matters to Us
              </h2>
              <p className="text-gray-500 text-[1.4rem] sm:text-[1.6rem] mt-3">
                Last updated: January 15, 2025 • How Wildora handles and safeguards your personal information.
              </p>
            </div>
          </AnimeFadeIn>

          <AnimeStaggerList staggerDelay={70} className="flex flex-col gap-6">
            {privacyData.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-[2.4rem] sm:p-[3.5rem] border border-[#E8ECE6] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-[4.4rem] h-[4.4rem] rounded-[1.2rem] bg-[#EAF4E6] text-primary flex items-center justify-center shrink-0 mt-1">
                    <Icon icon={policy.icon} className="text-[2.2rem]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-heading-color font-bold text-[1.8rem] sm:text-[2.2rem]">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 text-[1.4rem] sm:text-[1.6rem] leading-relaxed">
                      {policy.content}
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
