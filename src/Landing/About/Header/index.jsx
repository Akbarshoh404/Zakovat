import React from "react";
import styles from "./style.module.scss";

const LandingHomeHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <p className={styles.p1}>Biz haqimizda</p>

          <p className={styles.p2}><span>Zakovat</span> Muhammad al-Xorazmiy nomidagi ixtisoslashtirilgan maktabda</p>
        </div>
      </header>
    </>
  );
};

export default LandingHomeHeader;
