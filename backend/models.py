from config import db

class Textbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_subject = db.Column(db.Integer, unique=False, nullable=False)
    course_number = db.Column(db.String(80), unique=False, nullable=False)
    professor_fname = db.Column(db.String(120), unique=False, nullable=False)
    professor_lname = db.Column(db.String(120), unique =False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "courseSubject": self.course_subject,
            "courseNumber": self.course_number,
            "professorFname": self.professor_fname,
            "professorLname": self.professor_lname
        }