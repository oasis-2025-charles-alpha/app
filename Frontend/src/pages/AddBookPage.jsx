import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
    const [formData, setFormData] = useState({
        textbookName: "",
        textbookAuthor: "",
        textbookCondition: "",
        textbookPrice: "",
        courseId: "",
        courseSubject: "",
        courseNumber: "",
        courseCollege: "",
        professorId: "",
        professorFname: "",
        professorLname: ""
    });

    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await fetch("http://127.0.0.1:5000/courses");
                const professorsResponse = await fetch("http://127.0.0.1:5000/professors");

                const coursesData = await coursesResponse.json();
                const professorsData = await professorsResponse.json();

                setCourses(coursesData);
                setProfessors(professorsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (e) => {
        const navigate = useNavigate();

        e.preventDefault();
    
        try {
            // Create Professor
            let professorId = formData.professorId;
    
            if (!professorId && formData.professorFname && formData.professorLname) {
                const professorData = {
                    professorFname: formData.professorFname,
                    professorLname: formData.professorLname,
                };
    
                const professorResponse = await fetch("http://127.0.0.1:5000/create_professor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(professorData),
                });
    
                if (!professorResponse.ok) {
                    const data = await professorResponse.json();
                    alert(data.message);
                    return;
                }
    
                const professorResult = await professorResponse.json();
                professorId = professorResult.id;
            }
    
            let courseId = formData.courseId;
            
            // Create Course
            if (!courseId && formData.courseSubject && formData.courseNumber) {
                const courseData = {
                    courseSubject: formData.courseSubject,
                    courseNumber: formData.courseNumber,
                    courseCollege: formData.courseCollege,
                };
    
                const courseResponse = await fetch("http://127.0.0.1:5000/create_course", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(courseData),
                });
    
                if (!courseResponse.ok) {
                    const courseData = await courseResponse.json();
                    alert(courseData.message);
                    return;
                }
    
                const courseResult = await courseResponse.json();
                courseId = courseResult.id;
            }
    
            // Create Textbook
            const textbookData = {
                textbookName: formData.textbookName,
                textbookAuthor: formData.textbookAuthor,
                textbookCondition: formData.textbookCondition,
                textbookPrice: formData.textbookPrice,
                courseId,
                professorId,
            };
    
            const textbookResponse = await fetch("http://127.0.0.1:5000/create_textbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(textbookData),
            });
    
            if (!textbookResponse.ok) {
                const textbookData = await textbookResponse.json();
                alert(textbookData.message);
                return;
            }
    
            alert("Textbook added successfully!");
    
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the textbook.");
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
            <form onSubmit={onSubmit} className="add-book-form">
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
export default AddBookPage

// function AddBookPage() {
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [professors, setProfessors] = useState([]);
//     const [courseCategories, setCourseCategories] = useState([]);
//     const [formData, setFormData] = useState({
//         textbookName: '',
//         textbookAuthor: '',
//         textbookPrice: '',
//         courseId: '',
//         professorId: '',
//         // Remove textbookCondition from here
//         courseSubject: '',
//         courseNumber: '',
//         professorFname: '',
//         professorLname: ''
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const coursesRes = await axios.get('http://localhost:5000/courses');
//                 const professorsRes = await axios.get('http://localhost:5000/professors')
                
//                 setCourses(coursesRes.data.courses);
//                 setProfessors(professorsRes.data.professors);
                
//                 // Extract unique course subjects
//                 const uniqueSubjects = [...new Set(
//                     coursesRes.data.courses.map(course => course.courseSubject)
//                 )];
//                 setCourseCategories(uniqueSubjects);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let professorId = formData.professorId;
        
//             if (!professorId) {
//                 if (!formData.professorFname || !formData.professorLname) {
//                     alert('Please either select an existing professor or create a new one');
//                     return;
//                 }
//                 const professorRes = await axios.post('http://127.0.0.1:5000/create_professor', {
//                     professorFname: formData.professorFname,
//                     professorLname: formData.professorLname
//                 });
//                 professorId = professorRes.data.id; 
//             }
    
           
//             let courseId = formData.courseId;
//             let courseSubject = '';
            
//             if (!courseId) {
//                 if (!formData.courseSubject || !formData.courseNumber) {
//                     alert('Please either select an existing course or create a new one');
//                     return;
//                 }
//                 const courseRes = await axios.post('http://127.0.0.1:5000/create_course', {
//                     courseSubject: formData.courseSubject,
//                     courseNumber: formData.courseNumber
//                 });
//                 courseId = courseRes.data.id;
//                 courseSubject = formData.courseSubject;
//             } else {
//                 const selectedCourse = courses.find(c => c.id === courseId);
//                 courseSubject = selectedCourse?.courseSubject || '';
//             }
    
//             await axios.post('http://127.0.0.1:5000/create_textbook', {
//                 textbookName: formData.textbookName,
//                 textbookAuthor: formData.textbookAuthor,
//                 textbookCondition: courseSubject,
//                 textbookPrice: parseFloat(formData.textbookPrice),
//                 courseId: courseId,
//                 professorId: professorId
//             });
    
//             navigate('/');
//         } catch (error) {
//             console.error('Full error details:', error.response?.data || error.message);
//             alert(`Error: ${error.response?.data?.message || 'Check console for details'}`);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <div className="add-book-container">
//             <button 
//         onClick={() => navigate('/')}
//         className="go-back-btn">
//         ← Go Back to Main Page
//     </button>
//             <h1>Add New Textbook</h1>
//             <form onSubmit={handleSubmit} className="add-book-form">
//                 <div className="form-group">
//                     <label>Textbook Name:</label>
//                     <input
//                         type="text"
//                         name="textbookName"
//                         value={formData.textbookName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
                
//                 <div className="form-group">
//                     <label>Author:</label>
//                     <input
//                         type="text"
//                         name="textbookAuthor"
//                         value={formData.textbookAuthor}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>


//                 <div className="form-group">
//                     <label>Course *</label>
//                     <select
//                         name="courseId"
//                         value={formData.courseId}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select Course</option>
//                         {courses.map(course => (
//                             <option key={course.id} value={course.id}>
//                                 {course.courseSubject} {course.courseNumber}
//                             </option>
//                         ))}
//                     </select>
//                     <span className="form-or">- OR -</span>
//                     <div className="new-entry-group">
//                         <input
//                             type="text"
//                             name="courseSubject"
//                             placeholder="Subject (e.g., CS) *"
//                             value={formData.courseSubject}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="number"
//                             name="courseNumber"
//                             placeholder="Number (e.g., 2500) *"
//                             value={formData.courseNumber}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
                
//                 <div className="form-group">
//                     <label>Professor:</label>
//                     <select
//                         name="professorId"
//                         value={formData.professorId}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select Professor</option>
//                         {professors.map(prof => (
//                             <option key={prof.id} value={prof.id}>
//                                 {prof.professorFname} {prof.professorLname}
//                             </option>
//                         ))}
//                     </select>
//                     <span className="form-or">- OR -</span>
//                     <div className="new-entry-group">
//                         <input
//                             type="text"
//                             name="professorFname"
//                             placeholder="New Professor First Name *"
//                             value={formData.professorFname}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="text"
//                             name="professorLname"
//                             placeholder="New Professor Last Name *"
//                             value={formData.professorLname}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="form-group">
//                     <label>Price:</label>
//                     <input
//                         type="number"
//                         step="0.01"
//                         name="textbookPrice"
//                         value={formData.textbookPrice}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
                
//                 <button type="submit" className="submit-btn">Add Textbook</button>
//             </form>
//         </div>
//     );
// }

// export default AddBookPage