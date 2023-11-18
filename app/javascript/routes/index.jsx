import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "../components/Forum";
import Welcome from "../components/Welcome";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default (
  <div className="h-screen">
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </div>
);
