import React from "react";
import { useGetUsersQuery } from "../Features/apiSlice";

function Users() {
  const { data } = useGetUsersQuery();


  return (
    <div>
      <h1>All Users</h1>

      {data?.map((user, index) => (
        <div key={index} style={{ margin: "10px 0" }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Users;
