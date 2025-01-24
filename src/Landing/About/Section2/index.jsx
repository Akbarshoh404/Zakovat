import React from "react";

import styles from "./style.module.scss";

import img from "../../shared/images/farzona.png";

const Section2 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.bigP}>OUR VISION</div>

              <p>
                Empower students to reach their full potential through healthy
                competition and innovation. Foster curiosity, critical thinking,
                and collaboration among young minds. Build a community where
                knowledge drives success and transformation.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.bigP}>OUR MISSION</div>

              <p>
                To inspire curiosity and foster a love of learning through
                friendly competition. We believe in empowering individuals to
                reach their potential.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.bigP}>OUR GOAL</div>

              <p>
                To inspire and engage students by organizing thought-provoking
                competitions, fostering critical thinking, and creating
                opportunities for personal and academic growth.
              </p>
            </div>
          </div>

          <div className={styles.img}>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
