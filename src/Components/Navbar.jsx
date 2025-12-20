import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Pages/Shared/Logo";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/all-books"}>Books</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={"/coverage"}>Coverage</NavLink>
            </li>
            <li>
              <NavLink to={"/librarians"}>Librarians</NavLink>
            </li>
            <li>
              <NavLink to={"/my-profile"}>My Profile</NavLink>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/all-books"}>Books</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-orders"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/coverage"}>Coverage</NavLink>
          </li>
          <li>
            <NavLink to={"/librarians"}>Librarians</NavLink>
          </li>
          <li>
            <NavLink to={"/my-profile"}>My Profile</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <img
                src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border"
              />
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;