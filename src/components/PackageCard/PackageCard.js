"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";

const PackageCard = ({ title, desc, image, link, linkText, location, rating, reviews, price, offprice, duration, feature }) => {

    return (
        <div className="package-card w-full bg-white shadow-lg xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[2rem] p-[0.5rem] overflow-hidden">
            <div className="relative w-full xl:h-[30rem] h-[20rem] md:mb-[2rem] mb-[1rem] overflow-hidden xl:rounded-[3.2rem] md:rounded-[2.4rem] rounded-[2rem]">
                {feature && (
                    <Link href={link} className="absolute top-[2rem] left-[2rem] bg-secondary text-white px-[1.5rem] py-[1rem] leading-[1] rounded-full md:text-[1.6rem] text-[1.4rem] font-semibold z-[2]">
                        {feature}
                    </Link>
                )}
                <Link href={link}>
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                </Link>
                {duration && (
                    <span className="NewFont3 absolute bottom-[2rem] font-semibold right-[2rem] py-[0.8rem] px-[1.5rem]  md:text-[1.8rem] text-[1.4rem] bg-white text-black rounded-full leading-[1] z-[2]">
                        {duration}
                    </span>
                )}
            </div>
            <div className="package-content flex flex-col items-stretch xl:px-[2.2rem] md:px-[2.4rem] px-[1.6rem] md:pb-[2rem] pb-[1.6rem] md:gap-[2rem] gap-[1.4rem]">
                <h3 className="md:text-[2.4rem] text-[2rem] headingText font-bold line-clamp-1 flex-1">{title}</h3>
                <div className="flex justify-start gap-[1rem] md:flex-row flex-col md:items-center items-start md:mb-[1rem] pb-[2rem] border-b border-gray-200">
                    <div className="flex items-center gap-[0.5rem] flex-1">
                        <Icon icon="hugeicons:location-04" className="text-gray-500" />
                        <span className="text-gray-600 font-semibold md:text-[1.6rem] text-[1.4rem] leading-[1.2] mr-3 line-clamp-1">{location}</span>
                    </div>
                    {/* reviews with stars */}
                    <div className="flex items-center gap-[0.5rem]">
                        <Icon icon="line-md:star-filled" className="text-secondary" />
                        <span className="text-gray-600 font-semibold md:text-[1.6rem] text-[1.4rem] leading-[1]">{rating} (<span className="">{reviews} reviews</span>)</span>
                    </div>
                </div>
                <p className="text-gray-700 text-[1.6rem] leading-[1.5]">{desc}</p>
                <div className="flex md:gap-[1rem] gap-[2rem] md:flex-row flex-col-reverse md:items-center items-start justify-between mt-[1.6rem]">
                    <Link href={link} className="w-fit bg-transparent NewFont text-primary flex items-center justify-center gap-[20px] rounded-full xl:pl-[3rem] pl-[15px] pr-[1rem] py-[1rem]  text-[1.8rem] text-center leading-[1] border-2 border-primary  hover:text-white font-medium transition-all duration-500 ease-in-out group hover:bg-primary">{linkText}
                        <span className="text-[1.4rem] h-[3rem] w-[3rem] rounded-full bg-primary text-white group-hover:text-primary group-hover:bg-white flex justify-center items-center group-hover:rotate-[-50deg]">
                            <Icon icon="formkit:arrowright" />
                        </span>
                    </Link>
                    <div className="flex items-start flex-col gap-[1rem] NewFont3">
                        {offprice ? (

                            <span className="price text-[2.4rem] font-semibold leading-[1]">
                                ${price}
                                <span className="text-[1.4rem] font-normal">
                                    {" "}From <span className="off py-[0.3rem] px-[1rem] bg-secondary text-white rounded-[0.5rem] leading-[1.2]">off {offprice}</span>
                                </span>
                            </span>
                        ) : (
                            <span className="price text-[2.4rem] font-semibold leading-[1]">
                                ${price}
                                <span className="text-[1.2rem] leading-[1] text-gray-500">
                                    {" "} Only
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;