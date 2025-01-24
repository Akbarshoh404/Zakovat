import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { turnirScores1, turnirScores2 } from "../../Data/Tournament Scores";

const LandingTeams = () => {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Combine the two arrays and ensure each team appears exactly twice
  const scores = [...turnirScores1.teams, ...turnirScores2.teams].map(
    (score, index) => ({
      ...score,
      tournament:
        index < turnirScores1.teams.length ? "Tournament 1" : "Tournament 2", // Mark the tournament
      false: score.questions - score.trues, // Calculate false answers
      score: score.trues - score.penalty, // Calculate the total score
    })
  );

  // Filter out teams to ensure each appears exactly twice
  const uniqueTeams = scores.filter(
    (team, index, self) =>
      self.findIndex((t) => t.class === team.class) === index
  );

  // Sorting function
  const sortScores = (scores) => {
    return scores.sort((a, b) =>
      sortAsc ? a.score - b.score : b.score - a.score
    );
  };

  const sortedScores = sortScores(uniqueTeams);

  // Filtered scores based on search
  const filteredScores = sortedScores.filter((score) =>
    score.class.toLowerCase().includes(search.toLowerCase())
  );

  // Handle row click for modal
  const handleRowClick = (score) => {
    setSelectedRow(score);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedRow ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [selectedRow]);

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Barcha Jamoalar</h1>
          <div className={styles.tableWrapper}>
            <input
              type="text"
              placeholder="Sinf bilan qidirish"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchBar}
            />
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Liga</th>
                  <th>True Answers</th>
                  <th>False Answers</th>
                  <th>Questions</th>
                  <th>Penalty</th>
                  <th onClick={toggleSortOrder}>
                    Score
                    <button className={styles.sortButton}>
                      {sortAsc ? "↑" : "↓"}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredScores.map((score) => (
                  <tr
                    key={score.id}
                    onClick={() => handleRowClick(score)}
                    className={styles.row}
                  >
                    <td>{score.class}</td>
                    <td>{score.liga}</td>
                    <td>{score.trues}</td>
                    <td>{score.false}</td>
                    <td>{score.questions}</td>
                    <td>{score.penalty}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Section */}
          {selectedRow && (
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Team Details</h2>
                  <p>
                    <strong>Class:</strong> {selectedRow.class}
                  </p>
                  <p>
                    <strong>Liga:</strong> {selectedRow.liga}
                  </p>
                  <p>
                    <strong>True Answers:</strong> {selectedRow.trues}
                  </p>
                  <p>
                    <strong>False Answers:</strong> {selectedRow.false}
                  </p>
                  <p>
                    <strong>Questions:</strong> {selectedRow.questions}
                  </p>
                  <p>
                    <strong>Penalty:</strong> {selectedRow.penalty}
                  </p>
                  <p>
                    <strong>Score:</strong> {selectedRow.score}
                  </p>
                  <button onClick={closeModal} className={styles.closeButton}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingTeams;
