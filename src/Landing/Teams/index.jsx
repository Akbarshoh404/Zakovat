import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import { supabase } from "../../config/supabaseClient";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { useLanguage } from "../../context/LanguageContext";
import {
  turnirScores1,
  turnirScores2,
  turnirScores3,
} from "../../Data/Tournament Scores";

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LandingTeams = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [visible, setVisible] = useState(false);
  const [openYears, setOpenYears] = useState({ "2024/2025": true });
  const { t } = useLanguage();

  const getCombinedTeams = (teamsArray) => {
    return teamsArray.reduce((acc, team) => {
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
          falseAnswers: team.questions - team.trues,
          score: team.trues - team.penalty,
          liga: team.liga || "Noma'lum",
        });
      }
      return acc;
    }, []).sort((a, b) => b.score - a.score);
  };

  const [registeredTeams, setRegisteredTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('registration_date', { ascending: false });

        if (error) throw error;
        
        const formatted = data.map(t => ({
          class: t.team_class,
          liga: "Noma'lum",
          trues: 0,
          falseAnswers: 0,
          questions: 0,
          penalty: 0,
          score: 0,
          mainMembers: t.main_members,
          extraMembers: t.extra_members
        }));
        setRegisteredTeams(formatted);
      } catch (err) {
        console.error("Failed to load teams:", err);
      }
    };
    
    fetchTeams();
  }, []);

  const ACADEMIC_YEARS = [
    { year: "2026/2027", teams: registeredTeams },
    { year: "2025/2026", teams: [] },
    { 
      year: "2024/2025", 
      teams: getCombinedTeams([...turnirScores1.teams, ...turnirScores2.teams, ...turnirScores3.teams]) 
    },
  ];

  const toggleYear = (year) => {
    setOpenYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  useEffect(() => {
    const t_out = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t_out);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedRow ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedRow]);

  return (
    <>
      <LandingNavbar />
      <div className={styles.page}>
        <div className={`${styles.pageHeader} ${visible ? styles.sectionVisible : ""}`}>
          <div className={styles.pageHeaderInner}>
            <h1 className={styles.title}>
              <div><span style={{ animationDelay: visible ? "0.1s" : "0s" }}>{t("teams_title")}</span></div>
            </h1>
            <p className={styles.subtitle}>{t("teams_sub")}</p>
          </div>
        </div>

        <div className={`${styles.section} ${visible ? styles.sectionVisible : ""}`}>
          <div className={styles.container}>
            
            {ACADEMIC_YEARS.map((ay) => (
              <div key={ay.year} className={styles.yearBlock}>
                <div 
                  className={styles.yearHeader} 
                  onClick={() => toggleYear(ay.year)}
                  style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                    <h2 className={styles.yearTitle}>{ay.year}</h2>
                    <span className={styles.yearSub}>{t("acad_year")}</span>
                  </div>
                  <svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ transform: openYears[ay.year] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {openYears[ay.year] && (
                  <>
                    {ay.teams.length > 0 ? (
                      <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>{t("col_rank")}</th>
                              <th>{t("col_class")}</th>
                              <th>{t("col_liga")}</th>
                              <th className={styles.numCol}>{t("col_true")}</th>
                              <th className={styles.numCol}>{t("col_false")}</th>
                              <th className={styles.numCol}>{t("col_questions")}</th>
                              <th className={styles.numCol}>{t("col_penalty")}</th>
                              <th className={styles.numCol}>{t("col_score")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ay.teams.map((score, index) => (
                              <tr
                                key={index}
                                onClick={() => setSelectedRow(score)}
                                className={styles.row}
                              >
                                <td className={styles.rank}>{String(index + 1).padStart(2, "0")}</td>
                                <td className={styles.className}>{score.class}</td>
                                <td>{score.liga}</td>
                                <td className={styles.numCol}>{score.trues}</td>
                                <td className={styles.numCol}>{score.falseAnswers}</td>
                                <td className={styles.numCol}>{score.questions}</td>
                                <td className={styles.numCol}>{score.penalty > 0 ? `-${score.penalty}` : "0"}</td>
                                <td className={`${styles.numCol} ${styles.score}`}>{score.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className={styles.empty}>
                        <p>{t("empty_teams")}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* Modal */}
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
                  { label: t("col_false"), value: selectedRow.falseAnswers },
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

              {(selectedRow.mainMembers || selectedRow.extraMembers) && (
                <div className={styles.membersListBlock}>
                  <h3 className={styles.membersListTitle}>Jamoa a'zolari</h3>
                  {selectedRow.mainMembers && selectedRow.mainMembers.filter(Boolean).length > 0 && (
                    <div className={styles.membersGroup}>
                      <span className={styles.membersGroupLabel}>Asosiy:</span>
                      <ul className={styles.membersUl}>
                        {selectedRow.mainMembers.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}
                      </ul>
                    </div>
                  )}
                  {selectedRow.extraMembers && selectedRow.extraMembers.filter(Boolean).length > 0 && (
                    <div className={styles.membersGroup}>
                      <span className={styles.membersGroupLabel}>Zaxira:</span>
                      <ul className={styles.membersUl}>
                        {selectedRow.extraMembers.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingTeams;
