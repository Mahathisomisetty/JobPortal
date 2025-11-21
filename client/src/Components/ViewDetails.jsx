import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery } from "../Features/apiSlice";
import "./ViewDetails.css";

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  const user = JSON.parse(localStorage.getItem("user"));

  // APPLY NOW FUNCTION  
const handleApply = async () => {
//   console.log("USER IN FRONTEND:", user);

  if (!user) {
    alert("Please login to apply for a job.");
    return navigate("/login");
  }

  try {
    const res = await fetch("http://localhost:3500/applyjob/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: job._id,
        jobTitle: job.title,
        applicantName: user.username,   // ✅ FIXED
        applicantEmail: "N/A"           // or add email field later
      }),
    });

    const data = await res.json();
    alert(data.msg);
  } catch (error) {
    console.log(error);
    alert("Something went wrong while applying.");
  }
};

  if (isLoading) return <h2>Loading job details...</h2>;
  if (isError) return <h2>Unable to load job details...</h2>;
  if (!job) return <h2>No job found</h2>;

  return (
    <div className="details-container">

      {/* Close Button */}
      <button className="close-btn" onClick={() => navigate(-1)}>
        ❌
      </button>

      <h1>{job.title}</h1>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary || "Not mentioned"}</p>

      <h3>Description</h3>
      <p>{job.description}</p>

      {/* Apply Button */}
      <button className="apply-btn" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
}
