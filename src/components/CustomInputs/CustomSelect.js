"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  label,
  icon = "solar:bus-bold",
  placeholder = "Select an option",
  className = "",
  theme = "dark", // "dark" | "light"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value || opt.name === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className={`relative flex flex-col gap-1.5 w-full ${className}`} ref={containerRef}>
      {label && (
        <label className={`text-[1.3rem] font-semibold flex items-center gap-1.5 ${isDark ? "text-gray-300" : "text-heading-color"}`}>
          {icon && <Icon icon={icon} className="text-primary text-[1.6rem]" />}
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[4.8rem] h-[4.8rem] flex items-center justify-between px-5 rounded-full border text-[1.4rem] font-medium transition-all duration-300 cursor-pointer select-none text-left ${isDark
            ? "bg-white/10 border-white/20 text-white hover:bg-white/15 focus:border-secondary"
            : "bg-[#f9fbf8] border-gray-200 text-heading-color hover:bg-white focus:border-primary"
          } ${isOpen ? (isDark ? "border-secondary ring-2 ring-secondary/30" : "border-primary ring-2 ring-primary/20 bg-white") : ""}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedOption?.icon && (
            <Icon icon={selectedOption.icon} className="text-primary text-[1.8rem] shrink-0" />
          )}
          <span className="truncate">{selectedOption?.label || selectedOption?.name || placeholder}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selectedOption?.badge && (
            <span className="text-[1.1rem] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold">
              {selectedOption.badge}
            </span>
          )}
          <Icon
            icon="solar:alt-arrow-down-bold"
            className={`text-[1.8rem] transition-transform duration-300 ${isOpen ? "rotate-180 text-secondary" : "text-gray-400"
              }`}
          />
        </div>
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 w-full z-50 rounded-2xl shadow-2xl border p-2 flex flex-col gap-1 max-h-[30rem] overflow-y-auto animate-fadein-up ${isDark
              ? "bg-[#14261c] border-white/15 text-white shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              : "bg-white border-gray-100 text-heading-color shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
            }`}
        >
          {options.map((option, idx) => {
            const isSelected = (option.value || option.name) === (selectedOption?.value || selectedOption?.name);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(option.value || option.name || option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-[1.3rem] sm:text-[1.4rem] transition-all duration-200 cursor-pointer text-left ${isSelected
                    ? "bg-primary text-white font-bold shadow-sm"
                    : isDark
                      ? "hover:bg-white/10 text-gray-200"
                      : "hover:bg-[#EAF4E6] text-gray-700 hover:text-primary"
                  }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {option.icon && (
                    <Icon
                      icon={option.icon}
                      className={`text-[1.8rem] shrink-0 ${isSelected ? "text-white" : "text-primary"}`}
                    />
                  )}
                  <div className="flex flex-col truncate">
                    <span className="truncate">{option.label || option.name}</span>
                    {option.desc && (
                      <span className={`text-[1.1rem] truncate ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                        {option.desc}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {option.surcharge !== undefined && option.surcharge > 0 && (
                    <span className={`text-[1.2rem] font-bold ${isSelected ? "text-secondary" : "text-primary"}`}>
                      +${option.surcharge}
                    </span>
                  )}
                  {isSelected && <Icon icon="solar:check-circle-bold" className="text-[1.6rem] text-secondary" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
