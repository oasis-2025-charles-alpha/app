import { useState } from 'react';
import BookCard from '../components/BookCard';
import FilterBar from "../components/FilterBar";
import Head from "../Head";
import "./Home.css";

function Home() {
    const [books] = useState([
        // Sample data - replace with your actual data
        { id: 1, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Trash', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 2, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Like New', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 3, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Used', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 4, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Trash', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 5, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Like New', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 6, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Used', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 7, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Trash', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 8, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Like New', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 9, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Used', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        
        // Add more books as needed
    ]);

    return (
        <>
            <Head />
            <div className="main-container">
                <div className="filter-section">
                    <FilterBar />
                </div>
                <div className="book-list-section">
                    <div className="books-grid">
                        {books.map(book => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;    

