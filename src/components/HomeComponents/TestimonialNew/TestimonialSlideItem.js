"use client";
import React from 'react'
import { Icon } from "@iconify/react";
import Image from "next/image";

const TestimonialSlideItem = ({ t }) => {



    return (
        <div className='h-auto flex flex-col items-start justify-start text-left gap-[1.5rem] sm:gap-[2rem] w-full'>
            <div className='flex flex-col gap-[0.8rem] sm:gap-[1rem] w-full'>
                <div className="flex items-center justify-start">
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
                                className={`text-[1.8rem] sm:text-[2rem] ${icon !== "ic:round-star" ? "text-yellow-500" : "text-gray-400"}`}
                            />
                        );
                    })}
                </div>
                <div className="text-[1.4rem] sm:text-[1.6rem] text-text-color text-left mb-2 line-clamp-4 leading-[1.6]">{t?.review}</div>
            </div>
            <div className="grid grid-cols-[45px_1fr] sm:grid-cols-[50px_1fr] gap-[1.2rem] sm:gap-[1.5rem] items-center justify-center">
                <Image
                    src={t.image}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 h-[4.5rem] w-[4.5rem] sm:h-[5rem] sm:w-[5rem] border-primary object-cover"
                />
                <div className='text-left'>
                    <div className="font-semibold text-[1.7rem] sm:text-[2rem] text-primary">{t?.name}</div>
                    <div className="font-medium text-[1.3rem] sm:text-[1.4rem] text-text-color mb-1">{t?.designation}</div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialSlideItem
