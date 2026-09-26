"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { CONTACT_BG_7 } from "@/constants/images";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";

import { AppButton } from "@/components/Button";
import CustomDatePicker from "@/components/CustomInputs/CustomDatePicker";
import CustomSelect from "@/components/CustomInputs/CustomSelect";

const destinationOptions = [
  { value: "", label: "Select Destination", icon: "solar:compass-bold" },
  { value: "Serengeti", label: "Serengeti (Tanzania)", icon: "solar:cat-bold" },
  { value: "Maasai Mara", label: "Maasai Mara (Kenya)", icon: "solar:crown-bold" },
  { value: "Bandhavgarh", label: "Bandhavgarh Tiger Trail (India)", icon: "solar:cat-bold" },
  { value: "Gir", label: "Gir Asiatic Lion Reserve (India)", icon: "solar:crown-bold" },
  { value: "Yala", label: "Yala Leopard Haven (Sri Lanka)", icon: "solar:paw-bold" },
  { value: "Okavango", label: "Okavango Delta (Botswana)", icon: "solar:water-sun-bold" },
];

const contactCards = [
  {
    icon: "mdi:phone-in-talk",
    title: "24/7 Safari Desk",
    line1: "+1 (234) 567-890",
    line2: "+254 700 123 456 (WhatsApp)",
    href1: "tel:+1234567890",
    href2: "https://wa.me/254700123456",
  },
  {
    icon: "mdi:email-fast-outline",
    title: "Direct Email Inquiry",
    line1: "expeditions@wildora.com",
    line2: "bookings@wildora.com",
    href1: "mailto:expeditions@wildora.com",
    href2: "mailto:bookings@wildora.com",
  },
  {
    icon: "mdi:map-marker-radius",
    title: "African Field Office",
    line1: "123 Safari Avenue, Karen",
    line2: "Nairobi, Kenya",
    href1: "https://maps.google.com/?q=Nairobi,+Kenya",
  },
  {
    icon: "mdi:office-building-marker",
    title: "Asian Field Office",
    line1: "45 Jungle Gate Road",
    line2: "New Delhi & Bandhavgarh, India",
    href1: "https://maps.google.com/?q=New+Delhi,+India",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    guests: "2",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <BreadcrumbBanner
        backgroundImage={CONTACT_BG_7}
        breadcrumb={["Home", "Contact Us"]}
        title="Connect With Our Safari Experts"
        subtitle="24/7 Expedition Concierge"
      />

      {/* Main Contact Section */}
      <section className="white-bg-section bg-white sectionPadding relative overflow-hidden">
        <div className="custom-container flex flex-col gap-[4rem] md:gap-[6rem]">
          <AnimeFadeIn className="text-center flex flex-col items-center justify-center gap-[1.5rem]">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 bg-[#EAF4E6] text-primary px-4 py-1.5 rounded-full text-[1.3rem] font-bold border border-primary/20 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>Senior Naturalists Desk • Online Now (15-min avg response)</span>
            </div>

            <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
              We're Here for You
            </span>
            <h2 className="text-heading-color font-semibold">
              Plan Your Next Safari <span className="text-secondary">With Ease</span>
            </h2>
            <p className="text-[1.5rem] sm:text-[1.6rem] text-text-color max-w-[75rem]">
              Speak directly with our senior naturalists to plan private itineraries, verify park permit availability, or arrange custom wildlife photography tours.
            </p>
          </AnimeFadeIn>

          {/* 4 Contact Info Cards */}
          <AnimeStaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2rem] sm:gap-[2.5rem] w-full">
            {contactCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#EAF4E6] rounded-[2.2rem] p-[2.5rem] sm:p-[3rem] flex flex-col items-center text-center gap-[1.5rem] hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-white text-primary flex items-center justify-center text-[2.6rem] group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon icon={card.icon} />
                </div>
                <h3 className="text-[1.9rem] font-bold text-heading-color">{card.title}</h3>
                <div className="flex flex-col gap-1 text-[1.4rem] text-text-color">
                  {card.href1 ? (
                    <a href={card.href1} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                      {card.line1}
                    </a>
                  ) : (
                    <span>{card.line1}</span>
                  )}
                  {card.line2 && (
                    card.href2 ? (
                      <a href={card.href2} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                        {card.line2}
                      </a>
                    ) : (
                      <span>{card.line2}</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </AnimeStaggerList>

          {/* Form & Map Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] items-start w-full pt-[2rem]">
            {/* Left: Interactive Form */}
            <AnimeFadeIn className="lg:col-span-7 bg-[#F7F8FB] rounded-[2.8rem] p-[3rem] sm:p-[4.5rem] shadow-xl border border-gray-100 flex flex-col gap-[2.5rem]">
              <div className="flex flex-col gap-2">
                <span className="text-secondary font-semibold text-[1.4rem]">Direct Reservation Desk</span>
                <h3 className="text-[2.6rem] sm:text-[3rem] font-bold text-heading-color">
                  Send Your Safari Inquiry
                </h3>
              </div>

              {submitted ? (
                <div className="bg-[#EAF4E6] border border-primary/40 rounded-[2rem] p-[3rem] flex flex-col items-center text-center gap-[1.5rem]">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-[3rem]">
                    <Icon icon="line-md:confirm" />
                  </div>
                  <h4 className="text-[2.2rem] font-bold text-heading-color">Inquiry Received!</h4>
                  <p className="text-[1.5rem] text-text-color max-w-[45rem]">
                    Thank you, {formData.name || "Explorer"}! One of our senior wildlife naturalists will review your request and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-[1.4rem] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-[2.2rem]">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                      <Icon icon="solar:user-bold" className="text-primary text-[1.6rem]" />
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-h-[4.8rem] h-[4.8rem] px-5 rounded-full bg-[#f9fbf8] text-heading-color text-[1.4rem] border border-gray-200 focus:border-primary focus:bg-white outline-none shadow-sm transition"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                      <Icon icon="solar:letter-bold" className="text-primary text-[1.6rem]" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-h-[4.8rem] h-[4.8rem] px-5 rounded-full bg-[#f9fbf8] text-heading-color text-[1.4rem] border border-gray-200 focus:border-primary focus:bg-white outline-none shadow-sm transition"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                      <Icon icon="solar:phone-bold" className="text-primary text-[1.6rem]" />
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full min-h-[4.8rem] h-[4.8rem] px-5 rounded-full bg-[#f9fbf8] text-heading-color text-[1.4rem] border border-gray-200 focus:border-primary focus:bg-white outline-none shadow-sm transition"
                      />
                    </div>
                  </div>

                  {/* Preferred Destination - Custom Select */}
                  <CustomSelect
                    label="Preferred Destination"
                    icon="solar:map-point-wave-bold"
                    options={destinationOptions}
                    value={formData.destination}
                    onChange={(val) => setFormData({ ...formData, destination: val })}
                    theme="light"
                  />

                  {/* Number of Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                      <Icon icon="solar:users-group-two-rounded-bold" className="text-primary text-[1.6rem]" />
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-between min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 rounded-full px-5 py-2.5">
                      <span className="text-[1.4rem] font-semibold text-heading-color">
                        {formData.guests} {formData.guests === 1 ? "Person" : "People"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: Math.max(1, Number(formData.guests) - 1) })}
                          className="w-[3rem] h-[3rem] rounded-full bg-white hover:bg-gray-200 text-heading-color font-bold text-[1.5rem] flex items-center justify-center transition border border-gray-200 shadow-sm cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: Number(formData.guests) + 1 })}
                          className="w-[3rem] h-[3rem] rounded-full bg-white hover:bg-gray-200 text-heading-color font-bold text-[1.5rem] flex items-center justify-center transition border border-gray-200 shadow-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tentative Travel Date - Custom DatePicker */}
                  <CustomDatePicker
                    label="Tentative Travel Date"
                    value={formData.date}
                    onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                    theme="light"
                  />

                  {/* Custom Requests or Notes */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                      <Icon icon="solar:notes-bold" className="text-primary text-[1.6rem]" />
                      Custom Requests or Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your wildlife interests, lodge preferences, dietary needs, or special occasions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-2xl bg-[#f9fbf8] text-heading-color text-[1.4rem] border border-gray-200 focus:border-primary focus:bg-white outline-none shadow-sm resize-none transition"
                    />
                  </div>

                  <AppButton
                    type="submit"
                    variant="fill"
                    classes="sm:col-span-2 w-full justify-between"
                  >
                    Submit Safari Inquiry
                  </AppButton>
                </form>
              )}
            </AnimeFadeIn>

            {/* Right: Office Locations & Guarantees */}
            <div className="lg:col-span-5 flex flex-col gap-[3rem]">
              <AnimeFadeIn className="bg-dark text-white rounded-[2.8rem] p-[3rem] sm:p-[4rem] flex flex-col gap-[2rem] shadow-xl">
                <span className="text-primary ButtonFont text-[3rem] leading-[1]">Why Book With Wildora</span>
                <h3 className="text-white text-[2.2rem] font-bold">100% Satisfaction Guarantee</h3>
                <ul className="flex flex-col gap-4 text-[1.5rem]">
                  <li className="flex items-start gap-3">
                    <Icon icon="garden:check-badge-fill-12" className="text-primary text-[2rem] shrink-0 mt-1" />
                    <span>Official National Park Permit Verification before booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="garden:check-badge-fill-12" className="text-primary text-[2rem] shrink-0 mt-1" />
                    <span>Complimentary rescheduling due to unexpected park closures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="garden:check-badge-fill-12" className="text-primary text-[2rem] shrink-0 mt-1" />
                    <span>Emergency satellite communication in all 4x4 vehicles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="garden:check-badge-fill-12" className="text-primary text-[2rem] shrink-0 mt-1" />
                    <span>Direct contribution to anti-poaching ranger units</span>
                  </li>
                </ul>
              </AnimeFadeIn>

              {/* Office hours card */}
              <AnimeFadeIn delay={150} className="bg-[#EAF4E6] rounded-[2.8rem] p-[3rem] sm:p-[3.5rem] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:clock-time-four-outline" className="text-primary text-[3rem]" />
                  <h4 className="text-[2rem] font-bold text-heading-color">Working Hours</h4>
                </div>
                <p className="text-[1.5rem] text-text-color">
                  <strong>Monday – Saturday:</strong> 8:00 AM – 9:00 PM (EAT / IST)<br />
                  <strong>Sunday:</strong> 9:00 AM – 6:00 PM (Emergency Desk 24/7)
                </p>
              </AnimeFadeIn>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ContactPage;
