import React from "react";

import styles from "./style.module.scss";

import logo1 from "../../shared/images/zakovat logo 1.png";
import logo2 from "../../shared/images/zakovat logo 2.png";
import logo3 from "../../shared/images/it-school logo.png";

const Section4 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bigP}>OUR PARTNERS</div>

          <div className={styles.partners}>
            <div className={styles.card}>
              <img src={logo3} alt="" />
            </div>

            <div className={styles.card}>
              <img src={logo1} alt="" />
            </div>

            <div className={styles.card}>
              <img src={logo2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;
