import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "./Landing/Home/index"

import SignUp from "./Auth/Sign Up/index";
import SignIn from "./Auth/Sign In/index"

function App() {
  return (
    <>
      <Routes>
        {/* Home */}

        <Route path="/" element={<Home />} />

        {/* Auth */}

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </>
  );
}

export default App;