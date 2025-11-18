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

    const token = localStorage.getItem("token");

    console.log("🔥 TOKEN SENT:", token); // DEBUG

    try {
      const res = await fetch("http://localhost:3500/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⭐ FIXED
        },
        body: JSON.stringify(job),
      });

      console.log("🟢 SERVER STATUS:", res.status); // DEBUG

      const data = await res.json();
      console.log("🟢 SERVER RESPONSE:", data); // DEBUG

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
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="salary" placeholder="Salary" onChange={handleChange} />
        <select name="jobType" onChange={handleChange}>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit">Post Job</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
