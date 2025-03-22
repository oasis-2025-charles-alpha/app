import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRefresh } from '../context/RefreshContext';

function FilterBar({ 
    onSortChange, 
    onCourseSubjectChange, 
    onCourseSubjectSearchChange,
    selectedCourseSubjects,
    courseSubjectSearch, 
    onCollegeChange,
    selectedCollege,
    onMinPriceChange,
    onMaxPriceChange,
    minPrice,
    maxPrice,
    courses
}) {

    const { refreshTrigger } = useRefresh();
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/courses');
                const subjects = [...new Set(response.data.courses.map(c => c.courseSubject))];
                setCourseCategories(subjects.sort());
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [refreshTrigger]); 

    return (
        <div className="filter-container">
            {/* Price Sorting Section */}
            <div className="price-filter">
                <h3>Price</h3>
                <nav>
                    <button onClick={() => onSortChange('high-low')}>
                        Price: High to Low
                    </button>
                    <button onClick={() => onSortChange('low-high')}>
                        Price: Low to High
                    </button>
                </nav>
            </div>

            <div className="price-range-filter">
                <h3>Price Range</h3>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice || ''}
                        onChange={(e) => onMinPriceChange(e.target.value)}
                        min="0"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice || ''}
                        onChange={(e) => onMaxPriceChange(e.target.value)}
                        min="0"
                    />
                </div>
            </div>

            {/* College Filter Section */}
            <div className="college-filter">
                <h3>College</h3>
                <select 
                    value={selectedCollege || ''}
                    onChange={(e) => onCollegeChange(e.target.value)}>
                    <option value="">All Colleges</option>
                    <option value="Khoury College">Khoury College</option>
                    <option value="School of Law">School of Law</option>
                    <option value="College of Arts, Media and Design">College of Arts, Media and Design</option>
                    <option value="D’Amore-McKim School of Business">D’Amore-McKim School of Business</option>
                    <option value="College of Engineering">College of Engineering</option>
                    <option value="College of Science">College of Science</option>
                    <option value="College of Professional Studies">College of Professional Studies</option>
                    <option value="Bouvé College of Health Sciences">Bouvé College of Health Sciences</option>
                    <option value="College of Social Sciences and Humanities">College of Social Sciences and Humanities</option>
                </select>
            </div>

            {/* Course Subject Filter Section */}
            <div className="course-subject-filter">
                <h3>Course Subject</h3>
                <div className="subject-grid">
                    {courseCategories
                        .filter(subject => 
                            subject.toLowerCase().includes(courseSubjectSearch.toLowerCase())
                        )
                        .map(subject => (
                            <div className="subject-item" key={subject}>
                                <input 
                                    type="checkbox" 
                                    id={subject}
                                    checked={selectedCourseSubjects.includes(subject)}
                                    onChange={(e) => onCourseSubjectChange(subject, e.target.checked)}
                                />
                                <label htmlFor={subject}>{subject}</label>
                            </div>
                        ))}
                </div>
                <div className="subject-search">
                    <input
                        type="text"
                        placeholder="Search course subject..."
                        value={courseSubjectSearch}
                        onChange={(e) => onCourseSubjectSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterBar;