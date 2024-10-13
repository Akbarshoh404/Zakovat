import React from "react";
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";

import DashboardNavbar from "../shared/layoutes/Navbar";
import NoTeam from "./noTeam";
import YesTeam from "./yesTeam";

const DashboardMyTeam = () => {
  var user = JSON.parse(localStorage.getItem("User"));
  const { id } = useParams();

  return (
    <>
      <DashboardNavbar />

      <div className={styles.myTeam}>
        {user && user.teamId === "" ? <NoTeam /> : <YesTeam />}
      </div>
    </>
  );
};

export default DashboardMyTeam;
