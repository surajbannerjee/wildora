"use client";
import Image from "next/image";
import { HERO_IMAGE2, HIKING, ICON1, MAN, BG_SLIDE, TOURISM, TRAVEL } from "@/constants/images";
import { AppButton } from "@/components/Button";
import { Icon } from "@iconify/react";
import React from "react";
import { AnimeFadeIn, AnimeStaggerList } from "@/components/Anime/AnimeComponents";

const features = [
    "Expert Wildlife Trackers & Naturalists",
    "Tailored Luxury & Adventure Itineraries",
    "24/7 Dedicated Concierge Support",
    "100% Eco-Certified Sustainable Operations",
];

const whyChooseUsCards = [
    {
        image: TRAVEL,
        title: "Personalized Service",
        desc: "Handpicked luxury lodges and bespoke private safari game drives tailored just for you.",
    },
    {
        image: TOURISM,
        title: "Expert Planning",
        desc: "Precision itineraries crafted by certified wildlife biologists and experienced safari directors.",
    },
    {
        image: MAN,
        title: "Trusted Field Partners",
        desc: "Direct collaborations with national park rangers, indigenous trackers, and premier wilderness camps.",
    },
    {
        image: HIKING,
        title: "24/7 Field Support",
        desc: "Real-time emergency coordination and seamless assistance across every phase of your journey.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="WhyChooseUsSec w-full white-bg-section bg-white sectionPadding md:px-10 relative overflow-hidden">
            <div className="bgSlideImage" style={{ backgroundImage: `url(${BG_SLIDE})` }}></div>
            <div className="custom-container relative flex items-center justify-center lg:flex-row flex-col md:gap-[4.8rem] gap-[3rem]">
                <div className="lg:w-1/2 w-full lg:mt-0 flex flex-col items-start justify-center h-full gap-6 sm:gap-8">
                    <AnimeFadeIn direction="up">
                        <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
                            why choose us?
                        </span>
                        <h2 className="text-heading-color font-semibold mt-2">
                            We Make Every Journey <span className="text-secondary">Seamless & Inspiring</span>
                        </h2>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={150}>
                        <p className="text-[1.5rem] sm:text-[1.6rem] text-heading-color leading-[1.6]">
                            From exhilarating big-cat tracking to tranquil wilderness camps, we curate immersive safaris that connect you deeply with nature and local cultures — backed by decades of conservation expertise.
                        </p>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={250} className="w-full">
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {features.map((feature, idx) => (
                                <li className="flex items-center text-[1.5rem] sm:text-[1.6rem] justify-start gap-4 sm:gap-5 font-medium text-heading-color" key={idx}>
                                    <span className="text-primary shrink-0 text-[2rem]">
                                        <Icon icon="garden:check-badge-fill-12" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={350}>
                        <AppButton href="/packages" classes="mt-[1rem]">
                            Explore More
                        </AppButton>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={450} className="w-full">
                        <div className="relative w-full max-w-[40rem] flex flex-col-reverse sm:block items-start gap-[2rem] justify-start mt-6 sm:mt-10 group">
                            <Image
                                src={HERO_IMAGE2}
                                alt="Why Choose Us Background"
                                width={1000}
                                height={1000}
                                className="w-full sm:w-[40rem] h-[16rem] sm:h-[18rem] object-cover rounded-[2.2rem] shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                                priority
                            />
                            <div className="bg-primary sm:absolute relative sm:right-[-4rem] md:right-[-4rem] lg:right-[-6rem] xl:right-[-12rem] sm:top-[-8rem] md:top-[-10rem] rounded-[2.2rem] px-[1.5rem] py-[2.5rem] sm:py-[3.5rem] w-[18rem] sm:w-[22rem] flex flex-col items-center justify-center gap-[1.5rem] sm:gap-[2rem] text-center shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                                <Image
                                    src={ICON1}
                                    alt="Award Icon"
                                    width={500}
                                    height={500}
                                    className="w-[5rem] sm:w-[7rem] h-auto object-contain animate-bounce"
                                    priority
                                />
                                <span className="text-[1.7rem] sm:text-[2rem] text-white font-semibold leading-tight">
                                    Award-Winning Adventures
                                </span>
                            </div>
                        </div>
                    </AnimeFadeIn>
                </div>

                <div className="lg:w-1/2 h-full w-full">
                    <AnimeStaggerList
                        staggerDelay={90}
                        className="grid sm:grid-cols-2 grid-cols-1 gap-[2rem] sm:gap-[3rem]"
                    >
                        {whyChooseUsCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="relative item flex items-center flex-col bg-[#EAF4E6] py-[3rem] sm:py-[4rem] px-[2rem] sm:px-[2.5rem] rounded-[2.2rem] border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group cursor-default"
                            >
                                <div className="pb-[1.5rem] sm:pb-[2rem] mb-[1.5rem] sm:mb-[2rem] border-b border-B w-full flex items-start flex-col gap-4">
                                    <div className="w-[6rem] h-[6rem] rounded-[1.6rem] bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            width={70}
                                            height={70}
                                            className="w-[4rem] h-[4rem] object-contain"
                                            priority
                                        />
                                    </div>
                                    <span className="text-[2rem] sm:text-[2.2rem] text-heading-color font-semibold group-hover:text-primary transition-colors">
                                        {card.title}
                                    </span>
                                </div>
                                <p className="text-[1.4rem] sm:text-[1.6rem] leading-[1.5] text-heading-color">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </AnimeStaggerList>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
