import { useLikes } from '../context/LikesContext';

function BookCard({ book }) {
    const { toggleLike, likedBooks } = useLikes();
    const isLiked = likedBooks.some(b => b.id === book.id);
    
    return (
        <div className="book-card">
            <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(book)}>
                ♥
            </button>
            
            <img src={book.textbook_image} alt={book.textbook_name} className="book-image" />
            <div className="book-details">
                <h3 className="book-title">{book.textbook_name}</h3>
                <p className="book-author">{book.textbook_author}</p>
                <div className="price-condition">
                    <span className="book-price">${book.textbook_price}</span>
                </div>
                <div className="course-college-info">
                    <span className="course-info">{book.course_subject} {book.course_number}</span>
                    <span className="college-name">{book.college_name}</span>
                </div>
                <div className="professor-info">
                    Professor: {book.professor_fname} {book.professor_lname}
                </div>
            </div>
        </div>
    );
}

export default BookCard;