import React, { useEffect, useState } from "react";

export default function UserApplications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:3500/applyjob/user/${user._id}`)
      .then(res => res.json())
      .then(data => {
        // ✅ FRONTEND FILTER TOO (just in case)
        const myApps = data.filter(app => app.applicantId === user._id);
        setApplications(myApps);
      })
      .catch(err => {
        console.error("Failed to load applications:", err);
      });
  }, [user?._id]);

  return (
    <div>
      <h1>My Applied Jobs</h1>

      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        applications.map((app, index) => (
          <div key={index} className="applied-card">
            <h3>{app.jobTitle}</h3>
            <p><strong>Applied On:</strong> {app.appliedOn}</p>
          </div>
        ))
      )}
    </div>
  );
}
