"use client";
import React from "react";
import { Icon } from "@iconify/react";

/**
 * PrintableSafariVoucher
 * Professional, official Safari Expedition Permit & Boarding Voucher document.
 * Formatted specifically for high-end PDF export and A4 printing.
 */
export default function PrintableSafariVoucher({ data = {} }) {
  const safeData = data || {};

  const {
    bookingId = "WILD-2026-8812",
    bookingDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    issueTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    traveler = {},
    items = [],
    addons = [],
    subtotal = 0,
    permitFee = 0,
    discountAmount = 0,
    promoCode = "",
    addonsTotal = 0,
    finalTotal = 0,
    depositOption = "full",
    depositAmount = 0,
    paymentMethod = "card",
    paidAmount = 0,
    balanceDue = 0,
  } = safeData;

  const totalGuests = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div
      id="printable-safari-voucher"
      className="w-full bg-white text-[#111827] font-sans p-6 sm:p-10 max-w-[210mm] mx-auto box-border"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        lineHeight: "1.4",
      }}
    >
      {/* Outer Luxury Security Border */}
      <div className="border-2 border-[#14261c] p-6 sm:p-8 rounded-lg relative overflow-hidden bg-white">
        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-[#14261c] gap-4">
          {/* Brand Logo & Authority */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#14261c] text-[#73b458] flex items-center justify-center text-2xl font-black shrink-0">
              <Icon icon="solar:compass-bold" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-wider text-[#14261c] uppercase">
                WILDORA ECO-EXPEDITIONS
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#73b458] font-bold">
                Luxury Wilderness Lodges & Conservation Sanctuaries
              </div>
              <div className="text-[9px] text-gray-500 font-mono">
                Official Sanctuary Dispatch Permit • License #WILD-TZ-8849-ECO
              </div>
            </div>
          </div>

          {/* Permit Status & Ref Badge */}
          <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-1">
            <span className="inline-flex items-center gap-1.5 bg-[#EAF4E6] text-[#14261c] border border-[#73b458] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#73b458] inline-block" />
              CONFIRMED & ISSUED
            </span>
            <div className="text-xs text-gray-500">
              Issue Date: <strong className="text-gray-900">{bookingDate} {issueTime}</strong>
            </div>
          </div>
        </div>

        {/* Document Title & Reference Bar */}
        <div className="my-5 p-4 bg-[#f8faf7] border border-[#e2ebd9] rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#73b458]">
              Official Travel Authorization Document
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#14261c] tracking-tight m-0">
              SAFARI EXPEDITION PERMIT & BOARDING VOUCHER
            </h1>
            <p className="text-xs text-gray-600 m-0 mt-0.5">
              Present this digital or printed voucher along with government-issued photo identification at the sanctuary ranger gate.
            </p>
          </div>

          {/* Visual Reference & Barcode Box */}
          <div className="text-left md:text-right shrink-0 bg-white p-2.5 rounded border border-gray-200">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Booking Reference No.
            </div>
            <div className="font-mono text-lg font-black text-[#14261c] tracking-wider">
              {bookingId}
            </div>
            {/* Mock Security Barcode Bars */}
            <div className="flex gap-[2px] h-5 mt-1 justify-end items-center opacity-80">
              {[4, 2, 6, 1, 3, 5, 2, 7, 3, 1, 4, 6, 2, 5, 1, 3, 6, 2, 4, 5, 2, 3, 6, 1].map((h, i) => (
                <div
                  key={i}
                  className="bg-black"
                  style={{
                    width: (i % 3 === 0 ? "2px" : "1.5px"),
                    height: `${h * 2.5 + 4}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Lead Passenger & Expedition Manifest */}
        <div className="mb-6">
          <div className="text-xs font-black text-[#14261c] uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 flex items-center gap-1.5">
            <Icon icon="solar:user-id-bold" className="text-[#73b458] text-base" />
            <span>1. Lead Traveler & Passenger Manifest</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#fafafa] p-3.5 rounded border border-gray-200 text-xs">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Lead Passenger Name</span>
              <strong className="text-sm font-bold text-gray-900 block mt-0.5">
                {traveler.fullName || "Valued Expedition Guest"}
              </strong>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Contact Email & Phone</span>
              <span className="text-gray-900 block font-medium mt-0.5">
                {traveler.email || "guest@wildora.com"}
              </span>
              <span className="text-gray-600 block text-[11px]">
                {traveler.phone || "+1 (555) 000-0000"}
              </span>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Nationality & Identification</span>
              <span className="text-gray-900 font-semibold block mt-0.5">
                {traveler.nationality || "International Traveler"}
              </span>
              <span className="text-gray-600 block text-[11px]">
                Passport: {traveler.passportNumber || "Verified at Gate Entry"}
              </span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Special Dietary / Safari Medical Notes</span>
              <span className="text-gray-700 italic block mt-0.5">
                {traveler.specialRequests || "Standard wilderness menu requested. No medical alerts registered."}
              </span>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Total Expedition Party</span>
              <span className="text-gray-900 font-bold block mt-0.5">
                {totalGuests} {totalGuests === 1 ? "Traveler" : "Travelers"} (Full Gate Clearance)
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Reserved Safari Expeditions Table */}
        <div className="mb-6">
          <div className="text-xs font-black text-[#14261c] uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 flex items-center gap-1.5">
            <Icon icon="solar:routing-2-bold" className="text-[#73b458] text-base" />
            <span>2. Reserved Wildlife Expeditions & Sanctuary Entry Permits</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-gray-200">
              <thead>
                <tr className="bg-[#14261c] text-white text-[10px] uppercase tracking-wider">
                  <th className="p-2.5 font-bold">#</th>
                  <th className="p-2.5 font-bold">Safari Package & Reserve</th>
                  <th className="p-2.5 font-bold">Scheduled Date & Slot</th>
                  <th className="p-2.5 font-bold">Tier / Cruiser</th>
                  <th className="p-2.5 font-bold text-center">Party</th>
                  <th className="p-2.5 font-bold text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#fcfdfc]"}>
                      <td className="p-2.5 font-bold text-gray-500">{idx + 1}</td>
                      <td className="p-2.5">
                        <strong className="text-gray-900 block font-bold text-xs">{item.title}</strong>
                        <span className="text-[10px] text-gray-500 block">
                          Duration: {item.duration || "Multi-Day Expedition"} • Includes Certified Naturalist Guide
                        </span>
                      </td>
                      <td className="p-2.5">
                        <strong className="text-gray-900 block">{item.date || "Scheduled Date"}</strong>
                        <span className="text-[10px] text-[#73b458] font-bold block">
                          {item.timeSlot || "Morning Sunrise Drive (06:00 AM)"}
                        </span>
                      </td>
                      <td className="p-2.5 text-gray-700">
                        <span className="font-semibold block">{item.tier || "Private 4x4 Cruiser"}</span>
                        <span className="text-[10px] text-gray-500">Pop-up Roof & Scopes</span>
                      </td>
                      <td className="p-2.5 text-center font-bold text-gray-800">
                        {item.quantity || 1}
                      </td>
                      <td className="p-2.5 text-right font-bold text-gray-900">
                        ${(item.price * (item.quantity || 1)).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500 italic">
                      Standard All-Inclusive Safari Expedition Package
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Add-on Services & Gear Rental (if any) */}
        {addons.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-black text-[#14261c] uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 flex items-center gap-1.5">
              <Icon icon="solar:box-minimalistic-bold" className="text-[#73b458] text-base" />
              <span>3. Expedition Equipment & VIP Concierge Add-ons</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {addons.map((addon, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#fafafa] p-2.5 rounded border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon={addon.icon || "solar:check-circle-bold"} className="text-[#73b458] text-base shrink-0" />
                    <div>
                      <strong className="text-gray-900 block text-xs">{addon.name}</strong>
                      <span className="text-[10px] text-gray-500 block">{addon.desc}</span>
                    </div>
                  </div>
                  <strong className="text-gray-900 font-mono ml-2 shrink-0">${addon.price}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Financial Summary & Settlement Status */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
          {/* Payment Method & Gate Instructions */}
          <div className="sm:col-span-7 bg-[#f8faf7] p-3.5 rounded border border-[#e2ebd9] text-xs">
            <div className="text-[10px] uppercase font-bold text-[#73b458] tracking-wider mb-1">
              Payment & Gate Settlement Verification
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-200">
              <span className="text-gray-600">Payment Channel:</span>
              <strong className="text-gray-900 uppercase font-mono text-[11px]">
                {paymentMethod === "card" ? "Credit / Debit Card (Verified)" : paymentMethod}
              </strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-200">
              <span className="text-gray-600">Deposit / Payment Terms:</span>
              <span className="text-gray-900 font-semibold">
                {depositOption === "deposit" ? "30% Advance Deposit Paid" : "100% Full Payment Settled"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600">Outstanding Balance at Lodge:</span>
              <strong className={balanceDue > 0 ? "text-amber-700 font-bold" : "text-green-700 font-bold"}>
                {balanceDue > 0 ? `$${balanceDue.toLocaleString()} (Due on Arrival)` : "$0.00 (Fully Cleared)"}
              </strong>
            </div>
          </div>

          {/* Totals Box */}
          <div className="sm:col-span-5 bg-[#14261c] text-white p-3.5 rounded text-xs">
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-gray-300">
                <span>Base Expeditions Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Sanctuary & Ranger Fees:</span>
                <span>${permitFee.toLocaleString()}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Concierge Add-ons:</span>
                  <span>${addonsTotal.toLocaleString()}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#73b458]">
                  <span>VIP Promo ({promoCode}):</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-1.5 flex justify-between font-bold text-sm text-[#f29727]">
                <span>Total Package Value:</span>
                <span>${finalTotal.toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-1 flex justify-between font-black text-xs text-white">
                <span>Amount Paid / Settled:</span>
                <span className="text-[#73b458]">${paidAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Essential Sanctuary Rules & Gate Protocols */}
        <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-600">
          <div className="font-bold text-[#14261c] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Icon icon="solar:shield-check-bold" className="text-[#73b458] text-xs" />
            <span>Sanctuary Entry Regulations & Wilderness Code of Conduct</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <div>• <strong>Mandatory Identification:</strong> All guests must produce original passport/ID matching this voucher at the gate.</div>
            <div>• <strong>Gate Reporting Time:</strong> Arrive at the safari assembly gate 30 minutes prior to scheduled game drive.</div>
            <div>• <strong>Eco Conservation:</strong> Plastic-free sanctuary; strictly no littering, drone flights, or feeding wild animals.</div>
            <div>• <strong>Safety Protocols:</strong> Remain seated in 4x4 cruiser at all times. Follow head naturalist instructions.</div>
          </div>
        </div>

        {/* Section 6: Official Sign-Off & Verification Stamp */}
        <div className="pt-4 border-t-2 border-gray-300 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 text-xs">
          {/* QR Code & Scan Security */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 p-1 rounded flex items-center justify-center shrink-0">
              <Icon icon="solar:qr-code-bold" className="text-4xl text-[#14261c]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Security Verification</div>
              <div className="font-mono text-xs font-bold text-[#14261c]">DIGITAL SIGNATURE #VERIFIED</div>
              <div className="text-[9px] text-gray-400">Scan at ranger post for automated gate barrier pass.</div>
            </div>
          </div>

          {/* Dispatch Authority Stamp & Signature */}
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Authorized Dispatch Officer</div>
            <div className="font-serif italic text-base font-bold text-[#14261c] mt-0.5">
              Alistair Finch, Chief Naturalist
            </div>
            <div className="text-[9px] text-gray-500 font-mono">
              Wildora Sanctuary Operations & Ranger Dispatch Dept.
            </div>
          </div>
        </div>

        {/* 24/7 Dispatch Help */}
        <div className="mt-4 pt-2 border-t border-gray-200 text-center text-[9px] text-gray-400 font-mono">
          24/7 Field Concierge Helpline: +1 (800) WILD-SAFARI • Emergency VHF Ranger Frequency: Channel 14 • wildora-expeditions.com
        </div>
      </div>
    </div>
  );
}
