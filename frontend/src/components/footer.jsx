import "./footer.css";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section
        style={{
          marginTop: "15rem",
          position: "relative",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
          boxShadow: "0px 0px 5px 2px rgba(255 , 255 , 255 , 0.4)",
        }}
      >
        <div className="short-container">
          <div>
            <p>Ready to get started?</p>
            <p style={{ marginTop: "-1rem" }}>Talk to us today</p>
          </div>
          <div>
            <button>Get Started</button>
          </div>
        </div>
        <div className="mid-container">
          <div className="grid-container">
            <div className="section-grid-1">
              <h4>SoftKart</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                sint.
              </p>
            </div>
            <div className="section-grid-2">
              <h4>Subscribe to get important updates</h4>
              <input type="text" placeholder="email" required />
              <button>Subscribe</button>
            </div>
            <div className="section-grid-3">
              <h4>Follow us</h4>
              <div>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div>
              <h4>Call us</h4>
              <p>+91 7483229386</p>
            </div>
          </div>
          <div className="last-container">
            <div>@2024 SoftKART All Rights Reserved</div>
            <div>
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
