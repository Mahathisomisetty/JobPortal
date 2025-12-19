import React, { useState } from "react";
import { useRegisterUserMutation } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user"   //  default role
  });

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await registerUser(form);

    if (res.data) {
      setSuccessMsg(res.data.message || "Registered Successfully!");

      setForm({ fullname: "", email: "", password: "", role: "user" });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("role", res.data.user.role);   
      }

      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
       <h2>Register</h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/*  Role Dropdown */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
          {/* <option value="admin">Admin</option>  OPTIONAL */}
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering…" : "Register"}
        </button>

        <p>Already having an account? <a href="/login">Login</a></p>
      </form>

      {successMsg && <p className="success-message">{successMsg}</p>}
      {error && <p className="error-message">Registration failed!</p>}
    </div>
  );
}
