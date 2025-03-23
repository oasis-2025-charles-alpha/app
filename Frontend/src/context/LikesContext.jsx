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
        setLikedBooks(prev => {
            const isAlreadyLiked = prev.some(b => b.id === book.id);
            if (isAlreadyLiked) {
                return prev.filter(b => b.id !== book.id);
            } else {
                return [...prev, book];
            }
        });
    };

    const resetLikedBooks = () => {
        setLikedBooks([]);
        localStorage.removeItem('likedBooks');
    };

    return (
        <LikesContext.Provider value={{ likedBooks, toggleLike, resetLikedBooks }}>
            {children}
        </LikesContext.Provider>
    );

}

export const useLikes = () => useContext(LikesContext);