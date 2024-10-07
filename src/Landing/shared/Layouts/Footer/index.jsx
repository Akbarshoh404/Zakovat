import React from "react";

import styles from "./style.module.scss";

const LandingFooter = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.logoSection}>
            <img
              src="path/to/zakovat-logo.png"
              alt="Zakovat Logo"
              className={styles.logo}
            />
            <p>
              Ilm tufayli inson o'zi sevgan ish bilan shug'ullanishi, xohlagan
              narsasiga erishishi mumkin. Bilimga intilish insonning asosiy
              xususiyatlaridan biridir.
            </p>
          </div>
          <div className={styles.subscribe}>
            <h3>
              E-mailingizni kiriting va yangiliklardan birinchi bo'lib boxabar
              bo'ling!
            </h3>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="E-mailingizni kiriting" />
              <button type="submit">Obuna Bo'lish</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.linksSection}>
            <div>
              <h4>Bo'limlar</h4>
              <ul>
                <li>E'lonlar</li>
                <li>Yangiliklar</li>
                <li>Gallereya</li>
                <li>Klublar</li>
              </ul>
            </div>
            <div>
              <h4>Qo'shimcha</h4>
              <ul>
                <li>Bog'lanish</li>
                <li>Biz haqimizda</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h4>Bizni ijtimoiy tarmoqlarda kuzatib boring:</h4>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://telegram.org">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="https://instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerCopyright}>
          <p>&copy; 2022 Zakovat. Barcha huquqlar himoyalangan</p>
          <div className={styles.storeLinks}>
            <a href="https://apps.apple.com">
              <img src="path/to/appstore.png" alt="App Store" />
            </a>
            <a href="https://play.google.com">
              <img src="path/to/playstore.png" alt="Google Play" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
