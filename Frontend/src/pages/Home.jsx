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

    //const [textbook, setTextbook] = useState()

    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [conditionSearch, setConditionSearch] = useState('');
    const [sortType, setSortType] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let filteredBooks = [...textbooks];
        
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
            const matchesConditions = selectedConditions.length === 0 || 
                selectedConditions.some(condition => 
                    book.textbook_condition.toLowerCase() === condition.toLowerCase()
                );
        
    const matchesSearch = book.textbook_condition.toLowerCase()
                .includes(conditionSearch.toLowerCase().trim());
            
    const matchesCollege = !selectedCollege || 
                book.college === selectedCollege;

    const price = Number(book.textbook_price);
    const meetsMin = !minPrice || price >= Number(minPrice);
    const meetsMax = !maxPrice || price <= Number(maxPrice);

    const matchesSearchBig = searchQuery.toLowerCase() === '' || 
                book.textbook_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.textbook_author.toLowerCase().includes(searchQuery.toLowerCase());

            return meetsMin && meetsMax && matchesConditions && matchesSearch && matchesSearchBig && matchesCollege;
        });

    // Apply sorting
    if (sortType === 'high-low') {
        filteredBooks.sort((a, b) => b.textbook_price - a.textbook_price);
    } else if (sortType === 'low-high') {
        filteredBooks.sort((a, b) => a.textbook_price - b.textbook_price);
    }   
        setDisplayedBooks(filteredBooks);
    }, [minPrice, maxPrice, textbooks, selectedConditions, conditionSearch, sortType, selectedCollege, searchQuery]);

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

