import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../Shared/Logo";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState(""); 

  const handleRegistration = async (data) => {
    try {
      setBackendError(""); 
      const profileImg = data.photo[0];

      // Firebase register
      const result = await registerUser(data.email, data.password);
      console.log(result.user);

      // Image upload
      const photoURL = await imageUpload(profileImg);

      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      const response = await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
      });

      if (response.data.message === "User already exists") {
        setBackendError(
          "This email is already registered. Please login instead."
        );
        return;
      }

      const { data: roleData } = await axiosSecure.get("/users/role");
      console.log("User role:", roleData.role);

      navigate(location.state?.from?.pathname || "/");
      
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.code === "auth/email-already-in-use") {
        setBackendError(
          "This email is already registered. Please login instead."
        );
      } else if (error.code === "auth/weak-password") {
        setBackendError(
          "Password is too weak. Please use a stronger password."
        );
      } else {
        setBackendError("Registration failed. Please try again.");
      }
    }
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
            {/* Backend Error Message */}
            {backendError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{backendError}</p>
              </div>
            )}

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
                <p className="text-red-500 text-sm mt-1">Name is required.</p>
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
                <p className="text-red-500 text-sm mt-1">Email is required.</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Photo is required.</p>
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
                <p className="text-red-500 text-sm mt-1">
                  Password is required.
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must have at least one uppercase, at least one
                  lowercase, at least one number, and at least one special
                  character
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
            <button className="btn btn-primary w-full">Register</button>
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
