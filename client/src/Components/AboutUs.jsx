import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <p className="about-text">
        Welcome to <strong>AnyHire</strong> — your trusted platform for finding the right
        job and connecting with top employers. We are committed to bridging the
        gap between talented job seekers and companies looking for skilled professionals.
      </p>

      <h2 className="section-title">Our Mission</h2>
      <p className="about-text">
        Our mission is to make the job search process simpler, faster, and more
        transparent. Whether you’re a fresher searching for your first
        opportunity or an experienced professional looking to grow your career,
        AnyHire brings thousands of verified jobs right to your fingertips.
      </p>

      <h2 className="section-title">What We Offer</h2>
      <ul className="about-list">
        <li>✔ Access to verified job listings across multiple industries</li>
        <li>✔ Easy job search with filters like location, skills, and experience</li>
        <li>✔ Profile creation to help employers discover you easily</li>
        <li>✔ Job application tracking & instant updates</li>
        <li>✔ Employer dashboard for posting and managing job applications</li>
      </ul>

      <h2 className="section-title">Why Choose Us?</h2>
      <p className="about-text">
        We focus on providing a smooth experience with real-time listings,
        personalized recommendations, and secure user data handling.
        Our goal is to help you take the next step in your career with confidence.
      </p>

      <p className="about-foot">
        🌟 Thank you for choosing <strong>AnyHire</strong>.  
        Your dream job is just a click away.
      </p>
    </div>
  );
}

export default AboutUs;
