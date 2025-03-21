from flask import request, jsonify
from config import app, db
from models import Textbook, Professor, Course
from sqlalchemy import text


# Professor commands
# Get all Professors
@app.route("/professors", methods=["GET"])
def get_professors():
    professors = Professor.query.all()
    json_professors = [prof.to_json() for prof in professors]
    return jsonify({"professors": json_professors})

# Add a professor to the database
@app.route("/create_professor", methods=["POST"])
def create_professor():
    professor_fname = request.json.get("professorFname")
    professor_lname = request.json.get("professorLname")

    if not professor_fname or not professor_lname:
        return (
            jsonify({"message": "You must include the professor's full name"}),
            400,
        )
    
    new_professor = Professor(professor_fname = professor_fname,
                              professor_lname = professor_lname)
    try:
        db.session.add(new_professor)
        db.session.commit()
        return jsonify({"message": "Professor added!", "id": new_professor.id}), 201
    except Exception as e:
        return jsonify({"message": "Error adding professor", "error": str(e)}), 500


# Update a professor's name
@app.route("/update_professor/<int:professor_id>", methods=["PATCH"])
def update_professor(professor_id):
    professor = db.session.get(Professor, professor_id)

    if not professor:
        return jsonify({"message": "Professor not found"}), 404
    
    data = request.json
    professor.professor_fname = data.get("professorFname", professor.professor_fname)
    professor.professor_lname = data.get("professorLname", professor.professor_lname)


    db.session.commit()

    return jsonify({"message": "Professor updated."}), 200

# Delete a professor
@app.route("/delete_professor/<int:professor_id>", methods=["DELETE"]) 
def delete_professor(professor_id):
    professor = db.session.get(Professor, professor_id)

    if not professor:
        return jsonify({"message": "Professor not found"}), 404
    
    db.session.delete(professor)
    db.session.commit()

    return jsonify({"message": "Course deleted!"}), 200


# Course Commands
# Get all courses
@app.route("/courses", methods=["GET"])
def get_courses():
    courses = Course.query.all()
    json_courses = [course.to_json() for course in courses]
    return jsonify({"courses": json_courses})

# Create Course
@app.route("/create_course", methods=["POST"])
def create_course():
    course_subject = request.json.get("courseSubject")
    course_number = request.json.get("courseNumber")

    if not course_number or not course_subject:
        return (
            jsonify({"message": "You must fully complete the form!"}),
            400
        )
    
    new_course = Course(course_subject = course_subject,
                        course_number = course_number)
    try:
        db.session.add(new_course)
        db.session.commit()
        return jsonify({"message": "Course created!", "id": new_course.id}), 201
    except Exception as e:
        return jsonify({"message": "Error adding course", "error": str(e)}), 500

# Update Course
@app.route("/update_course/<int:course_id>", methods=["PATCH"])
def update_course(course_id):
    course = db.session.get(Course, course_id)

    if not course:
        return jsonify({"message": "Course not found"})
    
    data = request.json
    course.course_subject = data.get("courseSubject", course.course_subject)
    course.course_number = data.get("courseNumber", course.course_number)

    db.session.commit()

    return jsonify({"message": "Course updated."}), 200

# Delete course
@app.route("/delete_course/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    course = db.session.get(Course, course_id)

    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": "Course deleted!"}, 200)

# Get all textbooks (with optional filters for course_id & professor_id)
@app.route("/textbooks", methods=["GET"])
def get_textbooks():
    course_id = request.args.get("courseId", type=int)
    professor_id = request.args.get("professorId", type=int)
    textbook_price = request.args.get("textbookPrice", type=float)
    textbook_condition = request.args.get("textbookCondition")

    # Start the query by joining necessary tables
    query = db.session.query(
        Textbook.textbook_name,
        Textbook.textbook_author,
        Textbook.textbook_price,
        Textbook.textbook_condition,
        Course.course_subject,
        Course.course_number,
        Professor.professor_fname,
        Professor.professor_lname
    ).join(Course, Textbook.course_id == Course.id
    ).join(Professor, Textbook.professor_id == Professor.id)

    # Apply filters if they exist
    if course_id:
        query = query.filter(Course.id == course_id)
    if professor_id:
        query = query.filter(Professor.id == professor_id)
    if textbook_price:
        query = query.filter(Textbook.textbook_price == textbook_price)
    if textbook_condition:
        query = query.filter(Textbook.textbook_condition == textbook_condition)

    # Execute the query
    textbooks = query.all()

    # Convert results to a list of dictionaries
    textbook_list = [
        {
            "textbook_name": textbook.textbook_name,
            "textbook_author": textbook.textbook_author,
            "textbook_price": textbook.textbook_price,
            "textbook_condition": textbook.textbook_condition,
            "course_subject": textbook.course_subject,
            "course_number": textbook.course_number,
            "professor_fname": textbook.professor_fname,
            "professor_lname": textbook.professor_lname,
        }
        for textbook in textbooks
    ]

    return jsonify({"textbooks": textbook_list})


@app.route("/create_textbook", methods=["POST"])
def create_textbook():
    data = request.get_json()

    # Validate required fields
    required_fields = ["textbookName", "textbookAuthor", "textbookPrice", "courseId", "professorId"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"Missing required field: {field}"}), 400

    # Ensure course and professor exist
    course = db.session.get(Course, data["courseId"])
    professor = db.session.get(Professor, data["professorId"])

    if not course:
        return jsonify({"message": f"Course ID {data['courseId']} not found"}), 400
    if not professor:
        return jsonify({"message": f"Professor ID {data['professorId']} not found"}), 400

    # Convert and validate price
    try:
        textbook_price = float(data["textbookPrice"])
    except ValueError:
        return jsonify({"message": "Invalid price format"}), 400

    print(data["courseId"])
    print(data["professorId"])
    
    # Create new textbook entry
    try:
        new_textbook = Textbook(
            textbook_name=data["textbookName"],
            textbook_author=data["textbookAuthor"],
            textbook_condition=data["textbookCondition"],
            textbook_price=textbook_price,
            course_id=data["courseId"],
            professor_id=data["professorId"]
        )
        
        db.session.add(new_textbook)
        db.session.commit()

        return jsonify({"message": "Textbook added successfully!", "id": new_textbook.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error adding textbook", "error": str(e)}), 500


@app.route("/update_textbook/<int:textbook_id>", methods=["PATCH"])
def update_textbook(textbook_id):
    textbook = db.session.get(Textbook, textbook_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404

    data = request.json
    textbook.textbook_name = data.get("textbookName", textbook.textbook_name)
    textbook.textbook_author = data.get("textbookAuthor", textbook.textbook_author)
    textbook.textbook_condition = data.get("textbookCondition", textbook.textbook_condition)
    textbook.course_id = data.get("courseId", textbook.course_id)
    textbook.professor_id = data.get("professorId", textbook.professor_id)

    try:
        db.session.commit()
        return jsonify({"message": "Textbook updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating textbook", "error": str(e)}), 500


@app.route("/delete_textbook/<int:textbook_id>", methods=["DELETE"])
def delete_textbook(textbook_id):
    textbook = db.session.get(Textbook, textbook_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404

    db.session.delete(textbook)
    db.session.commit()

    return jsonify({"message": "Textbook deleted!"}), 200

def reset_database():
    meta = db.metadata
    with db.session.begin():
        for table in reversed(meta.sorted_tables):
            db.session.execute(table.delete())  # Delete all records from each table
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        #reset_database()

    app.run(debug=True)
