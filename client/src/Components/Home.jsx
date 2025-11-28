import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Opportunities with AnyHire
          </h1>

          <p className="hero-subtitle">
            Connect with top companies, explore thousands of job listings, 
            and build your career with ease—all in one place.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="feature-box">

          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3 className="feature-title">Search Millions of Jobs</h3>
            <p className="feature-desc">
              Explore a wide range of opportunities across industries and locations, updated daily.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Easy Job Management</h3>
            <p className="feature-desc">
              Track applied jobs, saved posts, and updates effortlessly within your dashboard.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Build Top Careers</h3>
            <p className="feature-desc">
              Find roles that match your skills and experience, and grow your professional journey.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">👔</div>
            <h3 className="feature-title">Find Expert Candidates</h3>
            <p className="feature-desc">
              Recruiters can discover skilled professionals and hire the right talent with ease.
            </p>
          </div>

        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="categories">
        <h2 className="section-title">Popular Job Categories</h2>

        <div className="category-boxes">
          <div className="category-card">Software Developer</div>
          <div className="category-card">UI / UX Designer</div>
          <div className="category-card">Data Analyst</div>
          <div className="category-card">Backend Engineer</div>
          <div className="category-card">Frontend Developer</div>
          <div className="category-card">HR & Recruitment</div>
        </div>
      </section>
            {/* HOW IT WORKS SECTION */}
      <section className="how-section">
        <h2 className="how-title">How It Works</h2>

        <div className="how-box">

          {/* Step 1 */}
          <div className="how-card">
            <div className="how-icon">🔍</div>
            <h3 className="how-step">1. Search a job</h3>
            <p className="how-desc">
              Explore thousands of job listings across industries and locations.
            </p>
          </div>

          {/* Step 2 */}
          <div className="how-card">
            <div className="how-icon">📝</div>
            <h3 className="how-step">2. Apply for job</h3>
            <p className="how-desc">
              Submit your application easily using your AnyHire profile.
            </p>
          </div>

          {/* Step 3 */}
          <div className="how-card">
            <div className="how-icon">🎉</div>
            <h3 className="how-step">3. Get your job</h3>
            <p className="how-desc">
              Get hired by top companies and start your career journey.
            </p>
          </div>

        </div>
      </section>


    </div>
  );
}
