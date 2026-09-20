import React from "react";
import styles from "./style.module.scss";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

import img1 from "../../shared/images/img1.png";
import img2 from "../../shared/images/img2.png";
import img3 from "../../shared/images/img3.png";

const FOUNDERS = [
  { name: "Jasur Abdullayev", role: "Asoschisi", image: img1 },
  { name: "Feruza Mirzayeva", role: "Hammuassis", image: img2 },
  { name: "Otabek Sobirov", role: "Hammuassis", image: img3 },
  { name: "Sardor Karimov", role: "Tashkilotchi", image: img1 },
  { name: "Madina Aliyeva", role: "G'oya muallifi", image: img2 },
  { name: "Rustam Qodirov", role: "Bosh hakam", image: img3 },
  { name: "Zuhra Muminova", role: "Kordinator", image: img1 },
];

const Section6 = () => {
  const [ref, vis] = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.hd} ${vis ? styles.hdVis : ""}`}>
          <span className="label">{t("founders_label")}</span>
          <h2 className={styles.heading}>{t("founders_title")}</h2>
        </div>

        <div className={styles.grid}>
          {FOUNDERS.map((f, i) => (
            <div
              key={f.name}
              className={`${styles.card} ${vis ? styles.cardVis : ""}`}
              style={{ transitionDelay: vis ? `${(i % 3) * 100}ms` : "0ms" }}
            >
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  <img src={f.image} alt={f.name} />
                </div>
              </div>
              <h3 className={styles.name}>{f.name}</h3>
              <p className={styles.role}>{f.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section6;
