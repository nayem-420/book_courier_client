import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  FaBook,
  FaBookOpen,
  FaClipboardList,
  FaInbox,
  FaUsers,
} from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import useRole from "../hooks/useRole";
import Logo from "../Pages/Shared/Logo";

const DashboardLayout = () => {
  const [role, isLoading] = useRole(); 
  const location = useLocation(); 

  // Define menu for each role
  const menuByRole = {
    admin: [
      {
        name: "Manage Users",
        icon: <FaUsers className="my-1.5 size-4" />,
        path: "/dashboard/manage-users",
        tip: "Manage Users",
      },
    ],
    seller: [
      {
        name: "Add Books",
        icon: <MdLibraryAdd className="my-1.5 size-4" />,
        path: "/dashboard/add-book",
        tip: "Add Books",
      },
      {
        name: "My Books",
        icon: <FaBook className="my-1.5 size-4" />,
        path: "/dashboard/my-books",
        tip: "My Books",
      },
      {
        name: "Manage Orders",
        icon: <FaClipboardList className="my-1.5 size-4" />,
        path: "/dashboard/manage-orders",
        tip: "Manage Orders",
      },
      {
        name: "My Inventory",
        icon: <FaBookOpen className="my-1.5 size-4" />,
        path: "/dashboard/my-inventory",
        tip: "My Inventory",
      },
    ],
    customer: [
      {
        name: "My Orders",
        icon: <FaInbox className="my-1.5 size-4" />,
        path: "/dashboard/my-orders",
        tip: "My Orders",
      },
      {
        name: "Become a Seller",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="my-1.5 inline-block size-4"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        ),
        path: "/dashboard/become-seller",
        tip: "Become a Seller",
      },
    ],
  };

  // Common menu for all roles
  const commonMenu = [
    {
      name: "Homepage",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      ),
      path: "/",
      tip: "Homepage",
    },
    {
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M20 7h-9"></path>
          <path d="M14 17H5"></path>
          <circle cx="17" cy="17" r="3"></circle>
          <circle cx="7" cy="7" r="3"></circle>
        </svg>
      ),
      path: "#",
      tip: "Settings",
      isButton: true,
    },
  ];

  const itemsToRender = [...commonMenu, ...(menuByRole[role] || [])];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to={"/"} className="px-4">
            <Logo />
          </Link>
        </nav>
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {isLoading ? (
              <li className="p-4 text-center">
                <span className="loading loading-spinner loading-sm"></span>
              </li>
            ) : (
              itemsToRender.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={index}>
                    {item.isButton ? (
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip={item.tip}
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.name}
                        </span>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                          isActive
                            ? "active bg-primary text-primary-content"
                            : ""
                        }`}
                        data-tip={item.tip}
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;