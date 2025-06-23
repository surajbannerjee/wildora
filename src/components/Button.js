import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const baseClass =
    "w-fit bg-primary NewFont text-white flex items-center justify-center gap-[20px] rounded-full xl:pl-[3rem] pl-[15px] pr-[1rem] py-[1rem] 2xl:text-[2.2rem] md:text-[2rem] text-[1.6rem] text-center leading-[1] font-medium transition-all duration-500 ease-in-out group hover:bg-secondary";

const iconClass =
    "md:text-[1.8rem] text-[1.6rem] 2xl:h-[5rem] 2xl:w-[5rem]  xl:h-[4rem] xl:w-[4rem] h-[3rem] w-[3rem] rounded-full bg-white text-primary group-hover:text-secondary flex justify-center items-center group-hover:rotate-[-50deg]";

export function AppButton({ classes = "", children, href, onClick, type = "button" }) {
    if (href) {
        return (
            <Link href={href} className={`${baseClass} ${classes}`}>
                {children}
                <span className={iconClass}>
                    <Icon icon="formkit:arrowright" />
                </span>
            </Link>
        );
    }
    return (
        <button type={type} onClick={onClick} className={`${baseClass} ${classes}`}>
            {children}
            <span className={iconClass}>
                <Icon icon="formkit:arrowright" />
            </span>
        </button>
    );
}
