import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Featured from "./Featured";
import Events from "./Events";
import Signup from "./Signup";
import Login from "./Login";

const HomePage = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Featured />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default HomePage;
