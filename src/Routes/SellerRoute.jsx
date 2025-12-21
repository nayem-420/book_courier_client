import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

export const SellerRoute = ({ children }) => {
  const { loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <Loading />;

  if (role === "seller") return children;

  return <Navigate to="/forbidden" />;
};
