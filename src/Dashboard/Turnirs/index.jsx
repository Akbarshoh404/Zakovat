import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import DashboardNavbar from "../shared/layoutes/Navbar";

const DashboardTurnirs = () => {
  const [data, setData] = useState([]); // State to hold tournament data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchTurnirs = async () => {
      try {
        const response = await fetch("http://localhost:8080/turnirs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const turnirs = await response.json();
        setData(turnirs); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchTurnirs();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <DashboardNavbar />

      <div className={styles.Teams}>
        <h1 className={styles.teamsHeading}>Turnirs</h1>
        {loading && <p>Loading...</p>} {/* Loading message */}
        {error && <p>Error: {error}</p>} {/* Error message */}
        {!loading && !error && (
          <div className={styles.cardContainer}>
            {data.map((turnir, index) => (
              <div className={styles.card} key={index}>
                <h2>{turnir.name}</h2>
                <p>Date: {turnir.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardTurnirs;
