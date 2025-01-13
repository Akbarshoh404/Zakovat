import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import styles from "./style.module.scss";

export let isStudent = false;
export let isAdmin = false;
export let FinalUser = {};

const SignIn = () => {
  const notify = (e) => toast(e);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [studentData, setStudentData] = useState([]);

  const getStudentApi = async () => {
    try {
      const res = await axios.get("http://localhost:8080/participants");
      setStudentData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudentApi();
  }, []);

  const Check = (e) => {
    e.preventDefault(); // Prevent default form submission

    let approved = false;

    // Check for student login
    for (let i = 0; i < studentData.length; i++) {
      if (
        studentData[i].login === login &&
        studentData[i].password === password
      ) {
        isStudent = true;
        approved = true;
        FinalUser = studentData[i];
        localStorage.setItem("userID", FinalUser._id);
        localStorage.setItem("User", JSON.stringify(FinalUser));
      }
    }

    if (login === "" || password === "") {
      notify("Please fill in all inputs!⏳");
    } else if (approved) {
      notify("Welcome!👋🏿");
      sleep(1500).then(() => {
        navigate(`/dashboard/${FinalUser._id}`);
      });
    } else {
      notify("Something is wrong!❌");
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <>
      <div className={styles["login-container"]}>
        <form className={styles["login-form"]} onSubmit={Check}>
          <h2 className={styles["login-header"]}>Sign In</h2>

          <input
            type="text"
            placeholder="Login"
            className={styles["login-input"]}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles["login-input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles["login-button"]}>
            Login
            <Toaster />
          </button>

          <Link to="/sign-up">
            <div className={styles["oauth-login"]}>
              <a className={styles["oauth-button"]}>
                No Account? Register
              </a>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
