"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wildora_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wildora_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (item, openDrawer = true) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.date === item.date && i.tier === item.tier
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          guests: updated[existingIndex].guests + (item.guests || 1),
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: item.id || `tour-${Date.now()}`,
          title: item.title || item.name || "Safari Expedition",
          slug: item.slug || "",
          image: item.image || "/assets/images/Bg2.webp",
          location: item.location || item.country || "National Park Reserve",
          price: Number(item.price) || 450,
          duration: item.duration || "4 Days / 3 Nights",
          date: item.date || new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0],
          guests: Number(item.guests) || 2,
          tier: item.tier || "Standard Safari 4x4",
          type: item.type || "package",
        },
      ];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id, date, tier) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.id === id && i.date === date && i.tier === tier))
    );
  };

  const updateQuantity = (id, date, tier, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.date === date && item.tier === tier) {
            const newGuests = Math.max(1, item.guests + delta);
            return { ...item, guests: newGuests };
          }
          return item;
        })
        .filter((item) => item.guests > 0)
    );
  };

  const updateItemDate = (id, oldDate, tier, newDate) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.date === oldDate && item.tier === tier) {
          return { ...item, date: newDate };
        }
        return item;
      })
    );
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "WILD15" || clean === "SAFARI15") {
      setPromoDiscount(0.15);
      setPromoCode(clean);
      return { success: true, message: "15% discount applied successfully!" };
    }
    if (clean === "FIRSTWILD" || clean === "EARLYBIRD") {
      setPromoDiscount(0.1);
      setPromoCode(clean);
      return { success: true, message: "10% Early Bird discount applied!" };
    }
    return { success: false, message: "Invalid promo code. Try 'WILD15'" };
  };

  const removePromo = () => {
    setPromoDiscount(0);
    setPromoCode("");
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoDiscount(0);
    setPromoCode("");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.guests, 0);
  const itemsCount = cartItems.length;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.guests,
    0
  );

  const permitFee = Math.round(subtotal * 0.05); // 5% government wildlife permit & reserve cess
  const discountAmount = Math.round(subtotal * promoDiscount);
  const grandTotal = Math.max(0, subtotal + permitFee - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemDate,
        clearCart,
        cartCount,
        itemsCount,
        subtotal,
        permitFee,
        discountAmount,
        grandTotal,
        promoDiscount,
        promoCode,
        applyPromoCode,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
