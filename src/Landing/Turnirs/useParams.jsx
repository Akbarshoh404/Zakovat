import React, { useState, useEffect } from "react";
import styles from "./params.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import { useParams } from "react-router-dom";
import Slider from "react-slick"; // Import Slider from react-slick
import { turnirScores1, turnirScores2 } from "../../Data/Tournament Scores";

import turnir1img1 from "../shared/images/1/1.jpg";
import turnir1img2 from "../shared/images/1/2.jpg";
import turnir1img3 from "../shared/images/1/3.jpg";
import turnir1img4 from "../shared/images/1/4.jpg";
import turnir1img5 from "../shared/images/1/5.jpg";
import turnir1img6 from "../shared/images/1/6.jpg";
import turnir1img7 from "../shared/images/1/7.jpg";

import turnir2img1 from "../shared/images/2/1.jpg";
import turnir2img2 from "../shared/images/2/2.jpg";
import turnir2img3 from "../shared/images/2/3.jpg";
import turnir2img4 from "../shared/images/2/4.jpg";
import turnir2img5 from "../shared/images/2/5.jpg";
import turnir2img6 from "../shared/images/2/6.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
  const liga3Teams = scores.filter((score) => score.liga === "Oliy");

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
          <th>Sinf</th>
          <th>To'g'ri</th>
          <th>Xato</th>
          <th>Savollar</th>
          <th>Jarima</th>
          <th
            onClick={() =>
              sortTeams(teams, sortAsc, setSortAsc, setSortedTeams)
            }
          >
            Natija
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

  const images =
    id == 1
      ? [
          turnir1img1,
          turnir1img2,
          turnir1img3,
          turnir1img4,
          turnir1img5,
          turnir1img7,
        ]
      : [
          turnir2img2,
          turnir2img3,
          turnir2img4,
          turnir2img5,
          turnir2img6,
        ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Zakovat {id} - mavsum natijalari</h1>

          <div className={styles.carousel}>
            <Slider {...carouselSettings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Turnir ${id} Image ${index + 1}`}
                    className={styles.carouselImage}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Liga1 Table */}
          <h2>Liga 1</h2>
          {renderTable(sortedLiga1, 1, sortAsc1, setSortAsc1, setSortedLiga1)}

          {/* Liga2 Table */}
          <h2>Liga 2</h2>
          {renderTable(sortedLiga2, 2, sortAsc2, setSortAsc2, setSortedLiga2)}

          {/* Liga3 Table */}
          <h2>Oliy Liga</h2>
          {renderTable(sortedLiga3, 3, sortAsc3, setSortAsc3, setSortedLiga3)}

          {/* Modal for Team Details */}
          {selectedRow && (
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Jamoa Natijalari</h2>
                  <p>
                    <strong>Sinf:</strong> {selectedRow.class}
                  </p>
                  <p>
                    <strong>Liga:</strong> {selectedRow.liga}
                  </p>
                  <p>
                    <strong>To'g'ri javoblar:</strong> {selectedRow.trues}
                  </p>
                  <p>
                    <strong>Xato javoblar:</strong> {selectedRow.false}
                  </p>
                  <p>
                    <strong>Savollar soni:</strong> {selectedRow.questions}
                  </p>
                  <p>
                    <strong>Jarima:</strong> {selectedRow.penalty}
                  </p>
                  <p>
                    <strong>Natija:</strong> {selectedRow.score}
                  </p>
                  <button onClick={closeModal} className={styles.closeButton}>
                    Yopish
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
