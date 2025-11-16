import React, { useState } from "react";
import { useLoginUserMutation } from "../Features/apiSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(form);

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      alert("Login Successful!");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br/><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/><br/>
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
    </div>
  );
}
