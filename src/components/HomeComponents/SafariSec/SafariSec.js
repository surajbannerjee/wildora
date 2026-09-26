"use client";
import Image from "next/image";
import { LION1 } from "@/constants/images";
import { AppButton } from "@/components/Button";
import { Icon } from "@iconify/react";
import React from "react";
import { AnimeFadeIn } from "@/components/Anime/AnimeComponents";

const features = [
    "Expert wildlife guides",
    "Custom itineraries",
    "Luxury jungle stays",
    "Hassle-free permits",
    "Safety-first approach",
    "Eco-friendly practices",
];

const firstColumn = features.slice(0, 3);
const secondColumn = features.slice(3);

const SafariSec = () => {
    return (
        <section className="offer-banner w-full bg-dark sectionPadding min-h-[100vh] flex md:flex-row flex-col items-center justify-center relative overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
                autoPlay
                loop
                muted
                playsInline
                src="https://cdn.pixabay.com/video/2024/02/04/199221-909835682_large.mp4"
                type="video/mp4"
            />
            <div className="absolute inset-0 bg-black/75 z-[1]"></div>
            <div className="custom-container flex lg:flex-row flex-col items-center justify-between h-full gap-[3rem] lg:gap-0 relative z-[2]">
                <div className="lg:w-1/2 w-full lg:mt-0 flex items-center justify-center">
                    <div direction="right" duration={900} className="w-full flex justify-center">
                        <div className="relative group max-w-[45rem] lg:max-w-full">
                            <Image
                                src={LION1}
                                alt="Safari Lion"
                                width={1000}
                                height={1000}
                                className="w-full h-auto object-cover rounded-[2.4rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full text-[1.4rem] shadow-xl hidden sm:flex items-center gap-2">
                                <Icon icon="solar:crown-line-duotone" className="text-[2rem]" />
                                King of the Gir Forest
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full lg:mt-0 lg:pl-[6rem] flex flex-col items-start justify-center h-full gap-6 sm:gap-8">
                    <AnimeFadeIn direction="up">
                        <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
                            Safari Tours
                        </span>
                        <h2 className="text-white font-semibold mt-2">
                            Discover the Majesty of the Wild <span className="text-secondary">– Asiatic Lions Safari</span>
                        </h2>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={150}>
                        <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-200 leading-[1.6]">
                            Experience the thrill of a lifetime with our exclusive Asiatic Lions Safari Tours.
                            Explore the wild like never before, guided by experts who know the terrain and the majestic creatures that inhabit it.
                        </p>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={250} className="w-full">
                        <div className="flex flex-wrap gap-[2rem] sm:gap-[4rem] w-full">
                            <ul className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-[15rem]">
                                {firstColumn.map((feature, idx) => (
                                    <li className="flex items-center flex-row text-[1.4rem] sm:text-[1.6rem] justify-start gap-4 sm:gap-5 font-medium text-white" key={idx}>
                                        <span className="text-primary shrink-0 text-[1.8rem]">
                                            <Icon icon="garden:check-badge-fill-12" />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-[15rem]">
                                {secondColumn.map((feature, idx) => (
                                    <li className="flex items-center flex-row text-[1.4rem] sm:text-[1.6rem] justify-start gap-4 sm:gap-5 font-medium text-white" key={idx}>
                                        <span className="text-primary shrink-0 text-[1.8rem]">
                                            <Icon icon="garden:check-badge-fill-12" />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimeFadeIn>

                    <AnimeFadeIn direction="up" delay={350}>
                        <AppButton href="/packages" classes="mt-[1rem]">
                            Book Your Safari Adventure
                        </AppButton>
                    </AnimeFadeIn>
                </div>
            </div>
        </section>
    );
};

export default SafariSec;
