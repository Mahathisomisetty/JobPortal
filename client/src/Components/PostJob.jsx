import React, { useState } from "react";
import {
  useCreateJobMutation,
  useGetRecruiterJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation
} from "../Features/apiSlice";
import "./PostJob.css";

export default function PostJob() {

  const user = JSON.parse(localStorage.getItem("user"));
  const recruiterId = user?._id || user?.id;

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: ""
  });

  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const { data: myJobs = [], refetch } = useGetRecruiterJobsQuery(recruiterId, {
    skip: !recruiterId,
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.title || !job.company || !job.location || !job.description) {
      setMsg("All fields are required!");
      return;
    }

    try {
      if (editId) {
        await updateJob({ id: editId, body: job }).unwrap();
        setMsg("Job Updated Successfully!");
      } else {
        await createJob({ ...job, postedBy: recruiterId }).unwrap();
        setMsg("Job Posted Successfully!");
      }

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        description: ""
      });

      setEditId(null);
      refetch();
    } catch (err) {
      setMsg("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    await deleteJob({ id }).unwrap();
    refetch();
  };

 const handleEdit = (jobData) => {
  // Set the job ID you're editing
  setEditId(jobData._id);

  // Fill form with selected job details
  setJob({
    title: jobData.title || "",
    company: jobData.company || "",
    location: jobData.location || "",
    salary: jobData.salary || "",
    jobType: jobData.jobType || "Full-Time",
    description: jobData.description || "",
  });

  // Optional: clear previous messages
  setMsg("");

  // Smoothly scroll user to the form area
  setTimeout(() => {
    document.querySelector(".right-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  // Optional: briefly highlight the form
  const form = document.querySelector(".job-form");
  if (form) {
    form.classList.add("highlight-form");
    setTimeout(() => form.classList.remove("highlight-form"), 800);
  }
};


  return (
    <div className="postjob-container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <h2>My Posted Jobs</h2>

        {myJobs.length === 0 && <p>No jobs posted yet.</p>}

        {myJobs.map((j) => (
          <div key={j._id} className="job-card">
            <h3>{j.title}</h3>
            <p>{j.company}</p>
            <p>{j.location}</p>

            <button className="edit-btn" onClick={() => handleEdit(j)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(j._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>{editId ? "Edit Job" : "Post a Job"}</h2>

        <form className="job-form" onSubmit={handleSubmit}>
          <input name="title" value={job.title} onChange={handleChange} placeholder="Job Title" />
          <input name="company" value={job.company} onChange={handleChange} placeholder="Company" />
          <input name="location" value={job.location} onChange={handleChange} placeholder="Location" />
          <input name="salary" value={job.salary} onChange={handleChange} placeholder="Salary" />

          <select name="jobType" value={job.jobType} onChange={handleChange}>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>

          <textarea name="description" value={job.description} onChange={handleChange} placeholder="Description"></textarea>

          <button type="submit">{editId ? "Update Job" : "Post Job"}</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
