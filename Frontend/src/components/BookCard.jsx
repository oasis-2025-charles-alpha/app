import { useLikes } from '../context/LikesContext';
import { useState } from 'react';
function BookCard({ book }) {
    const { toggleLike, likedBooks } = useLikes();
    const isLiked = likedBooks.some(b => b.id === book.id);
    
    return (
        <div className="book-card">
            <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(book)}>
                ♥
            </button>
            
            <img src={book.imageUrl} alt={book.textbook_name} className="book-image" />
            <div className="book-details">
                <h3 className="book-title">{book.textbook_name}</h3>
                <p className="book-author">{book.textbook_author}</p>
                <div className="price-condition">
                    <span className="book-price">${book.textbook_price}</span>
                    <span className="book-condition">{book.textbook_condition}</span>
                </div>
                <div className="course-info">
                    <span>{book.course_subject} {book.course_number}</span>
                </div>
                <div className="professor-info">
                    Professor: {book.professor_fname} {book.professor_lname}
                </div>
            </div>
        </div>
    );
}

export default BookCard;