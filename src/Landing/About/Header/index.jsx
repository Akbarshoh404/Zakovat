import React from "react";
import styles from "./style.module.scss";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

const Header = () => {
  const [ref, vis] = useScrollReveal();
  const { t } = useLanguage();

  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.inner}>
        <span className="label" style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s' }}>{t("about_header_label")}</span>
        <div className={`${styles.heading} ${vis ? styles.headingVis : ""}`}>
          <h1 className={styles.title}>
            {t("about_header_title")}<br />
            <span className={styles.subTitleSpan}>{t("about_header_sub")}</span>
          </h1>
          <p className={styles.subtitle}>{t("about_header_body")}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
