// blocks pages if user is not logged in or wrong role 
//  pevents manual URL access


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  //  Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  //  Logged in but wrong role→ redirect to OWN page
  
 if (allowedRole && role !== allowedRole) {
    if (role === "admin") {
      return <Navigate to="/users" replace />;
    }
    if (role === "user") {
      return <Navigate to="/signup" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;



