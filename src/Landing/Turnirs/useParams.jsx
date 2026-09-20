import React, { useEffect, useRef, useState } from "react";
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

const ArrowIcon = ({ direction }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TurnirParams = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sortAsc1, setSortAsc1] = useState(false);
  const [sortAsc2, setSortAsc2] = useState(false);
  const [sortAsc3, setSortAsc3] = useState(false);

  const turnir = tournaments[id];

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedRow ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedRow]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const updateSlide = () => {
      const slideWidth = track.clientWidth;
      if (slideWidth) setActiveSlide(Math.round(track.scrollLeft / slideWidth));
    };

    track.addEventListener("scroll", updateSlide, { passive: true });
    return () => track.removeEventListener("scroll", updateSlide);
  }, [turnir]);

  if (!turnir) return <div className={styles.notFound}>{t("turnir_not_found")}</div>;

  const scores = turnir.data.teams.map((score) => ({
    ...score,
    false: score.questions - score.trues,
    score: score.trues - score.penalty,
  }));

  const liga1Teams = scores.filter((score) => score.liga === "liga1").sort((a, b) => b.score - a.score);
  const liga2Teams = scores.filter((score) => score.liga === "liga2").sort((a, b) => b.score - a.score);
  const liga3Teams = scores.filter((score) => score.liga === "Oliy").sort((a, b) => b.score - a.score);
  const leagues = [liga1Teams, liga2Teams, liga3Teams].filter((league) => league.length > 0);

  const goToSlide = (index) => {
    const nextIndex = (index + turnir.images.length) % turnir.images.length;
    trackRef.current?.children[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveSlide(nextIndex);
  };

  const handleCarouselKeyDown = (event) => {
    if (event.key === "ArrowLeft") goToSlide(activeSlide - 1);
    if (event.key === "ArrowRight") goToSlide(activeSlide + 1);
  };

  const sortTeams = (teams, sortAsc, setSortAsc) => {
    setSortAsc(!sortAsc);
    teams.reverse();
  };

  const renderTable = (teams, liga, sortAsc, setSortAsc) => (
    <div className={styles.tableBlock}>
      <div className={styles.tableHeading}>
        <h2 className={styles.ligaTitle}>{liga}</h2>
        <span className={styles.tableCount}>{teams.length} {t("turnirs_label")}</span>
      </div>
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
              <th className={`${styles.numCol} ${styles.sortable}`} onClick={() => sortTeams(teams, sortAsc, setSortAsc)}>
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
      <main className={`${styles.page} ${visible ? styles.visible : ""}`}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <button className={styles.backBtn} onClick={() => navigate("/turnirs")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t("back_btn")}
            </button>
            <div className={styles.eyebrow}>Zakovat / {t("turnirs_label")}</div>
            <div className={styles.titleWrapper}>
              <h1 className={styles.heading}>{turnir.title}</h1>
              <p className={styles.label}>{turnir.date}</p>
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryItem}><strong>{scores.length}</strong><span>{t("turnirs_label")}</span></div>
              <div className={styles.summaryItem}><strong>{leagues.length}</strong><span>{t("col_class")}</span></div>
              <div className={styles.summaryItem}><strong>{turnir.images.length}</strong><span>Gallery</span></div>
            </div>
          </div>
        </header>

        <section className={styles.carouselSection} aria-label={`${turnir.title} gallery`}>
          <div className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>01 / Gallery</span>
            <span className={styles.slideCounter}>{String(activeSlide + 1).padStart(2, "0")} — {String(turnir.images.length).padStart(2, "0")}</span>
          </div>
          <div className={styles.carouselFrame}>
            <div className={styles.track} ref={trackRef} tabIndex="0" onKeyDown={handleCarouselKeyDown}>
              {turnir.images.map((img, i) => (
                <img key={i} src={img} alt={`${turnir.title} gallery ${i + 1}`} className={styles.trackImg} />
              ))}
            </div>
            <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous image"><ArrowIcon direction="prev" /></button>
            <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={() => goToSlide(activeSlide + 1)} aria-label="Next image"><ArrowIcon direction="next" /></button>
          </div>
          <div className={styles.indicators} aria-label="Choose gallery image">
            {turnir.images.map((_, index) => <button key={index} className={`${styles.indicator} ${index === activeSlide ? styles.indicatorActive : ""}`} onClick={() => goToSlide(index)} aria-label={`Go to image ${index + 1}`} />)}
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <div>
              <span className={styles.sectionLabel}>02 / Results</span>
              <h2 className={styles.resultsTitle}>Tournament standings</h2>
            </div>
            <p className={styles.resultsCopy}>Select a team to view its complete score breakdown.</p>
          </div>
          <div className={styles.tables}>
            {liga1Teams.length > 0 && renderTable(liga1Teams, "Liga 1", sortAsc1, setSortAsc1)}
            {liga2Teams.length > 0 && renderTable(liga2Teams, "Liga 2", sortAsc2, setSortAsc2)}
            {liga3Teams.length > 0 && renderTable(liga3Teams, "Oliy Liga", sortAsc3, setSortAsc3)}
          </div>
        </section>

        {selectedRow && (
          <div className={styles.overlay} onClick={() => setSelectedRow(null)}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{selectedRow.class}<span className={styles.modalLiga}>/ {selectedRow.liga}</span></h2>
                <button className={styles.closeBtn} onClick={() => setSelectedRow(null)} aria-label="Close"><CloseIcon /></button>
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
      </main>
      <LandingFooter />
    </>
  );
};

export default TurnirParams;
