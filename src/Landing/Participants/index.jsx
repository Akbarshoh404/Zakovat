import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";

const LandingParticipants = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("http://localhost:8080/participants");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const participants = await response.json();
        setData(participants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const filteredData = data.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to open the modal and show participant's details
  const openModal = (participant) => {
    setSelectedParticipant(participant);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedParticipant(null);
  };

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
            {loading && <p className={styles.loadingText}>Loading...</p>}
            {error && <p className={styles.errorText}>Error: {error}</p>}
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search participants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  {currentPageData.map((participant, index) => (
                    <tr key={index} onClick={() => openModal(participant)}>
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

          {/* Pagination */}
          <div className={styles.pagination}>
            {Array.from({
              length: Math.ceil(filteredData.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                className={styles.pageButton}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedParticipant && (
        <div className={`${styles.modalOverlay} ${styles.show}`}>
          <div className={styles.modalContent}>
            <h3>{selectedParticipant.name} - Details</h3>
            <p>
              <strong>Team:</strong> {selectedParticipant.team}
            </p>
            <p>
              <strong>Grade:</strong> {selectedParticipant.grade}
            </p>
            <p>
              <strong>Score:</strong> {selectedParticipant.score}
            </p>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingParticipants;
