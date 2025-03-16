import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import FilterBar from "../components/FilterBar";
import Head from "../Head";
import "./Home.css";

function Home() {
    const [originalBooks] = useState([
        { id: 1, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Trash', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 2, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Barely Used', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 3, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Well-Worn', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 4, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Good', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 5, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Barely Used', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 6, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Barely Used', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 7, title: 'Andy is SharkBee', author: 'Jaden Mei', price: 45.99, condition: 'Good', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 8, title: 'Andy is SharkBee', author: 'Jane Smith', price: 32.50, condition: 'Well-Worn', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
        { id: 9, title: 'Andy is SharkBee', author: 'Mike Johnson', price: 28.75, condition: 'Good', college: 'Khoury College', imageUrl: 'https://media-hosting.imagekit.io//d4c9780b5ed44a7a/IMG_9788%202.jpg?Expires=1836077294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yZyUrRWi-QZmYVxdqxaVQCVwvPXf-x0RLxDAPLx-Bf6cOhkmUxeI1OQmSSdh64dZg0mWhaBfXVcrAJW35lL2Fyqkd~~NQzsTUmzz1~dj-DVUizNXJKHPdP9x9LKKSqb~-Xp2f-8GzjSe0vLfnsIKNgNu7vNaGvmbCY5XvtfkEK1HTZ81uljsYoHf689Wf2KxqeawZ3BqQAl5Y4kCJIYyiMctWzhbuFwa8-QwWE267JdGGnw~wMf7ASvKCrQHXAitIzaACD9JNT1tNnzXKXCv2aCoiCKhKHVYZJqlbHiaR7Y0E8jN7baCZT55NxtfshHCnRpatkIG8zSuckrLFXJszQ__' },
      ]);

    //const [textbook, setTextbook] = useState()

    const [displayedBooks, setDisplayedBooks] = useState(originalBooks);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [conditionSearch, setConditionSearch] = useState('');
    const [sortType, setSortType] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let filteredBooks = [...originalBooks];
        
        // const fetchTextbook = async () => {
        //     try {
        //     const response = await axios.get('http://127.0.0.1:5000/textbooks');
        //     setTextbook(response.data)
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // }

        // fetchData()

        // Combine checkbox and search filters
        filteredBooks = filteredBooks.filter(book => {
        // Condition filters
        const matchesConditions = selectedConditions.length === 0 || 
            selectedConditions.some(condition => 
                book.condition.toLowerCase() === condition.toLowerCase()
            );
        
        // Condition search
        const matchesSearch = book.condition.toLowerCase()
            .includes(conditionSearch.toLowerCase().trim());
        
        // College filter
        const matchesCollege = !selectedCollege || 
            book.college === selectedCollege;

        // Price range filter
        const price = Number(book.price);
        const meetsMin = !minPrice || price >= Number(minPrice);
        const meetsMax = !maxPrice || price <= Number(maxPrice);

        const matchesSearchBig = searchQuery.toLowerCase() === '' || 
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.college.toLowerCase().includes(searchQuery.toLowerCase());

        return meetsMin && meetsMax && matchesConditions && matchesSearch && matchesSearchBig && matchesCollege;
    }, []);

    // Apply sorting
    if (sortType === 'high-low') {
        filteredBooks.sort((a, b) => b.price - a.price);
    } else if (sortType === 'low-high') {
        filteredBooks.sort((a, b) => a.price - b.price);
    }
        
        setDisplayedBooks(filteredBooks);
    }, [minPrice, maxPrice, originalBooks, selectedConditions, conditionSearch, sortType, selectedCollege, searchQuery]);

    const handleConditionChange = (condition, isChecked) => {
        setSelectedConditions(prev => 
            isChecked 
                ? [...prev, condition] 
                : prev.filter(c => c !== condition)
        );
    };

    const handleSortChange = (type) => {
        setSortType(type);
    };

    const handleCollegeChange = (college) => {
        setSelectedCollege(college);
    };

    return (
        <>
            <Head searchQuery={searchQuery}
                  onSearchChange={setSearchQuery} />
            <div className="main-container">
                <div className="filter-section">
                    <FilterBar 
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onSortChange={handleSortChange}
                        onConditionChange={handleConditionChange}
                        onConditionSearchChange={setConditionSearch}
                        selectedConditions={selectedConditions}
                        conditionSearch={conditionSearch}
                        onCollegeChange={handleCollegeChange}
                        selectedCollege={selectedCollege}
                        
                    />
                </div>
                <div className="book-list-section">
                    <div className="books-grid">
                    {displayedBooks.map(book => (
                 <BookCard key={book.id} book={book} /> 
                ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

