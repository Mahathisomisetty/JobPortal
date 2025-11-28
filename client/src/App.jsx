import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Jobs from "./Components/Jobs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import UserApplications from "./Components/UserApplications";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import EditProfile from "./Components/EditProfile";
import PostJob from "./Components/PostJob";   // ⭐ ADD THIS
import ApplicationsOverview from "./Components/ApplicationsOverview";
import ViewDetails from "./Components/ViewDetails";
import Home from "./Components/Home";
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
         <Route path="/" element={<Home />} />
         <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        {/* PROTECTED ROUTES */}
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userApplications" element={<UserApplications />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/job/:id" element={<ViewDetails />} />
        {/* ⭐ RECRUITER ONLY PAGE */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/application-overview" element={<ApplicationsOverview/>}/>
      </Routes>

      <Footer />
    </>
  );
}
