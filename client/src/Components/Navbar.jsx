import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <nav className="navbar" >
      {token ? (
        <>
          <img className="logo" src="/logo.png" alt="Logo" />
          <Link className="nav-item" to="/home">Home</Link>
          <Link className="nav-item" to="/profile">Profile</Link>
          <Link className="nav-item" to="/userApplications">Applied jobs</Link>
          <span className="nav-item logout-btn" onClick={handleLogout}>
            Logout
          </span>
        </>
      ) : (
        <>
          <Link className="nav-item" to="/login">Login</Link>
          <Link className="nav-item" to="/register">Register</Link>
          <Link className="nav-item" to="/aboutus">AboutUs</Link>
        </>
      )}
    </nav>
  );
}
