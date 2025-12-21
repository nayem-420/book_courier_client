import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";


const DashboardHome = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="bg-base-200 p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user?.displayName}</h2>
        <p className="text-gray-500">
          Role: <span className="capitalize font-semibold">{role}</span>
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* USER */}
        {role === "customer" && (
          <>
            <DashboardCard
              title="My Orders"
              desc="View your purchase history"
              to="/dashboard/my-orders"
            />
            <DashboardCard
              title="My Profile"
              desc="Manage your profile info"
              to="/my-profile"
            />
          </>
        )}

        {/* LIBRARIAN */}
        {role === "librarian" && (
          <>
            <DashboardCard
              title="Add New Book"
              desc="Upload new books to store"
              to="/dashboard/add-book"
            />
            <DashboardCard
              title="My Books"
              desc="Manage your added books"
              to="/dashboard/my-books"
            />
            <DashboardCard
              title="Manage Orders"
              desc="See customer orders"
              to="/dashboard/manage-orders"
            />
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <DashboardCard
              title="Manage Users"
              desc="Control all users & roles"
              to="/dashboard/manage-users"
            />
            <DashboardCard
              title="Inventory"
              desc="View all book stock"
              to="/dashboard/my-inventory"
            />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, desc, to }) => {
  return (
    <Link to={to}>
      <div className="card bg-base-100 shadow hover:shadow-lg transition">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="text-gray-500">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardHome;
