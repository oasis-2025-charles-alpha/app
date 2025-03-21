import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sell">Sell</Link>
      <Link to="/likes">Likes</Link>
      <Link to="/add-book">Add Book</Link>
      {/* Add links for authentication */}
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/protected">Protected</Link>
    </nav>
  );
};

export default Navbar;