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

  // ⭐ ADDED: refetch for auto-refresh
  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // ⭐ ADDED: auto-refresh when page opens
  React.useEffect(() => {
    if (userId) refetch();
  }, [userId, refetch]);

  if (isLoading) return <h2>Loading user...</h2>;
  if (error || !user) return <h2>Unable to load user</h2>;

  return (
    <div className="profile-container shadow-lg p-4">
      <div className="profile-info">

        <p className="profile-item profile-name">
          <i className="bi bi-person-fill icon"></i>&nbsp;
          <strong>{user.fullname}</strong>
        </p>

        <p className="profile-item profile-heading">
          <i className="bi bi-briefcase-fill icon"></i>&nbsp;
          {user.profile.headline}
        </p>

        <p className="profile-item">
          <strong>Summary:</strong>&nbsp; {user.profile.Summary || "N/A"}
        </p>

        <p className="profile-item">
          <i className="bi bi-envelope-fill icon"></i>&nbsp;
          {user.email}
        </p>

        <p className="profile-item">
          <i className="bi bi-telephone-fill icon"></i>&nbsp;
          {user.phonenumber}
        </p>

        {user.profile.skills?.length > 0 && (
          <p className="profile-item">
            <i className="bi bi-lightning-fill icon"></i>&nbsp;
            <strong>Skills:</strong>&nbsp; {user.profile.skills.join(", ")}
          </p>
        )}
        {/* Resume file  */}
<p className="profile-item">
  <i className="bi bi-file-earmark-pdf-fill icon"></i>&nbsp;

  {user.profile.resume ? (
    <a
      href={`http://localhost:3500${user.profile.resume}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#0d6efd", textDecoration: "underline" }}
    >
      View Resume (PDF)
    </a>
  ) : (
    "No resume uploaded"
  )}
</p>


      </div>

      <button
        className="btn btn-primary mb-3 mt-3"
        onClick={() => navigate("/edit-profile")}
      >
        <i className="bi bi-pencil-square"></i> Edit Profile
      </button>
    </div>
  );
}
