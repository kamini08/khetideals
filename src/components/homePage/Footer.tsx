import React from "react";
import "./Footer.css";
// import logo from "../../../logo27.jpg"
interface LogoProps {
  logo?: string;
}
const Footer: React.FC<LogoProps> = () => {
 
  return (
    <div>
      <div className="footer-top" id="footer-top">
        <div className="row">
          <div className="col">
            <div className="footer-1">
              <img src="/images/logo27.jpg" alt="KhetiDeals Logo" className="footer-logo" />
            </div>
          </div>
          <div className="col">
            <div className="footer-1">
              <h3 className="title">KHETIDEALS</h3>
              <p className="text">
                Empowering farmers and buyers through seamless online
                connections. Join us in revolutionizing the future of
                agriculture, <br />
                one connection at a time.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="footer-2">
              <h3 className="title">CONTACT US</h3>
              <ul className="contact-list">
                <li className="contact-item">
                  <i className="fa fa-map-marker"></i> Kumarswamy Layout,
                  Bengaluru, Karnataka 560078
                </li>
                <li className="contact-item">
                  <i className="fa fa-phone"></i> Phone: 9238376798
                </li>
                <li className="contact-item">
                  <i className="fa fa-envelope"></i>{" "}
                  <a href="mailto:info@khetideals27.com" className="link">
                    infokhetideals27@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
         <div className="col">
             {/* <div className="footer-3">
              <h3 className="title">PLATFORMS</h3>
              <ul className="social-icons">
                <li>
                  <a href="#" className="icon-link">
                    <FontAwesomeIcon icon={faFacebookF} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon-link">
                    <FontAwesomeIcon icon={faTwitter} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon-link">
                    <FontAwesomeIcon icon={faGoogle} className="icon" />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon-link">
                    <FontAwesomeIcon icon={faInstagram} className="icon" />
                  </a>
                </li>
              </ul>
            </div> */}
            <h4 className="update-title">BE UPDATED!</h4>
            <p className="text">
              Enter your email and we’ll send you the latest updates.
            </p>
            <input
              type="text"
              placeholder="Your Email Address"
              className="input"
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          © 2024 KhetiDeals All Rights Reserved |{" "}
          <a href="#" className="link">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
