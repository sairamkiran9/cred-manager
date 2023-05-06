from firebase_admin import auth, db, credentials, firestore
import firebase_admin
import sys
sys.path.append('./utils') 
from user import User
from pycrpto import CMChiper
from temp import generate
from flask import Flask, render_template, request, redirect, url_for, jsonify
 # Replace with the actual path to myfolder

app = Flask(__name__)
cred = credentials.Certificate('config.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

fire_user = ""

def update_logins(creds):
    docs = db.collection("Logins").get()
    data = [doc.to_dict() for doc in docs if doc.id == fire_user]
    for login in data[0]["login"]:
        if login["url"] == creds["url"]:
            login["count"] += 1
            
            return
    login = {
        "url": creds["url"],
        "count": creds["count"]
    }

@app.route('/user/<email>')
def get_user_by_email(email):
    try:
        user = auth.get_user_by_email(email)
        return user.uid
    except auth.AuthError as e:
        print('Error fetching user:', e)
        return None

@app.route('/fireuser/login')
def login():
    email = request.args.get('email')
    global fire_user
    fire_user = email
    print("fireuser login", fire_user)
    try:
        user = auth.get_user_by_email(fire_user)
        return "User logged in successfully."
    except Exception as e:
        return f"Error logging in user: {e}"


@app.route('/firedb')
def get_collection_data():
    collection_name = "users"
    docs = db.collection(collection_name).get()
    print("fire_user", fire_user)
    data = [doc.to_dict() for doc in docs if doc.id == fire_user]
    print(data)
    if(len(data) >= 1):
        return data[0]["creds"]
    return []


@app.route('/geturlcreds')
def get_data():
    url = request.args.get('url')
    collection_name = "users"
    docs = db.collection(collection_name).get()
    data = [doc.to_dict() for doc in docs if doc.id == fire_user]
    for cred in data[0]["creds"]:
        if cred["url"] == url:
            update_logins(cred)
            return cred
    return {}


@app.route('/apikey')
def get_key():
    return cm.key


@app.route('/data')
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name': "geek",
        "Age": "22",
        "Date": 10,
        "programming": "python"
    }

# Cred manager methods
@app.route("/fetchuser")
def auto_fill():
    response = {}
    url = request.args.get('url')
    data = user.get_data(table="users", key="url", value=url)
    if data:
        response = {
            "username": data[0][2],
            "password": data[0][3]
        }
    return response


@app.route("/generatepassword")
def generate_password():
    data = generate()
    print("generated password: ", data)
    return data


if __name__ == "__main__":
    user = User()
    user.create_table()
    cm = CMChiper()
    app.run(debug=True)
