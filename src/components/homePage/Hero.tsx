"use client";

import React from "react";
import { Carousel } from "react-bootstrap";
import "../homePage/homeStyle/animate.css";
import "../homePage/homeStyle/bootstrap.min.css";
import "../homePage/homeStyle/detail.css";
import "../homePage/homeStyle/homeIndex.css";
import "../homePage/homeStyle/kenBurn.css";

const Hero = () => {
  return (
    // <section id="center" className="center_home">
    //   <Carousel interval={6000} pause="hover">
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="images/slide1.jpg"
    //         alt="First slide"
    //         height="800px"
    //         width="1600px"
    //       />
    //       <Carousel.Caption className="kb_caption kb_caption_right">
    //         <h1 className="animate_animated animate_flipInX">
    //           Guaranteed Profits and Secure Payments
    //         </h1>
    //         <p className="animate_animated animate_flipInX">
    //           Empower your farming with direct market access, fair pricing, and
    //           secure transactions. Enjoy guaranteed payments and transparent
    //           contracts.
    //         </p>
    //         <h4>
    //           <a href="#" className="button hvr-shutter-out-horizontal">
    //             Learn How It Works
    //           </a>
    //         </h4>
    //       </Carousel.Caption>
    //     </Carousel.Item>

    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="images/slide2.jpg"
    //         alt="Second slide"
    //         height="800px"
    //         width="1600px"
    //       />
    //       <Carousel.Caption className="kb_caption kb_caption_right">
    //         <h1 className="animate_animated animate_fadeInDown">
    //           Seamless Online Interaction with Buyers
    //         </h1>
    //         <p className="animate_animated animate_fadeInUp">
    //           Connect instantly with buyers, negotiate terms, and find the
    //           nearest farmers available for your needs. Simplify your
    //           transactions with real-time communication.
    //         </p>
    //         <h4>
    //           <a href="#" className="button hvr-shutter-out-horizontal">
    //             Start Connecting Now
    //           </a>
    //         </h4>
    //       </Carousel.Caption>
    //     </Carousel.Item>

    //     <Carousel.Item>
    //       {/* <img
    //         className="d-block w-100"
    //         src="images/slide3.jpg"
    //         alt="Third slide"
    //         height="800px"
    //         width="1600px"
    //       /> */}
    //       <Carousel.Caption className="kb_caption kb_caption_right">
    //         <h1 className="animate_animated animate_fadeInDown">
    //           Stay Informed with Our Farming Blog
    //         </h1>
    //         <p className="animate_animated animate_fadeInUp">
    //           Explore expert advice, success stories, and the latest trends in
    //           the farming industry. Enhance your knowledge and grow with our
    //           community.
    //         </p>
    //         <h4>
    //           <a href="#" className="button hvr-shutter-out-horizontal">
    //             Read the Latest Posts
    //           </a>
    //         </h4>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
    // </section>

    <section id="middle">
      <div className="container">
        <div className="row">
          <div className="middle_1">
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

          {/* FEATURES OF WEBSITE */}
          <h2>Features to Fuel Your Contract Farming Experience</h2>
          <br />
          <div className="middle_2 clearfix" id="about">
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid1.jpg"
                    alt="Secure Contracts"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Secure Contracts</h3>
                <p>
                  Protect your interests with legally binding agreements that
                  ensure fair terms and secure payments for your produce.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid2.avif"
                    alt="Guaranteed Market Access"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Guaranteed Market Access</h3>
                <p>
                  Connect directly with buyers and secure a guaranteed market
                  for your crops, minimizing risk and maximizing profits.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid3.avif"
                    alt="Comprehensive Support"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Comprehensive Support</h3>
                <p>
                  Receive expert guidance, from crop planning to harvest,
                  ensuring you achieve the best results every season.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid4.jpg"
                    alt="Community Collaboration"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Community Collaboration</h3>
                <p>
                  Join a network of farmers and buyers for shared growth and
                  knowledge exchange, fostering a strong community.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid5.jpg"
                    alt="Risk Mitigation"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Risk Mitigation</h3>
                <p>
                  Mitigate risks through flexible contracts that adapt to
                  changing conditions and protect your investment with insurance
                  and management tools.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="middle_3">
                <a href="#">
                  <img
                    src="images/mid6.jpg"
                    alt="Fair Trade Practices"
                    className="img_responsive"
                    id="iimages"
                  />
                </a>
                <h3>Fair Trade Practices</h3>
                <p>
                  Engage in ethical, transparent trading that ensures fair
                  pricing and mutual respect in every transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
