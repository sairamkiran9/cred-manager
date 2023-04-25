from flask import Flask, render_template, request, redirect, url_for, jsonify
import sys
import json
sys.path.append('./utils')  # Replace with the actual path to myfolder
from temp import generate
from pycrpto import CMChiper
from user import User

import firebase_admin
from firebase_admin import auth, db, credentials, firestore

app = Flask(__name__)
cred = credentials.Certificate('config.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/user/<email>')
def get_user_by_email(email):
    try:
        user = auth.get_user_by_email(email)
        return user.uid
    except auth.AuthError as e:
        print('Error fetching user:', e)
        return None
    
@app.route('/firedb')
def get_collection_data():
    collection_name = "users"
    docs = db.collection(collection_name).get()
    data = [doc.to_dict() for doc in docs]
    return data[0]["creds"]

@app.route('/geturlcreds')
def get_data():
    url = request.args.get('url')
    collection_name = "users"
    docs = db.collection(collection_name).get()
    data = [doc.to_dict() for doc in docs]
    for cred in data[0]["creds"]:
        if cred["url"] == url:
            return cred
    return {}

@app.route('/apikey')
def get_key():
    return cm.key

@app.route('/data')
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":10, 
        "programming":"python"
        }

# Cred manager methods
@app.route("/fetchuser")
def auto_fill():
    response = {}
    url = request.args.get('url')
    print("url: ", url)
    data = user.get_data(table="users", key="url", value=url)
    print("fetched data: ", data)
    if data:
        response = {
            "username": data[0][2],
            "password": data[0][3]
        }
    return response


@app.route("/popup")
def popup():
    response = {}
    url = request.args.get('url')
    print("url: ", url)
    return render_template("bs.html", url=url)


@app.route("/savecreds", methods=["POST"])
def save_creds():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    url = data["url"]
    if url and username and user.put_data(
        url=url,
        username=username,
        password=password
    ):
        fetch_data = user.get_data(
            table="users", key="username", value=username)
        print("fetched data: ", fetch_data)
        return {"msg": "Details saved successfully!", "status":200}
    else:
        return {"msg": "Details already exists", "status":400}


@app.route("/savecredspage")
def save_creds_page():
    flag = request.args.get('flag')
    return render_template('save_passwords.html')


@app.route("/viewcreds")
def view_data():
    data = user.get_alldata("users")
    dict_data = [dict(zip(('id', 'url', 'username', 'password'), d)) for d in data]
    json_data = json.dumps(dict_data)
    return json_data

@app.route("/generatepassword")
def generate_password():
    data = generate()
    print("generated password: ", data)
    return data


if __name__ == "__main__":
    user = User()
    user.create_table()
    # print(user.get_alldata("users"))
    app.run(debug=True)