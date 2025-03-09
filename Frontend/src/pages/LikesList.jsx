import { useLikes } from '../context/LikesContext';
import BookCard from '../components/BookCard';

function LikesList() {
    const { likedBooks } = useLikes();

    return (
        <div className="main-container">
            <h1>Your Liked Books ({likedBooks.length})</h1>
            <div className="books-grid">
                {likedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default LikesList;