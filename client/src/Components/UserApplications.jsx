import React from "react";
import { useGetUserApplicationsQuery } from "../Features/apiSlice";

export default function UserApplications() {
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log("🔥 LOGGED IN USER:", user);

  const userId = user?.id || user?._id;

  // console.log("🔥 FINAL USER ID:", userId);

  const { data: apps = [], refetch } =
    useGetUserApplicationsQuery(userId, {
      skip: !userId,
      refetchOnMountOrArgChange: true,  //  auto-refresh on load
    });

  //  Auto-refresh when "applicationsUpdated" event is triggered
  React.useEffect(() => {
    const handler = () => refetch();
    window.addEventListener("applicationsUpdated", handler);
    return () => window.removeEventListener("applicationsUpdated", handler);
  }, [refetch]);

  return (
    <div>
      <h1>My Applications</h1>

      {apps.length === 0 && <p>No applications found.</p>}

      {apps.map((app, idx) => (
        <div key={idx} className="card">
          <h3>{app.jobId?.title}</h3>
          <p>{app.jobId?.company}</p>
          <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
