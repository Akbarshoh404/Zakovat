import React from "react";

import styles from "./style.module.scss";

const Section3 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bigP}>QOIDALAR</div>

          <div className={styles.rules}>
            <div className={styles.card}>
              <div className={styles.number}>1</div>
              <p>
                O'yinda har bir jamoa turli qiyinchilikdagi savollarga 1 daqiqa
                ichida javob berishga harakat qiladi. Savollar turli mavzularda
                bo'lib, jamoalar o'zlarining tezkor fikrlashlari va bilimlaridan
                foydalanishlari kerak.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>2</div>
              <p>
                Har bir sinfdan beshta asosiy va ikkita zaxira o'yinchisidan
                iborat jamoa tuzilib, javoblarni birgalikda muhokama qilishlari
                kerak.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>3</div>
              <p>
                Zakovatda 3ta Liga bor:
                <br /> • Liga II (5-6 - sinflar); <br />• Liga I (7-8 -
                sinflar);
                <br />• Oliy liga (9 - 10 - 11 - sinflar).
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>4</div>
              <p>
                Moddiy buyumlarga zarar yetkazish va baland ovozda gapirish
                ta'qiqlanadi. Aks holda jamoaga 1 ball jarima yoziladi.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>5</div>
              <p>
                Javobni belgilangan vaqt ichida topshirishingiz zarur (agar 3
                soniyadan ko‘proq vaqt kutilsa, javob qabul qilinmaydi).
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>6</div>
              <p>
                Belgilangan vaqtdan kechikib kelgan jamoalar o'yinda qatnashish
                imkoniyatidan mahrum bo'lishadi.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>7</div>
              <p>
                Har bir liga o'yini 2 turdan iborat. O'yindagi savollar soni
                liga turiga qarab o'zgaradi (16,20,24).
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>8</div>
              <p>
                O'yinchilarni faqat ikki raund o'rtasidagi 10 daqiqalik tanaffus
                vaqtida almashtirish mumkin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
