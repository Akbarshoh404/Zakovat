import React, { useState, useEffect } from "react";
import LandingNavbar from "../shared/Layouts/Navbar";
import LandingFooter from "../shared/Layouts/Footer";
import styles from "./style.module.scss";
import { toast } from "react-hot-toast";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  // Load teams
  useEffect(() => {
    if (isAuthenticated) {
      const saved = JSON.parse(localStorage.getItem("registeredTeams") || "[]");
      setTeams(saved);
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

  const handleDelete = (id) => {
    if (window.confirm("Bu jamoani o'chirishga ishonchingiz komilmi?")) {
      const updated = teams.filter(t => t.id !== id);
      setTeams(updated);
      localStorage.setItem("registeredTeams", JSON.stringify(updated));
      toast.success("Jamoa o'chirildi!");
    }
  };

  const saveEdit = () => {
    const updated = teams.map(t => t.id === editingTeam.id ? editingTeam : t);
    setTeams(updated);
    localStorage.setItem("registeredTeams", JSON.stringify(updated));
    setEditingTeam(null);
    toast.success("O'zgarishlar saqlandi!");
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
                            <button className={styles.editBtn} onClick={() => setEditingTeam({ ...team })}>O'zgartirish</button>
                            <button className={styles.deleteBtn} onClick={() => handleDelete(team.id)}>O'chirish</button>
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

        {/* Edit Modal */}
        {editingTeam && (
          <div className={styles.overlay} onClick={() => setEditingTeam(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h2>Jamoani tahrirlash</h2>
              
              <div className={styles.formGroup}>
                <label>Sinf</label>
                <input 
                  className={styles.input}
                  value={editingTeam.teamClass} 
                  onChange={(e) => setEditingTeam({...editingTeam, teamClass: e.target.value})} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Asosiy Ishtirokchilar</label>
                {editingTeam.mainMembers.map((m, i) => (
                  <input
                    key={`main-${i}`}
                    className={styles.input}
                    value={m}
                    onChange={(e) => {
                      const newMain = [...editingTeam.mainMembers];
                      newMain[i] = e.target.value;
                      setEditingTeam({...editingTeam, mainMembers: newMain});
                    }}
                  />
                ))}
              </div>

              <div className={styles.formGroup}>
                <label>Zaxira Ishtirokchilar</label>
                {editingTeam.extraMembers.map((m, i) => (
                  <input
                    key={`extra-${i}`}
                    className={styles.input}
                    value={m}
                    onChange={(e) => {
                      const newExtra = [...editingTeam.extraMembers];
                      newExtra[i] = e.target.value;
                      setEditingTeam({...editingTeam, extraMembers: newExtra});
                    }}
                  />
                ))}
              </div>

              <div className={styles.modalActions}>
                <button className={styles.cancelBtn} onClick={() => setEditingTeam(null)}>Bekor qilish</button>
                <button className={styles.saveBtn} onClick={saveEdit}>Saqlash</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
