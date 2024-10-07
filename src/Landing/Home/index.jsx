import React from "react";
import style from "./style.module.scss";

import LandingNavbar from "../shared/Layouts/Navbar";
import LandingHomeHeader from "./Header";
import LandingFooter from "../shared/Layouts/Footer";

const Home = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHomeHeader />
      <LandingFooter />
    </>
  );
};

export default Home;
