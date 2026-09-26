"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { HERO_IMAGE1, HERO_IMAGE2, HERO_IMAGE8 } from "@/constants/images";
import { AppButton } from "@/components/Button";
import { AnimeFadeIn } from "@/components/Anime/AnimeComponents";
import CustomDatePicker from "@/components/CustomInputs/CustomDatePicker";
import PrintableSafariVoucher from "@/components/Booking/PrintableSafariVoucher";

const availableAddons = [
  {
    id: "airport-transfer",
    name: "VIP Airport Pick & Drop",
    desc: "Private air-conditioned transfer directly to your wilderness jungle lodge.",
    price: 60,
    icon: "solar:bus-bold",
  },
  {
    id: "night-safari",
    name: "Night Safari & Thermal Scopes",
    desc: "2-hour nocturnal drive in sanctuary buffer zones with night-vision gear.",
    price: 85,
    icon: "solar:moon-fog-bold",
  },
  {
    id: "camera-gear",
    name: "Pro Telephoto Lens Rental",
    desc: "Sony/Canon 100-400mm f/4.5-5.6 wildlife zoom lens with dust hood.",
    price: 110,
    icon: "solar:camera-bold",
  },
  {
    id: "conservation-fund",
    name: "Forest Guard & Tiger Fund",
    desc: "Direct donation to anti-poaching patrol kits and local tribal schools.",
    price: 25,
    icon: "solar:leaf-bold",
  },
];

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateItemDate,
    clearCart,
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

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [inputCode, setInputCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [depositOption, setDepositOption] = useState("full"); // "full" | "deposit"

  // Lead Traveler Info State
  const [travelerInfo, setTravelerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "United States",
    passportNumber: "",
    specialRequests: "",
  });

  // Booking completion state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [confirmedData, setConfirmedData] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const finalTotal = grandTotal + addonsTotal;
  const depositAmount = Math.round(finalTotal * 0.3); // 30% deposit

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
    if (res.success) setInputCode("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTravelerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    if (!travelerInfo.fullName || !travelerInfo.email || !travelerInfo.phone) {
      alert("Please fill in the mandatory lead traveler contact details.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `WILD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const snapshot = {
        bookingId: generatedId,
        bookingDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        issueTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        traveler: { ...travelerInfo },
        items: cartItems.map((item) => ({ ...item })),
        addons: selectedAddons
          .map((id) => availableAddons.find((a) => a.id === id))
          .filter(Boolean),
        subtotal,
        permitFee,
        discountAmount,
        promoCode,
        addonsTotal,
        finalTotal,
        depositOption,
        depositAmount,
        paymentMethod,
        paidAmount: depositOption === "deposit" ? depositAmount : finalTotal,
        balanceDue: depositOption === "deposit" ? finalTotal - depositAmount : 0,
      };

      setConfirmedData(snapshot);
      setBookingId(generatedId);
      setBookingConfirmed(true);
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  return (
    <main className="w-full bg-[#f9fbf8] min-h-screen">
      <div className="web-only-view">
        <BreadcrumbBanner
          title="Safari Booking & Checkout"
          breadcrumb={["Home", "Cart & Checkout"]}
          backgroundImage={HERO_IMAGE8}
          subtitle="Expedition Reservations"
        />
      </div>

      {bookingConfirmed ? (
        /* Confirmation Screen */
        <>
          <section className="sectionPadding web-only-view">
            <div className="custom-container max-w-[80rem]">
              <AnimeFadeIn>
                <div className="bg-white rounded-[3rem] p-[3.5rem] sm:p-[5rem] border border-primary/20 shadow-2xl text-center flex flex-col items-center gap-6">
                  <div className="w-[9rem] h-[9rem] rounded-full bg-[#EAF4E6] text-primary flex items-center justify-center text-[4.5rem] animate-bounce">
                    <Icon icon="solar:check-circle-bold" />
                  </div>

                  <div>
                    <span className="text-secondary ButtonFont text-[3rem] sm:text-[3.5rem] leading-none">
                      Reservation Confirmed!
                    </span>
                    <h2 className="text-heading-color font-bold text-[2.6rem] sm:text-[3.4rem] mt-2">
                      Pack Your Bags for the Wild!
                    </h2>
                    <p className="text-gray-600 text-[1.5rem] sm:text-[1.6rem] max-w-[50rem] mx-auto mt-2">
                      Your safari permits and lodge reservations have been locked. A detailed expedition itinerary and permit voucher has been dispatched to <strong>{travelerInfo.email}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#f4f7f2] rounded-[2rem] p-6 w-full max-w-[50rem] flex flex-col gap-3 text-left border border-gray-200">
                    <div className="flex justify-between text-[1.5rem]">
                      <span className="text-gray-500">Booking Reference:</span>
                      <strong className="text-primary font-mono text-[1.6rem]">{bookingId}</strong>
                    </div>
                    <div className="flex justify-between text-[1.5rem]">
                      <span className="text-gray-500">Lead Traveler:</span>
                      <span className="font-semibold text-heading-color">{travelerInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between text-[1.5rem]">
                      <span className="text-gray-500">Payment Status:</span>
                      <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full font-bold text-[1.2rem]">
                        {depositOption === "deposit" ? "30% Deposit Received" : "100% Fully Paid"}
                      </span>
                    </div>
                    <div className="flex justify-between text-[1.5rem]">
                      <span className="text-gray-500">Amount Paid:</span>
                      <strong className="text-heading-color font-bold text-[1.7rem]">
                        ${depositOption === "deposit" ? depositAmount : finalTotal}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-primary hover:bg-[#5fa045] text-white font-bold px-8 py-4 rounded-full text-[1.5rem] flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                    >
                      <Icon icon="solar:printer-bold" className="text-[1.8rem]" /> Print Official Voucher (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVoucherModal(true)}
                      className="bg-[#EAF4E6] hover:bg-[#dbebd4] text-primary font-bold px-7 py-4 rounded-full text-[1.5rem] flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
                    >
                      <Icon icon="solar:document-text-bold" className="text-[1.8rem]" /> Preview Permit Document
                    </button>
                    <AppButton href="/">Return to Homepage</AppButton>
                  </div>
                </div>
              </AnimeFadeIn>
            </div>
          </section>

          {/* Render dedicated voucher for print output */}
          <PrintableSafariVoucher data={confirmedData} />

          {/* Interactive Fullscreen Preview Modal */}
          {showVoucherModal && (
            <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto no-print">
              <div className="bg-[#f0f4ee] rounded-3xl max-w-[950px] w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 relative shadow-2xl">
                <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-6 sticky top-0 bg-[#f0f4ee]/95 backdrop-blur-md z-10 py-2">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:document-text-bold" className="text-primary text-[2.4rem]" />
                    <span className="font-bold text-[1.8rem] text-heading-color">Official Expedition Voucher Preview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-primary hover:bg-[#5fa045] text-white font-bold px-5 py-2.5 rounded-full text-[1.4rem] flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Icon icon="solar:printer-bold" className="text-[1.6rem]" /> Print / Save as PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVoucherModal(false)}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center text-[1.8rem] cursor-pointer transition-colors shadow-sm"
                    >
                      <Icon icon="solar:close-circle-bold" />
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow-xl rounded-xl overflow-hidden p-2 sm:p-4 border border-gray-200">
                  <PrintableSafariVoucher data={confirmedData} />
                </div>
              </div>
            </div>
          )}
        </>
      ) : cartItems.length === 0 ? (
        /* Empty Cart Screen */
        <section className="sectionPadding">
          <div className="custom-container max-w-[70rem]">
            <AnimeFadeIn>
              <div className="bg-white rounded-[3rem] p-[4rem] sm:p-[6rem] text-center border border-gray-200 shadow-sm flex flex-col items-center gap-6">
                <div className="w-[10rem] h-[10rem] rounded-full bg-[#EAF4E6] text-primary flex items-center justify-center text-[5rem]">
                  <Icon icon="solar:compass-bold" />
                </div>
                <div>
                  <h2 className="text-heading-color font-bold text-[2.6rem] sm:text-[3.2rem]">
                    Your Safari Basket is Empty
                  </h2>
                  <p className="text-gray-500 text-[1.5rem] sm:text-[1.6rem] max-w-[45rem] mx-auto mt-2">
                    You have not selected any wildlife destinations or safari tour packages yet.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <AppButton href="/packages">Explore Tour Packages</AppButton>
                  <AppButton href="/destinations" variant="outline">
                    View Destinations
                  </AppButton>
                </div>
              </div>
            </AnimeFadeIn>
          </div>
        </section>
      ) : (
        /* Main Cart & Checkout Content */
        <section className="sectionPadding">
          <div className="custom-container">
            <form onSubmit={handleCompleteBooking} className="flex flex-col lg:flex-row items-start justify-between gap-[4rem] lg:gap-[6rem]">
              {/* Left Column: Review Tours, Addons, Traveler Details */}
              <div className="w-full lg:w-2/3 flex flex-col gap-[3.5rem]">
                {/* 1. Selected Tours List */}
                <AnimeFadeIn className="bg-white rounded-[2.4rem] p-[2.5rem] sm:p-[3.5rem] border border-gray-200/80 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-primary ButtonFont text-[2.4rem] sm:text-[3rem] leading-none">
                        Step 1
                      </span>
                      <h2 className="text-[2.2rem] sm:text-[2.6rem] font-bold text-heading-color">
                        Review Booked Tours ({cartItems.length})
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-[1.3rem] font-semibold flex items-center gap-1 transition-allcursor-pointer"
                    >
                      <Icon icon="solar:trash-bin-trash-bold" /> Clear All
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    {cartItems.map((item, idx) => (
                      <div
                        key={`${item.id}-${item.date}-${idx}`}
                        className="p-[2rem] bg-[#f9fbf8] rounded-[2rem] border border-gray-200/70 flex flex-col sm:flex-row gap-5"
                      >
                        <div className="relative w-full sm:w-[15rem] h-[14rem] rounded-[1.6rem] overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-[1.8rem] sm:text-[2rem] font-bold text-heading-color">
                                {item.title}
                              </h3>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id, item.date, item.tier)}
                                className="text-gray-400 hover:text-red-500 transition-allp-1"
                                title="Remove tour"
                              >
                                <Icon icon="solar:trash-bin-trash-bold" className="text-[2rem]" />
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-[1.3rem] text-gray-500 mt-1">
                              <span className="flex items-center gap-1 font-medium text-heading-color">
                                <Icon icon="hugeicons:location-04" className="text-primary" /> {item.location}
                              </span>
                              <span>•</span>
                              <span className="text-secondary font-semibold">{item.duration}</span>
                              <span>•</span>
                              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[1.2rem] font-semibold">
                                {item.tier}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200 items-end">
                            {/* Custom Date Selector */}
                            <CustomDatePicker
                              label="Departure Date"
                              value={item.date}
                              onChange={(newDate) => updateItemDate(item.id, item.date, item.tier, newDate)}
                              theme="light"
                            />

                            {/* Guest Count & Price */}
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-3 py-1.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.date, item.tier, -1)}
                                  disabled={item.guests <= 1}
                                  className="w-[2.4rem] h-[2.4rem] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 font-bold"
                                >
                                  -
                                </button>
                                <span className="text-[1.4rem] font-bold min-w-[4rem] text-center">
                                  {item.guests} {item.guests === 1 ? "Guest" : "Guests"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.date, item.tier, 1)}
                                  className="w-[2.4rem] h-[2.4rem] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-[2rem] font-bold text-primary NewFont">
                                  ${item.price * item.guests}
                                </span>
                                <span className="block text-[1.1rem] text-gray-400">(${item.price}/person)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimeFadeIn>

                {/* 2. Optional Safari Add-ons */}
                <AnimeFadeIn className="bg-white rounded-[2.4rem] p-[2.5rem] sm:p-[3.5rem] border border-gray-200/80 shadow-sm flex flex-col gap-5">
                  <div>
                    <span className="text-primary ButtonFont text-[2.4rem] sm:text-[3rem] leading-none">
                      Step 2
                    </span>
                    <h2 className="text-[2.2rem] sm:text-[2.6rem] font-bold text-heading-color">
                      Enhance Your Expedition (Optional Add-ons)
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-[1.8rem] border-2 cursor-pointer transition-all duration-300 flex items-start gap-3.5 select-none ${isChecked
                            ? "border-primary bg-[#EAF4E6] shadow-sm"
                            : "border-gray-200 bg-[#f9fbf8] hover:border-gray-300"
                            }`}
                        >
                          <div className={`w-[4.4rem] h-[4.4rem] rounded-[1.2rem] flex items-center justify-center text-[2.2rem] shrink-0 ${isChecked ? "bg-primary text-white" : "bg-white text-primary border border-gray-200"
                            }`}>
                            <Icon icon={addon.icon} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-[1.5rem] font-bold text-heading-color">{addon.name}</h4>
                              <span className="text-[1.5rem] font-bold text-primary NewFont">+${addon.price}</span>
                            </div>
                            <p className="text-[1.2rem] text-gray-500 mt-1 leading-snug">{addon.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AnimeFadeIn>

                {/* 3. Lead Traveler & Wildlife Permits Info */}
                <AnimeFadeIn className="bg-white rounded-[2.4rem] p-[2.5rem] sm:p-[3.5rem] border border-gray-200/80 shadow-sm flex flex-col gap-5">
                  <div>
                    <span className="text-primary ButtonFont text-[2.4rem] sm:text-[3rem] leading-none">
                      Step 3
                    </span>
                    <h2 className="text-[2.2rem] sm:text-[2.6rem] font-bold text-heading-color">
                      Lead Traveler & Park Permit Details
                    </h2>
                    <p className="text-[1.3rem] text-gray-500 mt-1">
                      Required by National Forest Departments for issuance of entry permits and vehicle gate passes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2.2rem]">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                        <Icon icon="solar:user-bold" className="text-primary text-[1.6rem]" />
                        Full Name (As on Passport) *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={travelerInfo.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 rounded-full px-5 text-[1.4rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                        <Icon icon="solar:letter-bold" className="text-primary text-[1.6rem]" />
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          value={travelerInfo.email}
                          onChange={handleInputChange}
                          placeholder="eleanor@example.com"
                          className="w-full min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 rounded-full px-5 text-[1.4rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                        <Icon icon="solar:phone-bold" className="text-primary text-[1.6rem]" />
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={travelerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 019-2834"
                          className="w-full min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 rounded-full px-5 text-[1.4rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                        <Icon icon="solar:shield-star-bold" className="text-primary text-[1.6rem]" />
                        Passport / Govt ID Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="passportNumber"
                          value={travelerInfo.passportNumber}
                          onChange={handleInputChange}
                          placeholder="A12345678"
                          className="w-full min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 rounded-full px-5 text-[1.4rem] text-heading-color outline-none focus:border-primary focus:bg-white uppercase transition"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[1.35rem] font-semibold text-heading-color flex items-center gap-1.5">
                        <Icon icon="solar:notes-bold" className="text-primary text-[1.6rem]" />
                        Special Requests or Dietary Preferences
                      </label>
                      <textarea
                        name="specialRequests"
                        rows={3}
                        value={travelerInfo.specialRequests}
                        onChange={handleInputChange}
                        placeholder="e.g. Vegetarian meals, keen birdwatcher focusing on raptors..."
                        className="w-full bg-[#f9fbf8] border border-gray-200 rounded-2xl p-4 text-[1.4rem] text-heading-color outline-none focus:border-primary focus:bg-white resize-none transition"
                      />
                    </div>
                  </div>
                </AnimeFadeIn>
              </div>

              {/* Right Column: Sticky Price Breakdown & Payment */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-[12rem] self-start flex flex-col gap-5">
                <div className="bg-white rounded-[2.4rem] p-[2.5rem] sm:p-[3rem] border border-gray-200 shadow-xl flex flex-col gap-5">
                  <h3 className="text-[2rem] font-bold text-heading-color pb-3 border-b border-gray-100 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-[1.4rem] font-normal text-gray-500">{cartCount} Guests Total</span>
                  </h3>

                  {/* Calculations */}
                  <div className="flex flex-col gap-3 text-[1.4rem]">
                    <div className="flex justify-between text-gray-600">
                      <span>Tours Base Price</span>
                      <span className="font-semibold text-heading-color">${subtotal}</span>
                    </div>

                    {addonsTotal > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Selected Add-ons ({selectedAddons.length})</span>
                        <span className="font-semibold text-primary">+${addonsTotal}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        Permits & Wildlife Cess (5%)
                        <Icon icon="solar:info-circle-bold" className="text-primary text-[1.4rem]" />
                      </span>
                      <span className="font-semibold text-heading-color">${permitFee}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-secondary font-semibold">
                        <span>Promo Code ({promoCode})</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="text-[1.8rem] font-bold text-heading-color">Grand Total</span>
                      <span className="text-[2.6rem] font-bold text-primary NewFont">${finalTotal}</span>
                    </div>
                  </div>

                  {/* Payment Schedule Option */}
                  <div className="bg-[#f9fbf8] p-3 rounded-2xl border border-gray-200 flex flex-col gap-2">
                    <span className="text-[1.2rem] font-semibold text-gray-500 uppercase">Payment Schedule</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDepositOption("full")}
                        className={`py-2 px-3 rounded-xl text-[1.3rem] font-bold transition-alltext-center ${depositOption === "full"
                          ? "bg-primary text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        Pay 100% (${finalTotal})
                      </button>

                      <button
                        type="button"
                        onClick={() => setDepositOption("deposit")}
                        className={`py-2 px-3 rounded-xl text-[1.3rem] font-bold transition-alltext-center ${depositOption === "deposit"
                          ? "bg-primary text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        30% Deposit (${depositAmount})
                      </button>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  {promoDiscount > 0 ? (
                    <div className="flex items-center justify-between bg-secondary/15 border border-secondary text-primary px-3 py-2 rounded-xl text-[1.2rem] font-semibold">
                      <span>✓ {promoCode} Applied</span>
                      <button type="button" onClick={removePromo} className="text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code (WILD15)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 min-h-[4.8rem] h-[4.8rem] bg-[#f9fbf8] border border-gray-200 px-4 rounded-full text-[1.3rem] outline-none uppercase font-semibold focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCode}
                        className="min-h-[4.8rem] h-[4.8rem] bg-primary hover:bg-secondary text-white font-bold px-5 rounded-full text-[1.3rem] transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {promoFeedback && !promoDiscount && (
                    <p className="text-red-500 text-[1.2rem]">{promoFeedback.message}</p>
                  )}

                  {/* Submit Button */}
                  <AppButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="fill"
                    classes="w-full justify-between"
                  >
                    {isSubmitting
                      ? "Securing Wildlife Permits..."
                      : depositOption === "deposit"
                        ? `Pay 30% Deposit ($${depositAmount})`
                        : `Confirm & Pay ($${finalTotal})`}
                  </AppButton>

                  <div className="flex items-center justify-center gap-2 text-gray-500 text-[1.2rem] text-center">
                    <Icon icon="solar:shield-check-bold" className="text-primary text-[1.8rem]" />
                    <span>Free cancellation up to 30 days before safari date</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
