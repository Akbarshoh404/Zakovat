import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import img1 from "../../shared/images/img1.png";
import img2 from "../../shared/images/img2.png";
import img3 from "../../shared/images/img3.png";
import { useLanguage } from "../../../context/LanguageContext";

const Section1 = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const { t } = useLanguage();

  const STATS = [
    { value: "600+", label: t("stat_members") },
    { value: "3",    label: t("stat_seasons") },
    { value: "3",    label: t("stat_leagues") },
  ];

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        {/* Left */}
        <div className={`${styles.text} ${vis ? styles.textVis : ""}`}>
          <p className="label">{t("hero_label")}</p>

          <h1 className={styles.heading}>
            <div><span style={{ animationDelay: vis ? "0.1s" : "0s" }}>{t("hero_title")}</span></div>
            <div><span className={styles.headingSub} style={{ animationDelay: vis ? "0.2s" : "0s" }}>{t("hero_subtitle")}</span></div>
          </h1>

          <p className={styles.body}>
            {t("hero_body")}
          </p>

          <div className={styles.stats}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={styles.stat}
                style={{ transitionDelay: vis ? `${i * 80 + 200}ms` : "0ms" }}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className={`${styles.media} ${vis ? styles.mediaVis : ""}`}>
          <div className={styles.grid}>
            <div className={styles.cell1}>
              <img src={img1} alt="Zakovat o'yini" />
            </div>
            <div className={styles.cell2}>
              <img src={img2} alt="Ishtirokchilar" />
            </div>
            <div className={styles.cell3}>
              <img src={img3} alt="Turnir" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue} aria-hidden="true">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6.5" y="4" width="3" height="6" rx="1.5" fill="currentColor" opacity="0.4"/>
          <path d="M8 16l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        </svg>
      </div>
    </section>
  );
};

export default Section1;
