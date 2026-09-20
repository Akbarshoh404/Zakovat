import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { toast } from "react-hot-toast";
import { supabase } from "../../config/supabaseClient";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [teams, setTeams] = useState([]);

  // Load teams
  useEffect(() => {
    if (isAuthenticated) {
      const fetchTeams = async () => {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('registration_date', { ascending: false });
        
        if (error) {
          console.error(error);
          toast.error("Ma'lumotlarni yuklashda xatolik!");
        } else {
          // Format for UI
          const formatted = data.map(t => ({
            id: t.id,
            teamClass: t.team_class,
            mainMembers: t.main_members || [],
            extraMembers: t.extra_members || [],
            registrationDate: t.registration_date
          }));
          setTeams(formatted);
        }
      };
      fetchTeams();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "123") {
      setIsAuthenticated(true);
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
    } else {
      toast.error("Parol noto'g'ri!");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingNavbar />
        <div className={styles.page}>
          <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleLogin}>
              <h2>Admin Panel</h2>
              <p>Tizimga kirish uchun parolni kiriting</p>
              <input
                type="password"
                className={styles.input}
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit" className={styles.btn}>Kirish</button>
            </form>
          </div>
        </div>
        <LandingFooter />
      </>
    );
  }

  return (
    <>
      <LandingNavbar />
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <h1 className={styles.heading}>Admin Panel</h1>
            <p className={styles.subtitle}>Barcha ro'yxatdan o'tgan jamoalarni boshqarish</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.container}>
            
            {teams.length === 0 ? (
              <div className={styles.empty}>Hech qanday jamoa ro'yxatdan o'tmagan.</div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sinf</th>
                      <th>Asosiy Ishtirokchilar</th>
                      <th>Zaxira</th>
                      <th>Ro'yxatdan o'tgan vaqt</th>
                      <th>Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map(team => (
                      <tr key={team.id}>
                        <td className={styles.classCell}>{team.teamClass}</td>
                        <td>
                          <ul className={styles.memberList}>
                            {team.mainMembers.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        </td>
                        <td>
                          <ul className={styles.memberList}>
                            {team.extraMembers.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        </td>
                        <td className={styles.dateCell}>
                          {new Date(team.registrationDate).toLocaleString()}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <span style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Tahrirlash uchun<br/>Google Sheets'ga kiring</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
