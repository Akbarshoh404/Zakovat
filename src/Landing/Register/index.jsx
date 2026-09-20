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
          <div className={styles.headerInner}>
            <h1 className={styles.heading}>Jamoani ro'yxatdan o'tkazish</h1>
            <p className={styles.subtitle}>O'z sinfingizni tanlang va ishtirokchilarni kiriting</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Sinfni tanlang</label>
                <select 
                  className={styles.select}
                  value={formData.teamClass}
                  onChange={(e) => setFormData({ ...formData, teamClass: e.target.value })}
                >
                  <option value="">-- Sinf --</option>
                  {classes.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={styles.membersSection}>
                <h3 className={styles.sectionTitle}>Asosiy ishtirokchilar (5 ta)</h3>
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
                  </div>
                ))}
              </div>

              <div className={styles.membersSection}>
                <h3 className={styles.sectionTitle}>Zaxira ishtirokchilari (2 ta)</h3>
                {formData.extraMembers.map((name, i) => (
                  <div key={`extra-${i}`} className={styles.inputWrap}>
                    <span className={`${styles.numberBadge} ${styles.extraBadge}`}>{i + 1}</span>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Ism va familiya (Ixtiyoriy)"
                      value={name}
                      onChange={(e) => handleExtraMemberChange(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className={styles.submitBtn}>
                Ro'yxatdan o'tish
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
