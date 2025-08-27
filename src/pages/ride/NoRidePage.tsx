

import React from "react";
import { useNavigate } from "react-router";

const NoRidePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        You are not in a ride right now
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        When you start a ride, you will see the details here.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NoRidePage;
