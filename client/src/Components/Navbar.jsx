import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      {token ? (
        <>
          <img className="logo" src="/logo.png" alt="Logo" />

          <Link className="nav-item" to="/home">Home</Link>
          <Link className="nav-item" to="/profile">Profile</Link>

          {/* ⭐ SHOW APPLIED JOBS FOR BOTH USER & RECRUITER */}
          <Link className="nav-item" to="/userApplications">
            Applied Jobs
          </Link>

          {/* ⭐ RECRUITER ONLY */} 
          {role === "recruiter" && (
            <>
              <Link className="nav-item" to="/post-job">Post Job</Link>
              <Link className="nav-item" to="/application-overview">
                Applications Overview
              </Link>
            </>
          )}

          <span className="nav-item logout-btn" onClick={handleLogout}>
            Logout
          </span>
        </>
      ) : (
        <>
          <Link className="nav-item" to="/login">Login</Link>
          <Link className="nav-item" to="/register">Register</Link>
          <Link className="nav-item" to="/aboutus">About Us</Link>
        </>
      )}
    </nav>
  );
}
