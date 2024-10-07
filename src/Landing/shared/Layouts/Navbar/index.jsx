import React from "react";
import { Drawer, ButtonToolbar, Button, Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import { Link } from "react-router-dom";

import logo from "../../images/logo.png";

import styles from "./style.module.scss";

const LandingNavbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <img src={logo} alt="" className={styles.logo} />

          <div className={styles.navigation}>
            <p className={styles.navigationP}>Biz Haqimizda</p>
            <p className={styles.navigationP}>Jamoalar</p>
            <p className={styles.navigationP}>Bilimdonlar</p>
            <p className={styles.navigationP}>Turnirlar</p>
            <Link to="/sign-in">
              <button className={styles.navigationButton}>Kabinet</button>
            </Link>

            <ButtonToolbar className={styles.burger}>
              <Button onClick={() => setOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                >
                  <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
                </svg>
              </Button>
            </ButtonToolbar>

            <Drawer
              open={open}
              onClose={() => setOpen(false)}
              className={styles.drawerWidth}
            >
              <Drawer.Body className={styles.drawer}>
                <p className={styles.DrawerNavigationP}>About Us</p>
                <p className={styles.DrawerNavigationP}>Contact Us</p>
                <button className={styles.DrawerNavigationButton}>
                  Sign In
                </button>
                <button className={styles.DrawerNavigationButton}>
                  Sign Up
                </button>
              </Drawer.Body>
            </Drawer>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
