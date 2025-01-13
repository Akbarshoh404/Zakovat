import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./style.module.scss";

import DashboardNavbar from "../shared/layoutes/Navbar";

const DashboardSettings = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      setError("User ID not found in local storage.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/participants/${userID}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");
    try {
      await axios.patch(`http://localhost:8080/participants/${userID}`, {
        name: user.name,
        surname: user.surname,
        login: user.login,
        password: user.password,
      });
      alert("User updated successfully!");
    } catch (err) {
      alert("Failed to save changes. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <p className={styles.loading}>Loading user...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <DashboardNavbar />

      <div className={styles.settingsMain}>
        <div className={styles.settings}>
          <h1>Account Settings</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={user.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                placeholder="Enter your surname"
                value={user.surname || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="login">Login:</label>
              <input
                type="text"
                id="login"
                placeholder="Enter your login"
                value={user.login || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={user.password || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardSettings;
