import React from "react";
import { useGetUserApplicationsQuery } from "../Features/apiSlice";

export default function UserApplications() {
  const userId = localStorage.getItem("userId");

  const {
    data: apps = [],
    isLoading,
    isError,
    refetch
  } = useGetUserApplicationsQuery(userId, { skip: !userId });

  if (isLoading) return <h2>Loading applications...</h2>;
  if (isError) return <h2>Error loading applications</h2>;

  // ⭐ Withdraw Function
  async function handleWithdraw(appId) {
    const res = await fetch(`http://localhost:3500/applyjob/withdraw/${appId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    alert(data.msg);

    // ⭐ Refresh UI
    refetch();
  }

  return (
    <div>
      <h1>My Applications</h1>

      {apps.length === 0 && <p>No applications found.</p>}

      {apps.map((app, idx) => (
        <div key={idx} className="card">
          <h3>{app.jobId?.title}</h3>
          <p>{app.jobId?.company}</p>
          <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>

          {/* ⭐ Withdraw Button */}
          <button
            onClick={() => handleWithdraw(app._id)}
            className="withdraw-btn"
            style={{ marginTop: "10px", background: "red", color: "white", padding: "8px", borderRadius: "5px" }}
          >
            Withdraw Application
          </button>
        </div>
      ))}
    </div>
  );
}
