"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDE_WIDTH = 600; // px, adjust as needed
const INTERVAL = 10; // ms between moves
const SPEED = 0.5; // px per interval

const TextSlider = () => {
    const [offset, setOffset] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const totalWidth = SLIDE_WIDTH;
        let raf;
        let lastTime = Date.now();

        const animate = () => {
            const now = Date.now();
            if (now - lastTime >= INTERVAL) {
                setOffset((prev) => {
                    let next = prev + SPEED;
                    if (next >= totalWidth) next = 0;
                    return next;
                });
                lastTime = now;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [paused]);

    return (
        <div className="w-full bg-transparent py-4 overflow-hidden">
            <div
                className="flex items-center justify-start"
                style={{
                    width: `${SLIDE_WIDTH * 2}px`,
                    transform: `translateX(-${offset}px)`,
                    transition: "transform 0.1s linear",
                }}
            >
                {/* Duplicate the text for seamless loop */}
                {[1, 2].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center"
                        style={{ minWidth: SLIDE_WIDTH, maxWidth: SLIDE_WIDTH }}
                    >
                        <div className="tm-box-title">
                            <span className="text-white xl:text-[2rem] md:text-[2rem] text-[1.6rem]">
                                Call us now to plan your next safari{" "}
                                <Link
                                    href={"tel:+1234567891"}
                                    className="text-secondary font-semibold blink-on-hover"
                                    onMouseEnter={() => setPaused(true)}
                                    onMouseLeave={() => setPaused(false)}
                                >
                                    +1234 567 891
                                </Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
         
        </div>
    );
};

export default TextSlider;