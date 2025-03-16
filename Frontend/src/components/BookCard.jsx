import { useState } from 'react';
import { useLikes } from '../context/LikesContext';
function BookCard({ book }) {
    const { toggleLike, likedBooks } = useLikes();
    const isLiked = likedBooks.some(b => b.id === book.id);
    if (! book?.id) {
        return null;
    }
    return (
        <div className="book-card">
            <button 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => toggleLike(book)}>
                ♥
            </button>
            
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="price-condition">
                    <span className="book-price">${book.price}</span>
                    <span className="book-condition">{book.condition}</span>
                </div>
                <div className="book-college">
                    {book.college}
                </div>
            </div>
        </div>
    );
}

export default BookCard;