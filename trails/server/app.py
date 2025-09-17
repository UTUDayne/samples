from flask import Flask
from flask import request

app = Flask(__name__)

trails = [
    {"name": "Dead horse point", "length": "80"},
    {"name": "delicate arch", "length": "805"}
]

@app.route("/trails", methods=["GET"])
def hello_world():
    return trails, {"Access-Control-Allow-Origin":"*"}

@app.route("/trails", methods=["POST"])
def home():
    print(request.form)
    trails.append({"name":request.form['name']})
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

def main():
    app.run()

main()