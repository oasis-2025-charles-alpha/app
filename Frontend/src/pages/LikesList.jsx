import { useNavigate } from 'react-router-dom';
import { useLikes } from '../context/LikesContext';
import BookCard from '../components/BookCard';
import './Home.css';

function LikesList() {
    const { likedBooks } = useLikes();
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="book-list-section">
                <div className="likes-header">
                    <h1>Your Liked Books ({likedBooks.length})</h1>
                    <button 
                        onClick={() => navigate(-1)}
                        className="back-button">
                        ← Back
                    </button>
                </div>
                <div className="books-grid">
                    {likedBooks.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            className="book-card" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LikesList;