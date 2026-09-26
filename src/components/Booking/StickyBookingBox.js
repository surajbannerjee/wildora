"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AppButton } from "@/components/Button";
import CustomDatePicker from "@/components/CustomInputs/CustomDatePicker";
import CustomSelect from "@/components/CustomInputs/CustomSelect";
import { AnimeFadeIn } from "@/components/Anime/AnimeComponents";

const DEFAULT_SAFARI_TIERS = [
  {
    name: "Standard 4x4 Safari (Included)",
    value: "Standard 4x4 Safari (Included)",
    surcharge: 0,
    desc: "Open-top customized 4x4 Land Cruiser with bean bags and dust covers.",
    icon: "solar:bus-bold",
  },
  {
    name: "Private Photographic 4x4 (+ $150)",
    value: "Private Photographic 4x4 (+ $150)",
    surcharge: 150,
    desc: "Exclusive vehicle with 360° rotating gimbal mounts and dedicated lens naturalist.",
    icon: "solar:camera-bold",
    badge: "Most Popular",
  },
  {
    name: "Ultra-Luxury Aerial Safari (+ $350)",
    value: "Ultra-Luxury Aerial Safari (+ $350)",
    surcharge: 350,
    desc: "Hot air balloon sunrise flight over the reserve followed by bush champagne brunch.",
    icon: "solar:plain-bold",
    badge: "VIP",
  },
];

export default function StickyBookingBox({
  tour = {},
  safariTiers = DEFAULT_SAFARI_TIERS,
  className = "",
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]
  );
  const [guests, setGuests] = useState(2);
  const [selectedTier, setSelectedTier] = useState(safariTiers[0]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const basePrice = Number(tour.startingPrice || tour.price) || 500;
  const pricePerGuest = basePrice + (selectedTier.surcharge || 0);
  const totalPrice = pricePerGuest * guests;

  const tourSlug = tour.slug || (tour.name ? tour.name.toLowerCase().replace(/[^a-z0-9]/g, "-") : "safari-tour");
  const tourName = tour.name || tour.title || "Wildora Safari";
  const tourImage = tour.image || "/images/gallery/hero-1.webp";
  const tourLocation = tour.location || "National Park, Reserve";
  const tourDuration = tour.duration || "4 Days / 3 Nights";
  const tourType = tour.type || "package";
  const tourBadge = tour.badge || "Signature Safari";

  const executeAddToCart = () => {
    addToCart(
      {
        id: `${tourSlug}-${selectedTier.name}`,
        title: `${tourName} Expedition`,
        slug: tourSlug,
        image: tourImage,
        location: tourLocation,
        price: pricePerGuest,
        duration: tourDuration,
        date: selectedDate,
        guests: guests,
        tier: selectedTier.name,
        type: tourType,
      },
      true
    );

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleAddToCart = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isLoggedIn) {
      openAuthModal("login", () => {
        executeAddToCart();
      });
      return;
    }
    executeAddToCart();
  };

  const handleBookNow = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const doReserve = () => {
      addToCart(
        {
          id: `${tourSlug}-${selectedTier.name}`,
          title: `${tourName} Expedition`,
          slug: tourSlug,
          image: tourImage,
          location: tourLocation,
          price: pricePerGuest,
          duration: tourDuration,
          date: selectedDate,
          guests: guests,
          tier: selectedTier.name,
          type: tourType,
        },
        false
      );
      router.push("/cart");
    };

    if (!isLoggedIn) {
      openAuthModal("login", doReserve);
      return;
    }

    doReserve();
  };

  return (
    <div className={`w-full lg:sticky lg:top-[12rem] self-start flex flex-col gap-6 ${className}`}>
      <AnimeFadeIn className="bg-dark text-white rounded-[2.8rem] p-[2.8rem] sm:p-[3.5rem] flex flex-col gap-[2.2rem] shadow-2xl border border-white/10 relative">
        {/* Header Price */}
        <div className="flex flex-col gap-1 pb-4 border-b border-white/15">
          <span className="text-secondary text-[1.4rem] font-bold tracking-wide uppercase">
            Reservation Quote
          </span>
          <div className="flex items-baseline justify-between">
            <div className="text-[3.8rem] font-bold text-white NewFont leading-[1]">
              ${pricePerGuest}
              <span className="text-[1.4rem] font-normal text-gray-400"> / guest</span>
            </div>
            {tourBadge && (
              <span className="text-[1.3rem] text-secondary font-semibold bg-secondary/20 px-3 py-1 rounded-full">
                {tourBadge}
              </span>
            )}
          </div>
        </div>

        {/* Form Controls with Custom Inputs */}
        <div className="flex flex-col gap-4">
          {/* Custom DatePicker Calendar Widget */}
          <CustomDatePicker
            label="Select Departure Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            theme="dark"
          />

          {/* Guest Counter Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[1.3rem] font-semibold text-gray-300 flex items-center gap-1.5">
              <Icon icon="solar:users-group-two-rounded-bold" className="text-primary text-[1.6rem]" /> Number of Guests
            </label>
            <div className="flex items-center justify-between min-h-[4.8rem] h-[4.8rem] bg-white/10 border border-white/20 rounded-full px-5 py-2.5">
              <span className="text-[1.4rem] font-semibold text-white">
                {guests} {guests === 1 ? "Person" : "People"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-[3.2rem] h-[3.2rem] rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[1.6rem] flex items-center justify-center transition cursor-pointer"
                  aria-label="Decrease guest count"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setGuests(guests + 1)}
                  className="w-[3.2rem] h-[3.2rem] rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[1.6rem] flex items-center justify-center transition cursor-pointer"
                  aria-label="Increase guest count"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Custom Select Dropdown for Vehicle Tiers */}
          <CustomSelect
            label="Safari Vehicle & Tier"
            icon="solar:bus-bold"
            options={safariTiers}
            value={selectedTier.name}
            onChange={(tierName) => {
              const tier = safariTiers.find((t) => t.name === tierName || t.value === tierName);
              if (tier) setSelectedTier(tier);
            }}
            theme="dark"
          />
        </div>

        {/* Total Calculation */}
        <div className="pt-3 border-t border-white/15 flex justify-between items-baseline">
          <div>
            <span className="text-[1.3rem] text-gray-400">Total Price ({guests} guests)</span>
            <span className="block text-[1.1rem] text-primary">✓ Permits & Taxes Included</span>
          </div>
          <div className="text-[2.8rem] font-bold text-secondary NewFont">
            ${totalPrice}
          </div>
        </div>

        {/* Success Notification */}
        {addedSuccess && (
          <div className="bg-primary/20 border border-primary text-primary px-4 py-2.5 rounded-xl text-[1.3rem] font-semibold flex items-center gap-2 animate-fadein-up">
            <Icon icon="solar:check-circle-bold" className="text-[1.8rem]" />
            Added to your Safari Itinerary!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <AppButton
            type="button"
            variant="backdrop"
            icon="solar:cart-large-4-bold"
            onClick={handleAddToCart}
            classes="w-full justify-between"
          >
            Add to Safari Cart
          </AppButton>

          <AppButton
            type="button"
            variant="fill"
            icon="formkit:arrowright"
            onClick={handleBookNow}
            classes="w-full justify-between"
          >
            Instant Reserve (${totalPrice})
          </AppButton>
        </div>

        {/* Quick Trust Badges */}
        <div className="flex flex-col gap-2 text-[1.2rem] text-gray-300 pt-2 border-t border-white/10">
          <span className="flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-primary text-[1.6rem]" />
            100% Refundable up to 30 days prior
          </span>
          <span className="flex items-center gap-2">
            <Icon icon="solar:phone-calling-rounded-bold" className="text-primary text-[1.6rem]" />
            24/7 Field Ranger Helpline: +1 234 567 890
          </span>
        </div>
      </AnimeFadeIn>
    </div>
  );
}
