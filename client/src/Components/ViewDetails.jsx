import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery } from "../Features/apiSlice";
import "./ViewDetails.css"
export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (isLoading) return <h2>Loading job details...</h2>;
  if (isError) return <h2>Error fetching job details.</h2>;
  if (!job) return <h2>No job found</h2>;

  const handleApply = async () => {
    if (!user || !token) {
      alert("Please login first");
      return navigate("/login");
    }

    const res = await fetch("http://localhost:3500/applyjob/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobId: job._id,
      }),
    });

    const data = await res.json();

    if (data.msg === "Applied Successfully!") {
      // ⭐ TRIGGER auto refresh in UserApplications.jsx
      window.dispatchEvent(new Event("applicationsUpdated"));

      alert("You applied successfully!");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="details-container">
      <h1>{job.title}</h1>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <button onClick={handleApply} className="vapply-btn">
        Apply Now
      </button>
    </div>
  );
}
