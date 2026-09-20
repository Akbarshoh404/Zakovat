import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer/index";
import { useLanguage } from "../../context/LanguageContext";

import img1 from "../shared/images/1.jpg";
import img2 from "../shared/images/2.jpg";
import img3 from "../shared/images/3.png";

const LandingTurnirs = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const ACADEMIC_YEARS = [
    {
      year: "2026/2027",
      turnirs: []
    },
    {
      year: "2025/2026",
      turnirs: []
    },
    {
      year: "2024/2025",
      turnirs: [
        { id: 1, title: "Mavsum 01", date: "18–20 Sentabr 2024", image: img1, status: "completed", clickable: true },
        { id: 2, title: "Mavsum 02", date: "19–21 Noyabr 2024", image: img2, status: "completed", clickable: true },
        { id: 3, title: "Mavsum 03", date: "29–31 Yanvar 2025", image: img3, status: "upcoming", clickable: false },
      ]
    }
  ];

  useEffect(() => {
    const t_out = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t_out);
  }, []);

  const handleCardClick = (turnir) => {
    if (turnir.clickable) navigate(`/turnirs/${turnir.id}`);
  };

  return (
    <>
      <LandingNavbar />
      <div className={styles.page}>
        <div className={`${styles.header} ${visible ? styles.sectionVis : ""}`}>
          <div className={styles.headerInner}>
            <h1 className={styles.heading}>
              <div><span style={{ animationDelay: visible ? "0.1s" : "0s" }}>{t("turnirs_title")}</span></div>
            </h1>
            <p className={styles.sub}>{t("turnirs_sub")}</p>
          </div>
        </div>

        <div className={`${styles.section} ${visible ? styles.sectionVis : ""}`}>
          {ACADEMIC_YEARS.map((ay) => (
            <div key={ay.year} className={styles.yearBlock}>
              <div className={styles.yearHeader}>
                <h2 className={styles.yearTitle}>{ay.year}</h2>
                <span className={styles.yearSub}>{t("acad_year")}</span>
              </div>

              {ay.turnirs.length > 0 ? (
                <div className={styles.grid}>
                  {ay.turnirs.map((turnir, i) => (
                    <div
                      key={turnir.id}
                      className={`${styles.card} ${turnir.clickable ? styles.clickable : styles.upcoming}`}
                      onClick={() => handleCardClick(turnir)}
                      style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
                    >
                      <div className={styles.imgWrap}>
                        <img src={turnir.image} alt={turnir.title} />
                        <div className={styles.badge}>
                          {turnir.status === "completed" ? t("status_completed") : t("status_upcoming")}
                        </div>
                      </div>
                      <div className={styles.meta}>
                        <h3 className={styles.cardTitle}>{turnir.title}</h3>
                        <p className={styles.cardDate}>{turnir.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>{t("empty_tournaments")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingTurnirs;
