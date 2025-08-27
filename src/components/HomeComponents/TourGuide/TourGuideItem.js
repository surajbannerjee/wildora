import Image from 'next/image'
import React from 'react'

import { Icon } from '@iconify/react';

const TourGuideItem = ({ image, name, role, socialLinks = [] }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-[3rem] group relative p-[2rem] border border-primary rounded-[1.2rem] bg-white shadow-xl'>
            <div className='h-[20rem] w-[20rem] rounded-full overflow-hidden border-2 border-primary group-hover:border-secondary transition-all duration-300'>
                <Image
                    height={500}
                    width={500}
                    src={image}
                    alt={name}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
            </div>

            <div className='flex flex-col items-center justify-center z-[2] px-[2rem] py-[1.5rem] text-center overflow-hidden bg-lightGreen2 rounded-[1.2rem] w-full relative after:content-[""] after:absolute after:top-[-100%] after:z-[-1] after:left-0 after:w-full after:h-full after:bg-primary after:rounded-[1.2rem] group-hover:after:top-0 transition-all after:duration-300 after:transition-all'>
                <span
                    className='lg:text-[2.4rem] font-medium group-hover:text-white'
                >
                    {name}
                </span>
                <p className='text-[1.6rem] text-text-color group-hover:text-white'>{role}</p>
                {socialLinks.length > 0 && (
                    <div className="flex gap-3 justify-center mt-[1.5rem]">
                        {socialLinks.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary group-hover:text-white group-hover:border-white h-[3.5rem] w-[3.5rem] rounded-full border border-primary hover:border-white hover:bg-primary  flex items-center justify-center hover:text-white text-[2rem] transition"
                                aria-label={s.icon}
                            >
                                <Icon icon={s.icon} />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TourGuideItem