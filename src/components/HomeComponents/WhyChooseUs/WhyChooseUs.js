"use client";
import Image from "next/image";
import { HERO_IMAGE2, HIKING, ICON1, MAN, BG_SLIDE, TOURISM, TRAVEL } from "@/constants/images";
import { AppButton } from "@/components/Button";
import { Icon } from "@iconify/react";
import React from "react";
import { motion } from "framer-motion";



const features = [
    "Expert Guides",
    "Tailored Itineraries",
    "24/7 Customer Support",
    "Sustainable Practices",
];

const whyChooseUsCards = [
    {
        image: TRAVEL,
        title: "Personalized Service",
        desc: "Handpicked stays and experiences tailored just for you.",
    },
    {
        image: TOURISM,
        title: "Expert Planning",
        desc: "Custom itineraries crafted by experienced travel professionals.",
    },
    {
        image: MAN,
        title: "Trusted Partners",
        desc: "We collaborate with the best guides and hotels.",
    },
    {
        image: HIKING,
        title: "24/7 Support",
        desc: "Reliable assistance available anytime during your journey.",
    },
];
const BG_WIDTH = 1920; // Width of the background image for seamless scrolling






const WhyChooseUs = () => {
    return (
        <section className=" WhyChooseUsSec w-full white-bg-section bg-white sectionPadding md:px-10 relative" >
            <div className="bgSlideImage" style={{ backgroundImage: `url(${BG_SLIDE})` }}></div>
            <div className="custom-container relative flex items-center justify-center lg:flex-row flex-col md:gap-[4.8rem] gap-[3rem]">
                <div className="lg:w-1/2 w-full lg:mt-[0] mt-[30px] flex flex-col items-start justify-center h-full gap-8">
                    <span className="text-primary ButtonFont text-[4rem] leading-[1] font-medium tracking-wide">
                        why choose us?
                    </span>
                    <h2 className="text-heading-color font-semibold"> We Make Every Journey <span className="text-secondary"> Seamless & Inspiring</span></h2>
                    <p className="text-[1.6rem] text-heading-color">
                        From thrilling wildlife safaris to serene escapes, we craft experiences that connect you with nature, culture, and unforgettable memories — all backed by expert planning and personalized care.
                    </p>
                    <ul className="flex flex-col gap-4">
                        {features.map((feature, idx) => (
                            <li className="flex items-center text-[1.6rem] justify-start gap-5 font-medium text-heading-color" key={idx}>
                                <span className="text-primary">
                                    <Icon icon="garden:check-badge-fill-12" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <AppButton href="#" classes="mt-[3rem]">
                        Explore More
                    </AppButton>
                    <div className="relative w-fit flex items-center justify-start mt-10">
                        <Image
                            src={HERO_IMAGE2}
                            alt="Why Choose Us Background"
                            width={1000}
                            height={1000}
                            className="w-[40rem] h-[18rem] object-cover rounded-[2.2rem] shadow-md"
                            priority
                        />
                        <div className=" bg-primary absolute md:right-[-12rem] right-[-5rem] top-[-10rem] rounded-[2.2rem] px-[1.5rem] py-[3.5rem] w-[22rem] flex flex-col items-center justify-center gap-[2rem] text-center shadow-2xl">
                            <Image
                                src={ICON1}
                                alt="Why Choose Us Background"
                                width={500}
                                height={500}
                                className="w-[7rem] h-auto object-contain"
                                priority
                            />
                            <span className="text-[2rem] text-white font-semibold">
                                Award-Winning Adventures
                            </span>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 h-full w-full">
                    <div className="grid grid-cols-2 gap-[3rem]">
                        {whyChooseUsCards.map((card, idx) => (
                            <div key={idx} className="relative item flex items-center flex-col bg-[#EAF4E6] py-[4rem] px-[2.5rem] rounded-[2.2rem] shadow-[none] hover:shadow-lg transition-shadow duration-300">
                                <div className="pb-[2rem] mb-[2rem] border-b-1 border-B w-full flex items-start flex-col gap-4">
                                    <Image
                                        src={card.image}
                                        alt={`Why Choose Us Image ${idx + 1}`}
                                        width={70}
                                        height={70}
                                        className="w-[5rem] h-[5rem] object-contain"
                                        priority
                                    />
                                    <span className="text-[2.2rem] text-heading-color font-medium">
                                        {card.title}
                                    </span>
                                </div>
                                <p className="text-[1.6rem] leading-[1.5] text-heading-color">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
