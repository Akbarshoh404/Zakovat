import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import { useLanguage } from "../../../../context/LanguageContext";
import logo from "../../images/zakovat logo 1.png";
import styles from "./style.module.scss";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { to: "/",        label: t("nav_home") },
    { to: "/about",   label: t("nav_about") },
    { to: "/teams",   label: t("nav_teams") },
    { to: "/turnirs", label: t("nav_turnirs") },
    { to: "/register", label: t("nav_register") || "Register" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link to="/" onClick={handleNav} className={styles.logoLink}>
            <img src={logo} alt="Zakovat" className={styles.logo} />
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={handleNav}
                  className={`${styles.link} ${isActive(to) ? styles.linkActive : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <div className={styles.langSwitcher}>
              <button className={`${styles.langBtn} ${lang === 'uz' ? styles.langActive : ''}`} onClick={() => changeLanguage('uz')}>UZ</button>
              <button className={`${styles.langBtn} ${lang === 'ru' ? styles.langActive : ''}`} onClick={() => changeLanguage('ru')}>RU</button>
              <button className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => changeLanguage('en')}>EN</button>
            </div>

            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`} aria-hidden={!menuOpen}>
        <ul className={styles.overlayLinks}>
          {NAV_LINKS.map(({ to, label }, i) => (
            <li key={to} style={{ transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms" }}>
              <Link
                to={to}
                onClick={handleNav}
                className={`${styles.overlayLink} ${isActive(to) ? styles.overlayLinkActive : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.overlayLangs} style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}>
          <button className={`${styles.langBtn} ${lang === 'uz' ? styles.langActive : ''}`} onClick={() => { changeLanguage('uz'); handleNav(); }}>UZ</button>
          <button className={`${styles.langBtn} ${lang === 'ru' ? styles.langActive : ''}`} onClick={() => { changeLanguage('ru'); handleNav(); }}>RU</button>
          <button className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => { changeLanguage('en'); handleNav(); }}>EN</button>
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
