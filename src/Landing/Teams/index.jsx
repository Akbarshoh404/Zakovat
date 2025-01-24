import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";

import styles from "./style.module.scss";

import { scoresData } from "../../Data/General Scores";

const LandingTeams = () => {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // For sorting ascending or descending

  // Calculate score dynamically based on the formula: trueAnswers - penalty
  const scores = scoresData.map((score) => ({
    ...score,
    score: score.trues - score.penalty, // Calculate the score
  }));

  // Sorting the scores based on the "score" field
  const sortedScores = [...scores].sort((a, b) => {
    return sortAsc ? a.score - b.score : b.score - a.score;
  });

  const filteredScores = sortedScores.filter((score) =>
    score.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (score) => {
    setSelectedRow(score); // Opens the modal with details
  };

  const closeModal = () => {
    setSelectedRow(null); // Closes the modal
  };

  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev); // Toggle sort order
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedRow) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable body scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up when component unmounts
    };
  }, [selectedRow]);

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Team Scores</h1>
          <div className={styles.tableWrapper}>
            <input
              type="text"
              placeholder="Search by Class..."
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
                    Score{" "}
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
                    <td>{score.class}</td> {/* Use 'class' here */}
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
