import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup logic
    if (username && password) {
      // Store user credentials in localStorage
      localStorage.setItem("userCredentials", JSON.stringify({ username, password }));
      onLogin(); // Automatically log in after signup
      navigate("/protected"); // Redirect to protected page
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;