import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    console.log("User is not found");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
