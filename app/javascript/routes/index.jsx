import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "../components/Forum";
import Welcome from "../components/Welcome";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/forum" element={<Forum />} />
    </Routes>
  </Router>
);
