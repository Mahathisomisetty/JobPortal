import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import UserApplications from "./Components/UserApplications";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import EditProfile from "./Components/EditProfile";
import PostJob from "./Components/PostJob";   // ⭐ ADD THIS

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* PROTECTED ROUTES */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userApplications" element={<UserApplications />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* ⭐ RECRUITER ONLY PAGE */}
        <Route path="/post-job" element={<PostJob />} />

      </Routes>

      <Footer />
    </>
  );
}
