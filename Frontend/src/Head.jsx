import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { useLikes } from "./context/LikesContext";

function Head({ isLoggedIn, onLogout, searchQuery, onSearchChange }) {
  const { likedBooks } = useLikes();

  return (
    <header className="flex items-center justify-between w-full p-4 bg-gray-800 text-white">
      <nav className="flex items-center gap-4 flex-1">
        {/* Link to home page */}
        <div className="logo font-bold text-xl">
          <Link to="/">Xiaobin's BookStore</Link> {/* Link to home page */}
        </div>
        <form action="#" id="search-form">
          <input
            type="text"
            placeholder="Search books..."
            className="search-bar p-2 rounded text-black"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </form>
      </nav>

      {/* Link to Add Book page */}
      <Link to="/add-book" className="add-book-btn bg-blue-500 p-2 rounded">
        + Add Book +
      </Link>

      <nav className="flex items-center gap-4">
        <div className="user-actions flex items-center gap-2">
          <Link to="/likes" className="likes-btn bg-green-500 p-2 rounded">
            Likes ({likedBooks.length})
          </Link>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="logout-btn bg-red-500 p-2 rounded"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="login-btn bg-blue-500 p-2 rounded">
              Log In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Head;