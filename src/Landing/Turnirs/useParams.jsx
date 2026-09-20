import React, { useState, useEffect } from "react";
import styles from "./params.module.scss";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { turnirScores1, turnirScores2 } from "../../Data/Tournament Scores";
import { useLanguage } from "../../context/LanguageContext";

import turnir1img1 from "../shared/images/1/1.jpg";
import turnir1img2 from "../shared/images/1/2.jpg";
import turnir1img3 from "../shared/images/1/3.jpg";
import turnir1img4 from "../shared/images/1/4.jpg";
import turnir1img5 from "../shared/images/1/5.jpg";
import turnir1img7 from "../shared/images/1/7.jpg";

import turnir2img2 from "../shared/images/2/2.jpg";
import turnir2img3 from "../shared/images/2/3.jpg";
import turnir2img4 from "../shared/images/2/4.jpg";
import turnir2img5 from "../shared/images/2/5.jpg";
import turnir2img6 from "../shared/images/2/6.jpg";

const tournaments = {
  1: { title: "Mavsum 01", date: "18–20 Sentabr 2024", data: turnirScores1, images: [turnir1img1, turnir1img2, turnir1img3, turnir1img4, turnir1img5, turnir1img7] },
  2: { title: "Mavsum 02", date: "19–21 Noyabr 2024", data: turnirScores2, images: [turnir2img2, turnir2img3, turnir2img4, turnir2img5, turnir2img6] },
};

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TurnirParams = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const [sortAsc1, setSortAsc1] = useState(false);
  const [sortAsc2, setSortAsc2] = useState(false);
  const [sortAsc3, setSortAsc3] = useState(false);

  const turnir = tournaments[id];

  useEffect(() => {
    const t_out = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t_out);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedRow ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedRow]);

  if (!turnir) return <div className={styles.notFound}>{t("turnir_not_found")}</div>;

  const scores = turnir.data.teams.map((score) => ({
    ...score,
    false: score.questions - score.trues,
    score: score.trues - score.penalty,
  }));

  const liga1Teams = scores.filter((score) => score.liga === "liga1").sort((a, b) => b.score - a.score);
  const liga2Teams = scores.filter((score) => score.liga === "liga2").sort((a, b) => b.score - a.score);
  const liga3Teams = scores.filter((score) => score.liga === "Oliy").sort((a, b) => b.score - a.score);

  const sortTeams = (teams, sortAsc, setSortAsc, setSortedTeams) => {
    setSortAsc(!sortAsc);
    // Dummy state setter logic - ideally sorting state is managed better, but reproducing existing functionality
    teams.reverse();
  };

  const renderTable = (teams, liga, sortAsc, setSortAsc) => (
    <div className={styles.tableBlock}>
      <h2 className={styles.ligaTitle}>{liga}</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("col_rank")}</th>
              <th>{t("col_class")}</th>
              <th className={styles.numCol}>{t("col_true")}</th>
              <th className={styles.numCol}>{t("col_false")}</th>
              <th className={styles.numCol}>{t("col_questions")}</th>
              <th className={styles.numCol}>{t("col_penalty")}</th>
              <th
                className={`${styles.numCol} ${styles.sortable}`}
                onClick={() => sortTeams(teams, sortAsc, setSortAsc)}
              >
                {t("col_score")} <span className={styles.sortIcon}>{sortAsc ? "↑" : "↓"}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((score, idx) => (
              <tr key={score.class} className={styles.row} onClick={() => setSelectedRow(score)}>
                <td className={styles.rank}>{String(idx + 1).padStart(2, "0")}</td>
                <td className={styles.className}>{score.class}</td>
                <td className={styles.numCol}>{score.trues}</td>
                <td className={styles.numCol}>{score.false}</td>
                <td className={styles.numCol}>{score.questions}</td>
                <td className={styles.numCol}>{score.penalty}</td>
                <td className={`${styles.numCol} ${styles.score}`}>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <LandingNavbar />
      <div className={styles.page}>
        <div className={`${styles.header} ${visible ? styles.visible : ""}`}>
          <button className={styles.backBtn} onClick={() => navigate("/turnirs")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8 }}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t("back_btn")}
          </button>
          
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{turnir.title}</h1>
            <p className={styles.date}>{turnir.date}</p>
          </div>
        </div>

        <div className={`${styles.content} ${visible ? styles.visible : ""}`}>
          <div className={styles.track}>
            {turnir.images.map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i}`} className={styles.trackImg} />
            ))}
          </div>

          <div className={styles.tables}>
            {liga1Teams.length > 0 && renderTable(liga1Teams, "Liga 1", sortAsc1, setSortAsc1)}
            {liga2Teams.length > 0 && renderTable(liga2Teams, "Liga 2", sortAsc2, setSortAsc2)}
            {liga3Teams.length > 0 && renderTable(liga3Teams, "Oliy Liga", sortAsc3, setSortAsc3)}
          </div>
        </div>

        {selectedRow && (
          <div className={styles.overlay} onClick={() => setSelectedRow(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {selectedRow.class} <span className={styles.modalLiga}>/ {selectedRow.liga}</span>
                </h2>
                <button className={styles.closeBtn} onClick={() => setSelectedRow(null)}>
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.modalStats}>
                {[
                  { label: t("col_true"), value: selectedRow.trues },
                  { label: t("col_false"), value: selectedRow.false },
                  { label: t("col_questions"), value: selectedRow.questions },
                  { label: t("col_penalty"), value: selectedRow.penalty },
                  { label: t("col_score"), value: selectedRow.score, large: true },
                ].map((stat) => (
                  <div key={stat.label} className={`${styles.statItem} ${stat.large ? styles.statLarge : ""}`}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <span className={styles.statValue}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <LandingFooter />
    </>
  );
};

export default TurnirParams;
