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
        return jsonify({"message": "Professor added!"}), 201
    except Exception as e:
        return jsonify({"message": "Error adding professor", "error": str(e)}), 500


# Update a professor's name
@app.route("/update_professor/<int:professor_id>", methods=["PATCH"])
def update_professor(professor_id):
    professor = Professor.query.get(professor_id)

    if not professor:
        return jsonify({"message": "Professor not found"}), 404
    
    data = request.json
    professor.fname = data.get("professorFname", 
                               professor.professor_fname)
    professor.lname = data.get("professorLname", 
                               professor.professor_lname)

    db.session.commit()

    return jsonify({"message": "Professor updated."}), 200

# Delete a professor
@app.route("/delete_professor/<int:professor_id>", methods=["DELETE"]) 
def delete_professor(professor_id):
    professor = Professor.query.get(professor_id)

    if not professor:
        return jsonify({"message": "Professor not found"}), 404
    
    db.session.delete(professor)
    db.session.commit()

    return jsonify({"message": "Professor deleted!"}), 200

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
        return jsonify({"message": "Course created!"}), 201
    except Exception as e:
        return jsonify({"message": "Error adding course", "error": str(e)}), 500

# Update Course
@app.route("/update_course/<int:course_id>", methods=["PATCH"])
def update_course(course_id):
    course = Course.query.get(course_id)

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
    course = Course.query.get(course_id)

    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": "Course deleted!"}, 200)

# Get all textbooks (with optional filters for course_id & professor_id)
@app.route("/textbooks", methods=["GET"])
def get_textbooks():
    course_id = int(request.json.get("courseId", 0))
    professor_id = int(request.json.get("professorId", 0))
    textbook_price = float(request.json.get("textbookPrice", 0))
    textbook_condition = request.args.get("textbookCondition")

    sql = """
        SELECT professor.professor_fname, professor.professor_lname,
               course.course_subject, course.course_number,
               textbook.textbook_name, textbook.textbook_author,
               textbook.textbook_price, textbook.textbook_condition
        FROM textbook
        JOIN course ON textbook.course_id = course.id
        JOIN professor ON textbook.professor_id = professor.id
    """

    filters = []
    params = {}

    if course_id:
        filters.append("course.id = :course_id")
        params["course_id"] = course_id
    if professor_id:
        filters.append("professor.id = :professor_id")
        params["professor_id"] = professor_id
    if textbook_price:
        filters.append("textbook.textbook_price = :textbook_price")
        params["textbook_price"] = textbook_price
    if textbook_condition:
        filters.append("textbook.textbook_condition = :textbook_condition")
        params["textbook_condition"] = textbook_condition

    if filters:
        sql += " WHERE " + " AND ".join(filters)

    result = db.session.execute(text(sql), params)
    textbooks = [dict(row._mapping) for row in result]

    return jsonify({"textbooks": textbooks})

@app.route("/create_textbook", methods=["POST"])
def create_textbook():
    textbook_name = request.json.get("textbookName")
    textbook_author = request.json.get("textbookAuthor")
    textbook_condition = request.json.get("textbookCondition")
    textbook_price = request.json.get("textbookPrice")
    course_id = request.json.get("courseId")
    professor_id = request.json.get("professorId")

    # if (not textbook_name or not textbook_author or not 
    #     textbook_price or not course_id or not professor_id):
    #     return jsonify({"message": "All fields are required!"}), 400
    if not textbook_name or not textbook_author or not textbook_price:
        return jsonify({"message": "test1"}), 400
    if not course_id:
        return jsonify({"message": "course"}), 400
    if not professor_id:
        return jsonify({"message": "professor"}), 400
    
    new_textbook = Textbook(
        textbook_name = textbook_name,
        textbook_author = textbook_author,
        textbook_condition = textbook_condition,
        textbook_price = textbook_price,
        course_id = course_id,
        professor_id = professor_id
    )

    db.session.add(new_textbook)
    db.session.commit()

    return jsonify({"message": "Textbook created!"}), 201

@app.route("/update_textbook/<int:textbook_id>", methods=["PATCH"])
def update_textbook(textbook_id):
    textbook = Textbook.query.get(textbook_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404

    data = request.json
    textbook.textbook_name = data.get("textbookName", textbook.textbook_name)
    textbook.textbook_author = data.get("textbookAuthor", textbook.textbook_author)
    textbook.textbook_condition = data.get("textbookCondition", textbook.textbook_condition)
    textbook.course_id = data.get("courseId", textbook.course_id)
    textbook.professor_id = data.get("professorId", textbook.professor_id)

    db.session.commit()
    return jsonify({"message": "Textbook updated."}), 200

@app.route("/delete_textbook/<int:textbook_id>", methods=["DELETE"])
def delete_textbook(textbook_id):
    textbook = Textbook.query.get(textbook_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404

    db.session.delete(textbook)
    db.session.commit()

    return jsonify({"message": "Textbook deleted!"}), 200

with app.app_context():
    db.create_all()

if __name__ == "__main__":

    app.run(debug=True)
