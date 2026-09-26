"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { AppButton } from "@/components/Button";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    permitFee,
    discountAmount,
    grandTotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromo,
    cartCount,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage(res);
    if (res.success) {
      setInputCode("");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-all duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />

      {/* Slide-out Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[48rem] bg-white z-[120] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="p-[2rem] sm:p-[2.4rem] border-b border-gray-100 flex items-center justify-between bg-[#f9fbf8]">
          <div className="flex items-center gap-3">
            <div className="w-[4rem] h-[4rem] rounded-full bg-primary/10 text-primary flex items-center justify-center text-[2rem]">
              <Icon icon="solar:cart-large-4-bold" />
            </div>
            <div>
              <h3 className="text-[1.8rem] sm:text-[2rem] font-bold text-heading-color">
                Safari Bookings
              </h3>
              <p className="text-[1.3rem] text-gray-500">
                {cartItems.length} {cartItems.length === 1 ? "tour" : "tours"} selected ({cartCount} {cartCount === 1 ? "guest" : "guests"})
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-[3.8rem] h-[3.8rem] rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-[2rem] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-[2rem] sm:p-[2.4rem] flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-[6rem]">
              <div className="w-[8rem] h-[8rem] rounded-full bg-[#EAF4E6] text-primary flex items-center justify-center text-[4rem]">
                <Icon icon="solar:ticket-bold" />
              </div>
              <h4 className="text-[2rem] font-bold text-heading-color">Your Itinerary is Empty</h4>
              <p className="text-[1.4rem] text-gray-500 max-w-[28rem]">
                Explore our world-class destinations and curated safari packages to reserve your expedition.
              </p>
              <button
                onClick={closeCart}
                className="mt-2"
              >
                <AppButton href="/packages">Browse Safari Packages</AppButton>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.date}-${item.tier}-${idx}`}
                  className="p-[1.6rem] bg-[#f9fbf8] rounded-[2rem] border border-gray-100 flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[9rem] h-[9rem] rounded-[1.4rem] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[1.5rem] sm:text-[1.6rem] font-bold text-heading-color line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.date, item.tier)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" className="text-[1.8rem]" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[1.2rem] text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon icon="hugeicons:location-04" className="text-primary" /> {item.location}
                        </span>
                        <span>•</span>
                        <span className="text-secondary font-medium">{item.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[1.2rem] text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:calendar-date-bold" className="text-primary" /> {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Guests & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/70">
                      <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.date, item.tier, -1)}
                          disabled={item.guests <= 1}
                          className="w-[2.4rem] h-[2.4rem] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                        >
                          -
                        </button>
                        <span className="text-[1.3rem] font-bold min-w-[3rem] text-center">
                          {item.guests} {item.guests === 1 ? "Guest" : "Guests"}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.date, item.tier, 1)}
                          className="w-[2.4rem] h-[2.4rem] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[1.6rem] sm:text-[1.8rem] font-bold text-primary NewFont">
                          ${item.price * item.guests}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-[2rem] sm:p-[2.4rem] bg-[#f9fbf8] border-t border-gray-200 flex flex-col gap-4">
            {/* Promo Code Form */}
            {promoDiscount > 0 ? (
              <div className="flex items-center justify-between bg-secondary/15 border border-secondary text-primary px-4 py-2.5 rounded-full text-[1.3rem] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Icon icon="solar:tag-price-bold" className="text-secondary text-[1.6rem]" />
                  Code <strong>{promoCode}</strong> applied ({promoDiscount * 100}% off)
                </span>
                <button
                  onClick={removePromo}
                  className="text-red-500 hover:underline text-[1.2rem] ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WILD15)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 min-h-[4.8rem] h-[4.8rem] bg-white border border-gray-200 px-4 rounded-full text-[1.3rem] outline-none focus:border-primary uppercase"
                />
                <button
                  type="submit"
                  className="min-h-[4.8rem] h-[4.8rem] bg-primary hover:bg-secondary text-white font-bold px-5 rounded-full text-[1.3rem] transition-colors cursor-pointer flex items-center justify-center"
                >
                  Apply
                </button>
              </form>
            )}

            {promoMessage && !promoDiscount && (
              <p className="text-red-500 text-[1.2rem]">{promoMessage.message}</p>
            )}

            {/* Calculations */}
            <div className="flex flex-col gap-2 text-[1.4rem] pt-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartCount} guests)</span>
                <span className="font-semibold text-heading-color">${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-1">
                  Permits & Forest Conservation (5%)
                  <Icon icon="solar:info-circle-bold" className="text-primary text-[1.4rem]" />
                </span>
                <span className="font-semibold text-heading-color">${permitFee}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-secondary font-semibold">
                  <span>Special Promo Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-[1.8rem] sm:text-[2rem] font-bold text-heading-color pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-primary NewFont">${grandTotal}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <AppButton
                href="/cart"
                onClick={closeCart}
                variant="fill"
                classes="w-full justify-between"
              >
                Proceed to Booking Checkout
              </AppButton>

              <button
                onClick={closeCart}
                className="text-[1.3rem] text-gray-500 hover:text-primary transition-colors text-center py-1 font-medium cursor-pointer"
              >
                Continue Browsing Tours
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
