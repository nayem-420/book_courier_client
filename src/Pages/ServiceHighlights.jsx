import { FaTruck, FaShieldAlt, FaHeadset, FaTags } from "react-icons/fa";

const ServiceHighlights = () => {
  return (
    <div className="bg-[#dbeaed] rounded-2xl p-8 my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Return & Refund */}
        <div className="flex items-start gap-4">
          <div className="bg-[#0a6c84] text-white p-4 rounded-xl text-2xl">
            <FaTruck />
          </div>
          <div>
            <h3 className="font-bold text-lg">Return & Refund</h3>
            <p className="text-sm text-gray-600">Money back guarantee</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex items-start gap-4">
          <div className="bg-[#0a6c84] text-white p-4 rounded-xl text-2xl">
            <FaShieldAlt />
          </div>
          <div>
            <h3 className="font-bold text-lg">Secure Payment</h3>
            <p className="text-sm text-gray-600">30% off by subscribing</p>
          </div>
        </div>

        {/* Quality Support */}
        <div className="flex items-start gap-4">
          <div className="bg-[#0a6c84] text-white p-4 rounded-xl text-2xl">
            <FaHeadset />
          </div>
          <div>
            <h3 className="font-bold text-lg">Quality Support</h3>
            <p className="text-sm text-gray-600">Always online 24/7</p>
          </div>
        </div>

        {/* Daily Offers */}
        <div className="flex items-start gap-4">
          <div className="bg-[#0a6c84] text-white p-4 rounded-xl text-2xl">
            <FaTags />
          </div>
          <div>
            <h3 className="font-bold text-lg">Daily Offers</h3>
            <p className="text-sm text-gray-600">20% off by subscribing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;