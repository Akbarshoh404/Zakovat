import React from "react";
import { Drawer, ButtonToolbar, Button } from "rsuite";
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
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>

          <div className={styles.navigation}>
            <Link to="/about">
              <p className={styles.navigationP}>Biz Haqimizda</p>
            </Link>
            <Link to="/teams">
              <p className={styles.navigationP}>Jamoalar</p>
            </Link>
            <Link to="/participants">
              <p className={styles.navigationP}>Bilimdonlar</p>
            </Link>
            <Link to="/turnirs">
              <p className={styles.navigationP}>Turnirlar</p>
            </Link>
          </div>

          <div className={styles.navigationButtons}>
            <Link to="/sign-in">
              <button className={styles.navigationButton}>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className={styles.navigationButton}>Sign Up</button>
            </Link>
          </div>

          <ButtonToolbar className={styles.burger}>
            <Button onClick={() => setOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
              <Link to="/about" onClick={() => setOpen(false)}>
                <p className={styles.DrawerNavigationP}>Biz Haqimizda</p>
              </Link>
              <Link to="/teams" onClick={() => setOpen(false)}>
                <p className={styles.DrawerNavigationP}>Jamoalar</p>
              </Link>
              <Link to="/participants" onClick={() => setOpen(false)}>
                <p className={styles.DrawerNavigationP}>Bilimdonlar</p>
              </Link>
              <Link to="/turnirs" onClick={() => setOpen(false)}>
                <p className={styles.DrawerNavigationP}>Turnirlar</p>
              </Link>
              <Link to="/sign-in">
                <button className={styles.DrawerNavigationButton}>Sign In</button>
              </Link>
              <Link to="/sign-up">
                <button className={styles.DrawerNavigationButton}>Sign Up</button>
              </Link>
            </Drawer.Body>
          </Drawer>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
