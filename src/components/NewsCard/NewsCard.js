"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AppButton } from "../Button";

const NewsCard = ({ image, title, date, link, userImg, userName = "Wildora Team", flexDirection = "flex-row" }) => {
    return (
        <div className={`news-card flex ${flexDirection} items-stretch gap-[1rem]`}>
            <Image
                src={image}
                alt="News Thumbnail"
                width={1000}
                height={1000}
                className="h-full min-h-[26rem] md:w-[50%] w-full object-cover rounded-[2rem]"
            />
            <div className="news-content flex flex-col md:w-[50%] w-full gap-[2rem] justify-between px-[4rem] py-[3rem] bg-white rounded-[2rem]">
                <div className="news-meta flex flex-col gap-[1rem]">
                    <p className="news-date flex items-center gap-[0.5rem] text-[1.6rem] font-medium text-gray-500">
                        <Icon className="text-primary" icon="lets-icons:date-fill" /> {date}
                    </p>
                    <h3 className="news-title text-[1.8rem] font-bold line-clamp-2">{title}</h3>
                    <div className="news-desc flex items-center gap-[1rem] mt-[1rem] mb-[1rem]">
                        <Image
                            src={userImg}
                            alt="Author"
                            width={100}
                            height={100}
                            className="h-[4rem] w-[4rem] object-cover rounded-full border-2 border-secondary"
                        />
                        <p className="text-[1.6rem] font-semibold text-gray-500"> {userName} </p>
                    </div>
                </div>
                <Link
                    href={link}
                    className="w-fit bg-primary NewFont text-white flex items-center justify-center gap-[20px] rounded-full xl:pl-[3rem] pl-[15px] pr-[0.8rem] py-[0.8rem] text-[1.8rem] shadow-md font-medium transition-all duration-300 group hover:bg-secondary"
                >
                    Read More
                    <span className="text-[1.4rem] xl:h-[3.5rem] xl:w-[3.5rem] h-[3rem] w-[3rem] rounded-full bg-white text-primary group-hover:text-secondary flex justify-center items-center group-hover:rotate-[-50deg]">
                        <Icon icon="formkit:arrowright" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
