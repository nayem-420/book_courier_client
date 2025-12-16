import Logo from "../Shared/Logo";
import { Link } from "react-router";

const ForgetPassword = () => {
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
          <p className="text-lg mb-6">Reset Your Password</p>
          <h2 className="text-3xl font-semibold mb-4">We're here to help.</h2>
          <p className="text-sm opacity-90">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
          <p className="mt-8 text-sm">
            Remember your password?{" "}
            <Link
              to={"/login"}
              className="font-semibold underline cursor-pointer"
            >
              Log In
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
          <h2 className="text-3xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-500 mb-6">
            No worries, we'll send you reset instructions
          </p>

          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full">Send Reset Link</button>
          </form>

          <div className="mt-6 text-center">
            <Link to={"/login"} className="link link-success text-sm">
              ← Back to Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
