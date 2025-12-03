import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../Features/apiSlice";
import "./profile.css";
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

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://jobportal-backend-1z62.onrender.com/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Your account has been permanently deleted.");

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");

        navigate("/register");
      } else {
        alert("Failed to delete account. Try again later.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

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
            {user.profile.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill}</span>
              ))
            ) : (
              <p>No skills added.</p>
            )}
          </div>
        </div>

        <button
          className="edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>

        <button
          className="delete-account-btn"
          onClick={handleDeleteAccount}
        >
          Delete Account
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
                href={`https://jobportal-backend-1z62.onrender.com${user.profile.resume}`}
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


        {/* EDUCATION SECTION */}
        <div className="info-card">
          <h3 className="section-heading">Education</h3>
          <p>{user.profile.education || "No education added."}</p>
        </div>

        {/* CERTIFICATIONS SECTION */}
        <div className="info-card">
          <h3 className="section-heading">Certifications</h3>
          {user.profile.certifications?.length > 0 ? (
            user.profile.certifications.map((c, i) => (
              <p key={i}>• {c}</p>
            ))
          ) : (
            <p>No certifications added.</p>
          )}
        </div>

      </div>

    </div>
  );
}
