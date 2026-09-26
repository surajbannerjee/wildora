"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";

const PackageCard = ({ title, desc, image, link, linkText = "View Details", location, rating, reviews, price, offprice, duration, feature }) => {
    const { addToCart } = useCart();
    const [imgSrc, setImgSrc] = useState(image || "/assets/images/Bg1.webp");

    useEffect(() => {
        if (image) {
            setImgSrc(image);
        }
    }, [image]);

    const handleQuickBook = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: `package-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
            title: title,
            image: imgSrc,
            location: location || "National Park, India",
            price: Number(price) || 500,
            duration: duration || "5 Days / 4 Nights",
            date: new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0],
            guests: 2,
            tier: "Standard Safari 4x4",
            type: "package",
        }, true);
    };

    return (
        <div className="package-card w-full h-full bg-white shadow-lg xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[2rem] p-[0.6rem] sm:p-[0.8rem] md:p-[0.5rem] overflow-hidden flex flex-col justify-between group/card hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
                <div className="relative w-full xl:h-[30rem] lg:h-[26rem] md:h-[24rem] sm:h-[24rem] h-[20rem] md:mb-[2rem] mb-[1.2rem] overflow-hidden xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[1.8rem] shrink-0 bg-[#EAF4E6]">
                    {feature && (
                        <span className="absolute top-[1.5rem] sm:top-[2rem] left-[1.5rem] sm:left-[2rem] bg-secondary text-white px-[1.2rem] sm:px-[1.5rem] py-[0.8rem] sm:py-[1rem] leading-[1] rounded-full md:text-[1.6rem] text-[1.3rem] sm:text-[1.4rem] font-semibold z-[2] shadow-md">
                            {feature}
                        </span>
                    )}
                    <Link href={link || "/packages"} className="block w-full h-full relative">
                        <img
                            src={imgSrc}
                            alt={title}
                            onError={() => setImgSrc("/assets/images/Bg1.webp")}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover/card:scale-105"
                        />
                    </Link>
                    {duration && (
                        <span className="NewFont3 absolute bottom-[1.5rem] sm:bottom-[2rem] font-semibold right-[1.5rem] sm:right-[2rem] py-[0.6rem] sm:py-[0.8rem] px-[1.2rem] sm:px-[1.5rem] md:text-[1.6rem] text-[1.3rem] sm:text-[1.4rem] bg-white/95 backdrop-blur-md text-heading-color rounded-full leading-[1] z-[2] shadow-sm">
                            {duration}
                        </span>
                    )}
                </div>

                <div className="package-content flex-1 flex flex-col justify-between items-stretch xl:px-[2.2rem] md:px-[2.4rem] px-[1.4rem] sm:px-[1.6rem] md:pb-[1.5rem] pb-[1.2rem] md:gap-[1.4rem] gap-[1rem]">
                    <div>
                        <h3 className="md:text-[2.4rem] sm:text-[2.2rem] text-[1.9rem] headingText font-bold line-clamp-1 min-h-[3rem] text-heading-color flex items-center">
                            {title}
                        </h3>
                        
                        <div className="flex justify-start gap-[0.8rem] sm:gap-[1rem] sm:flex-row flex-col sm:items-center items-start pb-[1.4rem] md:pb-[1.6rem] mt-2 border-b border-gray-200">
                            <div className="flex items-center gap-[0.5rem] flex-1">
                                <Icon icon="hugeicons:location-04" className="text-primary text-[1.6rem] shrink-0" />
                                <span className="text-gray-600 font-semibold md:text-[1.5rem] text-[1.3rem] sm:text-[1.4rem] leading-[1.2] mr-3 line-clamp-1">
                                    {location}
                                </span>
                            </div>
                            {/* reviews with stars */}
                            <div className="flex items-center gap-[0.5rem] shrink-0">
                                <Icon icon="line-md:star-filled" className="text-secondary text-[1.6rem]" />
                                <span className="text-gray-600 font-semibold md:text-[1.5rem] text-[1.3rem] sm:text-[1.4rem] leading-[1]">
                                    {rating} ({reviews} reviews)
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-[1.4rem] sm:text-[1.5rem] leading-[1.5] line-clamp-2 min-h-[4.4rem] mt-3">
                            {desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="xl:px-[2.2rem] md:px-[2.4rem] px-[1.4rem] sm:px-[1.6rem] pb-[1.8rem] pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-gray-100 mt-auto">
                <div className="flex items-start flex-col NewFont3">
                    {offprice ? (
                        <span className="price text-[2.2rem] sm:text-[2.4rem] font-bold text-primary leading-[1]">
                            ${price}
                            <span className="text-[1.2rem] sm:text-[1.3rem] font-normal text-gray-500">
                                {" "}From <span className="off py-[0.2rem] px-[0.6rem] bg-secondary text-white rounded-[0.4rem] leading-[1.2] font-semibold">off {offprice}</span>
                            </span>
                        </span>
                    ) : (
                        <span className="price text-[2.2rem] sm:text-[2.4rem] font-bold text-primary leading-[1]">
                            ${price}
                            <span className="text-[1.2rem] leading-[1] text-gray-400 font-normal">
                                {" "} / guest
                            </span>
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleQuickBook}
                        type="button"
                        className="bg-primary hover:bg-secondary text-white font-bold px-4 py-2.5 rounded-full text-[1.3rem] sm:text-[1.4rem] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                        title="Book this package"
                    >
                        <Icon icon="solar:cart-large-4-bold" className="text-[1.6rem]" />
                        <span>Book</span>
                    </button>

                    <Link
                        href={link || "/packages"}
                        className="bg-transparent text-gray-700 hover:text-primary hover:bg-[#EAF4E6] border border-gray-300 hover:border-primary px-3.5 py-2.5 rounded-full text-[1.3rem] sm:text-[1.4rem] font-medium transition-all duration-300 flex items-center justify-center gap-1 shrink-0"
                    >
                        <span>Details</span>
                        <Icon icon="formkit:arrowright" className="text-[1.2rem]" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;