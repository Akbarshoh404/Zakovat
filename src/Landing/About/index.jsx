import React, { useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";

import Header from "./Header";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section5 from "./Section5";
import Section6 from "./Section6";

const LandingAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LandingNavbar />
      <Header />
      <Section2 />
      <Section3 isAbout={true} />
      <Section5 />
      <Section6 />
      <LandingFooter />
    </>
  );
};

export default LandingAbout;
