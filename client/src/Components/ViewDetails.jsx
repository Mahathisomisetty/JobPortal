import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery } from "../Features/apiSlice";

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 Prevent crash when job is undefined
  if (isLoading) return <h2>Loading job details...</h2>;
  if (isError) return <h2>Something went wrong while fetching job details.</h2>;
  if (!job) return <h2>No job found</h2>;

  const handleApply = async () => {
    if (!user) return navigate("/login");

    const res = await fetch("http://localhost:3500/applyjob/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: job._id,
        jobTitle: job.title,
        applicantName: user.username,
        applicantEmail: user.email || "N/A",
        applicantId: user._id
      })
    });

    alert("Application Submitted");
  };

  return (
    <div className="details-container">
      <h1>{job.title}</h1>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary || "Not mentioned"}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <button onClick={handleApply} className="apply-btn">
        Apply Now
      </button>
    </div>
  );
}
