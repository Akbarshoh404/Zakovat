import React, { useState } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LandingRegister = () => {
  const navigate = useNavigate();
  
  // Generate classes from 5 to 11, each with 01 to 06
  const classes = [];
  for (let grade = 5; grade <= 11; grade++) {
    for (let section = 1; section <= 6; section++) {
      classes.push(`${grade}-0${section}`);
    }
  }

  const [formData, setFormData] = useState({
    teamClass: "",
    mainMembers: ["", "", "", "", ""],
    extraMembers: ["", ""]
  });

  const handleMainMemberChange = (index, value) => {
    const updated = [...formData.mainMembers];
    updated[index] = value;
    setFormData({ ...formData, mainMembers: updated });
  };

  const handleExtraMemberChange = (index, value) => {
    const updated = [...formData.extraMembers];
    updated[index] = value;
    setFormData({ ...formData, extraMembers: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.teamClass) {
      toast.error("Iltimos, sinfni tanlang!");
      return;
    }
    
    // Check if main members are filled
    const isMainFilled = formData.mainMembers.every(name => name.trim() !== "");
    if (!isMainFilled) {
      toast.error("Asosiy 5 ta ishtirokchini kiriting!");
      return;
    }

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("registeredTeams") || "[]");
    
    // Check if class already registered
    if (saved.some(t => t.teamClass === formData.teamClass)) {
      toast.error("Bu sinf ro'yxatdan o'tgan!");
      return;
    }

    const newTeam = {
      id: Date.now(),
      teamClass: formData.teamClass,
      mainMembers: formData.mainMembers,
      extraMembers: formData.extraMembers,
      registrationDate: new Date().toISOString()
    };
    
    saved.push(newTeam);
    localStorage.setItem("registeredTeams", JSON.stringify(saved));
    
    toast.success("Jamoa muvaffaqiyatli ro'yxatdan o'tdi!");
    navigate("/teams");
  };

  return (
    <>
      <LandingNavbar />
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.bgGlow}></div>
          <div className={styles.headerInner}>
            <div className={styles.stylishBadge}>
              <span className={styles.dot}></span>
              Yangi Mavsum
            </div>
            <h1 className={styles.heading}>Jamoani ro'yxatdan o'tkazish</h1>
            <p className={styles.subtitle}>O'z sinfingizni tanlang va intellektual janglarga qo'shiling</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h2>Ro'yxatdan O'tish Formasi</h2>
                <p>Barcha maydonlarni to'ldiring</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Sinfni tanlang</label>
                <div className={styles.selectWrap}>
                  <select 
                    className={styles.select}
                    value={formData.teamClass}
                    onChange={(e) => setFormData({ ...formData, teamClass: e.target.value })}
                  >
                    <option value="">-- Sinfni tanlang --</option>
                    {classes.map(c => (
                      <option key={c} value={c}>{c} sinf</option>
                    ))}
                  </select>
                  <svg className={styles.selectIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div className={styles.membersSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Asosiy ishtirokchilar</h3>
                  <span className={styles.sectionBadge}>5 ta</span>
                </div>
                <div className={styles.inputsGrid}>
                  {formData.mainMembers.map((name, i) => (
                    <div key={`main-${i}`} className={styles.inputWrap}>
                      <span className={styles.numberBadge}>{i + 1}</span>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Ism va familiya"
                        value={name}
                        onChange={(e) => handleMainMemberChange(i, e.target.value)}
                        required
                      />
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.membersSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Zaxira ishtirokchilari</h3>
                  <span className={`${styles.sectionBadge} ${styles.extraBadgeText}`}>Ixtiyoriy</span>
                </div>
                <div className={styles.inputsGrid}>
                  {formData.extraMembers.map((name, i) => (
                    <div key={`extra-${i}`} className={styles.inputWrap}>
                      <span className={`${styles.numberBadge} ${styles.extraBadge}`}>{i + 1}</span>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Ism va familiya"
                        value={name}
                        onChange={(e) => handleExtraMemberChange(i, e.target.value)}
                      />
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Jamoani Saqlash</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingRegister;
