"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import { HERO_IMAGE11, HERO_IMAGE2, HERO_IMAGE3, HERO_IMAGE4, HERO_IMAGE5, HERO_IMAGE6 } from "@/constants/images";
import { AppButton } from "@/components/Button";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

const slides = [
    {
        image: HERO_IMAGE11,
        alt: "Scenic mountain adventure",
        heading: "Embark on a World of Discovery",
        description: "Uncover hidden gems and iconic destinations with expert-guided tours across the globe.",
        button: { text: "Start Exploring", href: "#" },
    },
    {
        image: HERO_IMAGE2,
        alt: "Luxury beachside retreat",
        heading: "Journeys to Remember",
        description: "From serene beaches to bustling cities — experience travel that leaves a lasting impression.",
        button: { text: "Plan Your Trip", href: "#" },
    },
    {
        image: HERO_IMAGE3,
        alt: "Traveler in nature trail",
        heading: "Your Adventure Begins Here",
        description: "Tailored experiences that bring your dream destinations to life — one unforgettable journey at a time.",
        button: { text: "Let’s Go", href: "#" },
    },
    {
        image: HERO_IMAGE4,
        alt: "Five-star resort view",
        heading: "Travel in Unmatched Luxury",
        description: "Elevate your travel with world-class comfort, premium stays, and personalized service.",
        button: { text: "Discover More", href: "#" },
    },
    {
        image: HERO_IMAGE5,
        alt: "Wildlife safari landscape",
        heading: "Wonders of the Wild",
        description: "Dive into nature’s untouched beauty — from majestic safaris to serene escapes.",
        button: { text: "Explore Tours", href: "#" },
    },
    {
        image: HERO_IMAGE6,
        alt: "Cultural festival scene",
        heading: "Immersive Cultural Getaways",
        description: "Experience the rhythm, flavors, and colors of cultures from around the world.",
        button: { text: "Join the Journey", href: "#" },
    }
]

const HeroSec = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [thumbDirection, setThumbDirection] = useState("vertical");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setThumbDirection("horizontal");
            } else {
                setThumbDirection("vertical");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <section className="hero-section w-full h-screen relative">
            {/* Main Banner Swiper */}
            <Swiper
                modules={[Autoplay, EffectFade, Thumbs]}
                effect="fade"
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                thumbs={{ swiper: thumbsSwiper }}
                className="w-full h-full"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="absolute inset-0 w-full h-full after:h-full after:w-full after:absolute after:top-0 after:left-0 after:z-[1] after:bg-gradient-to-b after:from-black/50 after:to-transparent">
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                className="object-cover w-full h-full bgimg"
                                priority={idx === 0}
                            />
                            <div className="absolute inset-0 bg-black/50" />
                        </div>
                        <div className="custom-container relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                            <div className="w-full flex flex-col items-center gap-[30px] md:max-w-[80%] 2xl:max-w-[100%]">
                                <h1 className="font-medium">{slide.heading}</h1>
                                <p className="text-[20px]">{slide.description}</p>
                                <AppButton href={slide.button.href}>{slide.button.text}</AppButton>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Pagination Swiper (vertical, right, centered) */}
            <div className="absolute xl:right-[0%] md:right-[1.2%] md:left-auto left-1/2 -translate-x-1/2 md:bottom-auto bottom-[10vh] md:top-1/2 md:-translate-y-1/2 z-[9] flex flex-col justify-center">
                <div className="xl:h-[300px] md:h-[380px] h-[80px] md:w-[100px] w-[70vw]">
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={4}
                        direction={thumbDirection}
                        spaceBetween={16}
                        watchSlidesProgress
                        className="thumbs-swiper h-full"
                    >
                        {slides.map((slide, idx) => (
                            <SwiperSlide key={idx} className="!flex !items-center !justify-center">
                                <div className="flex items-center justify-center rounded-full overflow-hidden border-3 xl:h-[60px] xl:w-[60px] md:h-[60px] md:w-[60px] h-[50px] w-[50px] border-white shadow cursor-pointer transition-all duration-300 hover:border-primary ">
                                    <Image
                                        src={slide.image}
                                        alt={slide.alt}
                                        width={300}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <style jsx global>{`
                .thumbs-swiper .swiper-slide-thumb-active > div {
                    border-color: #73b458 !important;
                   
                }
            `}</style>
        </section>
    );
};

export default HeroSec;