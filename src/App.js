import { Routes, Route } from "react-router-dom";

import Home from "./Landing/Home/index";
import LandingAbout from "./Landing/About";
import LandingTeams from "./Landing/Teams";
import LandingTurnirs from "./Landing/Turnirs";
import TurnirParams from "./Landing/Turnirs/useParams";
import LandingRegister from "./Landing/Register";
import AdminPanel from "./Landing/Admin";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LandingAbout />} />
        <Route path="/teams" element={<LandingTeams />} />
        <Route path="/turnirs" element={<LandingTurnirs />} />
        <Route path="/turnirs/:id" element={<TurnirParams />} />
        <Route path="/register" element={<LandingRegister />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
