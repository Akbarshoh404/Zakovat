import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { turnirScores1, turnirScores2 } from "../../Data/Tournament Scores";

const LandingTeams = () => {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const combinedTeams = [...turnirScores1.teams, ...turnirScores2.teams].reduce(
    (acc, team) => {
      const existingTeam = acc.find((t) => t.class === team.class);

      if (existingTeam) {
        existingTeam.trues += team.trues;
        existingTeam.falseAnswers += team.questions - team.trues;
        existingTeam.penalty += team.penalty;
        existingTeam.questions += team.questions;
        existingTeam.score = existingTeam.trues - existingTeam.penalty;
      } else {
        acc.push({
          ...team,
          tournament: team.tournament || "Tournament 1",
          falseAnswers: team.questions - team.trues,
          score: team.trues - team.penalty,
        });
      }

      return acc;
    },
    []
  );

  const filteredScores = combinedTeams.filter((score) =>
    score.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (score) => {
    setSelectedRow(score);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  useEffect(() => {
    document.body.style.overflow = selectedRow ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
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
                  <th>Sinf</th>
                  <th>Liga</th>
                  <th>To'g'ri</th>
                  <th>Xato</th>
                  <th>Savollar</th>
                  <th>Jarima</th>
                  <th>Natija</th>
                </tr>
              </thead>
              <tbody>
                {filteredScores.map((score) => (
                  <tr
                    key={score.class}
                    onClick={() => handleRowClick(score)}
                    className={styles.row}
                  >
                    <td>{score.class}</td>
                    <td>{score.liga}</td>
                    <td>{score.trues}</td>
                    <td>{score.falseAnswers}</td>
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
                    <strong>False Answers:</strong> {selectedRow.falseAnswers}
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
