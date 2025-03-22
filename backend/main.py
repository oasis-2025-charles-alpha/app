from flask import request, jsonify
from config import app, db, jwt
from models import Textbook, Professor, Course, User, College
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


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
    data = request.json
    professor_fname = data.get("professorFname")
    professor_lname = data.get("professorLname")

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

    try:
        db.session.commit()
        return jsonify({"message": "Professor updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating professor", "error": str(e)}), 500

# Delete a professor
@app.route("/delete_professor/<int:professor_id>", methods=["DELETE"]) 
def delete_professor(professor_id):
    professor = db.session.get(Professor, professor_id)

    if not professor:
        return jsonify({"message": "Professor not found"}), 404
    
    try:
        db.session.delete(professor)
        db.session.commit()
        return jsonify({"message": "Professor deleted!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting professor", "error": str(e)}), 500

# College DB
@app.route('/colleges', methods=['GET'])
def get_colleges():
    colleges = College.query.all()
    json_colleges = [college.to_json() for college in colleges]
    return jsonify({"colleges": json_colleges})

@app.route("/create_college", methods=["POST"])
def create_college():
    data = request.json
    college_name = data.get("collegeName")

    if not college_name:
        return jsonify({"message": "Please complete all fields"}), 400

    new_college = College(
        college_name = college_name
    )

    try:
        db.session.add(new_college)
        db.session.commit()
        return jsonify({"message": "College created!", "id": new_college.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error adding course", "error": str(e)}), 500
    
@app.route("/update_course/<int:college_id>", methods=["PATCH"])
def update_college(college_id):
    college = db.session.get(College, college_id)

    if not college:
        return jsonify({"message": "College not found"}), 404
    
    data = request.json
    college.college_name = data.get("collegeName", college.college_name)

    try:
        db.session.commit()
        return jsonify({"message": "College successfully updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating course", "error":str(e)}), 500
    
@app.route("/delete_course/<int:college_id>", methods=["DELETE"])
def delete_college(college_id):
    college = db.session.get(College, college_id)

    if not college:
        return jsonify({"message": "College not found"}), 404
    
    try:   
        db.session.delete(college)
        db.session.commit()
        return jsonify({"message": "College deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting College", "error":str(e)}), 500
    
# Course Commands
# Get all courses
@app.route("/courses", methods=["GET"])
def get_courses():
    courses = Course.query.order_by(Course.course_subject.asc()).all()
    json_courses = [course.to_json() for course in courses]
    return jsonify({"courses": json_courses})

# Create Course
@app.route("/create_course", methods=["POST"])
def create_course():
    data = request.json
    course_subject = data.get("courseSubject")
    course_number = data.get("courseNumber")
    college_id = data.get("collegeId")

    #limit couse number to 4 digit long
    if not course_number.isdigit() or len(course_number) != 4:
        return (jsonify({"message": "Course number must be 4 digits"}), 400)

    if not course_subject or not college_id:
        return (jsonify({"message": "Missing required fields"}), 400)

    if not course_number or not course_subject:
        return (
            jsonify({"message": "You must fully complete the form!"}),
            400
        )

    college = db.session.get(College, college_id)

    if not college:
        return (
            jsonify({"message": "Please enter a college!"}),
            400
        )
    
    new_course = Course(course_subject = course_subject,
                        course_number = course_number,
                        college_id = college_id)
    
    try:
        db.session.add(new_course)
        db.session.commit()
        return jsonify({"message": "Course created!", "id": new_course.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error adding course", "error": str(e)}), 500

# Update Course
@app.route("/update_course/<int:course_id>", methods=["PATCH"])
def update_course(course_id):
    course = db.session.get(Course, course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    data = request.json
    
    # Update course subject with capitalization
    if 'courseSubject' in data:
        course.course_subject = data['courseSubject'].upper()
    
    # Validate and update course number
    if 'courseNumber' in data:
        course_number = str(data['courseNumber'])
        if not course_number.isdigit() or len(course_number) != 4:
            return jsonify({"message": "Course number must be 4 digits"}), 400
        course.course_number = course_number
    
    # Validate and update college
    if 'collegeId' in data:
        college = db.session.get(College, data['collegeId'])
        if not college:
            return jsonify({"message": "College not found"}), 400
        course.college_id = data['collegeId']

    try:
        db.session.commit()
        return jsonify({"message": "Course updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating course", "error": str(e)}), 500

# Delete course
@app.route("/delete_course/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    course = db.session.get(Course, course_id)

    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    try:
        db.session.delete(course)
        db.session.commit()
        return jsonify({"message": "Course deleted!"}, 200)
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting course", "error": str(e)}), 500

# Get all textbooks (with optional filters for course_id & professor_id)
@app.route("/textbooks", methods=["GET"])
def get_textbooks():
    course_id = request.args.get("courseId", type=int)
    professor_id = request.args.get("professorId", type=int)
    textbook_min_price = request.args.get("textbookMinPrice", type=float) 
    textbook_max_price = request.args.get("textbookMaxPrice", type=float)
    textbook_condition = request.args.get("textbookCondition")

    # Start the query by joining necessary tables
    query = db.session.query(
        Textbook.id,
        Textbook.textbook_name,
        Textbook.textbook_author,
        Textbook.textbook_price,
     #   Textbook.textbook_condition,
        Textbook.textbook_image,
        Course.course_subject,
        Course.course_number,
        College.college_name,
        Professor.professor_fname,
        Professor.professor_lname
    ).join(Course, Textbook.course_id == Course.id
    ).join(College, College.id == Course.college_id
    ).join(Professor, Textbook.professor_id == Professor.id)

    # Apply filters if they exist
    if course_id:
        query = query.filter(Course.id == course_id)
    if professor_id:
        query = query.filter(Professor.id == professor_id)
    if textbook_min_price:
        query = query.filter(Textbook.textbook_price >= textbook_min_price)
    if textbook_max_price:
        query = query.filter(Textbook.textbook_price <= textbook_max_price)
    if textbook_condition:
        query = query.filter(Textbook.textbook_condition == textbook_condition)

    # Execute the query
    textbooks = query.all()

    # Convert results to a list of dictionaries
    textbook_list = [
        {
            "id": textbook.id,
            "textbook_name": textbook.textbook_name,
            "textbook_author": textbook.textbook_author,
            "textbook_price": textbook.textbook_price,
         #   "textbook_condition": textbook.textbook_condition,
            "textbook_image": textbook.textbook_image,
            "course_subject": textbook.course_subject,
            "course_number": textbook.course_number,
            "college_name": textbook.college_name,
            "professor_fname": textbook.professor_fname,
            "professor_lname": textbook.professor_lname,
        }
        for textbook in textbooks
    ]

    return jsonify({"textbooks": textbook_list})


@app.route("/create_textbook", methods=["POST"])
#@jwt_required()
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

    new_textbook = Textbook(
            textbook_name=data["textbookName"],
            textbook_author=data["textbookAuthor"],
      #      textbook_condition=data["textbookCondition"],
            textbook_image=data["textbookImage"],
            textbook_price=textbook_price,
            course_id=data["courseId"],
            professor_id=data["professorId"]
        )
        
    # Create new textbook entry
    try:
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
   # textbook.textbook_condition = data.get("textbookCondition", textbook.textbook_condition)
    textbook.textbook_image = data.get("textbookImage", textbook.textbook_image)
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

    try:
        db.session.delete(textbook)
        db.session.commit()
        return jsonify({"message": "Textbook deleted!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting textbook", "error": str(e)}), 500

# USER RESTFUL
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = [user.to_json() for user in users]

    return jsonify({"users": json_users})

@app.route("/create_user", methods=["POST"])
#@jwt_required()
def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")  # Can be None

    if not username:
        return jsonify({"message": "Please enter a username!"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User is already in the database!"}), 409

    # Handle optional password
    password_hash = generate_password_hash(password) if password else None

    new_user = User(username=username, password_hash=password_hash)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error creating user", "error": str(e)}), 500

    
@app.route("/update_user/<int:user_id>", methods=["POST"])
def update_user(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.username = data.get("username", user.username)

    new_password = data.get("password")
    if new_password:
        user.password_hash = generate_password_hash(new_password)
    elif new_password == "":
        # Clear the password if explicitly empty string
        user.password_hash = None

    try:
        db.session.commit()
        return jsonify({"message": "User updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating user", "error": str(e)}), 500

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    try:   
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting User", "error":str(e)}), 500

# USER AUTHENICATION
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username:
        return jsonify({"msg": "Username is required."}), 400

    user = User.query.filter_by(username=username).first()

    # If user exists but doesn't require a password
    if user and user.password_hash is None:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token, note="This account has no password."), 200

    # If user has a password and matches it
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Invalid username or password."}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"logged_in_as": current_user}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)