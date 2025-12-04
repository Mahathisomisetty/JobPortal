import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery, useGetUserByIdQuery } from "../Features/apiSlice";
import "./ViewDetails.css";

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ⭐ Fetch user details for resume check
  const { data: userData } = useGetUserByIdQuery(userId, { skip: !userId });

  if (isLoading) return <h2>Loading job details...</h2>;
  if (isError) return <h2>Error fetching job details.</h2>;
  if (!job) return <h2>No job found</h2>;

  const handleApply = async () => {
    if (!token) {
      alert("Please login first");
      return navigate("/login");
    }

    // ⭐ FIXED: Correct resume check
    if (!userData?.profile?.resume) {
      alert("Please upload your resume or complete your profile before applying.");
      return navigate("/edit-profile");
    }

    const res = await fetch(
      "https://jobportal-backend-1z62.onrender.com/applyjob/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: job._id,
        }),
      }
    );

    const data = await res.json();

    if (data.msg === "Applied Successfully!") {
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
