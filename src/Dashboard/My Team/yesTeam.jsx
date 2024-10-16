import React from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const YesTeam = ({ onExit }) => {
  const navigate = useNavigate();
  const team = JSON.parse(localStorage.getItem("team"));
  const userId = localStorage.getItem("userID"); // Get the user ID from localStorage

  const handleExit = async () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the group?"
    );
    if (confirmExit) {
      try {
        const updatedParticipants = team.participants.filter(
          (participant) => participant.id !== userId
        );

        await axios.patch(`http://localhost:8080/teams/${team._id}`, {
          participants: updatedParticipants, // Update with new participants array
        });

        localStorage.removeItem("team");
        onExit();
      } catch (error) {
        console.error("Error exiting the group:", error);
        alert("An error occurred while exiting the group. Please try again.");
        navigate(`/${userId}`);
      }
    }
  };

  return (
    <div className={styles.yesTeam}>
      <h2>Team Created!</h2>
      <p>Team Name: {team.name}</p>
      <p>Grade: {team.grade}</p>
      <p>Participants:</p>
      <ul>
        {team.participants.map((participant, index) => (
          <li key={index}>{participant.id}</li>
        ))}
      </ul>
      <button onClick={handleExit} className={styles.exitButton}>
        Exit Group
      </button>
    </div>
  );
};

export default YesTeam;
