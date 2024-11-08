import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import DashboardNavbar from "../shared/layoutes/Navbar";

const TurnirList = () => {
  const [turnirs, setTurnirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const teamID = JSON.parse(localStorage.getItem("teamID")); // Retrieve team ID from localStorage

  useEffect(() => {
    const fetchTurnirs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/turnirs");
        setTurnirs(response.data);
      } catch (err) {
        setError("Failed to fetch turnirs. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnirs();
  }, []);

  if (loading) return <p className={styles.loading}>Loading turnirs...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <DashboardNavbar />
      <div className={styles.turnirList}>
        <h2 className={styles.title}>Tournaments</h2>
        {turnirs.length === 0 ? (
          <p className={styles.noTurnirs}>No turnirs available.</p>
        ) : (
          <div className={styles.turnirContainer}>
            {turnirs.map((turnir) => (
              <div key={turnir._id} className={styles.turnirCard}>
                <h3 className={styles.turnirName}>{turnir.name}</h3>
                <p className={styles.date}>Date: {turnir.date}</p>
                {/* Apply button if no team ID */}
                {!teamID && (
                  <button className={styles.applyButton}>Apply</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TurnirList;
