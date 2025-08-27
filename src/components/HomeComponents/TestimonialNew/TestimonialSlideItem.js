"use client";
import React from 'react'
import { Icon } from "@iconify/react";
import Image from "next/image";

const TestimonialSlideItem = ({ t }) => {



    return (
        <div className='h-auto flex flex-col items-start justify-start text-center  gap-[2rem]'>
            <div className='flex flex-col gap-[1rem]'>
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
                                className={`text-[2rem] ${icon !== "ic:round-star" ? "text-yellow-500" : "text-gray-400"}`}
                            />
                        );
                    })}
                </div>
                <div className="text-[1.6rem] text-text-color text-left mb-3">{t?.review}</div>
            </div>
            <div className="grid grid-cols-[50px_1fr] gap-[1.5rem] items-center justify-center ">
                <Image
                    src={t.image}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 h-[5rem] w-[5rem] border-primary "
                />
                <div className=' text-left'>
                    <div className="font-semibold text-[2rem] text-primary">{t?.name}</div>
                    <div className="font-medium text-[1.4rem] text-text-color mb-2">{t?.designation}</div>
                </div>
            </div>

        </div>
    )
}

export default TestimonialSlideItem
