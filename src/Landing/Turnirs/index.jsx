import React, { useEffect, useState } from "react";
import { useParams as useRouteParams, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer/index";

import img1 from "../shared/images/1.jpg";
import img2 from "../shared/images/2.jpg";
import img3 from "../shared/images/3.png";

const LandingTurnirs = () => {
  const { id } = useRouteParams();
  const navigate = useNavigate();

  const [turnirData, setTurnirData] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "1 - Mavsum",
        description: "18-19-20 Sentabr 2024y",
        image: img1,
      },
      {
        id: 2,
        title: "2 - Mavsum",
        description: "19-20-21 Noyabr 2024y",
        image: img2,
      },
      {
        id: 3,
        title: "Tez kunda ...",
        description: "",
        image: img3,
      },
    ];

    setTurnirData(mockData);
  }, [id]);

  const handleCardClick = (turnirId, title) => {
    if (turnirId !== 3) {
      navigate(`/turnirs/${turnirId}`);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Bizning turnirlarimiz</h1>

          <div className={styles.cardContainer}>
            {turnirData.map((turnir) => (
              <div
                key={turnir.id}
                className={styles.card}
                onClick={() => handleCardClick(turnir.id, turnir.title)}
              >
                <img
                  src={turnir.image}
                  alt={turnir.title}
                  className={styles.cardImage}
                />
                <h2>{turnir.title}</h2>
                <p>{turnir.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingTurnirs;
