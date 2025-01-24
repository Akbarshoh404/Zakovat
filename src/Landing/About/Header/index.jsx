import React from "react";
import styles from "./style.module.scss";

const LandingHomeHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <p className={styles.p1}>About Us</p>

          <p className={styles.p2}><span>Zakovat</span> in Muhammad al-Khwarizmi Specialized IT School</p>
        </div>
      </header>
    </>
  );
};

export default LandingHomeHeader;
