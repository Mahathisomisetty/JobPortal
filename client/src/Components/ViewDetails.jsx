import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery } from "../Features/apiSlice";
import "./ViewDetails.css"
export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  if (isLoading) return <h2>Loading job details...</h2>;
  if (isError) return <h2>Unable to load job details...</h2>;
  if (!job) return <h2>No job found</h2>;

  return (
    <div className="details-container">

      {/* Close Button */}
      <button
        className="close-btn"
        onClick={() => navigate(-1)}
        // style={{
        //   padding: "6px 14px",
        //   marginBottom: "15px",
        //   background: "crimson",
        //   border: "none",
        //   borderRadius: "6px",
        //   color: "white",
        //   cursor: "pointer"
        // }}
      >
        ❌
      </button>

      <h1>{job.title}</h1>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary || "Not mentioned"}</p>

      <h3>Description</h3>
      <p>{job.description}</p>

      <button className="apply-btn">
        Apply Now
      </button>
    </div>
  );
}
