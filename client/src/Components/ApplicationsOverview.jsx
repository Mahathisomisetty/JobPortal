import React from "react";
import { useGetRecruiterApplicationsQuery } from "../Features/apiSlice";
import "./ApplicationsOverview.css";
export default function ApplicationsOverview() {
  const user = JSON.parse(localStorage.getItem("user")); // Recruiter

  // ⭐ FIX: ALWAYS get correct recruiter ID (safe, reliable)
  const recruiterId =
    user?._id ||
    user?.id ||
    user?._doc?._id ||
    localStorage.getItem("userId");

  // console.log(" Recruiter ID Used:", recruiterId); 

  const { data: apps = [], isLoading, isError } =
    useGetRecruiterApplicationsQuery(recruiterId, {
      skip: !recruiterId,
      pollingInterval: 10000,//page refresh after every 10 seconds
    });

  if (isLoading) return <h2>Loading applications...</h2>;
  if (isError) return <h2>Failed to load applications</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Applications Overview</h1>

      {apps.length === 0 && <p>No applications found.</p>}

      {apps.map((app, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{app.jobTitle}</h3>

          <p>
            <strong>Applicant:</strong> {app.applicantName}
          </p>

          <p>
            <strong>Email:</strong> {app.applicantEmail}
          </p>
          {/* phonenumber */}
           <p>
            <strong>Phn no:</strong> {app.applicantPhone}
          </p>


          <p>
            <strong>Applied On:</strong>{" "}
            {new Date(app.appliedOn).toLocaleDateString()}
          </p>

          {/* ⭐ Resume Link */}
          <p>
            <strong>Resume:</strong>{" "}
            {app.resume ? (
              <a
                href={`http://localhost:3500${app.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                View Resume (PDF)
              </a>
            ) : (
              "Not uploaded"
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
