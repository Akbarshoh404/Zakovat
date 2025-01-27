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
                <p className={styles.imgp2}>Zakovat ishtirokchilari</p>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <p className={styles.p1}>Zakovat</p>
            <p className={styles.p2}>Muhammad al-Xorazmiy maktabida</p>
            <p className={styles.p3}>
              Biz bilim va qiyinchiliklarga intilayotganlar uchun
              raqobatbardosh, ammo do'stona muhit yaratishga intilamiz. Bizning
              platformamiz sizga boshqalar bilan bog'lanish va qiziqarli
              o'yinlar orqali intellektual qobiliyatingizni ko'rsatish imkonini
              beradi.
            </p>

            <div className={styles.cards}>
              <div className={styles.card}>
                <p className={styles.ligaName}>II LIGA</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>6</div>

                  <div className={styles.grade}>5</div>
                </div>

                <p className={styles.p4}>Sinflar</p>
              </div>

              <div className={styles.card}>
                <p className={styles.ligaName}>I LIGA</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>7</div>
                  <div className={styles.grade}>8</div>
                </div>

                <p className={styles.p4}>Sinflar</p>
              </div>

              <div className={styles.card}>
                <p className={styles.ligaName}>OLIY LIGA</p>
                <div className={styles.grades}>
                  <div className={styles.grade}>9</div>
                  <div className={styles.grade}>10</div>
                  <div className={styles.grade}>11</div>
                </div>

                <p className={styles.p4}>Sinflar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
