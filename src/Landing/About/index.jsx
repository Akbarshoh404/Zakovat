import React from "react";
import styles from "./style.module.scss";
import lawIllustration from "../shared/images/Zakovat image.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingNavbar from "../shared/Layouts/Navbar";
import logo from "../shared/images/it-school logo.png";
import zakovat from "../shared/images/logo.png";

const LandingAbout = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
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
            <img src={lawIllustration} alt="Illustration" className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.aboutTitle}>About Us</h2>
            <p className={styles.aboutText}>
              We are committed to creating a competitive yet friendly environment for those who seek knowledge and challenge. Our platform allows you to connect with others and show your intellectual prowess through exciting tournaments.
            </p>
          </div>
        </div>

        <div className={styles.missionSection}>
          <h3 className={styles.missionTitle}>Our Mission</h3>
          <p className={styles.missionText}>
            To inspire curiosity and foster a love of learning through friendly competition. We believe in empowering individuals to reach their potential.
          </p>
        </div>

        <section className={styles.carousel}>
          <div className={styles.container}>
            <Slider {...settings} className={styles.slider}>
              <div><img src={logo} alt="Logo" /></div>
              <div><img src={zakovat} alt="Logo" /></div>
              <div><img src={logo} alt="Logo" /></div>
              <div><img src={zakovat} alt="Logo" /></div>
              <div><img src={logo} alt="Logo" /></div>
              <div><img src={zakovat} alt="Logo" /></div>
            </Slider>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingAbout;
