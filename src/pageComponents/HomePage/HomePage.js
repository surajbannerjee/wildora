import AboutUs from '@/components/HomeComponents/AboutUs/AboutUs';
import AnimalsSlider from '@/components/HomeComponents/AnimalsSlider/AnimalsSlider';
import Call_To_Action from '@/components/HomeComponents/Call_To_Action/Call_To_Action';
import HeroSec from '@/components/HomeComponents/HeroSec/HeroSec';
import LetestNews from '@/components/HomeComponents/LetestNews/LetestNews';
import PopularPackages from '@/components/HomeComponents/PopularPackages/PopularPackages';
import SafariSec from '@/components/HomeComponents/SafariSec/SafariSec';
import Testimonial from '@/components/HomeComponents/Testimonial/Testimonial';
import TestimonialNew from '@/components/HomeComponents/TestimonialNew/TestimonialNew';
import TourGuide from '@/components/HomeComponents/TourGuide/TourGuide';
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
        <SafariSec />
        <WhyChooseUs />
        <TestimonialNew />
        <TourGuide />
        <LetestNews />
      </div>
    </>
  );
}