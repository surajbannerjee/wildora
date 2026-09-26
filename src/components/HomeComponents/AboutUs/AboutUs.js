"use client";
import { AppButton } from "@/components/Button";
import { HERO_IMAGE5, SIDE1, SIDE2 } from "@/constants/images";
import Image from "next/image";

const AboutUs = () => {
    return (
        <section className="AboutUs w-full relative sectionPadding xl:pt-[20rem] md:pt-[16rem] pt-[10rem] sm:pt-[12rem] overflow-hidden bg-dark">
            <Image
                height={500}
                width={500}
                src={SIDE1}
                alt="About Us Background"
                className="absolute -top-10 left-0 max-w-[35vw] sm:max-w-[28rem] xl:w-[38rem] h-auto object-cover opacity-20 xl:opacity-60 pointer-events-none z-0"
                priority
            />
            <Image
                height={500}
                width={500}
                src={SIDE2}
                alt="About Us Background"
                className="absolute right-0 bottom-0 max-w-[40vw] sm:max-w-[30rem] xl:w-[40rem] h-auto object-cover opacity-20 xl:opacity-60 pointer-events-none z-0"
                priority
            />
            <div className="custom-container relative flex flex-col md:flex-row items-center justify-center md:gap-[6rem] gap-[3rem] z-10">
                {/* Video Box */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full">
                        <div className="relative w-full aspect-[4/3] sm:h-[38rem] md:h-[44rem] lg:h-[48rem] rounded-[2.4rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-white/20 group">
                            <video
                                src="https://cdn.pixabay.com/video/2024/02/04/199221-909835682_large.mp4"
                                playsInline
                                autoPlay
                                loop
                                muted
                                preload="auto"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-105 contrast-105"
                            />
                            <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md text-white font-semibold text-[1.2rem] sm:text-[1.3rem] px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                                <span>4K Sanctuary Footage</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col gap-[1.5rem] sm:gap-[2rem] items-start">
                    <span className="text-primary ButtonFont text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-[1] font-medium tracking-wide">
                        About Us
                    </span>
                    <h2 className="font-semibold text-white">Welcome to <span className="text-secondary">Wildora</span></h2>
                    <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-200 leading-[1.6] mb-[1.5rem] sm:mb-[2rem]">
                        At Wildora, we curate unforgettable journeys that connect you with the heart of nature. Whether you're seeking luxury retreats, wildlife encounters, or cultural discoveries, our expert team is here to craft seamless, meaningful adventures designed around your passions. Your next great story begins here.
                    </p>
                    <AppButton href="/about">Learn More</AppButton>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;