"use client";
import Image from "next/image";
import { HERO_IMAGE1, HERO_IMAGE2, LION, LION1, TOUR_BG } from "@/constants/images";
import { AppButton } from "@/components/Button";
import { Icon } from "@iconify/react";
import React from "react";


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
            <div className="absolute inset-0 bg-black opacity-70 z-[1]"></div>
            <div className="custom-container flex md:flex-row flex-col items-center justify-between h-full">
                <div className="relative z-[2] lg:w-1/2 lg:mt-[0] mt-[30px] h-[100%]">
                    <Image
                        src={LION1}
                        alt="Safari Image"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                <div className="relative z-[2] lg:w-1/2 lg:mt-[0] mt-[30px] md:pl-[6rem] flex flex-col items-start justify-center h-full gap-8">
                    <span className="text-primary text-[1.8rem] font-semibold uppercase">
                        Safari Tours
                    </span>
                    <h2 className="text-white uppercase"> Discover the Majesty of the Wild <span className="text-secondary">– Asiatic Lions Safari Tours</span></h2>
                    <p className="text-[2rem] text-white">
                        Experience the thrill of a lifetime with our exclusive Asiatic Lions Safari Tours.
                        Explore the wild like never before, guided by experts who know the terrain and the majestic creatures that inhabit it.
                    </p>
                    <div className="flex flex-wrap gap-4 w-full">
                        <ul className="flex flex-col gap-4">
                            {firstColumn.map((feature, idx) => (
                                <li className="flex items-center  flex-row text-[1.8rem] justify-start gap-5 font-semibold text-white" key={idx}>
                                    <span>
                                        <Icon icon="garden:check-badge-fill-12" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <ul className="flex flex-col gap-4">
                            {secondColumn.map((feature, idx) => (
                                <li className="flex items-center flex-row text-[1.8rem] justify-start gap-5 font-semibold text-white" key={idx}>
                                    <span>
                                        <Icon icon="garden:check-badge-fill-12" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <AppButton href="/safari" classes="mt-[3rem]">
                        Book Your Safari Adventure
                    </AppButton>

                </div>
            </div>
        </section>
    );
};

export default SafariSec;
