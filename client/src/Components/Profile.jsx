import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../Features/apiSlice";
import "./profile.css";

export default function Profile() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

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

        {user.profile.location && (
          <p className="profile-item">
            <i className="bi bi-geo-alt-fill icon"></i>&nbsp;
            {user.profile.location}
          </p>
        )}

        {user.profile.experience >= 0 && (
          <p className="profile-item">
            <i className="bi bi-clock-history icon"></i>&nbsp;
            Experience: {user.profile.experience} years
          </p>
        )}

        {user.profile.skills?.length > 0 && (
          <p className="profile-item">
            <i className="bi bi-lightning-fill icon"></i>&nbsp;
            <strong>Skills:</strong>&nbsp; {user.profile.skills.join(", ")}
          </p>
        )}

        {user.profile.education?.length > 0 && (
          <p className="profile-item">
            <i className="bi bi-mortarboard-fill icon"></i>&nbsp;
            <strong>Education:</strong>&nbsp; {user.profile.education.join(", ")}
          </p>
        )}

        {user.profile.resume && (
          <p className="profile-item">
            <i className="bi bi-file-earmark-arrow-down-fill icon"></i>&nbsp;
            <a href={user.profile.resume} target="_blank" className="resume-link">
              Download Resume
            </a>
          </p>
        )}

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
