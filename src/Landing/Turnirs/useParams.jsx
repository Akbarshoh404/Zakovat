import React, { useState, useEffect } from "react";
import styles from "./params.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import { useParams } from "react-router-dom";
import {
  turnirScores1,
  turnirScores2,
} from "../../Data/Tournament Scores";

const TurnirParams = () => {
  const { id } = useParams();

  let scoresData = [];

  if (id == 1) {
    scoresData = [...turnirScores1.teams];
  } else if (id == 2) {
    scoresData = [...turnirScores2.teams];
  }

  // Calculate score dynamically and update false answers
  const scores = scoresData.map((score) => ({
    ...score,
    false: score.questions - score.trues, // Update false answers
    score: score.trues - score.penalty,
  }));

  // Separate teams by liga
  const liga1Teams = scores.filter((score) => score.liga === "liga1");
  const liga2Teams = scores.filter((score) => score.liga === "liga2");
  const liga3Teams = scores.filter((score) => score.liga === "liga3");

  // Sorting state for each liga
  const [sortAsc1, setSortAsc1] = useState(true);
  const [sortAsc2, setSortAsc2] = useState(true);
  const [sortAsc3, setSortAsc3] = useState(true);

  // Modal state
  const [selectedRow, setSelectedRow] = useState(null);

  // Sorted teams state
  const [sortedLiga1, setSortedLiga1] = useState(liga1Teams);
  const [sortedLiga2, setSortedLiga2] = useState(liga2Teams);
  const [sortedLiga3, setSortedLiga3] = useState(liga3Teams);

  // Sorting function for each liga
  const sortTeams = (teams, sortAsc, setSortAsc, setSortedTeams) => {
    setSortAsc(!sortAsc); // Toggle sorting order
    const sortedTeams = [...teams].sort((a, b) =>
      sortAsc ? a.score - b.score : b.score - a.score
    );
    setSortedTeams(sortedTeams); // Update sorted teams
  };

  // Handle row click for modal
  const handleRowClick = (score) => {
    setSelectedRow(score);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const renderTable = (teams, liga, sortAsc, setSortAsc, setSortedTeams) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Class</th>
          <th>True Answers</th>
          <th>False Answers</th>
          <th>Questions</th>
          <th>Penalty</th>
          <th
            onClick={() =>
              sortTeams(teams, sortAsc, setSortAsc, setSortedTeams)
            }
          >
            Score
            <button className={styles.sortButton}>{sortAsc ? "↑" : "↓"}</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((score) => (
          <tr
            key={score.id}
            className={styles.row}
            onClick={() => handleRowClick(score)}
          >
            <td>{score.class}</td>
            <td>{score.trues}</td>
            <td>{score.false}</td>
            <td>{score.questions}</td>
            <td>{score.penalty}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Zakovat {id} - mavsum natijalari</h1>

          {/* Liga1 Table */}
          <h2>Liga 1</h2>
          {renderTable(sortedLiga1, 1, sortAsc1, setSortAsc1, setSortedLiga1)}

          {/* Liga2 Table */}
          <h2>Liga 2</h2>
          {renderTable(sortedLiga2, 2, sortAsc2, setSortAsc2, setSortedLiga2)}

          {/* Liga3 Table */}
          <h2>Liga 3</h2>
          {renderTable(sortedLiga3, 3, sortAsc3, setSortAsc3, setSortedLiga3)}

          {/* Modal for Team Details */}
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

export default TurnirParams;
