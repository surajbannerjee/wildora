"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AppButton } from "../Button";

const NewsCard = ({ image, title, date, link, userImg, userName = "Wildora Team", flexDirection = "flex-row" }) => {
    return (
        <div className={`news-card flex flex-col ${flexDirection} items-stretch gap-[1rem] bg-white rounded-[2rem] overflow-hidden shadow-sm`}>
            <div className="relative xl:w-[50%] w-full h-[22rem] sm:h-[26rem] xl:h-auto min-h-[22rem] sm:min-h-[26rem] shrink-0 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover rounded-[2rem] transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="news-content flex flex-col xl:w-[50%] w-full gap-[1.5rem] sm:gap-[2rem] justify-between p-[2rem] sm:p-[2.5rem] xl:px-[4rem] xl:py-[3rem] bg-white rounded-[2rem]">
                <div className="news-meta flex flex-col gap-[0.8rem] sm:gap-[1rem]">
                    <p className="news-date flex items-center gap-[0.5rem] text-[1.4rem] sm:text-[1.6rem] font-medium text-gray-500">
                        <Icon className="text-primary text-[1.6rem]" icon="lets-icons:date-fill" /> {date}
                    </p>
                    <h3 className="news-title text-[1.6rem] sm:text-[1.8rem] font-bold line-clamp-2">{title}</h3>
                    <div className="news-desc flex items-center gap-[1rem] mt-[0.5rem] sm:mt-[1rem] mb-[0.5rem] sm:mb-[1rem]">
                        <Image
                            src={userImg}
                            alt="Author"
                            width={100}
                            height={100}
                            className="h-[3.6rem] w-[3.6rem] sm:h-[4rem] sm:w-[4rem] object-cover rounded-full border-2 border-secondary"
                        />
                        <p className="text-[1.4rem] sm:text-[1.6rem] font-semibold text-gray-500"> {userName} </p>
                    </div>
                </div>
                <Link
                    href={link}
                    className="w-fit bg-primary NewFont text-white flex items-center justify-center gap-[1.2rem] sm:gap-[20px] rounded-full xl:pl-[3rem] pl-[1.5rem] pr-[0.8rem] py-[0.8rem] text-[1.5rem] sm:text-[1.8rem] shadow-md font-medium transition-all duration-300 group hover:bg-secondary"
                >
                    <span>Read More</span>
                    <span className="text-[1.2rem] sm:text-[1.4rem] xl:h-[3.5rem] xl:w-[3.5rem] h-[3rem] w-[3rem] rounded-full bg-white text-primary group-hover:text-secondary flex justify-center items-center group-hover:rotate-[-50deg] shrink-0">
                        <Icon icon="formkit:arrowright" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
