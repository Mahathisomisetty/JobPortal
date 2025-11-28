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

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // FILE UPLOAD
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChoose = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF allowed!");
      return;
    }
    setSelectedFile(file);
  };

  const handlePDFUpload = async () => {
    if (!selectedFile) return alert("Choose a PDF first");

    try {
      const res = await uploadPDF(selectedFile).unwrap();
      setForm((prev) => ({ ...prev, resume: res.filePath }));
      alert("Resume uploaded!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  // SUBMIT
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
    alert("Profile Updated!");
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="edit-form">

        {/* FULL NAME */}
        <div className="form-group">
          <label>Full Name</label>
          <input name="fullname" value={form.fullname} onChange={handleChange} />
        </div>

        {/* HEADLINE + PHONE */}
        <div className="form-row">
          <div className="form-group">
            <label>Headline</label>
            <select name="headline" value={form.headline} onChange={handleChange}>
              <option value="">Select your role</option>
              <option value="Developer">Developer</option>
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input name="phonenumber" value={form.phonenumber} onChange={handleChange} />
          </div>
        </div>

        {/* LOCATION + EXPERIENCE */}
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Experience (years)</label>
            <input name="experience" value={form.experience} onChange={handleChange} />
          </div>
        </div>

        {/* SUMMARY FULL WIDTH */}
        <div className="form-group">
          <label>Summary</label>
          <textarea name="Summary" value={form.Summary} onChange={handleChange}></textarea>
        </div>

        {/* SKILLS + EDUCATION */}
        <div className="form-row">
          <div className="form-group">
            <label>Skills</label>
            <input name="skills" value={form.skills} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Education</label>
            <input name="education" value={form.education} onChange={handleChange} />
          </div>
        </div>

        {/* COMPANY + VERIFIED */}
        <div className="form-row">
          <div className="form-group">
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} />
          </div>

          <div className="form-checkbox">
            <label>Verified Recruiter?</label>
            <input
              type="checkbox"
              name="isVerified"
              checked={form.isVerified}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FILE UPLOAD */}
        <div className="form-group">
          <label>Upload Resume (PDF)</label>

          <input type="file" accept="application/pdf" onChange={handleFileChoose} />

          <button type="button" className="upload-btn" onClick={handlePDFUpload}>
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

          {form.resume && (
            <p className="uploaded-file">
              <a href={`http://localhost:3500${form.resume}`} target="_blank" rel="noreferrer">
                View Uploaded Resume
              </a>
            </p>
          )}
        </div>

        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div>
  );
}
