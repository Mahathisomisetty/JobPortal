import React from "react";
import { useGetAllJobsQuery } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useGetAllJobsQuery();

  if (isLoading) return <h2>Loading jobs...</h2>;

  return (
    <div className="home-container">
      <h2>Available Jobs</h2>

      <div className="job-list">
        {jobs?.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary || "Not mentioned"}</p>
            <p>{job.description.substring(0, 100)}...</p>

            <button
              className="apply-btn"
              onClick={() => navigate(`/job/${job._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
