"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CustomDatePicker({
  value,
  onChange,
  label = "Select Departure Date",
  theme = "dark", // "dark" | "light"
  minDate,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const initialDate = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInCurrentMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day) => {
    const selected = new Date(viewYear, viewMonth, day);
    const formatted = selected.toISOString().split("T")[0];
    onChange(formatted);
    setIsOpen(false);
  };

  const setPresetDays = (daysFromNow) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    const formatted = target.toISOString().split("T")[0];
    onChange(formatted);
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "Pick a safari date";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isDark = theme === "dark";

  return (
    <div className={`relative flex flex-col gap-1.5 w-full ${className}`} ref={containerRef}>
      {label && (
        <label className={`text-[1.3rem] font-semibold flex items-center gap-1.5 ${isDark ? "text-gray-300" : "text-heading-color"}`}>
          <Icon icon="solar:calendar-date-bold" className="text-primary text-[1.6rem]" />
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
        <div className="flex items-center gap-2.5">
          <Icon icon="solar:calendar-bold" className="text-primary text-[1.8rem]" />
          <span>{formatDisplayDate(value)}</span>
        </div>
        <Icon
          icon="solar:alt-arrow-down-bold"
          className={`text-[1.8rem] transition-transform duration-300 ${isOpen ? "rotate-180 text-secondary" : "text-gray-400"
            }`}
        />
      </button>

      {/* Calendar Popup */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 w-full min-w-[28rem] sm:min-w-[32rem] z-50 rounded-3xl p-5 border shadow-2xl animate-fadein-up ${isDark
              ? "bg-[#12241b] border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              : "bg-white border-gray-100 text-heading-color shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
            }`}
        >
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 pb-3 mb-3 border-b border-gray-200/20">
            <button
              type="button"
              onClick={() => setPresetDays(7)}
              className="text-[1.1rem] px-2.5 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-allfont-bold"
            >
              Next Week
            </button>
            <button
              type="button"
              onClick={() => setPresetDays(14)}
              className="text-[1.1rem] px-2.5 py-1 rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-primary transition-allfont-bold"
            >
              In 2 Weeks
            </button>
            <button
              type="button"
              onClick={() => setPresetDays(30)}
              className="text-[1.1rem] px-2.5 py-1 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 transition-allfont-bold"
            >
              Next Month
            </button>
          </div>

          {/* Month & Navigation Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition"
              aria-label="Previous month"
            >
              <Icon icon="solar:alt-arrow-left-bold" className="text-[1.6rem]" />
            </button>

            <span className="text-[1.5rem] font-bold">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition"
              aria-label="Next month"
            >
              <Icon icon="solar:alt-arrow-right-bold" className="text-[1.6rem]" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {DAYS_SHORT.map((day, idx) => (
              <span key={idx} className="text-[1.2rem] font-semibold text-gray-400">
                {day}
              </span>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots for month starting offset */}
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-9" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInCurrentMonth }).map((_, idx) => {
              const day = idx + 1;
              const cellDate = new Date(viewYear, viewMonth, day);
              cellDate.setHours(0, 0, 0, 0);

              const isPast = cellDate < today;
              const isSelected =
                value &&
                new Date(value).getFullYear() === viewYear &&
                new Date(value).getMonth() === viewMonth &&
                new Date(value).getDate() === day;

              const isToday =
                today.getFullYear() === viewYear &&
                today.getMonth() === viewMonth &&
                today.getDate() === day;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-[1.3rem] font-bold transition-all cursor-pointer ${isSelected
                      ? "bg-secondary text-primary shadow-md scale-110 ring-2 ring-white"
                      : isToday
                        ? "border border-secondary text-secondary"
                        : isPast
                          ? "text-gray-500/40 cursor-not-allowed"
                          : isDark
                            ? "hover:bg-white/15 text-gray-200"
                            : "hover:bg-[#EAF4E6] text-gray-700 hover:text-primary"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
