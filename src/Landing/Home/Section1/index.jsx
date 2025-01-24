import React from "react";

import styles from "./style.module.scss";

import img1 from "../../shared/images/img1.png";
import img2 from "../../shared/images/img2.png";
import img3 from "../../shared/images/img3.png";

const Section1 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.img1}>
              <img src={img1} alt="" />
            </div>

            <div className={styles.imgCard}>
              <div className={styles.img2}>
                <img src={img2} alt="" />
              </div>
              <div className={styles.img3}>
                <img src={img3} alt="" />
              </div>
              <div className={styles.img4}>
                <p className={styles.imgp1}>600+</p>
                <p className={styles.imgp2}>Participants of Zakovat</p>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <p className={styles.p1}>Zakovat</p>
            <p className={styles.p2}>
              in Muhammad al-Khwarizmi Specialized IT School
            </p>
            <p className={styles.p3}>
              We are committed to creating a competitive yet friendly
              environment for those who seek knowledge and challenge. Our
              platform allows you to connect with others and show your
              intellectual prowess through exciting tournaments.
            </p>

            <div className={styles.cards}>
              <div className={styles.card}>
                <p className={styles.ligaName}>I LIGA</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>6th</div>

                  <div className={styles.grade}>5th</div>
                </div>

                <p className={styles.p4}>Grades</p>
              </div>

              <div className={styles.card}>
                <p className={styles.ligaName}>II LIGA</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>7th</div>
                  <div className={styles.grade}>8th</div>
                  <div className={styles.grade}>9th</div>
                </div>

                <p className={styles.p4}>Grades</p>
              </div>

              <div className={styles.card}>
                <p className={styles.ligaName}>Premiere Liga</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>10th</div>

                  <div className={styles.grade}>11th</div>
                </div>

                <p className={styles.p4}>Grades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
