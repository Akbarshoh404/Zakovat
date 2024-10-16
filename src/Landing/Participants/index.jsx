import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";

const LandingParticipants = () => {
  const [data, setData] = useState([]); // State to hold participant data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("http://localhost:8080/participants"); // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const participants = await response.json();
        setData(participants); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchParticipants();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <LandingNavbar />
      <section className={styles.teamsSection}>
        <div className={styles.teamsContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.teamsTitle}>Our Participants</h2>
            <p className={styles.descriptionText}>
              Discover the talented participants who are competing in our
              events. Each participant brings their unique skills and passion to
              the competition!
            </p>
            {loading && <p className={styles.loadingText}>Loading...</p>}{" "}
            {/* Loading message */}
            {error && <p className={styles.errorText}>Error: {error}</p>}{" "}
            {/* Error message */}
          </div>

          {!loading && !error && (
            <div className={styles.tableContainer}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>Participant Name</th>
                    <th>Team</th>
                    <th>Grade</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((participant, index) => (
                    <tr key={index}>
                      <td>{participant.name}</td>
                      <td>{participant.team}</td>
                      <td>{participant.grade}</td>
                      <td>{participant.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LandingParticipants;
