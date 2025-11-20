import React, { useState } from "react";

export default function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: ""
  });

  const [msg, setMsg] = useState("");

  // Input change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Submit job
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!job.title || !job.company || !job.location || !job.description.trim()) {
      setMsg("All fields are required, including description!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3500/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (res.status === 401) {
        setMsg("Unauthorized! Login again.");
        return;
      }

      setMsg(data.msg || "Job Posted Successfully!");
    } catch (err) {
      setMsg("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={job.title}
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />

        <input
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
        />

        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={job.description}
          onChange={handleChange}
        />

        <button type="submit">Post Job</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
