import React, { useState } from "react";
import { useLoginUserMutation } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await loginUser(form);

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      navigate("/");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
