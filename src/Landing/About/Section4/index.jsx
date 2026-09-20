import React from "react";
import styles from "./style.module.scss";
import useScrollReveal from "../../../hooks/useScrollReveal";
import logo1 from "../../shared/images/zakovat logo 1.png";
import logo2 from "../../shared/images/zakovat logo 2.png";
import logo3 from "../../shared/images/it-school logo.png";

const PARTNERS = [
  { src: logo3, alt: "IT School" },
  { src: logo1, alt: "Zakovat Logo 1" },
  { src: logo2, alt: "Zakovat Logo 2" },
];

const Section4 = () => {
  const [ref, vis] = useScrollReveal();
  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <p className={`${styles.label} ${vis ? styles.vis : ""}`}>Hamkorlar</p>
        <div className={styles.row}>
          {PARTNERS.map((p, i) => (
            <div key={p.alt} className={`${styles.logo} ${vis ? styles.logoVis : ""}`}
              style={{ transitionDelay: vis ? `${i * 80 + 120}ms` : "0ms" }}>
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
