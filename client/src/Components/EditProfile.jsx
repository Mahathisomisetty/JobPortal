import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../Features/apiSlice";
import "./editprofile.css";

export default function EditProfile() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { data: user } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  const [form, setForm] = useState({
    fullname: "",
    headline: "",
    Summary: "",
    phonenumber: "",
    location: "",
    experience: "",
    skills: "",
    education: "",
    resume: "",
    company: "",
    isVerified: false
  });

  // Pre-fill data when user is loaded
  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname || "",
        headline: user.profile?.headline || "",
        Summary: user.profile?.Summary || "",
        phonenumber: user.phonenumber || "",
        location: user.profile?.location || "",
        experience: user.profile?.experience || "",
        skills: user.profile?.skills?.join(", ") || "",
        education: user.profile?.education?.join(", ") || "",
        resume: user.profile?.resume || "",
        company: user.profile?.company || "",
        isVerified: user.profile?.isVerified || false
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullname: form.fullname,
      phonenumber: form.phonenumber,
      profile: {
        headline: form.headline,
        Summary: form.Summary,
        location: form.location,
        experience: Number(form.experience),
        skills: form.skills.split(",").map((s) => s.trim()),
        education: form.education.split(",").map((e) => e.trim()),
        resume: form.resume,
        company: form.company,
        isVerified: form.isVerified,
      },
    };

    await updateUser({ id: userId, ...payload });

    alert("Profile Updated Successfully!");
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />

        <label>Headline</label>
        <select
          name="headline"
          value={form.headline}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select your role</option>
          <option value="Developer">Developer</option>
          <option value="Student">Student</option>
          <option value="Recruiter">Recruiter</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="Intern">Intern</option>
        </select>


        <label>Summary</label>
        <textarea
          name="Summary"
          value={form.Summary}
          onChange={handleChange}
        ></textarea>

        <label>Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          value={form.phonenumber}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <label>Experience (years)</label>
        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
        />

        <label>Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={form.skills}
          onChange={handleChange}
        />

        <label>Education (comma separated)</label>
        <input
          type="text"
          name="education"
          value={form.education}
          onChange={handleChange}
        />

        <label>Company</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <label>Verified Recruiter?</label>
        <input
          type="checkbox"
          name="isVerified"
          checked={form.isVerified}
          onChange={handleChange}
        />

        <label>Resume (URL or filename)</label>
        <input
          type="text"
          name="resume"
          value={form.resume}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success mt-3">
          Update Profile
        </button>
      </form>
    </div>
  );
}
