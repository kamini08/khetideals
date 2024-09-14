"use client";
import React, { useState, useEffect } from 'react';
// import './Image.css';
import './slider.css'

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const HeroSlider=()=> {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      image: "/images/slide1.jpg",
      title: "Guaranteed Profits and Secure Payments",
      description: "Empower your farming with direct market access, fair pricing, and secure transactions. Enjoy with guaranteed payments and transparent contracts.",
      buttonText: "Learn How It Works",
    },
    {
      image: "/images/slide3.jpg",
      title: "Empowering Farmers with Transparent Contracts",
      description: "Ensuring fairness and transparency in every transaction with flexible contracts designed for your needs.",
      buttonText: "Get Started",
    },
    {
      image: "/images/slide2.jpg",
      title: "Connecting Farmers and Buyers Seamlessly",
      description: "Join our platform to find buyers and partners that match your needs for a fruitful harvest season.",
      buttonText: "Find Out More",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <button>{slide.buttonText}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;