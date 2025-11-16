import React, { useState } from "react";
import { useRegisterUserMutation } from "../Features/apiSlice";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const [registerUser, { isLoading, error, isSuccess }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("Registration Successful!");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="number"
          name="phonenumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit" disabled={isLoading}>Register</button>

        {error && <p style={{ color: "red" }}>Something went wrong</p>}
        {isSuccess && <p style={{ color: "green" }}>Registered!</p>}
      </form>
    </div>
  );
}
