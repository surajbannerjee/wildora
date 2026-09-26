"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ANIMAL1, ANIMAL2, ANIMAL3, ANIMAL4, ANIMAL5, ANIMAL6, ANIMAL7, ANIMAL8 } from "@/constants/images";
import Image from "next/image";

const animals = [
    { icon: ANIMAL1, name: "African Lion" },
    { icon: ANIMAL2, name: "Giraffe" },
    { icon: ANIMAL3, name: "Black Howler" },
    { icon: ANIMAL4, name: "Elephant" },
    { icon: ANIMAL5, name: "Hyenas" },
    { icon: ANIMAL6, name: "Reindeer" },
    { icon: ANIMAL7, name: "Crocodile" },
    { icon: ANIMAL8, name: "Macaw" },
];

const AnimalsSlider = () => {
    return (
        <section className="AnimalsSlider w-full relative bg-dark">
            <div className="custom-container">
                <div className="w-full flex items-center justify-center bg-dark md:py-[3rem] py-[1.5rem] md:px-[5rem] px-[1.5rem] md:rounded-full rounded-[2.4rem] md:mt-[-7rem] mt-[-4rem] relative z-[3] border-[3px] md:border-[5px] border-primary shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={12}
                        freeMode={true}
                        loop={true}
                        autoplay={{ delay: 100, disableOnInteraction: false }}
                        speed={2500}
                        breakpoints={{
                            0: { slidesPerView: 2, spaceBetween: 12 },
                            480: { slidesPerView: 3, spaceBetween: 16 },
                            768: { slidesPerView: 3, spaceBetween: 20 },
                            1024: { slidesPerView: 4, spaceBetween: 24 },
                            1140: { slidesPerView: 5, spaceBetween: 24 },
                            1280: { slidesPerView: 5, spaceBetween: 24 },
                            1440: { slidesPerView: 6, spaceBetween: 24 },
                        }}
                        className="w-full py-[1.5rem] md:py-[2.5rem]"
                    >
                        {animals.map((animal, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-110 select-none">
                                    <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-primary/20">
                                        <Image
                                            src={animal.icon}
                                            alt={animal.name}
                                            width={200}
                                            height={200}
                                            className="w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] md:h-[70px] md:w-[70px] object-contain transition-transform duration-300 group-hover:rotate-6"
                                        />
                                    </div>
                                    <span className="NewFont md:text-[2rem] text-[1.4rem] sm:text-[1.6rem] font-medium text-white group-hover:text-secondary transition-colors text-center">
                                        {animal.name}
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default AnimalsSlider;