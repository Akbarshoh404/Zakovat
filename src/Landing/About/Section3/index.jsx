import React from "react";
import styles from "./style.module.scss";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

const Section3 = () => {
  const [ref, vis] = useScrollReveal();
  const { t } = useLanguage();

  const RULES = [
    t("rule_1"),
    t("rule_2"),
    t("rule_3"),
    t("rule_4"),
    t("rule_5"),
    t("rule_6"),
    t("rule_7"),
    t("rule_8"),
  ];

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} ${vis ? styles.headerVis : ""}`}>
          <span className="label">{t("rules_label")}</span>
          <h2 className={styles.heading}>{t("rules_title")}</h2>
        </div>
        <ol className={styles.list}>
          {RULES.map((rule, i) => (
            <li
              key={i}
              className={`${styles.item} ${vis ? styles.itemVis : ""}`}
              style={{ transitionDelay: vis ? `${i * 55}ms` : "0ms" }}
            >
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.text}>{rule}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Section3;
