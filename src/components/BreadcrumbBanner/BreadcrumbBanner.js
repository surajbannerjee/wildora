import { Icon } from '@iconify/react';
import React from 'react';

const BreadcrumbBanner = ({ backgroundImage, breadcrumb = [], title }) => {
    return (
        <section
            className="breadcrumb-banner-section relative flex items-center justify-center h-[300px] md:h-[500px] w-full bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="absolute inset-0 bg-black/80 z-[1]"></div>
            <div className="relative z-[2] flex flex-col gap-[2rem] items-center justify-center w-full">
                {title && (
                    <h1 className="text-white font-bold mb-4 drop-shadow-lg text-center">{title}</h1>
                )}
                <nav className="breadcrumb-nav text-white text-[2.2rem] font-medium flex gap-[1rem]">
                    {breadcrumb.map((item, idx) => (
                        <span key={idx} className="flex items-center">
                            {item}
                            {idx < breadcrumb.length - 1 && (
                                <span className="ml-3"><Icon icon="bitcoin-icons:arrow-right-filled" /></span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default BreadcrumbBanner;