import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";

const NoTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [grade, setGrade] = useState("");
  const [participants, setParticipants] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8080/teams/", {
        name: teamName,
        grade: parseInt(grade),
        participants: participants.split(",").map((id) => ({ id: id.trim() })), // Map participants to the correct format
      });

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === 204
      ) {
        setSuccess("Team created successfully!");
        setTeamName("");
        setGrade("");
        setParticipants("");
      } else {
        setError("Failed to create team. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.noTeam}>
      <p className={styles.noTeamTitle}>
        You don't have your team. Create Your Team
      </p>

      <form onSubmit={handleCreateTeam} className={styles.teamForm}>
        <div className={styles.formGroup}>
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            placeholder="Enter your team name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="grade">Team Grade</label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            placeholder="Enter the team grade"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="participants">
            Participants' IDs (comma-separated)
          </label>
          <input
            type="text"
            id="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
            placeholder="Enter participant IDs"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit" className={styles.createButton}>
            Create Team
          </button>
        )}

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

export default NoTeam;