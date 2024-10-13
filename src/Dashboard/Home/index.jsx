import React from "react";
import { useParams } from "react-router-dom";

import styles from "./style.module.scss";

import DashboardNavbar from "../shared/layoutes/Navbar";

const DashboardHome = () => {
  const { id } = useParams();
  return (
    <>
      <DashboardNavbar />
    </>
  );
};

export default DashboardHome;
