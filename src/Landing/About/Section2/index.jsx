import React from "react";
import styles from "./style.module.scss";
import img from "../../shared/images/header.jpg";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

const Section2 = () => {
  const [refL, visL] = useScrollReveal();
  const [refR, visR] = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div ref={refL} className={`${styles.text} ${visL ? styles.vis : ""}`}>
          <span className="label">{t("mission_label")}</span>
          <h2 className={styles.heading}>{t("mission_title")}</h2>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>{t("mission_1_title")}</h3>
              <p className={styles.blockBody}>{t("mission_1_body")}</p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>{t("mission_2_title")}</h3>
              <p className={styles.blockBody}>{t("mission_2_body")}</p>
            </div>
          </div>
        </div>
        <div ref={refR} className={`${styles.photo} ${visR ? styles.photoVis : ""}`}>
          <img src={img} alt="Zakovat musobaqasi" />
        </div>
      </div>
    </section>
  );
};

export default Section2;
