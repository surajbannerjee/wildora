"use client";
import React, { useState } from "react";
import { MAP, TEAM_3_1, TEAM_3_2, TEAM_3_3 } from "@/constants/images";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Example testimonial data
const testimonials = [
    {
        image: TEAM_3_1,
        name: "John Doe",
        designation: "CEO, Company",
        review: "An amazing experience! The team was professional and the service was top-notch.",
        position: { top: "00%", left: "25%" },
        rating: 5,
    },
    {
        image: TEAM_3_2,
        name: "Jane Smith",
        designation: "CTO, TechCorp",
        review: "The best safari guide ever. Loved every moment.",
        position: { top: "50%", left: "20%" },
        rating: 4.5,
    },
    {
        image: TEAM_3_3,
        name: "Samuel Lion",
        designation: "Wildlife Photographer",
        review: "A truly unforgettable adventure.",
        position: { top: "20%", right: "10%" },
        rating: 5,
    },
];

const Testimonial = () => {
    const [activeIdx, setActiveIdx] = useState(0);


    return (
        <section className="TestimonialSec relative sectionPadding bg-dark overflow-hidden">
            <div className="custom-container relative flex flex-col items-center justify-center md:gap-[4.8rem] gap-[1.5rem]">
                <div className="Heading text-center flex flex-col items-center justify-center gap-[2rem]">
                    <span className="text-primary ButtonFont text-[4rem] leading-[1] font-medium tracking-wide">
                        Testimonial
                    </span>
                    <h2 className="text-white font-semibold">
                        What Client Say{" "}
                        <span className="text-secondary"> About us</span>
                    </h2>
                </div>
                <div
                    className="TestimonialSec w-full flex items-center justify-center min-h-[60rem] bg-center bg-contain bg-no-repeat relative"
                    style={{ backgroundImage: `url(${MAP})` }}
                >
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="absolute flex flex-col justify-center items-center gap-[1.3rem] group"
                            style={{ ...t.position, }}
                            onMouseEnter={() => setActiveIdx(idx)}
                        >
                            {/* Review Content Box */}
                            <div
                                className={`mb-4 transition-all text-center flex flex-col justify-center items-center gap-[1rem] duration-500 ${activeIdx === idx
                                    ? " scale-x-100 z-10"
                                    : " scale-x-0 pointer-events-none z-0"
                                    }`}
                                style={{
                                    minWidth: "447px",
                                    maxWidth: "500px",
                                    minHeight: "50px",
                                    maxHeight: "300px",
                                    background: "rgba(255,255,255,0.95)",
                                    borderRadius: "1.2rem",
                                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                                    padding: "1.5rem 2rem",
                                    transformOrigin: "center",
                                }}
                            >

                                <div className="text-text-color text-[1.6rem] line-clamp-8">
                                    {t.review}
                                </div>
                                {/* rating stars */}
                                <div className="flex items-center justify-center">
                                    {[...Array(5)].map((_, starIdx) => {
                                        const fullStars = Math.floor(t.rating);
                                        const hasHalf = t.rating - fullStars >= 0.5;
                                        let icon = "ic:round-star";
                                        if (starIdx < fullStars) {
                                            icon = "ant-design:star-filled";
                                        } else if (starIdx === fullStars && hasHalf) {
                                            icon = "ic:round-star-half";
                                        }
                                        return (
                                            <Icon
                                                key={starIdx}
                                                icon={icon}
                                                className={`text-[2rem] ${icon !== "ic:round-star" ? "text-yellow-500" : "text-gray-400"}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Client Image with Blinking Badge */}
                            <div className="flex relative flex-col items-center justify-center rounded-full transition-all duration-500">
                                <div className="relative flex items-center justify-center">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={100}
                                        height={100}
                                        className={`rounded-full h-[6rem] w-[6rem] border-2 border-primary shadow-lg transition ${activeIdx === idx ? "scale-120" : "scale-100"}`}
                                        style={{ objectFit: "cover" }}
                                    />
                                    {/* Blinking Badge */}
                                    <span className={`absolute top-0 right-3 w-5 h-5 rounded-full bg-green-500 border-2 border-white blink ${activeIdx === idx ? "opacity-0" : "opacity-100"}`} />
                                </div>
                                <div className={`font-semibold text-[2rem] text-white mt-5 ${activeIdx === idx ? " scale-[1]" : " scale-0"}`}>
                                    {t.name}
                                </div>
                                <div className={`font-semibold text-[1.4rem] text-white ${activeIdx === idx ? " scale-[1]" : " scale-0"}`}>
                                    {t.designation}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;