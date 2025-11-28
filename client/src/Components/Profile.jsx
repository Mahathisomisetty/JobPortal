import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../Features/apiSlice";
import "./Profile.css";
import React from "react";

export default function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    navigate("/login");
    return null;
  }

  const { data: user, isLoading, error, refetch } =
    useGetUserByIdQuery(userId, { skip: !userId });

  React.useEffect(() => {
    if (userId) refetch();
  }, [userId]);

  if (isLoading) return <h2>Loading...</h2>;
  if (error || !user) return <h2>Error loading profile</h2>;

  const profileImage =
    user.profile.profileImage
      ? `http://localhost:3500${user.profile.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="profile-wrapper">

      {/* LEFT SIDE CARD */}
      <div className="left-card">
        <img src={profileImage} className="left-img" alt="Profile" />

        <h2 className="left-name">{user.fullname}</h2>
        <p className="left-role">{user.profile.headline}</p>

        <p className="left-summary">{user.profile.Summary || "No summary provided."}</p>

        {/* SKILLS */}
        <div className="left-section">
          <h3 className="left-title">Skills</h3>
          <div className="skills-box">
            {user.profile.skills?.map((skill, index) => (
              <span className="skill-tag" key={index}>{skill}</span>
            ))}
          </div>
        </div>

        <button
          className="edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="right-card">

        {/* BASIC INFO */}
        <div className="info-card">
          <h3 className="section-heading">Basic Information</h3>

          <div className="info-grid">
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phonenumber}</div>
            <div><strong>Location:</strong> {user.profile.location || "N/A"}</div>
            <div><strong>Experience:</strong> {user.profile.experience || "N/A"}</div>
          </div>

          <div className="resume-row">
            {user.profile.resume ? (
              <a
                href={`http://localhost:3500${user.profile.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-btn"
              >
                View Resume
              </a>
            ) : (
              "No resume uploaded"
            )}
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="info-card">
          <h3 className="section-heading">Experience</h3>
          <p>No experience added.</p>
        </div>

        {/* EDUCATION SECTION */}
        <div className="info-card">
          <h3 className="section-heading">Education</h3>
          <p>No education added.</p>
        </div>

        {/* CERTIFICATIONS SECTION */}
        <div className="info-card">
          <h3 className="section-heading">Certifications</h3>
          <p>No certifications added.</p>
        </div>

      </div>

    </div>
  );
}
