import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import logo from "../../images/zakovat logo 1.png";
import { useLanguage } from "../../../../context/LanguageContext";

const LandingFooter = () => {
  const { t } = useLanguage();
  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const NAV_LINKS = [
    { to: "/",        label: t("nav_home") },
    { to: "/about",   label: t("nav_about") },
    { to: "/teams",   label: t("nav_teams") },
    { to: "/turnirs", label: t("nav_turnirs") },
  ];

  const handleNav = () => window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={logo} alt="Zakovat" className={styles.logo} />
            <p className={styles.tagline}>{t("footer_tagline")}</p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={handleNav} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
            <p className={styles.socialLabel}>{t("footer_social")}</p>
            <div className={styles.socialLinks}>
              <button
                className={styles.socialBtn}
                onClick={() => open("https://www.instagram.com/zakovat_alxorazmiy/")}
              >
                Instagram
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
              <button
                className={styles.socialBtn}
                onClick={() => open("https://t.me/zakovat_alxorazmiy")}
              >
                Telegram
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
              <button
                className={styles.socialBtn}
                onClick={() => open("https://linkedin.com/in/akbarshoh-dev")}
              >
                LinkedIn
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2024 Zakovat. {t("footer_rights")}</p>
          <p className={styles.madeBy}>
            Made by <a href="https://akbarshoh-dev.uz/" target="_blank" rel="noopener noreferrer">Akbarshokh</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
