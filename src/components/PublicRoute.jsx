import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const role = useSelector((state) => state.auth.role);

  // If already logged in, NEVER show login
  if (role === "admin") return <Navigate to="/users" replace />;
  if (role === "user") return <Navigate to="/signup" replace />;

  return children;
}

export default PublicRoute;
