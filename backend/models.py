from config import db

class Textbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    textbook_name = db.Column(db.String(120), unique=False, nullable=False)
    textbook_author = db.Column(db.String(120), unique=False, nullable=False)
    textbook_condition = db.Column(db.Boolean, nullable=False)
    textbook_price = db.Column(db.Boolean, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey("professor.id"), nullable=False)

    course = db.relationship("Course", back_populates="textbooks")
    professor = db.relationship("Professor", back_populates="textbooks")

    def to_json(self):
        return {
            "id": self.id,
            "textbookName": self.textbook_name,
            "textbookAuthor": self.textbook_author,
            "textbookCondition": self.textbook_condition,
            "textbookPrice": self.textbook_price,
            "courseId": self.course_id,
            "professorId": self.professor_id
        }
    
class Professor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    professor_fname = db.Column(db.String(120), unique=False, nullable=False)
    professor_lname = db.Column(db.String(120), unique=False, nullable=False)

    textbooks = db.relationship("Textbook", back_populates="professor", cascade="all, delete-orphan")

    def to_json(self):
        return {
            "id": self.id,
            "professorFname": self.professor_fname,
            "professorLname": self.professor_lname,
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_subject = db.Column(db.String(80), unique=False, nullable=False)
    course_number = db.Column(db.Integer, unique=True, nullable=False)
    
    textbooks = db.relationship("Textbook", back_populates="course", cascade="all, delete-orphan")

    def to_json(self):
        return {
            "id": self.id,
            "courseSubject": self.course_subject,
            "courseNumber": self.course_number
        }
