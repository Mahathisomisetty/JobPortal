import React, { useEffect, useState } from "react";

export default function UserApplications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3500/applyjob/user/${user._id}`)
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  return (
    <div>
      <h1>My Applications</h1>

      {apps.map((app, idx) => (
        <div key={idx}>
          <h3>{app.jobTitle}</h3>
          <p>{app.appliedOn}</p>
        </div>
      ))}
    </div>
  );
}
