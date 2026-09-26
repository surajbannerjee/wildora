"use client";
import TextSlider from "@/components/TextSlider/TextSlider";
import { HERO_IMAGE8, RECTANGLE } from "@/constants/images";
import Image from "next/image";
import { AppButton } from "@/components/Button";
import { AnimeFadeIn } from "@/components/Anime/AnimeComponents";

const Call_To_Action = () => {
    return (
        <section className="WhyChoose w-full relative sectionPadding py-[8rem] sm:py-[10rem] md:py-[12rem] xl:pt-[15rem] xl:pb-[25rem] overflow-hidden bg-cover bg-center bg-no-repeat bg-dark flex items-center justify-center" style={{ backgroundImage: `url(${HERO_IMAGE8})` }}>
            <div className="custom-container relative flex flex-col xl:flex-row items-center justify-end md:gap-[6rem] gap-[3rem]">
                {/* Marquee text slider */}
                <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[45%] xl:max-w-[45%] 2xl:max-w-[40%] xl:absolute 2xl:left-0 xl:left-[3rem] xl:top-[65%] xl:translate-y-0 xl:translate-x-0 mx-auto xl:mx-0 overflow-hidden whitespace-nowrap z-[3] order-2 xl:order-1 mt-[2rem] xl:mt-0">
                    <TextSlider />
                </div>

                {/* Text Content */}
                <div className="w-full xl:w-[70%] flex flex-col xl:gap-[1.5rem] md:gap-[3rem] gap-[2rem] xl:items-start items-center xl:justify-start justify-center relative z-[2] order-1 xl:order-2">
                    <AnimeFadeIn direction="up">
                        <span className="2xl:text-[7rem] xl:text-[6.5rem] md:text-[5.5rem] sm:text-[4rem] text-[2.8rem] leading-[1.3] font-medium NewFont2 text-white flex flex-wrap items-center sm:items-end xl:justify-start justify-center gap-[1rem] sm:gap-[1.5rem] text-center">
                            Wild <span className="text-secondary uppercase 2xl:text-[8.5rem] xl:text-[8rem] md:text-[6.5rem] sm:text-[5rem] text-[3.4rem] leading-[1.3] font-bold">life</span> With
                        </span>
                    </AnimeFadeIn>
                    <AnimeFadeIn direction="up" delay={150}>
                        <span className="2xl:text-[7rem] xl:text-[6.5rem] md:text-[5.5rem] sm:text-[4rem] text-[2.8rem] leading-[1.3] font-medium NewFont2 text-white flex items-center sm:items-end gap-[1rem] sm:gap-[1.5rem] xl:pl-[15rem] relative">
                            <span className="text-secondary uppercase 2xl:text-[8.5rem] xl:text-[8rem] md:text-[6.5rem] sm:text-[5rem] text-[3.4rem] leading-[1.3] font-bold">Wild-dale</span>
                            <Image
                                height={500}
                                width={500}
                                src={RECTANGLE}
                                alt="Wildlife Image"
                                className="absolute right-[-10rem] 2xl:top-[-8rem] xl:top-[-5rem] lg:top-[-4rem] 2xl:w-[16rem] xl:w-[13rem] lg:w-[10rem] xl:block hidden h-auto object-cover animate-float"
                                priority
                            />
                        </span>
                    </AnimeFadeIn>
                    <AnimeFadeIn direction="up" delay={300} className="xl:pl-[15rem] mt-4">
                        <AppButton href="/packages" variant="secondary">
                            Explore All Expeditions
                        </AppButton>
                    </AnimeFadeIn>
                </div>
            </div>
        </section>
    );
};

export default Call_To_Action;