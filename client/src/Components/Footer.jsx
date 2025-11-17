import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + Description */}
        <div className="footer-section">
          <h2 className="footer-logo">AnyHire</h2>
          <p className="footer-text">
            Your trusted platform to find your dream job and connect with top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="login">Login</a></li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-title">Job Categories</h3>
          <ul className="footer-list">
            <li><a href="#">Software</a></li>
            <li><a href="#">Marketing</a></li>
            <li><a href="#">HR & Admin</a></li>
            <li><a href="#">Finance</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-list">
            <li>Email: support@jobfinder.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Hyderabad, India</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © 2025 | AnyHire. All Rights Reserved.
      </div>
    </footer>
  );
}
