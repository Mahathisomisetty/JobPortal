import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      {token ? (
        <>
          <img className="logo" src="/logo.png" alt="Logo" />

          <Link className="nav-item" to="/home">Home</Link>
          <Link className="nav-item" to="/profile">Profile</Link>
          <Link className="nav-item" to="/userApplications">Applied Jobs</Link>

          {role === "recruiter" && (
            <Link className="nav-item" to="/post-job">Post Job</Link>
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
