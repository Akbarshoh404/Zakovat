import React from "react";
import styles from "./style.module.scss";
import useScrollReveal from "../../../hooks/useScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";

import img1 from "../../shared/images/img1.png";
import img2 from "../../shared/images/img2.png";
import img3 from "../../shared/images/img3.png";

const MEMBERS = [
  { name: "Sardor Toshmatov",  role: "Tashkilotchi", image: img1 },
  { name: "Malika Yusupova",   role: "Redaktor", image: img2 },
  { name: "Bobur Nazarov",     role: "Texnik rahbar", image: img3 },
  { name: "Dilnoza Karimova",  role: "Moderator", image: img1 },
  { name: "Ulugbek Ergashev",  role: "Tahlilchi", image: img2 },
  { name: "Nodira Hamidova",   role: "Dasturchi", image: img3 },
  { name: "Jasur Rashidov",    role: "Kontent yaratuvchi", image: img1 },
  { name: "Zulfiya Tursunova", role: "SMM mutaxassis", image: img2 },
];

const Section5 = () => {
  const [ref, vis] = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.hd} ${vis ? styles.hdVis : ""}`}>
          <span className="label">{t("members_label")}</span>
          <h2 className={styles.heading}>{t("members_title")}</h2>
        </div>

        <ul className={styles.grid}>
          {MEMBERS.map((m, i) => (
            <li
              key={i}
              className={`${styles.item} ${vis ? styles.itemVis : ""}`}
              style={{ transitionDelay: vis ? `${i * 50}ms` : "0ms" }}
            >
              <div className={styles.avatar}>
                <img src={m.image} alt={m.name} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{m.name}</span>
                <span className={styles.role}>{m.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section5;
