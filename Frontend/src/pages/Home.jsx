import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import FilterBar from "../components/FilterBar";
import Head from "../Head";
import "./Home.css";
import axios from 'axios';

function Home() {
    const [textbooks, setTextbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    
    // State for filters
    const [selectedCourseSubjects, setSelectedCourseSubjects] = useState([]);
    const [courseSubjectSearch, setCourseSubjectSearch] = useState('');
    const [sortType, setSortType] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch textbooks from backend
    useEffect(() => {
        const fetchTextbooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/textbooks');
                setTextbooks(response.data.textbooks);
                setFetchError(null);
            } catch (error) {
                setFetchError(error.message);
                console.error("Error fetching textbooks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTextbooks();
    }, []);

    // Filter and sort books
    useEffect(() => {
        let filteredBooks = [...textbooks];

        filteredBooks = filteredBooks.filter(book => {
            // Course subject filters
            const matchesCourseSubjects = selectedCourseSubjects.length === 0 || 
                selectedCourseSubjects.some(subject => 
                    book.course_subject.toLowerCase() === subject.toLowerCase()
                );
            
            const matchesSubjectSearch = book.course_subject.toLowerCase()
                .includes(courseSubjectSearch.toLowerCase().trim());
            
            // College filter
            const matchesCollege = !selectedCollege || 
                book.college_name === selectedCollege;

            // Price range
            const price = Number(book.textbook_price);
            const meetsMin = !minPrice || price >= Number(minPrice);
            const meetsMax = !maxPrice || price <= Number(maxPrice);

            // General search
            const matchesSearch = searchQuery.toLowerCase() === '' || 
                book.textbook_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.textbook_author.toLowerCase().includes(searchQuery.toLowerCase());

            return meetsMin && meetsMax && 
                   matchesCourseSubjects && 
                   matchesSubjectSearch && 
                   matchesSearch && 
                   matchesCollege;
        });

        // Apply sorting
        if (sortType === 'high-low') {
            filteredBooks.sort((a, b) => b.textbook_price - a.textbook_price);
        } else if (sortType === 'low-high') {
            filteredBooks.sort((a, b) => a.textbook_price - b.textbook_price);
        }

        setDisplayedBooks(filteredBooks);
    }, [minPrice, maxPrice, textbooks, selectedCourseSubjects, courseSubjectSearch, 
        sortType, selectedCollege, searchQuery]);

    const handleCourseSubjectChange = (subject, isChecked) => {
        setSelectedCourseSubjects(prev => 
            isChecked ? [...prev, subject] : prev.filter(s => s !== subject)
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
            <Head searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="main-container">
                <div className="filter-section">
                    <FilterBar 
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onSortChange={handleSortChange}
                        onCourseSubjectChange={handleCourseSubjectChange}
                        onCourseSubjectSearchChange={setCourseSubjectSearch}
                        selectedCourseSubjects={selectedCourseSubjects}
                        courseSubjectSearch={courseSubjectSearch}
                        onCollegeChange={handleCollegeChange}
                        selectedCollege={selectedCollege}
                        courses={textbooks.reduce((acc, textbook) => {
                            if (!acc.find(c => c.id === textbook.course_id)) {
                                acc.push({
                                    id: textbook.course_id,
                                    course_subject: textbook.course_subject,
                                    course_number: textbook.course_number
                                });
                            }
                            return acc;
                        }, [])}
                    />
                </div>
                
                <div className="book-list-section">
                    {isLoading ? (
                        <p>Loading textbooks...</p>
                    ) : fetchError ? (
                        <p>Error loading textbooks: {fetchError}</p>
                    ) : (
                        <div className="books-grid">
                            {displayedBooks.map(textbook => (
                                <BookCard key={textbook.id} book={textbook} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;