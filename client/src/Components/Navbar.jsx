import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
      <div className="nav-left">
        <span className="brand">AnyHire</span>
      </div>

      {token ? (
        <>
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/Jobs">Jobs</Link>
          <Link className="nav-item" to="/userApplications">Applied Jobs</Link>

          {/* ⭐ CLICKABLE DROPDOWN */}
          <div className="dropdown">
            <span
              className="nav-item dropdown-btn"
              onClick={() => setOpen(!open)}
            >
              Profile ▾
            </span>

            {open && (
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/profile" onClick={() => setOpen(false)}>
                  View Profile
                </Link>
                <span className="dropdown-item" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            )}
          </div>


          {role === "recruiter" && (
            <>
              <Link className="nav-item" to="/post-job">Post Job</Link>
              <Link className="nav-item" to="/application-overview">Applications Overview</Link>
            </>
          )}
        </>
      ) : (
        <>
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/aboutus">About Us</Link>
          <Link className="nav-item" to="/login">Login</Link>
          <Link className="nav-item" to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
