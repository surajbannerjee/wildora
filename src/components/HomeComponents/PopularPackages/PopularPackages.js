"use client";
import { HERO_IMAGE1, HERO_IMAGE2, HERO_IMAGE3, HERO_IMAGE4, HERO_IMAGE5, TOUR_BG } from "@/constants/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useRef, useState } from "react";
import PackageCard from "@/components/PackageCard/PackageCard";
import Image from "next/image";
import packages from "./packagesArray"; // Import the packages array


const BG_WIDTH = 2250;

const PopularPackages = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [centeredSlides, setCenteredSlides] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setCenteredSlides(window.innerWidth >= 1024); // 1024px is desktop breakpoint
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const swiperRef = useRef(null);
    return (
        <section className="popular-packages w-full relative pt-[6rem] bg-dark md:px-[1.5rem] overflow-hidden">
            <motion.div
                className="absolute bottom-0 left-0 flex md:h-[80%] h-[100%] w-[5000%] z-0"
                style={{ backgroundPosition: "bottom" }}
                animate={{ x: [0, -BG_WIDTH] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                }}
            >
                {/* Duplicate the image for seamless loop */}
                <Image
                    src={TOUR_BG}
                    alt="Tour Background"
                    width={BG_WIDTH}
                    height={800}
                    className="object-contain"
                    priority
                />
                <Image
                    src={TOUR_BG}
                    alt="Tour Background"
                    width={BG_WIDTH}
                    height={800}
                    className="object-contain"
                    priority
                />
            </motion.div>
            <div className="custom-container relative flex flex-col items-center justify-center md:gap-[4.8rem] gap-[1.5rem]">
                <div className="Heading text-center flex flex-col items-center justify-center gap-[1.6rem]">
                    <h2 className="text-white uppercase">
                        POPULAR WILDLIFE<span className="text-secondary"> TOUR PACKAGES</span>
                    </h2>
                    <p className="text-[2rem] text-white">Explore our most sought-after travel experiences</p>
                </div>
                <div className="package-cardsSlider w-full">
                    <Swiper
                        ref={swiperRef}
                        modules={[Autoplay]}
                        slidesPerView={1.2}
                        spaceBetween={24}
                        centeredSlides={centeredSlides}

                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3 },
                        }}
                        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
                        className="w-full"
                    >
                        {packages.map((pkg, idx) => (
                            <SwiperSlide key={pkg.id}
                                onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
                                onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}>
                                <div
                                    className={`transition-all ease-in-out duration-300 ${activeIndex === idx
                                        ? "md:scale-105 blur-none shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-10 opacity-100"
                                        : "md:scale-95  md:opacity-100 opacity-0"
                                        }`}
                                    onTouchStart={() => swiperRef.current.swiper.autoplay.stop()}
                                    onTouchMove={() => swiperRef.current.swiper.autoplay.stop()}
                                    onTouchEnd={() => swiperRef.current.swiper.autoplay.start()}

                                >
                                    <PackageCard
                                        title={pkg.title}
                                        desc={pkg.desc}
                                        image={pkg.image}
                                        link={pkg.link}
                                        linkText={pkg.linkText}
                                        location={pkg.location}
                                        rating={pkg.rating}
                                        reviews={pkg.reviews}
                                        price={pkg.price}
                                        offprice={pkg.offprice}
                                        duration={pkg.duration}
                                        feature={pkg.feature}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;