import { createContext, useContext, useState, useEffect } from 'react';

const LikesContext = createContext();

export function LikesProvider({ children }) {
    const [likedBooks, setLikedBooks] = useState(() => {
        const saved = localStorage.getItem('likedBooks');
        return saved ? JSON.parse(saved) : [];
    });

    // Save likedBooks to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
    }, [likedBooks]);

    // Function to toggle like/unlike a book
    const toggleLike = (book) => {
        setLikedBooks(prev => {
            // Check if the book is already liked
            const isAlreadyLiked = prev.some(b => b.id === book.id);
            if (isAlreadyLiked) {
                // Remove the book if it is already liked
                return prev.filter(b => b.id !== book.id);
            } else {
                // Add the book to the liked list
                return [...prev, book];
            }
        });
    };

    // Function to reset likedBooks
    const resetLikedBooks = () => {
        setLikedBooks([]); // Clear the likedBooks state
        localStorage.removeItem('likedBooks'); // Remove likedBooks from localStorage
    };

    return (
        <LikesContext.Provider value={{ likedBooks, toggleLike, resetLikedBooks }}>
            {children}
        </LikesContext.Provider>
    );
}

export const useLikes = () => useContext(LikesContext);