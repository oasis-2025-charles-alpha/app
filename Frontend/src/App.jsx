// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import { LikesProvider } from "./context/LikesContext";
import LikesList from "./pages/LikesList";
import AddBookPage from "./pages/AddBookPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedPage from "./components/ProtectedPage";
import { RefreshProvider } from "./context/RefreshContext";
import Head from "./Head";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Check localStorage for login state on initial render
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Persist login state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login state
  };

  return (
    <RefreshProvider>
      <LikesProvider>
        <Router>
          <Head
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/likes" element={<LikesList />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<Signup onLogin={handleLogin} />}
            />
            <Route
              path="/protected"
              element={
                isLoggedIn ? (
                  <ProtectedPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
      </LikesProvider>
    </RefreshProvider>
  );
}

export default App;