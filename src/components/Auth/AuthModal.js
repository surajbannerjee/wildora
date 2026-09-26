"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, signup } = useAuth();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showSignInPass, setShowSignInPass] = useState(false);
  const [showSignUpPass, setShowSignUpPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const isSignUpActive = authMode === "signup";

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!signInData.email || !signInData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(signInData.email, signInData.password);
      setIsLoading(false);
      setSignInData({ email: "", password: "" });
    }, 600);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setError("Please fill in your name, email, and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signup(signUpData.name, signUpData.email, signUpData.password, signUpData.phone);
      setIsLoading(false);
      setSignUpData({ name: "", email: "", phone: "", password: "" });
    }, 600);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("alex.traveler@gmail.com", "google-oauth-token");
      setIsLoading(false);
    }, 500);
  };

  const handleGuestContinue = () => {
    login("guest.adventurer@wildora.com", "guest-mode");
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-all duration-300"
        onClick={closeAuthModal}
      />

      {/* Main Double-Sided Sliding Container */}
      <div
        id="container"
        className={`auth-sliding-container relative z-10 ${
          isSignUpActive ? "right-panel-active" : ""
        }`}
      >
        {/* Floating Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-[3.8rem] h-[3.8rem] rounded-full bg-primary hover:bg-black/20 text-heading-color hover:text-black flex items-center justify-center text-[2rem] transition-all duration-200 z-[100] cursor-pointer"
          aria-label="Close modal"
        >
          <Icon icon="material-symbols:close" />
        </button>

        {/* Mobile Tab Switcher (Visible only on < 640px) */}
        <div className="sm:hidden flex border-b border-gray-100 bg-[#f9fbf8]">
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setError("");
            }}
            className={`flex-1 py-3.5 text-center font-bold text-[1.4rem] transition-colors cursor-pointer border-b-2 ${
              !isSignUpActive
                ? "border-primary text-primary bg-white"
                : "border-transparent text-gray-500 hover:text-heading-color"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setError("");
            }}
            className={`flex-1 py-3.5 text-center font-bold text-[1.4rem] transition-colors cursor-pointer border-b-2 ${
              isSignUpActive
                ? "border-primary text-primary bg-white"
                : "border-transparent text-gray-500 hover:text-heading-color"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* SIGN UP FORM CONTAINER */}
        <div
          className={`auth-form-container auth-sign-up-container ${
            !isSignUpActive ? "sm:opacity-0 sm:pointer-events-none" : ""
          } ${!isSignUpActive ? "hidden sm:block" : "block"}`}
        >
          <div className="h-full flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-10 bg-white">
            <form onSubmit={handleSignUpSubmit} className="flex flex-col items-center text-center">
              <h2 className="text-[2.6rem] sm:text-[3rem] font-bold text-heading-color leading-tight mb-2">
                Create Account
              </h2>

              {/* Social Login Icons */}
              <div className="flex items-center gap-3 my-3">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-[4.2rem] h-[4.2rem] rounded-full border border-gray-200 hover:border-primary flex items-center justify-center bg-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                  title="Sign up with Google"
                >
                  <Icon icon="logos:google-icon" className="text-[1.8rem]" />
                </button>
                <button
                  type="button"
                  onClick={handleGuestContinue}
                  className="w-[4.2rem] h-[4.2rem] rounded-full border border-gray-200 hover:border-primary flex items-center justify-center bg-[#EAF4E6] text-primary shadow-sm hover:scale-105 transition-all cursor-pointer"
                  title="Continue as Guest"
                >
                  <Icon icon="solar:user-check-bold" className="text-[2rem]" />
                </button>
              </div>

              <span className="text-[1.2rem] text-gray-400 font-medium mb-3">
                or use your email for registration
              </span>

              {error && isSignUpActive && (
                <div className="w-full mb-3 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[1.2rem] flex items-center justify-center gap-1.5">
                  <Icon icon="solar:danger-triangle-bold" className="text-[1.6rem] shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="w-full flex flex-col gap-2.5">
                <div className="relative w-full">
                  <Icon
                    icon="solar:user-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-5 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div className="relative w-full">
                  <Icon
                    icon="solar:letter-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-5 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div className="relative w-full">
                  <Icon
                    icon="solar:phone-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp (Optional)"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-5 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div className="relative w-full">
                  <Icon
                    icon="solar:lock-keyhole-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type={showSignUpPass ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-11 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPass(!showSignUpPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon={showSignUpPass ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-[1.6rem]" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 min-h-[4.8rem] h-[4.8rem] bg-secondary hover:bg-primary text-white font-bold px-10 rounded-full text-[1.4rem] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <Icon icon="line-md:loading-loop" className="text-[2rem] inline" />
                ) : (
                  "SIGN UP"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* SIGN IN FORM CONTAINER */}
        <div
          className={`auth-form-container auth-sign-in-container ${
            isSignUpActive ? "sm:opacity-0 sm:pointer-events-none" : ""
          } ${isSignUpActive ? "hidden sm:block" : "block"}`}
        >
          <div className="h-full flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-10 bg-white">
            <form onSubmit={handleSignInSubmit} className="flex flex-col items-center text-center">
              <h2 className="text-[2.6rem] sm:text-[3rem] font-bold text-heading-color leading-tight mb-2">
                Sign In
              </h2>

              {/* Social Login Icons */}
              <div className="flex items-center gap-3 my-3">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-[4.2rem] h-[4.2rem] rounded-full border border-gray-200 hover:border-primary flex items-center justify-center bg-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                  title="Sign in with Google"
                >
                  <Icon icon="logos:google-icon" className="text-[1.8rem]" />
                </button>
                <button
                  type="button"
                  onClick={handleGuestContinue}
                  className="w-[4.2rem] h-[4.2rem] rounded-full border border-gray-200 hover:border-primary flex items-center justify-center bg-[#EAF4E6] text-primary shadow-sm hover:scale-105 transition-all cursor-pointer"
                  title="Continue as Guest"
                >
                  <Icon icon="solar:user-check-bold" className="text-[2rem]" />
                </button>
              </div>

              <span className="text-[1.2rem] text-gray-400 font-medium mb-3">
                or use your email account
              </span>

              {error && !isSignUpActive && (
                <div className="w-full mb-3 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[1.2rem] flex items-center justify-center gap-1.5">
                  <Icon icon="solar:danger-triangle-bold" className="text-[1.6rem] shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <Icon
                    icon="solar:letter-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-5 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div className="relative w-full">
                  <Icon
                    icon="solar:lock-keyhole-bold"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.6rem]"
                  />
                  <input
                    type={showSignInPass ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="w-full min-h-[4.8rem] h-[4.8rem] pl-11 pr-11 bg-[#f0f2f5] border border-transparent rounded-full text-[1.35rem] text-heading-color outline-none focus:border-primary focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPass(!showSignInPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon={showSignInPass ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-[1.6rem]" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Password reset link will be sent to your registered email.")}
                className="text-[1.2rem] text-gray-500 hover:text-primary mt-3 cursor-pointer"
              >
                Forgot your password?
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 min-h-[4.8rem] h-[4.8rem] bg-secondary hover:bg-primary text-white font-bold px-10 rounded-full text-[1.4rem] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <Icon icon="line-md:loading-loop" className="text-[2rem] inline" />
                ) : (
                  "SIGN IN"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* OVERLAY SLIDING CONTAINER (DESKTOP) */}
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            {/* OVERLAY LEFT (Appears when SignUp is active -> User can click Sign In) */}
            <div className="auth-overlay-panel auth-overlay-left">
              <span className="text-secondary ButtonFont text-[2.6rem] leading-none mb-1">
                Wildora Club
              </span>
              <h2 className="text-[3.2rem] font-bold text-white mb-2 leading-tight">
                Welcome Back!
              </h2>
              <p className="text-[1.35rem] text-gray-200 leading-relaxed max-w-[32rem]">
                To keep connected with us please login with your personal info
              </p>
              <button
                type="button"
                id="signIn"
                onClick={() => {
                  setAuthMode("login");
                  setError("");
                }}
                className="mt-6 uppercase tracking-widest text-[1.3rem] font-bold py-3 px-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-heading-color transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                SIGN IN
              </button>
            </div>

            {/* OVERLAY RIGHT (Appears when SignIn is active -> User can click Sign Up) */}
            <div className="auth-overlay-panel auth-overlay-right">
              <span className="text-secondary ButtonFont text-[2.6rem] leading-none mb-1">
                Wildora Club
              </span>
              <h2 className="text-[3.2rem] font-bold text-white mb-2 leading-tight">
                Hello, Explorer!
              </h2>
              <p className="text-[1.35rem] text-gray-200 leading-relaxed max-w-[32rem]">
                Enter your personal details and start your safari adventure with us
              </p>
              <button
                type="button"
                id="signUp"
                onClick={() => {
                  setAuthMode("signup");
                  setError("");
                }}
                className="mt-6 uppercase tracking-widest text-[1.3rem] font-bold py-3 px-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-heading-color transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
