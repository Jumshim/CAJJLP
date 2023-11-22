import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "../components/Forum";
import Welcome from "../components/Welcome";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Settings from "../components/Settings/Settings";
import Profile from "../components/Settings/Profile";
import Battle from "../components/Battle";

/** Routes of our website. When adding a new route, please append here. */
export default function RouteIndex() {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
