from config import db
from flask_sqlalchemy import SQLAlchemy

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    course_subject = db.Column(db.String(10), nullable=False)
    course_number = db.Column(db.String(10), nullable=False)

    # Relationship to Textbook (one-to-many)
    textbooks = db.relationship("Textbook", backref="course", lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "courseSubject": self.course_subject,
            "courseNumber": self.course_number
        }
        


class Professor(db.Model):
    __tablename__ = "professors"
    id = db.Column(db.Integer, primary_key=True)
    professor_fname = db.Column(db.String(50), nullable=False)
    professor_lname = db.Column(db.String(50), nullable=False)

    # Relationship to Textbook (one-to-many)
    textbooks = db.relationship("Textbook", backref="professor", lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "professorFname": self.professor_fname,
            "professorLname": self.professor_lname
        }

class Textbook(db.Model):
    __tablename__ = "textbooks"
    id = db.Column(db.Integer, primary_key=True)
    textbook_name = db.Column(db.String(100), nullable=False)
    textbook_author = db.Column(db.String(100), nullable=False)
    textbook_condition = db.Column(db.String(20), nullable=False)
    textbook_price = db.Column(db.Float, nullable=False)

    # Foreign Keys (Many-to-One)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey("professors.id"), nullable=False)

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
