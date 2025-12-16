import React from "react";
import { Link } from "react-router";
import Logo from "../Shared/Logo";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section */}
      <div
        className="hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/Qv2D5VhZ/OIP-3772492457.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-emerald-900/70"></div>
        <div className="relative text-white p-12 max-w-md">
          <h1 className="text-4xl font-bold mb-4">BookCourier</h1>
          <p className="text-lg mb-6">Welcome to</p>
          <h2 className="text-3xl font-semibold mb-4">
            We're a Digital Agency.
          </h2>
          <p className="text-sm opacity-90">
            We are glad to see you again! Get access to your Orders, Wishlist
            and Recommendations.
          </p>
          <p className="mt-8 text-sm">
            Already have an account...
            <Link to={'/login'} className="font-semibold underline cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-6">
        {/* Logo – top right */}
        <Link to={"/"} className="absolute top-6 right-6">
          <Logo />
        </Link>
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Register</h2>
          <p className="text-gray-500 mb-6">
            Register to try our amazing services
          </p>

          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="email"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full">Log in</button>
          </form>

          <div className="divider my-6">OR</div>

          <div className="w-full">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
