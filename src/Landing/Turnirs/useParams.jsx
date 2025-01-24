import React, { useEffect, useState } from "react";
import styles from "./params.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import { useParams, useNavigate } from "react-router-dom";

import {
  turnirScores1,
  turnirScores2,
  turnirScores3,
} from "../../Data/Tournament Scores";

const TurnirParams = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  let scoresData = [];

  if (id == 1) {
    scoresData = [...turnirScores1.teams];
  } else if (id == 2) {
    scoresData = [...turnirScores2.teams];
  } else if (id == 3) {
    scoresData = [...turnirScores3.teams];
  }

  // Calculate score dynamically and update false answers
  const scores = scoresData.map((score) => ({
    ...score,
    false: score.questions - score.trues, // Update false answers
    score: score.trues - score.penalty,
  }));

  const sortedScores = [...scores].sort((a, b) =>
    sortAsc ? a.score - b.score : b.score - a.score
  );

  const filteredScores = sortedScores.filter((score) =>
    score.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (score) => {
    setSelectedRow(score);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  useEffect(() => {
    if (selectedRow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedRow]);

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Zakovat {id} - mavsum natijalari</h1>
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
