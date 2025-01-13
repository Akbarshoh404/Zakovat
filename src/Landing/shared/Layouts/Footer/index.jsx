import React from "react";

import styles from "./style.module.scss";

import instagram from "../../images/Instagram.png";
import telegram from "../../images/Telegram.png";

const LandingFooter = () => {
  const handleNavigation = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.p1}>IJTIMOIY TARMOQLARIMIZGA A'ZO BO'LING</p>

          <div className={styles.social}>
            <div
              onClick={() =>
                handleNavigation(
                  "https://www.instagram.com/corecl_uz?igsh=M2dqMHViYmRkNGFo"
                )
              }
              className={styles.link}
              aria-label="Instagram"
            >
              <img src={instagram} alt="Instagram logo" />
              <p>INSTAGRAM</p>
            </div>

            <span className={styles.separator}>X</span>

            <div
              onClick={() => handleNavigation("https://t.me/corecollectionuzb")}
              className={styles.link}
              aria-label="Telegram"
            >
              <img src={telegram} alt="Telegram logo" />
              <p>TELEGRAM</p>
            </div>
          </div>

          <p className={styles.year}>© 2025</p>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
