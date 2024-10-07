import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]}>
        <h2 className={styles["login-header"]}>Sign Up</h2>

        <input
          type="text"
          placeholder="Email Address"
          className={styles["login-input"]}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles["login-input"]}
        />

        <button type="submit" className={styles["login-button"]}>
          Login
        </button>

        <Link to="/sign-up">
          <div className={styles["oauth-login"]}>
            <a href="/oauth-login" className={styles["oauth-button"]}>
              Have an Accaunt? Login
            </a>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
