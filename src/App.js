import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "./Landing/Home/index"

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

        {/* Auth */}

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* DashBoard */}

        <Route path="/:_id" element={<DashboardHome/>}/>
        <Route path="/dashboard/teams/" element={<DashboardTeams/>}/>
        <Route path="/dashboard/turnirs/" element={<DashboardTurnirs/>}/>
        <Route path="/:_id/team" element={<DashboardMyTeam/>}/>
        <Route path="/:_id/turnir" element={<DashboardMyTurnir/>}/>
        <Route path="/:_id/settings" element={<DashboardSettings/>}/>
      </Routes>
    </>
  );
}

export default App;