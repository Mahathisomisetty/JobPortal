import React, { useState } from "react";
import { useRegisterUserMutation } from "../Features/apiSlice";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const [registerUser, { isLoading, isSuccess }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);

    alert("Registration Successful!");

    // CLEAR FORM
    setForm({
      fullname: "",
      email: "",
      password: "",
      phonenumber: "",
    });
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit} style={{ width: 300 }}>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="number"
          name="phonenumber"
          placeholder="Phone Number"
          value={form.phonenumber}
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit" disabled={isLoading}>
          Register
        </button>

        {isSuccess && (
          <p style={{ color: "green" }}>Registered!</p>
        )}
      </form>
    </div>
  );
}
