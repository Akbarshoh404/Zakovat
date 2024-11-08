import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

import DashboardNavbar from "../shared/layoutes/Navbar";
import NoTeam from "./noTeam";
import YesTeam from "./yesTeam";

const DashboardMyTeam = () => {
  const userId = localStorage.getItem("userID");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/teams");
        setData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findUserTeam = () => {
      const userTeam = data.find((team) =>
        team.participants.some((participant) => participant.id === userId)
      );

      if (userTeam) {
        setTeam(userTeam);
        localStorage.setItem("team", JSON.stringify(userTeam));
        localStorage.setItem("teamID", JSON.stringify(userTeam));
      }
    };

    if (!loading) {
      findUserTeam();
    }
  }, [data, loading, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <DashboardNavbar />
      <div className={styles.myTeam}>{team ? <YesTeam /> : <NoTeam />}</div>
    </>
  );
};

export default DashboardMyTeam;