import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";

const LandingTeams = () => {
  const [data, setData] = useState([]); // State to hold team data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:8080/teams");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const teams = await response.json();
        setData(teams); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchTeams();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <LandingNavbar />
      <section className={styles.teamsSection}>
        <div className={styles.teamsContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.teamsTitle}>Our Teams</h2>
            <p className={styles.descriptionText}>
              Here you can find all the teams competing in our tournaments. Each
              team showcases their skills and dedication to excel in various
              challenges. Let's celebrate their achievements!
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
                    <th>Team Name</th>
                    <th>Grade</th>
                    <th>Participants Count</th>
                    <th>True Answers</th>
                    <th>False Answers</th>
                    <th>Penalty</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((team, index) => (
                    <tr key={index}>
                      <td>{team.name}</td>
                      <td>{team.grade}</td>
                      <td>{team.participants.length}</td>
                      <td>{team.trueAnswers}</td>
                      <td>{team.falseAnswers}</td>
                      <td>{team.penalty}</td>
                      <td>{team.score}</td>
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

export default LandingTeams;
