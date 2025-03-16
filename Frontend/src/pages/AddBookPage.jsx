import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBookPage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    const [formData, setFormData] = useState({
        textbookName: '',
        textbookAuthor: '',
        textbookCondition: '',
        textbookPrice: '',
        courseId: '',
        professorId: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRes = await axios.get('http://127.0.0.1:5000/courses');
                const professorsRes = await axios.get('http://127.0.0.1:5000/professors');
                
                // Extract unique course subjects
                const uniqueSubjects = [...new Set(
                    coursesRes.data.courses.map(course => course.courseSubject)
                )];
                
                setCourseCategories(uniqueSubjects);
                setCourses(coursesRes.data.courses);
                setProfessors(professorsRes.data.professors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/create_textbook', {
                textbookName: formData.textbookName,
                textbookAuthor: formData.textbookAuthor,
                textbookCondition: formData.textbookCondition,
                textbookPrice: parseFloat(formData.textbookPrice),
                courseId: parseInt(formData.courseId),
                professorId: parseInt(formData.professorId)
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating textbook:', error);
            alert('Failed to create textbook. Please check your inputs.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="add-book-container">
            <button 
        onClick={() => navigate('/')}
        className="go-back-btn">
        ← Go Back to Main Page
    </button>
            <h1>Add New Textbook</h1>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label>Textbook Name:</label>
                    <input
                        type="text"
                        name="textbookName"
                        value={formData.textbookName}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="textbookAuthor"
                        value={formData.textbookAuthor}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Course Category:</label>
                    <select
                        name="textbookCondition"
                        value={formData.textbookCondition}
                        onChange={handleChange}
                        required
                    >
                        {courseCategories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="textbookPrice"
                        value={formData.textbookPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Course:</label>
                    <select
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.courseSubject} {course.courseNumber}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Professor:</label>
                    <select
                        name="professorId"
                        value={formData.professorId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Professor</option>
                        {professors.map(professor => (
                            <option key={professor.id} value={professor.id}>
                                {professor.professorFname} {professor.professorLname}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button type="submit" className="submit-btn">Add Textbook</button>
            </form>
        </div>
    );
}

export default AddBookPage;