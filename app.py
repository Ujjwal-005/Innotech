from flask import Flask,render_template,redirect,request,session
import sqlite3

from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'


conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""create table if not exists users(id integer primary key autoincrement, username text not null unique, password not null)""")
conn.commit()
cursor.execute("""
CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    city TEXT NOT NULL,
    experience TEXT NOT NULL,
    contact TEXT NOT NULL
)""")
conn.commit()




conn.close()


CORS(app)

@app.after_request
def add_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

@app.route("/doctors", methods=['GET'])
def get_all_doctors():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM doctors")
    doctors = cursor.fetchall()
    conn.close()
    
    # Format data into a list of dictionaries
    doctors_list = [
        {"id": doc[0], "name": doc[1], "specialty": doc[2], "city":doc[3],"experience": doc[4],"contact":doc[5]}
        for doc in doctors
    ]
    return {"doctors": doctors_list}, 200

@app.route("/doctors/<specialty>/<city>/<experience>", methods=["GET"])
def get_doctors_by_specialty(specialty,city,experience):
    """API to get doctors by specialty"""
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM doctors WHERE specialty = ? and city = ? and experience = ?", (specialty,city,experience))
    doctors = cursor.fetchall()
    conn.close()
    print(experience)
    
    # Format data into a list of dictionaries
    doctors_list2 = [
        {"id": doc[0], "name": doc[1], "specialty": doc[2], "city":doc[3],"experience": doc[4],"contact":doc[5]}
        for doc in doctors
    ]
    print(doctors_list2)
    return {"doctors": doctors_list2}, 200


@app.route('/get_session')
def get_session(name):
    if name in session:
        return "1",201
    return "2",201

@app.route("/register",methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("insert into users(username,password) values(?,?)",(username,password))
    conn.commit()
    conn.close()
    return '', 201

@app.route("/login",methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT password FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
    if user[0]==password:
        
        session['username'] = username
        return 'login',201
    return  'not',201


    