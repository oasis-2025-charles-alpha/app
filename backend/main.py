from flask import request, jsonify
from config import app, db
from models import Textbook

@app.route("/textbooks", methods=["GET"])
def get_textbooks():
    textbooks = Textbook.query.all()
    json_textbooks = list(map(lambda x: x.to_json(), textbooks))
    return jsonify({"textbooks": json_textbooks})

@app.route("/create_textbook", methods=["POST"])
def create_text():
    course_subject = request.json.get("courseSubject")
    course_number = request.json.get("courseNumber")
    professor_fname = request.json.get("professorFname")
    professor_lname = request.json.get("professorLname")

    if not course_number or not course_subject or not professor_fname or not professor_lname:
        return (
            jsonify({"message": "You must include a course number / course subject" +
                     "and professor first/last name."}),
            400,
        )
    
    new_textbook = Textbook(course_subject=course_subject,
                            course_number=course_number,
                            professor_fname = professor_fname,
                            professor_lname = professor_lname)
    try:
        db.session.add(new_textbook)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "Textbook created!"}), 201
    
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_textbook(user_id):
    textbook = Textbook.query.get(user_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404
    
    data = request.json
    textbook.course_subject = data.get("courseSubject", textbook.course_subject)
    textbook.course_number = data.get("courseNumber", textbook.course_number)
    textbook.professor_fname = data.get("professorFname", textbook.professor_fname)
    textbook.professor_lname = data.get("professorLname", textbook.professor_lname)

    db.session.commit()

    return jsonify({"message": "Textbook updated."}), 200

@app.route("/delete_textbook/<int:textbook_id>", methods=["DELETE"])
def delete_textbook(user_id):
    textbook = Textbook.query.get(user_id)

    if not textbook:
        return jsonify({"message": "Textbook not found"}), 404
    
    db.session.delete(textbook)
    db.session.commit()

    return jsonify({"message": "Textbook deleted!"}, 200)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)