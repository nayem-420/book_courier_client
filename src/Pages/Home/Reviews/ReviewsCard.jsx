import React from "react";

const ReviewsCard = ({ review }) => {

  const {
    name,
    review: description,
    designation,
    rating,
    avatar,
    company,
  } = review;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            i <= rating ? "fill-warning" : "fill-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Card Container */}
        <div className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 relative rounded-2xl overflow-hidden">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            {/* Quote Text */}
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
              {description}
            </p>

            {/* Divider */}
            <div className="divider my-2"></div>

            {/* Author Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Left Side - Avatar and Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={avatar} alt={name} />
                  </div>
                </div>

                {/* Name and Title */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900">
                    {name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {designation}
                  </p>

                  {/* Dynamic Star Rating */}
                  <div className="flex gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                    {renderStars(rating)}
                  </div>
                </div>
              </div>

              {/* Right Side - Company Name */}
              <div className="w-full sm:w-auto text-left sm:text-right">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 rounded-lg inline-block">
                  {company}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] sm:border-l-[50px] lg:border-l-[60px] border-l-primary border-t-[40px] sm:border-t-[50px] lg:border-t-[60px] border-t-primary border-r-[40px] sm:border-r-[50px] lg:border-r-[60px] border-r-transparent border-b-[40px] sm:border-b-[50px] lg:border-b-[60px] border-b-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
