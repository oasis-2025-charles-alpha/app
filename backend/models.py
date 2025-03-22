from config import db
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    course_subject = db.Column(db.String(10), nullable=False)
    course_number = db.Column(db.String(4), nullable=False)
    college_id = db.Column(db.Integer, db.ForeignKey("colleges.id"), nullable=True)

    # Relationship to Textbook (one-to-many)
    textbooks = db.relationship("Textbook", backref="course", lazy=True)

    def __init__(self, **kwargs):
        # Automatically capitalize course subject
        kwargs['course_subject'] = kwargs.get('course_subject', '').upper()
        super(Course, self).__init__(**kwargs)

    def to_json(self):
        return {
            "id": self.id,
            "courseSubject": self.course_subject,
            "courseNumber": self.course_number,
            "collegeId": self.college_id
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
   # textbook_condition = db.Column(db.String(20), nullable=False)
   # textbook_image = db.Column(db.String(255), nullable=False)
    textbook_price = db.Column(db.Float, nullable=False)
    textbook_image = db.Column(db.String(800), nullable=True)

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
            "textbookImage": self.textbook_image,
            "courseId": self.course_id,
            "professorId": self.professor_id
        }
    
class College(db.Model):
    __tablename__ = "colleges"
    id = db.Column(db.Integer, primary_key=True)
    college_name = db.Column(db.String(80), nullable=False)

    course = db.relationship("Course", backref="college_rel", lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "college_name": self.college_name
        }
    
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "passwordHash": self.password_hash
        }