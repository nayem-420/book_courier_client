import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/json/404.json";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-80 md:w-96">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
        404 - Page Not Found
      </h1>

      <p className="text-gray-600 mt-2 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/">
        <button className="mt-6 bg-[#FF6B35] hover:bg-[#e85a28] text-white px-6 py-3 rounded-lg font-semibold transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
