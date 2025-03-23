import React from 'react';
import { useLikes } from '../context/LikesContext'; // Correct import path

function LogoutButton({ onLogout }) {
    const { resetLikedBooks } = useLikes();

    const handleLogout = () => {
        resetLikedBooks(); // Reset likedBooks
        onLogout(); // Call the onLogout function passed from the parent component
    };

    return (
        <button onClick={handleLogout} className="logout-btn bg-red-500 p-2 rounded">
            Log Out
        </button>
    );
}

export default LogoutButton;