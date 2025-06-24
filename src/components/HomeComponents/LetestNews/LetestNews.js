"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard/NewsCard";
import { HERO_IMAGE2, HERO_IMAGE5, AVATAR, HERO_IMAGE12, HERO_IMAGE10 } from "@/constants/images";
import { AppButton } from "@/components/Button";

const newsList = [
    {
        image: HERO_IMAGE2,
        title: "Wildlife Conservation in India: A New Chapter Begins",
        date: "June 24, 2025",
        link: "/news/wildlife-conservation",
        userImg: AVATAR,
        userName: "Suraj Banerjee"
    },
    {
        image: HERO_IMAGE5,
        title: "Top 5 National Parks for a Tiger Safari in 2025",
        date: "June 20, 2025",
        link: "/news/top-safari-destinations",
        userImg: AVATAR,
        userName: "Priya Sharma"
    },
    {
        image: HERO_IMAGE12,
        title: "Eco-Tourism and Responsible Travel: Why It Matters",
        date: "June 18, 2025",
        link: "/news/eco-tourism-india",
        userImg: AVATAR,
        userName: "Wildora Editorial"
    },
    {
        image: HERO_IMAGE10,
        title: "Travel Tips for Your First Indian Wildlife Adventure",
        date: "June 15, 2025",
        link: "/news/travel-tips",
        userImg: AVATAR,
        userName: "Ankit Mehra"
    },


];

const LatestNews = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280); // xl breakpoint
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="WhyChooseUsSec w-full sectionPadding relative white-bg-section" style={{
            background: "linear-gradient(180deg, #EAF4E6 0%, rgba(234,244,230,0) 100%)"
        }}>
            <div className="custom-container flex flex-col gap-[3rem] md:gap-[4.8rem]">
                <div className="titleHeader flex flex-col gap-[2rem] lg:flex-row justify-between items-start md:items-center w-full">
                    <div className="flex flex-col gap-2 lg:w-[50%] w-[100%]">
                        <span className="text-primary ButtonFont text-[4rem] leading-[1] font-medium tracking-wide">
                            Latest Blog & News
                        </span>
                        <h2 className="text-heading-color font-semibold text-[3.2rem]">
                            Explore the <span className="text-secondary">Latest Travel News</span>
                        </h2>
                    </div>
                    <div className="lg:w-[50%] w-[100%]">
                        <AppButton href="/news" >
                            View All News
                        </AppButton>
                    </div>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-[4rem] w-full">
                    {newsList.map((news, idx) => {
                        let flexDirection;
                        if (isMobile) {
                            // Always use flex-col on small devices
                            flexDirection = "flex-col";
                        } else {
                            // Alternate every two cards on desktop
                            flexDirection = Math.floor(idx / 2) % 2 === 1 ? "flex-row-reverse" : "flex-row";
                        }
                        return (
                            <NewsCard
                                key={idx}
                                image={news.image}
                                title={news.title}
                                date={news.date}
                                link={news.link}
                                userImg={news.userImg}
                                userName={news.userName}
                                flexDirection={flexDirection}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
