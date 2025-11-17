import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
 
  // const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });

  return (
    <div>
      <h1>Profile</h1>
      <p>Your profile details will come here.</p>
    </div>
  );
}
