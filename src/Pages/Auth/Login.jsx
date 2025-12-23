import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../Shared/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      console.log(result.user);

      const token = await result.user.getIdToken();
      console.log(token);

      const roleResponse = await axiosSecure.get("/users/role");
      console.log("User role:", roleResponse.data.role);

      toast.success("Login successful!");
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      console.log(error);

      // Firebase error handle
      if (error.code === "auth/wrong-password") {
        toast.error("Wrong password!");
      } else if (error.code === "auth/user-not-found") {
        toast.error("User not found!");
      } else {
        toast.error("Login failed. Please try again.");
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
          <p className="text-lg mb-6">Good to see you</p>
          <h2 className="text-3xl font-semibold mb-4">
            We're a Digital Agency.
          </h2>
          <p className="text-sm opacity-90">
            We are glad to see you again! Get access to your Orders, Wishlist
            and Recommendations.
          </p>
          <p className="mt-8 text-sm">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              state={location.state}
              className="font-semibold underline cursor-pointer"
            >
              Register
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
          <h2 className="text-3xl font-bold mb-2">Log In</h2>
          <p className="text-gray-500 mb-6">
            Log in to try our amazing services
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
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
                  {...register("password", { required: true, minLength: 6 })}
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
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer{" "}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                to={"/forget-password"}
                className="link link-success text-orange-500 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <p className="mt-8 text-sm">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-semibold underline cursor-pointer"
              >
                Register
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

export default Login;
