import React from "react";
import useRole from "../../../hooks/useRole";
import { Link } from "react-router";

const CustomerMenu = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="menu p-4 w-60 bg-base-100 text-base-content">
      <Link className="menu-item" to="/my-orders">
        My Orders
      </Link>
      <Link className="menu-item" to="/my-profile">
        My Profile
      </Link>

      {/* Only show Become a Seller if role is Customer */}
      {role === "Customer" && (
        <Link
          to="/become-seller"
          className="btn btn-outline btn-success w-full mt-4"
        >
          Become a Seller
        </Link>
      )}
    </div>
  );
};

export default CustomerMenu;
