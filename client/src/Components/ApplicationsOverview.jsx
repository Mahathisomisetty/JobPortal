import React, { useEffect, useState } from "react";

export default function ApplicationsOverview() {
  const user = JSON.parse(localStorage.getItem("user")); // recruiter
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3500/applyjob/recruiter/${user._id}`)
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  return (
    <div>
      <h1>Applications Overview</h1>

      {apps.map((app, idx) => (
        <div key={idx}>
          <h3>{app.jobTitle}</h3>
          <p>Applicant: {app.applicantName}</p>
          <p>Email: {app.applicantEmail}</p>
          <p>Applied On: {app.appliedOn}</p>
        </div>
      ))}
    </div>
  );
}
