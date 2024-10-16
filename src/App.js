import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "./Landing/Home/index"
import LandingAbout from "./Landing/About";
import LandingParticipants from "./Landing/Participants";
import LandingTeams from "./Landing/Teams";
import LandingTurnirs from "./Landing/Turnirs";

import SignUp from "./Auth/SignUp/index";
import SignIn from "./Auth/SignIn/index"

import DashboardHome from "./Dashboard/Home"
import DashboardTeams from "./Dashboard/Teams"
import DashboardTurnirs from "./Dashboard/Turnirs"
import DashboardMyTeam from "./Dashboard/My Team";
import DashboardMyTurnir from "./Dashboard/My Turnirs";
import DashboardSettings from "./Dashboard/Settings";

function App() {
  return (
    <>
      <Routes>
        {/* Home */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LandingAbout />} />
        <Route path="/participants" element={<LandingParticipants />} />
        <Route path="/teams" element={<LandingTeams />} />
        <Route path="/turnirs" element={<LandingTurnirs />} />

        {/* Auth */}

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* DashBoard */}

        <Route path="/dashboard/:_id" element={<DashboardHome />} />
        <Route path="/dashboard/:_id/teams" element={<DashboardTeams />} />
        <Route path="/dashboard/:_id/turnirs" element={<DashboardTurnirs />} />
        <Route path="/dashboard/:_id/team" element={<DashboardMyTeam />} />
        <Route path="/dashboard/:_id/turnir" element={<DashboardMyTurnir />} />
        <Route path="/dashboard/:_id/settings" element={<DashboardSettings />} />
      </Routes>
    </>
  );
}

export default App;