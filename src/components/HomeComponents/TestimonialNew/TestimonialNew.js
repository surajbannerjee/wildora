"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import TestimonialSlideItem from "./TestimonialSlideItem";
import TestimonialData from "./TestimonialData"; // Assuming you have a file with testimonial data
import Image from "next/image";
import { TESTIMONIAL_IMAGE } from "@/constants/images";
import { Icon } from "@iconify/react";

const TestimonialNew = () => {
    // Create refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        setNavigationReady(true);
    }, []);
    return (
        <section
            className="TestimonialNewSec relative sectionPadding white-bg-section bg-lightGreen3 overflow-hidden "
            style={{
                backgroundImage: `url(${TESTIMONIAL_IMAGE})`,
                backgroundSize: "45%",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="custom-container relative flex items-center justify-end md:gap-[4.8rem] gap-[1.5rem]">
                <div className="md:w-1/2 w-full lg:mt-[0] mt-[30px] flex flex-col items-start justify-center h-full gap-8">
                    <span className="text-primary ButtonFont text-[4rem] leading-[1] font-medium tracking-wide">
                        Testimonial
                    </span>
                    <h2 className="text-heading-color font-semibold">
                        {" "}
                        What Client Say{" "}
                        <span className="text-secondary"> About us</span>
                    </h2>
                    {/* testimonial Slider */}
                    <div className="w-full flex items-center justify-center mt-[5rem] relative">
                        <style>{`
                            .vertical-swiper-container {
                                height: 300px;
                                min-height: 300px;
                                max-height: 100vh;
                                overflow: hidden;
                            }
                            .vertical-swiper-container .swiper-slide {
                                height: 300px !important;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            /* Custom arrow styles */
                            .swiper-button-prev, .swiper-button-next {
                                color: var(--color-primary);
                                background: transparent;
                                border-radius: 50%;
                                border: 2px solid var(--color-primary);
                                width: 40px;
                                height: 40px;
                                bottom: 50px;
                                top: auto;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                display: flex;
                                padding: 6px;
                                align-items: center;
                                justify-content: center;
                                position: absolute;
                            }
                            .swiper-button-prev:hover, .swiper-button-next:hover {
                                background: var(--color-primary);
                                color: #fff;
                            }
                            .swiper-button-prev::after, .swiper-button-next::after {
                              display: none;
                            }
                            .swiper-button-prev {
                                right: 50px;
                                left: auto;
                            }
                            .swiper-button-next {
                                right: 0px;
                            }
                        `}</style>
                        <Swiper
                            direction="vertical"
                            modules={[Autoplay, Navigation]}
                            slidesPerView={1}
                            spaceBetween={30}
                            navigation={navigationReady ? {
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            } : false}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            loop={true}
                            className="w-full vertical-swiper-container"
                        >
                            {TestimonialData.map((t, idx) => (
                                <SwiperSlide key={idx} className="w-full block!">
                                    <TestimonialSlideItem t={t} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Navigation arrows */}
                        <div ref={prevRef} className="swiper-button-prev">
                            <Icon icon="guidance:right-arrow" className="" />
                        </div>
                        <div ref={nextRef} className="swiper-button-next">
                            <Icon icon="guidance:left-arrow" className="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialNew;