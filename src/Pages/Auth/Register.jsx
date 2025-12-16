import React, { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../Shared/Logo";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Link
              to={"/login"}
              className="font-semibold underline cursor-pointer"
            >
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

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required.</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-12"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have at least one uppercase, at least one
                  lowercase, at least one number, and at least one special
                  characters
                </p>
              )}
            </div>
            <p className="mt-8 text-sm">
              Already have an account...
              <Link
                to={"/login"}
                className="font-semibold underline cursor-pointer"
              >
                Login
              </Link>
            </p>
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
