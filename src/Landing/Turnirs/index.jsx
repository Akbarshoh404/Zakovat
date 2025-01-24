import React, { useEffect, useState } from "react";
import { useParams as useRouteParams, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer/index";

const LandingTurnirs = () => {
  const { id } = useRouteParams();
  const navigate = useNavigate();

  const [turnirData, setTurnirData] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, title: "Turnir 1", description: "Description for Turnir 1" },
      { id: 2, title: "Turnir 2", description: "Description for Turnir 2" },
      { id: 3, title: "Turnir 3", description: "Description for Turnir 3" },
    ];

    setTurnirData(mockData);
  }, [id]);

  return (
    <>
      <LandingNavbar />
      <div className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Turnir Details</h1>
          <div className={styles.cardContainer}>
            {turnirData.map((turnir) => (
              <div
                key={turnir.id}
                className={styles.card}
                onClick={() => navigate(`/turnirs/${turnir.id}`)}
              >
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
