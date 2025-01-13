import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { useParams, useNavigate } from "react-router-dom";

const NoTeam = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");
  const [grade, setGrade] = useState("");
  const [participants, setParticipants] = useState(Array(6).fill("")); // Array for 6 participants
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleParticipantChange = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value.trim();
    setParticipants(updatedParticipants);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const participantsData = participants.map((id) => ({ id })); // Create the correct structure for participants

    // Log the data to check its structure
    console.log("Sending Data:", {
      name: teamName,
      grade: parseInt(grade),
      participants: participantsData,
    });

    try {
      const teamResponse = await axios.post("http://localhost:8080/teams/", {
        name: teamName,
        grade: parseInt(grade),
        participants: participantsData,
      });

      if (teamResponse.status >= 200 && teamResponse.status <= 204) {
        const team = {
          teamName,
          grade: parseInt(grade),
          participants,
        };

        localStorage.setItem("team", JSON.stringify(team)); // Stringify the team object for local storage
        setSuccess("Team created successfully!");
        setTeamName("");
        setGrade("");
        setParticipants(Array(6).fill("")); // Reset participants to empty strings
        navigate(`/dashboard/${userId}`);
      } else {
        setError("Failed to create team. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
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

        {[...Array(6)].map((_, index) => (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={`participant${index + 1}`}>{`${
              index + 1
            }ST Participant's ID`}</label>
            <input
              type="text"
              id={`participant${index + 1}`}
              value={participants[index]}
              onChange={(e) => handleParticipantChange(index, e.target.value)}
              required
              placeholder={`Enter participant ${index + 1} ID`}
            />
          </div>
        ))}

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
