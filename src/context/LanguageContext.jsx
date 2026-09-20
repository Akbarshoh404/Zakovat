import React, { createContext, useState, useContext, useEffect } from "react";
import { dictionary } from "../translations/dictionary";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("uz");

  useEffect(() => {
    const saved = localStorage.getItem("zakovat-lang");
    if (saved && dictionary[saved]) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("zakovat-lang", newLang);
  };

  const t = (key) => {
    return dictionary[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
