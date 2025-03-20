import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        textbookName: "",
        textbookAuthor: "",
        textbookCondition: "",
        textbookPrice: "",
        courseId: "",
        courseSubject: "",
        courseNumber: "",
        professorId: "",
        professorFname: "",
        professorLname: ""
    });

    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);

    // Fetch courses and professors
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await fetch("http://127.0.0.1:5000/courses");
                const professorsResponse = await fetch("http://127.0.0.1:5000/professors");

                const coursesData = await coursesResponse.json();
                const professorsData = await professorsResponse.json();

                setCourses(coursesData.courses); // Ensure response format matches
                setProfessors(professorsData.professors); // Ensure response format matches
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let professorId = formData.professorId;
            let courseId = formData.courseId;

            // Create new professor if not selected
            if (!professorId && formData.professorFname && formData.professorLname) {
                const professorResponse = await fetch("http://127.0.0.1:5000/create_professor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        professorFname: formData.professorFname,
                        professorLname: formData.professorLname
                    })
                });

                const professorResult = await professorResponse.json();
                if (!professorResponse.ok) {
                    alert(professorResult.message);
                    return;
                }
                professorId = professorResult.id;
            }

            // Create new course if not selected
            if (!courseId && formData.courseSubject && formData.courseNumber) {
                const courseResponse = await fetch("http://127.0.0.1:5000/create_course", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        courseSubject: formData.courseSubject,
                        courseNumber: formData.courseNumber
                    })
                });

                const courseResult = await courseResponse.json();
                if (!courseResponse.ok) {
                    alert(courseResult.message);
                    return;
                }
                courseId = courseResult.id;
            }

            // Validate before submitting the textbook
            if (!professorId || !courseId) {
                alert("Please select or create a professor and a course.");
                return;
            }

            console.log(courseId)
            console.log(professorId)

            // Create new textbook
            const textbookData = {
                textbookName: formData.textbookName,
                textbookAuthor: formData.textbookAuthor,
                textbookCondition: formData.textbookCondition,
                textbookPrice: parseFloat(formData.textbookPrice),  // Ensure price is a number
                courseId: parseInt(courseId, 10),  // Ensure courseId is an integer
                professorId: parseInt(professorId, 10)  // Ensure professorId is an integer
            };
            

            const textbookResponse = await fetch("http://127.0.0.1:5000/create_textbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(textbookData),
            });

            const textbookResult = await textbookResponse.json();
            if (!textbookResponse.ok) {
                alert(textbookResult.message);
                return;
            }

            alert("Textbook added successfully!");
            navigate("/");
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
                    <label>Condition:</label>
                    <select
                        name="textbookCondition"
                        value={formData.textbookCondition}
                        onChange={handleChange}
                        required
                    >
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Course:</label>
                    <select name="courseId" value={formData.courseId} onChange={handleChange}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.courseSubject} {course.courseNumber}
                            </option>
                        ))}
                    </select>
                    <span>- OR -</span>
                    <input type="text" name="courseSubject" placeholder="Subject" value={formData.courseSubject} onChange={handleChange} />
                    <input type="number" name="courseNumber" placeholder="Number" value={formData.courseNumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Professor:</label>
                    <select name="professorId" value={formData.professorId} onChange={handleChange}>
                        <option value="">Select Professor</option>
                        {professors.map(prof => (
                            <option key={prof.id} value={prof.id}>
                                {prof.professorFname} {prof.professorLname}
                            </option>
                        ))}
                    </select>
                    <span>- OR -</span>
                    <input type="text" name="professorFname" placeholder="First Name" value={formData.professorFname} onChange={handleChange} />
                    <input type="text" name="professorLname" placeholder="Last Name" value={formData.professorLname} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" step="0.01" name="textbookPrice" value={formData.textbookPrice} onChange={handleChange} required />
                </div>

                <button type="submit" className="submit-btn">Add Textbook</button>
            </form>
        </div>
    );
};

export default AddBookPage;
