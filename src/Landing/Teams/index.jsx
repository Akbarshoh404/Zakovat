import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";

const LandingTeams = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:8080/teams");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const teams = await response.json();
        setData(teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (team) => {
    setSelectedTeam(team);
  };

  const closeModal = () => {
    setSelectedTeam(null);
  };

  const totalTeams = data.length;
  const averageScore = totalTeams > 0 ? (data.reduce((sum, team) => sum + team.score, 0) / totalTeams).toFixed(2) : 0;
  const highestScore = totalTeams > 0 ? Math.max(...data.map((team) => team.score)) : 0;

  return (
    <>
      <LandingNavbar />
      <section className={styles.teamsSection}>
        <div className={styles.teamsContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.teamsTitle}>Our Teams</h2>
            <p className={styles.descriptionText}>
              Here you can find all the teams competing in our tournaments.
            </p>
            {loading && <p className={styles.loadingText}>Loading...</p>}
            {error && <p className={styles.errorText}>Error: {error}</p>}
          </div>

          {!loading && !error && (
            <div className={styles.statsContainer}>
              <p>Total Teams: {totalTeams}</p>
              <p>Average Score: {averageScore}</p>
              <p>Highest Score: {highestScore}</p>
            </div>
          )}

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by team name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!loading && !error && (
            <>
              <div className={styles.tableContainer}>
                <table className={styles.customTable}>
                  <thead>
                    <tr>
                      <th onClick={() => requestSort("name")}>
                        Team Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("grade")}>
                        Grade {sortConfig.key === "grade" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("participants")}>
                        Participants Count {sortConfig.key === "participants" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("trueAnswers")}>
                        True Answers {sortConfig.key === "trueAnswers" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("falseAnswers")}>
                        False Answers {sortConfig.key === "falseAnswers" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("penalty")}>
                        Penalty {sortConfig.key === "penalty" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th onClick={() => requestSort("score")}>
                        Score {sortConfig.key === "score" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((team, index) => (
                      <tr key={index} onClick={() => openModal(team)}>
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

              <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    className={styles.pageButton}
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedTeam && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{selectedTeam.name} - Details</h3>
            <p>Grade: {selectedTeam.grade}</p>
            <p>Participants: {selectedTeam.participants.join(", ")}</p>
            <p>True Answers: {selectedTeam.trueAnswers}</p>
            <p>False Answers: {selectedTeam.falseAnswers}</p>
            <p>Penalty: {selectedTeam.penalty}</p>
            <p>Score: {selectedTeam.score}</p>
            <button className={styles.closeButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingTeams;