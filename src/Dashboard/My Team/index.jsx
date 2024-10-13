import React from "react";
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";

import DashboardNavbar from "../shared/layoutes/Navbar";
import NoTeam from "./noTeam";
import YesTeam from "./yesTeam";

const DashboardMyTeam = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const { id } = useParams();

  return (
    <>
      <DashboardNavbar />

      <div className={styles.myTeam}>
        {user && (!user.teamId || user.teamId.trim() === "") ? <NoTeam /> : <YesTeam />}
      </div>
    </>
  );
};

export default DashboardMyTeam;
