"use client";
import React from "react";

// Base Shimmer Block
export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-2xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent ${className}`}
    />
  );
}

// Destination Card Skeleton
export function DestinationCardSkeleton() {
  return (
    <div className="bg-white rounded-[2.4rem] border border-gray-100 overflow-hidden shadow-sm p-4 flex flex-col gap-4">
      {/* Image Skeleton */}
      <SkeletonBlock className="w-full h-[24rem] rounded-[2rem]" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-3 px-2">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="w-[10rem] h-[2rem] rounded-full" />
          <SkeletonBlock className="w-[6rem] h-[2rem] rounded-full" />
        </div>

        <SkeletonBlock className="w-[85%] h-[2.8rem] rounded-xl" />
        <SkeletonBlock className="w-full h-[1.6rem] rounded-lg" />
        <SkeletonBlock className="w-[70%] h-[1.6rem] rounded-lg" />

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
          <SkeletonBlock className="w-[12rem] h-[2.6rem] rounded-xl" />
          <SkeletonBlock className="w-[11rem] h-[4rem] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DestinationGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <DestinationCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Package Card Skeleton
export function PackageCardSkeleton() {
  return (
    <div className="bg-white rounded-[2.4rem] border border-gray-100 overflow-hidden shadow-sm p-3 flex flex-col gap-4">
      <SkeletonBlock className="w-full h-[24rem] sm:h-[26rem] rounded-[2rem]" />
      <div className="flex flex-col gap-3 px-3 pb-2">
        <SkeletonBlock className="w-[80%] h-[2.6rem] rounded-xl" />
        <div className="flex justify-between">
          <SkeletonBlock className="w-[10rem] h-[1.8rem] rounded-lg" />
          <SkeletonBlock className="w-[8rem] h-[1.8rem] rounded-lg" />
        </div>
        <SkeletonBlock className="w-full h-[1.6rem] rounded-lg" />
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <SkeletonBlock className="w-[9rem] h-[2.8rem] rounded-xl" />
          <SkeletonBlock className="w-[10rem] h-[4rem] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PackageGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  );
}

// News Card Skeleton
export function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-[2.2rem] border border-gray-100 overflow-hidden shadow-sm p-3 flex flex-col gap-3">
      <SkeletonBlock className="w-full h-[22rem] rounded-[1.8rem]" />
      <div className="p-3 flex flex-col gap-3">
        <SkeletonBlock className="w-[12rem] h-[1.6rem] rounded-lg" />
        <SkeletonBlock className="w-[90%] h-[2.4rem] rounded-xl" />
        <SkeletonBlock className="w-full h-[1.6rem] rounded-lg" />
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <SkeletonBlock className="w-[10rem] h-[3.4rem] rounded-full" />
          <SkeletonBlock className="w-[3.6rem] h-[3.6rem] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function NewsGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
