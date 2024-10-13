import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  var user = JSON.parse(localStorage.getItem("User"));
  console.log(user);
  return (
    <div className={styles.sidenav}>
      <div className={styles.profile}>
        <h2>{user.name}</h2>
        <p><span>ID:</span> {user._id}</p>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.link}>
          <Link to={`/${user._id}/`}>Home</Link>
        </li>
        <li className={styles.link}>
          <Link to={`/dashboard/teams`}>Teams</Link>
        </li>
        <li className={styles.link}>
          <Link to={`/${user._id}/team`}>My Team</Link>
        </li>
        <li className={styles.link}>
          <Link to={`/dashboard/turnirs`}>Turnirs</Link>
        </li>
        <li className={styles.link}>
          <Link to={`/${user._id}/my-turnirs`}>My Turnirs</Link>
        </li>
        <li className={styles.link}>
          <Link to={`/${user._id}/settings`}>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
