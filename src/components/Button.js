"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

/**
 * AppButton - Crisp, high-contrast animated button matching original design perfectly
 * Features: Pure white text on all states, clean white icon badge, smooth spring arrow rotation
 */
export function AppButton({
  classes = "",
  children,
  href,
  onClick,
  type = "button",
  variant = "primary", // "primary" | "secondary" | "outline" | "white"
  icon = "formkit:arrowright",
  showIcon = true,
  disabled = false,
  target,
  rel,
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "backdrop":
      case "blur":
      case "glass":
        return {
          btn: "bg-white/15 text-white hover:bg-white/30 backdrop-blur-md border border-white/25 shadow-md",
          iconWrap: "bg-white/20 text-white group-hover:bg-white group-hover:text-heading-color",
        };
      case "secondary":
        return {
          btn: "bg-secondary text-white hover:bg-primary",
          iconWrap: "bg-white text-secondary group-hover:text-primary",
        };
      case "outline":
        return {
          btn: "bg-transparent text-primary hover:bg-primary hover:text-white border-2 border-primary",
          iconWrap: "bg-primary text-white group-hover:bg-white group-hover:text-primary",
        };
      case "white":
        return {
          btn: "bg-white text-primary hover:bg-secondary hover:text-white shadow-md",
          iconWrap: "bg-primary text-white group-hover:bg-white group-hover:text-secondary",
        };
      case "fill":
      case "primary":
      default:
        return {
          btn: "bg-primary text-white hover:bg-secondary",
          iconWrap: "bg-white text-primary group-hover:text-secondary",
        };
    }
  };

  const currentVariant = getVariantStyles();

  const baseButtonClasses = `
    inline-flex items-center justify-center gap-[1.2rem] sm:gap-[20px] 
    rounded-full xl:pl-[3rem] pl-[1.6rem] pr-[0.8rem] py-[0.8rem] 
    min-h-[4.8rem] min-h-[48px] w-fit
    2xl:text-[2rem] md:text-[2rem] sm:text-[1.6rem] text-[1.5rem] 
    NewFont text-center leading-[1] font-medium 
    shadow-[2px_5px_8px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)]
    transition-all duration-300 ease-in-out
    group cursor-pointer select-none
    hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]
    ${currentVariant.btn} 
    ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""} 
    ${classes}
  `.trim();

  const iconClasses = `
    text-[1.2rem] sm:text-[1.4rem] xl:h-[3.5rem] xl:w-[3.5rem] h-[3rem] w-[3rem] 
    rounded-full flex justify-center items-center shrink-0 
    transition-all duration-300 ease-in-out
    group-hover:rotate-[-45deg] group-hover:scale-105
    ${currentVariant.iconWrap}
  `.trim();

  const content = (
    <>
      <span className="text-inherit">{children}</span>
      {showIcon && (
        <span className={iconClasses}>
          <Icon icon={icon} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={baseButtonClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseButtonClasses}
    >
      {content}
    </button>
  );
}

export default AppButton;
