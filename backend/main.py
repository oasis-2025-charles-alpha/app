from flask import request, jsonify
from config import app, db
from models import Textbook

@app.route("/textbooks", methods=["GET"])
def get_textbooks():
    textbooks = Textbook.query.all()
    json_textbooks = list(map(lambda x: x.to_json(), textbooks))
    return jsonify({"textbooks": json_textbooks})