// "use client";
import React from "react";
import "../Home.css";
import HeroSlider from "./slider";
import Navbar from "./Navbar";

// Import images
// import mid1 from "../images/mid1.jpg";
// // import mid2 from "../images/mid2.png";
// import mid3 from "../images/mid3.avif";
// import mid4 from "../images/mid4.jpg";
// import mid5 from "../images/mid5.jpg";
// import mid6 from "../images/mid6.jpg";
// import step1 from "../images/steps1.jpg";
// import step2 from "../images/steps2.jpg";
// import step3 from "../images/steps3.jpg";
// import step4 from "../images/steps4.jpg";
// import step5 from "../images/steps5.jpg";
// import step6 from "../images/steps6.jpg";

import {
  FaUserPlus,
  FaMapMarkerAlt,
  FaComments,
  FaBook,
  FaTruck,
  FaCreditCard,
  FaStar,
} from "react-icons/fa";

type Feature = {
  image: any;
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
  imgSrc: any;
  icon: string;
};

// type Testimonial = {
//   image: any;
//   name: string;
//   role: string;
//   rating: number;
//   text: string;
// };
interface Testimonial {
  image: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}
const Hero: React.FC = () => {
  const features: Feature[] = [
    {
      image: "/images/mid1.jpg",
      title: "Secure Contracts",
      description:
        "Protect your interests with legally binding agreements that ensure fair terms and secure payments for your produce.",
    },
    {
      image:
        "https://img.indiafilings.com/learn/wp-content/uploads/2019/06/12004345/Contract-farming.jpg",
      title: "Market Access",
      description:
        "Connect directly with buyers and secure a guaranteed market for your crops, minimizing risk and maximizing profits.",
    },
    {
      image:
        "https://americancompass.org/wp-content/uploads/2022/10/AdobeStock_274921913-scaled-1.jpeg",
      title: "Comprehensive Support",
      description:
        "Receive expert guidance, from crop planning to harvest, ensuring you achieve the best results every season.",
    },
    {
      image: "/images/mid4.jpg",
      title: "Collaboration",
      description:
        "Join a network of farmers and buyers for shared growth and knowledge exchange, fostering a strong community.",
    },
    {
      image: "/images/mid5.jpg",
      title: "Risk Mitigation",
      description:
        "Mitigate risks through flexible contracts that adapt to changing conditions.",
    },
    {
      image: "/images/mid6.jpg",
      title: "Fair Trade Practices",
      description:
        "Engage in ethical, transparent trading that ensures fair pricing and mutual respect in every transaction.",
    },
  ];

  const steps: Step[] = [
    {
      title: "Sign Up",
      description:
        "Create your profile and specify your needs. Get started by providing essential details about your farming operations or buying requirements.",
      imgSrc: "/images/steps1.jpg",
      icon: "FaUserPlus",
    },
    {
      title: "Search Farmer & Buyer",
      description:
        "Find farmers and buyers near your location or search by crop type. Connect with trusted producers who meet your needs and ensure quality produce.",
      imgSrc: "/images/steps2.jpg",
      icon: "FaMapMarkerAlt",
    },
    {
      title: "Forums & Discussions",
      description:
        "Connect with other farmers and buyers through our interactive forums and discussion groups. Exchange ideas, seek advice, and build a strong community.",
      imgSrc: "/images/steps3.jpg",
      icon: "FaComments",
    },
    {
      title: "Create or Join a Contract",
      description:
        "Connect with buyers or farmers and set up terms for your contract. Customize agreements to suit your needs and ensure mutual satisfaction.",
      imgSrc: "/images/steps4.jpg",
      icon: "FaBook",
    },
    {
      title: "Fulfill the Contract",
      description:
        "Deliver the crop and receive payment as per the agreement. Ensure timely delivery and secure payments to complete the contract successfully.",
      imgSrc: "/images/steps5.jpg",
      icon: "FaTruck",
    },
    {
      title: "Payment Details",
      description:
        "Secure your transactions with detailed payment options. Ensure smooth and transparent financial exchanges through our platform.",
      imgSrc: "/images/steps6.jpg",
      icon: "FaCreditCard",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      image:
        "https://img.freepik.com/premium-photo/thoughtful-elderly-man-farmer-standing-with-tablet-computer-front-farm-realistic-candid-photo-profile-view_909774-2764.jpg",
      name: "Rajesh Patel",
      role: "Farm Owner",
      rating: 4,
      text: "Using this contract farming platform has been a game-changer for my farm. I now have secure contracts with reliable buyers, ensuring that my produce reaches the market without any worries. The process is smooth and efficient.",
    },
    {
      image:
        "https://media.istockphoto.com/id/1163294201/photo/smiling-confident-businesswoman-posing-with-arms-folded.jpg?s=612x612&w=0&k=20&c=9SY62tujbyx46_NbVH6pYAauliGvM0ixcaEfup9y_kU=",
      name: "Anita Verma",
      role: "Organic Produce Buyer",
      rating: 5,
      text: "This platform has revolutionized my sourcing process. I now have direct contracts with local farmers, guaranteeing the organic quality I need for my business. The reliability and consistency have been unmatched.",
    },
    {
      image:
        "https://media.gettyimages.com/id/1205325344/photo/farmer-in-agricultural-field.jpg?s=612x612&w=gi&k=20&c=oaBezArOCG8ospehPv_HqvM7RwsAvxqpSjkgIHQtq9w=",
      name: "Suresh Kumar",
      role: "Contract Farmer",
      rating: 5,
      text: "Thanks to this platform, I’ve been able to increase my farm’s productivity. The contracts I secure here provide me with the assurance that my harvest will always find a market, allowing me to plan and grow more effectively.",
    },
    {
      image:
        "https://i.pinimg.com/736x/2e/3e/fd/2e3efdc0486a8858f9e0471eee3f68e5.jpg",
      name: "Priya Singh",
      role: "Sustainable Farming Advocate",
      rating: 4,
      text: "This platform has been instrumental in connecting me with buyers who truly value sustainability. The contracts I've secured allow me to focus on environmentally friendly farming practices, knowing I have a consistent market for my produce.",
    },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "FaUserPlus":
        return <FaUserPlus />;
      case "FaMapMarkerAlt":
        return <FaMapMarkerAlt />;
      case "FaComments":
        return <FaComments />;
      case "FaBook":
        return <FaBook />;
      case "FaTruck":
        return <FaTruck />;
      case "FaCreditCard":
        return <FaCreditCard />;
      default:
        return null;
    }
  };

  return (
    <>
      <HeroSlider />
      {/* Middle Section */}
      <section className="middle-section">
        <div className="content-container">
          <div className="intro-text">
            <h1>Step into the Future of Contract Farming!</h1>
            <h3>Let Your First Step be a Partnership for Success!</h3>
            <p>
              Contract farming provides a reliable framework for farmers and
              buyers to collaborate effectively. Secure your harvest with
              guaranteed markets, fair pricing, and transparent agreements. Our
              platform bridges the gap between farmers and buyers, ensuring
              mutual growth and prosperity.
            </p>
          </div>

          {/* Features Section */}
          <h2 className="platform-steps__title">
            Features to Fuel Your Contract Farming Experience
          </h2>
          <div className="features-container">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <a href="#">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="feature-image"
                  />
                </a>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Steps Section */}
      <section className="platform-steps" id="platform-steps">
        <div className="platform-steps__container">
          <h2 className="platform-steps__title">How Our Platform Works</h2>
          <div className="platform-steps__grid">
            {steps.map((step, index) => (
              <div key={index} className="platform-steps__card">
                <img
                  src={step.imgSrc}
                  alt={step.title}
                  className="platform-steps__image"
                />
                <div className="platform-steps__content">
                  <div className="platform-steps__icon">
                    {renderIcon(step.icon)}
                  </div>
                  <h3 className="platform-steps__card-title">{step.title}</h3>
                  <p className="platform-steps__description">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="testimonials">
        <div className="testimonials-container">
          <h2>Testimonials</h2>
          <div className="testimonial-cards">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <h3>{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <FaStar key={starIndex} className="star" />
                  ))}
                </div>
                <p>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="testimonial-section">
        <h2 className="platform-steps__title">Testimonials</h2>

        <p className="description">
          Hear from farmers and buyers who have successfully used our platform
          to build lasting partnerships and secure quality produce through
          contract farming.
        </p>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div className="card" key={index}>
              <div className="img-card flex justify-center">
                <img
                  className="text-center"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
              </div>
              <div className="content text-center">
                <h3 className="name">{testimonial.name}</h3>
                <p className="role">{testimonial.role}</p>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa fa-star ${
                        i < testimonial.rating ? "checked" : ""
                      }`}
                    ></i>
                  ))}
                </div>
                <p className="testimonial-description font-bold">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="place">
        <div className="place_main relative bg-black bg-opacity-50">
          <div className="container text-center flex justify-center align-center">
            <div className="row absolute inset-0 flex justify-center items-center">
              {/* <div className="place_1 text-center flex justify-center flex-col align-center">
                <h2>Get Started Today</h2>
                <p>Join our community of volunteers and make a difference.</p>
                <a href="#" className="button_1">SIGN UP NOW</a>
              </div> */}
              <div className="place_1 text-center flex justify-center items-center flex-col ">
                <h2>Get Started Today</h2>
                <p>Join our community of volunteers and make a difference.</p>
                <a href="#" className="button_1">
                  SIGN UP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
