import React, { useState } from "react";
import { useLoginUserMutation } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await loginUser(form);

    if (res.data?.token) {
      // Save full user data
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save userId
      localStorage.setItem("userId", res.data.user.id);

      //  SEND EVERYONE TO HOME PAGE
      navigate("/"); 

    } else {
      alert("Invalid login credentials");
    }
  }

    return (
  <div className="login-container">
    <div className="login-box">
      {/* LEFT SIDE FORM */}
      <div className="login-left">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit">Login</button>
          <br />
          <br />
          <p>
          Don’t have an account? <a href="/register">Create your account</a>
        </p>
        </form>
      </div>
        
      {/* RIGHT SIDE WELCOME PANEL */}
      <div className="login-right">
      </div>
    </div>
  </div>
);

}
