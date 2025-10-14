from flask import Flask
from flask import request
from db import DB

app = Flask(__name__)

@app.route("/trails<int:id>", methods=["OPTIONS"])
def do_preflight(id):
    return '', 204, {"Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"PUT, DELETE",
                     "Access-Control-Allow-Headers":"Content-Type"}

trails = [
    {"name": "Dead horse point", "length": "80"},
    {"name": "delicate arch", "length": "805"}
]
def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

@app.route("/trails", methods=["GET"])
def hello_world():
    db = DB("db.db")
    trails = db.readall()
    return trails, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/trails", methods=["POST"])
def home():
    db = DB("db.db")
    print(request.form)
    #trails.append({"name":request.form['name']})
    record = {"name" : request.form["name"], "length" : request.form['length']}
    db.insert(request.form)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/trails", methods["PUT"])
def update():
    pass

@app.route("/trails/<int:id>", methods["DELETE"])
def delete_trail():
    db = DB("db.db")
    db.delete(id)
    return "Deleted", 200 {"Access-Control-Allow-Origin":"*"}

def main():
    app.run()

main()