import React from 'react';

const Logo = () => {
    return (
      <div className="flex">
        <svg
          viewBox="0 0 120 80"
          className="h-9"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orange speed lines */}
          <line
            x1="10"
            y1="25"
            x2="35"
            y2="25"
            stroke="#FF6B35"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="35"
            x2="35"
            y2="35"
            stroke="#FF6B35"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="45"
            x2="35"
            y2="45"
            stroke="#FF6B35"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Blue 3D book/box shape */}
          <g>
            {/* Left face - light blue */}
            <path d="M 45 20 L 60 10 L 60 50 L 45 60 Z" fill="#5B9FED" />

            {/* Right face - dark blue */}
            <path d="M 60 10 L 85 25 L 85 65 L 60 50 Z" fill="#1E4A8A" />

            {/* Top face - medium blue */}
            <path d="M 45 20 L 60 10 L 85 25 L 70 35 Z" fill="#3B82F6" />

            {/* White center line */}
            <line
              x1="60"
              y1="10"
              x2="60"
              y2="50"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </svg>
        <h3 className="text-2xl font-bold -ms-3 bg-gradient-to-r from-[#1E4A8A] to-[#FF6B35] bg-clip-text text-transparent">
          BookCourier
        </h3>
      </div>
    );
};

export default Logo;