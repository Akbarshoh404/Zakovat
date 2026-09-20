import React from "react";
import styles from "./style.module.scss";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

const Header = () => {
  const [ref, vis] = useScrollReveal();
  const { t } = useLanguage();

  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.bgGlow}></div>
      <div className={styles.inner}>
        <div className={`${styles.badgeWrapper} ${vis ? styles.badgeVis : ""}`}>
          <div className={styles.stylishBadge}>
            <span className={styles.dot}></span>
            {t("about_header_label")}
          </div>
        </div>
        <div className={`${styles.heading} ${vis ? styles.headingVis : ""}`}>
          <h1 className={styles.title}>
            {t("about_header_title")} <span className={styles.subTitleSpan}>{t("about_header_sub")}</span>
          </h1>
          <p className={styles.subtitle}>{t("about_header_body")}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
