import React from "react";
import { Link } from "react-router-dom"; // Import Link

function ProtectedPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow text-center">
        <h1 className="text-2xl mb-4">Welcome to the Protected Page!</h1>
        <p className="mb-4">You are logged in and can access this page.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default ProtectedPage;