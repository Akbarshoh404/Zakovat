import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer/index";

const LandingTurnirs = () => {

  return (
    <>
      <LandingNavbar />
        <div className={styles.section}>
          <div className={styles.container}></div>
        </div>
      <LandingFooter />
    </>
  );
};

export default LandingTurnirs;
