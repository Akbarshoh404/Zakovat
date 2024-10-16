import React from "react";
import styles from "./style.module.scss";
import lawIllustration from "../shared/images/Zakovat image.jpg"; // Replace with your image path

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LandingNavbar from "../shared/Layouts/Navbar";

import logo from "../shared/images/it-school logo.png"; // Replace with appropriate images
import zakovat from "../shared/images/logo.png"

const LandingAbout = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <LandingNavbar />
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.imageContainer}>
            <img
              src={lawIllustration}
              alt="Illustration"
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.aboutTitle}>About Us</h2>
            <p className={styles.aboutText}>
              We are committed to creating a competitive yet friendly
              environment for those who seek knowledge and challenge. Our
              platform allows you to connect with others and show your
              intellectual prowess through exciting tournaments.
            </p>
            <button className={styles.readMoreButton}>READ MORE</button>
          </div>
        </div>

        <section className={styles.Carousel}>
          <div className={styles.container}>
            <Slider {...settings} className={styles.slider}>
              <div>
                <img src={logo} alt="Logo" />
              </div>
              <div>
                <img src={zakovat} alt="Logo" />
              </div>
              <div>
                <img src={logo} alt="Logo" />
              </div>
              <div>
                <img src={zakovat} alt="Logo" />
              </div>
              <div>
                <img src={logo} alt="Logo" />
              </div>
              <div>
                <img src={zakovat} alt="Logo" />
              </div>
            </Slider>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingAbout;
