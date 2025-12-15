import Lottie from "lottie-react";
import loadingAnimation from "../assets/json/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-40 md:w-52">
        <Lottie animationData={loadingAnimation} loop />
      </div>
      <p className="mt-4 text-gray-500 text-sm">Loading your books...</p>
    </div>
  );
};

export default Loading;
