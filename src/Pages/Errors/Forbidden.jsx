import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/json/forbidden.json";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-72 md:w-80">
        <Lottie animationData={forbiddenAnimation} loop />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
        403 - Access Forbidden
      </h1>

      <p className="text-gray-600 mt-2 text-center max-w-md">
        You don't have permission to access this page.
      </p>

      <div className="flex gap-4 mt-6">
        <Link to="/">
          <button className="bg-[#FF6B35] hover:bg-[#e85a28] text-white px-6 py-3 rounded-lg font-semibold transition">
            Go Home
          </button>
        </Link>

        <Link to="/login">
          <button className="border border-gray-400 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;