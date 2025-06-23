"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ANIMAL1, ANIMAL2, ANIMAL3, ANIMAL4, ANIMAL5, ANIMAL6, ANIMAL7, ANIMAL8 } from "@/constants/images";
import Image from "next/image";

const animals = [
    { icon: ANIMAL1, name: "African Lion" },
    { icon: ANIMAL2, name: "  Giraffe" },
    { icon: ANIMAL3, name: "Black howler" },
    { icon: ANIMAL4, name: "Elephant" },
    { icon: ANIMAL5, name: "  Hyenas" },
    { icon: ANIMAL6, name: "Reindeer" },
    { icon: ANIMAL7, name: "Crocodile" },
    { icon: ANIMAL8, name: "Macaw" },
];

const AnimalsSlider = () => {
    return (
        <section className="AnimalsSlider w-full relative bg-dark">
            <div className="custom-container">
                <div className="w-full flex items-center justify-center bg-dark md:py-[3rem] py-[2rem] md:px-[5rem] px-[2rem] md:rounded-full rounded-[32px] md:mt-[-7rem] mt-[-5rem] relative z-[3] border-[5px] border-primary shadow-2xl">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={12}
                        freeMode={true}
                        loop={true}
                        autoplay={{ delay: 100, disableOnInteraction: false }}
                        speed={2500}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1140: { slidesPerView: 5 },
                            1280: { slidesPerView: 5 },
                            1440: { slidesPerView: 6 },
                        }}
                        className="w-full py-[5rem]"
                    >
                        {animals.map((animal, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex flex-col items-center justify-center gap-2 transition">
                                    <Image src={animal.icon} alt={animal.name} width={200} height={200} className="md:h-[70px] md:w-[70px] h-[30px] w-[30px] object-contain" />
                                    <span className=" NewFont md:text-[2rem] text-[1.6rem] font-medium text-white">{animal.name}</span>
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