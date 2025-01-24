import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "./Landing/Home/index";
import LandingAbout from "./Landing/About";
import LandingTeams from "./Landing/Teams";
import LandingTurnirs from "./Landing/Turnirs";

function App() {
  return (
    <>
      <Routes>
        {/* Home */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LandingAbout />} />
        <Route path="/teams" element={<LandingTeams />} />
        <Route path="/turnirs" element={<LandingTurnirs />} />
      </Routes>
    </>
  );
}

export default App;
