import React, { useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer/index";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

const LandingHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LandingNavbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <LandingFooter />
    </>
  );
};

export default LandingHome;
