import { useGetUserByIdQuery } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (!token) navigate("/login");

  const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });

  if (!user) return <h2>Loading user...</h2>;

  return (
    <div>
      <h2>Welcome, {user.fullname}! 👋</h2>
    </div>
  );
}
