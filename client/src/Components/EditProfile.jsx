import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadPDFMutation,
} from "../Features/apiSlice";
import "./editprofile.css";

export default function EditProfile() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { data: user } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [uploadPDF, { isLoading: uploading }] = useUploadPDFMutation();

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
    isVerified: false,
  });

  // Prefill user data
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
        isVerified: user.profile?.isVerified || false,
      });
    }
  }, [user]);

  // Input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // File upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChoose = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    setSelectedFile(file);
  };

  // Upload handler
  const handlePDFUpload = async () => {
    if (!selectedFile) return alert("Please choose a PDF file");

    try {
      const res = await uploadPDF(selectedFile).unwrap();

      setForm((prev) => ({
        ...prev,
        resume: res.filePath, // auto save uploaded path
      }));

      alert("Resume uploaded successfully!");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  // Submit update
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
        resume: form.resume, // uploaded resume path
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

        {/* ⭐ FILE UPLOAD ONLY ⭐ */}
        <label>Upload Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChoose}
          className="form-control"
        />

        <button
          type="button"
          onClick={handlePDFUpload}
          className="btn btn-warning mt-2"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>

        {/* Show Uploaded File */}
        {form.resume && (
          <p className="mt-2">
            Uploaded File:{" "}
            <a
              href={`http://localhost:3500${form.resume}`}
              target="_blank"
              rel="noreferrer"
            >
              View Resume (PDF)
            </a>
          </p>
        )}

        <button type="submit" className="btn btn-success mt-3">
          Update Profile
        </button>
      </form>
    </div>
  );
}
