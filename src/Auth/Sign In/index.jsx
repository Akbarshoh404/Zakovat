import React from "react";

import styles from "./style.module.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export let isStudent = false;
export let isTeacher = false;

export let FinalUser = {};

const SignIn = () => {
  return (
    <>
      <div className={styles["login-container"]}>
        <form className={styles["login-form"]}>
          <h2 className={styles["login-header"]}>Sign In</h2>

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
                No Accaunt? Register
              </a>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
