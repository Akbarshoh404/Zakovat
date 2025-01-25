import React from "react";

import styles from "./style.module.scss";

import img from "../../shared/images/header.jpg";

const Section2 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.bigP}>Bizning maqsad</div>

              <p>
                Qiziqarli musobaqalar tashkil etish, tanqidiy fikrlashni
                rivojlantirish, shaxsiy va akademik o'sish uchun imkoniyatlar
                yaratish orqali o'quvchilarni ilhomlantirish va jalb qilish.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.bigP}>Bizning vazifamiz</div>

              <p>
                Do'stona raqobat orqali "Zakovat"ga qiziqishni uyg'otish va uni
                o'rganishga bo'lgan muhabbatni rivojlantirish. Biz
                o'quvchilarning ochilmagan qirralarini kashf etishga yordam
                beramiz.
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
