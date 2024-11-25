
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Events from "./components/Events";
import Signup from "./components/Signup";
import Login from "./components/Login";

const HomePage = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Featured />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default HomePage;
