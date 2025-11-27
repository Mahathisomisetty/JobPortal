import React, { useState } from "react";
import { useGetAllJobsQuery } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useGetAllJobsQuery();

  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  if (isLoading) return <h2>Loading jobs...</h2>;

  const handleApplyFilter = () => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredJobs(jobs);
      return;
    }

    const results = jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";

      return (
        title.includes(query) ||
        company.includes(query) ||
        location.includes(query)
      );
    });

    setFilteredJobs(results);
  };

  // Decide which list to show
  const listToShow = search.trim() ? filteredJobs : jobs;

  return (
    <div className="home-container">
      <h2>Available Jobs</h2>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by job title, company, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="filter-btn" onClick={handleApplyFilter}>
          Apply Filter
        </button>
      </div>

      {/* JOB LIST */}
      <div className="job-list">
        {listToShow.length === 0 ? (
          <p>No matching jobs found.</p>
        ) : (
          listToShow.map((job) => (
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
          ))
        )}
      </div>
    </div>
  );
}
