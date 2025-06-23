import AboutUs from '@/components/HomeComponents/AboutUs/AboutUs';
import AnimalsSlider from '@/components/HomeComponents/AnimalsSlider/AnimalsSlider';
import Call_To_Action from '@/components/HomeComponents/Call_To_Action/Call_To_Action';
import HeroSec from '@/components/HomeComponents/HeroSec/HeroSec';
import PopularPackages from '@/components/HomeComponents/PopularPackages/PopularPackages';
import WhyChooseUs from '@/components/HomeComponents/WhyChooseUs/WhyChooseUs';
import React from 'react';
export default function HomePage() {

  return (
    <>
      <div className="home-page">
        <HeroSec />
        <AnimalsSlider />
        <AboutUs />
        <Call_To_Action />
        <PopularPackages />
        <WhyChooseUs />
      </div>
    </>
  );
}