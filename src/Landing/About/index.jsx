import React from "react";
import style from "./style.module.scss";

import LandingNavbar from "../shared/Layouts/Navbar";
import LandingHomeHeader from "./Header";
import LandingFooter from "../shared/Layouts/Footer";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const About = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHomeHeader />
      <Section2 />
      <Section3 />
      <Section4 />
      <LandingFooter />
    </>
  );
};

export default About;
