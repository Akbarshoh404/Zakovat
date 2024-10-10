import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import styles from "./style.module.scss";

const SignUp = () => {
  const notify = (message) => toast(message);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const Create = async (e) => {
    e.preventDefault();

    if (!login || !password || !name || !surname) {
      notify("Please fill in all fields! ⏳");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/participants", {
        name,
        surname,
        login,
        password,
      });

      if (res.status == 201 || res.status == 200 || res.status == 204) {
        notify("Registration Successful! 👋🏿");
        navigate(`/sign-in`);
      } else {
        notify("Registration failed! ❌");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        notify(`Error: ${error.response.data.message || "Something went wrong!"} ❌`);
      } else {
        notify("Network error! ❌");
      }
    }
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={Create}>
        <h2 className={styles["login-header"]}>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className={styles["login-input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Surname"
          className={styles["login-input"]}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

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
          Sign Up
        </button>
        <Toaster />

        <Link to="/sign-in" className={styles["oauth-login"]}>
          <span className={styles["oauth-button"]}>Have Account? Login</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
