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
        textbookPrice: '',
        courseId: '',
        professorId: '',
        // Remove textbookCondition from here
        courseSubject: '',
        courseNumber: '',
        professorFname: '',
        professorLname: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRes = await axios.get('http://localhost:5000/courses');
                const professorsRes = await axios.get('http://localhost:5000/professors')
                
                setCourses(coursesRes.data.courses);
                setProfessors(professorsRes.data.professors);
                
                // Extract unique course subjects
                const uniqueSubjects = [...new Set(
                    coursesRes.data.courses.map(course => course.courseSubject)
                )];
                setCourseCategories(uniqueSubjects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let professorId = formData.professorId;
            
            // 1. Handle professor first
            if (!professorId) {
                if (!formData.professorFname || !formData.professorLname) {
                    alert('Please either select an existing professor or create a new one');
                    return;
                }
                const professorRes = await axios.post('http://127.0.0.1:5000/create_professor', {
                    professorFname: formData.professorFname,
                    professorLname: formData.professorLname
                });
                professorId = professorRes.data.id; // Ensure this matches backend response
            }
    
            // 2. Handle course second
            let courseId = formData.courseId;
            let courseSubject = '';
            
            if (!courseId) {
                if (!formData.courseSubject || !formData.courseNumber) {
                    alert('Please either select an existing course or create a new one');
                    return;
                }
                const courseRes = await axios.post('http://127.0.0.1:5000/create_course', {
                    courseSubject: formData.courseSubject,
                    courseNumber: formData.courseNumber
                });
                courseId = courseRes.data.id;
                courseSubject = formData.courseSubject;
            } else {
                const selectedCourse = courses.find(c => c.id === courseId);
                courseSubject = selectedCourse?.courseSubject || '';
            }
    
            // 3. Create textbook with all resolved IDs
            await axios.post('http://127.0.0.1:5000/create_textbook', {
                textbookName: formData.textbookName,
                textbookAuthor: formData.textbookAuthor,
                textbookCondition: courseSubject,
                textbookPrice: parseFloat(formData.textbookPrice),
                courseId: courseId,
                professorId: professorId
            });
    
            navigate('/');
        } catch (error) {
            console.error('Full error details:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Check console for details'}`);
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

                {/* Update Course Selection Section */}
                <div className="form-group">
                    <label>Course *</label>
                    <select
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.courseSubject} {course.courseNumber}
                            </option>
                        ))}
                    </select>
                    <span className="form-or">- OR -</span>
                    <div className="new-entry-group">
                        <input
                            type="text"
                            name="courseSubject"
                            placeholder="Subject (e.g., CS) *"
                            value={formData.courseSubject}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="courseNumber"
                            placeholder="Number (e.g., 2500) *"
                            value={formData.courseNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Professor:</label>
                    <select
                        name="professorId"
                        value={formData.professorId}
                        onChange={handleChange}
                    >
                        <option value="">Select Professor</option>
                        {professors.map(prof => (
                            <option key={prof.id} value={prof.id}>
                                {prof.professorFname} {prof.professorLname}
                            </option>
                        ))}
                    </select>
                    <span className="form-or">- OR -</span>
                    <div className="new-entry-group">
                        <input
                            type="text"
                            name="professorFname"
                            placeholder="New Professor First Name *"
                            value={formData.professorFname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="professorLname"
                            placeholder="New Professor Last Name *"
                            value={formData.professorLname}
                            onChange={handleChange}
                        />
                    </div>
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
                
                <button type="submit" className="submit-btn">Add Textbook</button>
            </form>
        </div>
    );
}

export default AddBookPage;