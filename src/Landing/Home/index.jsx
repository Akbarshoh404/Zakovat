import React from "react";
import style from "./style.module.scss";

import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const Home = () => {
  return (
    <>
      <LandingNavbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <LandingFooter />
    </>
  );
};

export default Home;
