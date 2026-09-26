"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [postAuthAction, setPostAuthAction] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wildora_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
  }, []);

  const openAuthModal = (mode = "login", callbackAction = null) => {
    setAuthMode(mode);
    setPostAuthAction(() => callbackAction);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPostAuthAction(null);
  };

  const login = (email, password) => {
    // Simulated authentication
    const userData = {
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email,
      avatar: "/assets/images/avtar.png",
      phone: "+1 (555) 234-8921",
      membership: "Wildora Explorer",
      loggedInAt: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem("wildora_user", JSON.stringify(userData));
    setIsAuthModalOpen(false);

    if (postAuthAction && typeof postAuthAction === "function") {
      postAuthAction(userData);
      setPostAuthAction(null);
    }

    return userData;
  };

  const signup = (name, email, password, phone) => {
    const userData = {
      name: name || "Safari Traveler",
      email: email,
      avatar: "/assets/images/avtar.png",
      phone: phone || "+1 (555) 234-8921",
      membership: "Wildora Premier Adventurer",
      loggedInAt: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem("wildora_user", JSON.stringify(userData));
    setIsAuthModalOpen(false);

    if (postAuthAction && typeof postAuthAction === "function") {
      postAuthAction(userData);
      setPostAuthAction(null);
    }

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wildora_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
