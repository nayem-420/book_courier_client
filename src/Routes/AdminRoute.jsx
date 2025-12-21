import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return <p>Loading...</p>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" />;
};

export default AdminRoute;
