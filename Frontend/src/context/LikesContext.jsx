import { createContext, useContext, useState, useEffect } from 'react';

const LikesContext = createContext();

export function LikesProvider({ children }) {
    const [likedBooks, setLikedBooks] = useState(() => {
        const saved = localStorage.getItem('likedBooks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
    }, [likedBooks]);

    const toggleLike = (book) => {
        setLikedBooks(prev => prev.some(b => b.id === book.id) 
            ? prev.filter(b => b.id !== book.id) 
            : [...prev, book]
        );
    };

    return (
        <LikesContext.Provider value={{ likedBooks, toggleLike }}>
            {children}
        </LikesContext.Provider>
    );
}

export const useLikes = () => useContext(LikesContext);