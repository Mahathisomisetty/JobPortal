import React from "react";
import { useGetUserByIdQuery } from "../Features/apiSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const userId = localStorage.getItem("userId");

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // LOGOUT FUNCTION
  function handleLogout() {
    localStorage.removeItem("token"); //removes token
    localStorage.removeItem("userId"); //removes id aswell
    window.location.href = "/login";   // redirect to login page
  }

  if (!userId) return <h2>Please login again (userId missing)</h2>;

  if (isLoading) return <h2>Loading user…</h2>;

  if (error || !user) return <h2>Unable to load user</h2>;

  return (
    <div>
      <h1>Home Page</h1>

      <h2>Welcome, {user.fullname}! 👋</h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
