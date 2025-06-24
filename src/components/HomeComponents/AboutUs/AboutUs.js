"use client";
import { AppButton } from "@/components/Button";
import { HERO_IMAGE5, SIDE1, SIDE2 } from "@/constants/images";
import Image from "next/image";

const AboutUs = () => {
    return (
        <section className="AboutUs w-full relative sectionPadding xl:pt-[28rem] md:pt-[22rem] pt-[15rem] mt-[-11rem] overflow-hidden bg-dark">
            <Image
                height={500}
                width={500}
                src={SIDE1}
                alt="About Us Background"
                className="absolute inset-0 w-[50rem] h-auto object-cover opacity-20 xl:opacity-80"
                priority
            />
            <Image
                height={500}
                width={500}
                src={SIDE2}
                alt="About Us Background"
                className="absolute right-[0] bottom-0 w-[45rem] h-auto object-cover opacity-20 xl:opacity-80"
                priority
            />
            <div className="custom-container relative flex flex-col md:flex-row items-center justify-center md:gap-[6rem] gap-[3rem]">
                {/* Video Box */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="rounded-[3.2rem] overflow-hidden shadow-lg w-full md:min-h-[50rem] bg-black">
                        <video
                            src="https://cdn.pixabay.com/video/2023/01/04/145320-786403437_large.mp4" // <-- replace with your video path
                            type="video/mp4"
                            playsInline
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        // poster={HERO_IMAGE5} // optional poster image
                        />
                    </div>
                </div>
                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col gap-[2rem] items-start">
                    <span className="text-primary ButtonFont text-[4rem] leading-[1] font-medium tracking-wide">
                        About Us
                    </span>
                    <h2 className="font-semibold text-white">Welcome to <span className="text-secondary">Wildora</span></h2>
                    <p className="text-[1.6rem] text-gray-50 leading-[1.5] mb-[2rem]">
                        At Wildora, we curate unforgettable journeys that connect you with the heart of nature. Whether you're seeking luxury retreats, wildlife encounters, or cultural discoveries, our expert team is here to craft seamless, meaningful adventures designed around your passions. Your next great story begins here.
                    </p>
                    <AppButton href="#">Learn More</AppButton>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;