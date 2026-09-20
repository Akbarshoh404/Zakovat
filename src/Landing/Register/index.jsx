import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../../config/supabaseClient";

const LandingRegister = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxSkydedbmPWLqW5zZwJtytIEJRYKVC-BSja5u0JqxRi78u1qgO2IB_xS0dwdFm0j9J4g/exec";

  const handleSubmit = async (e) => {
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

    setIsSubmitting(true);
    const loadingToast = toast.loading("Saqlanmoqda...");

    const newTeam = {
      id: Date.now().toString(),
      teamClass: formData.teamClass,
      mainMembers: formData.mainMembers.filter(m => m.trim() !== ""),
      extraMembers: formData.extraMembers.filter(m => m.trim() !== "")
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([
          { 
            id: newTeam.id,
            team_class: newTeam.teamClass,
            main_members: newTeam.mainMembers,
            extra_members: newTeam.extraMembers,
            registration_date: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      toast.success("Jamoa muvaffaqiyatli ro'yxatdan o'tdi!", { id: loadingToast });
      navigate("/teams");
    } catch (error) {
      console.error(error);
      toast.error(`Xatolik: ${error.message || "Tarmoq xatosi"}`, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.selectWrap}`)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  <div 
                    className={`${styles.customSelect} ${dropdownOpen ? styles.selectOpen : ''}`} 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className={formData.teamClass ? styles.selectValued : styles.selectPlaceholder}>
                      {formData.teamClass ? `${formData.teamClass} sinf` : "-- Masalan: 11-03 sinf --"}
                    </span>
                    <svg className={styles.selectIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  
                  {dropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {classes.map(c => (
                        <div 
                          key={c} 
                          className={`${styles.dropdownItem} ${formData.teamClass === c ? styles.dropdownItemSelected : ''}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData({ ...formData, teamClass: c });
                            setDropdownOpen(false);
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData({ ...formData, teamClass: c });
                            setDropdownOpen(false);
                          }}
                        >
                          {c} sinf
                        </div>
                      ))}
                    </div>
                  )}
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
                        placeholder={i === 0 ? "Masalan: Ismatov Akbarshoh" : i === 1 ? "Masalan: Komilov Anasxon" : "Ism va familiya"}
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

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                <span>{isSubmitting ? "Saqlanmoqda..." : "Jamoani Saqlash"}</span>
                {!isSubmitting && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                )}
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
