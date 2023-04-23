


from flask import Flask, render_template, request, redirect, url_for, jsonify
import sys
import json
sys.path.append('./utils')  # Replace with the actual path to myfolder
from temp import generate
from user import User

app = Flask(__name__)

@app.route('/data')
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":10, 
        "programming":"python"
        }

@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        return redirect(url_for('message', name=username))
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
        return render_template('register.html', msg=msg)
    return render_template('register.html', msg=msg)


@app.route("/")
def login():
    return render_template("login.html")


@app.route("/", methods=["POST"])
def login_post():
    username = request.form["username"]
    password = request.form["password"]
    return redirect(url_for('message', name=username))


@app.route("/message")
def message():
    name = request.args.get('name')
    return render_template("home.html", name=name)


@app.route("/hello")
def hello():
    print(request.args.get('body'))
    return "srivennala"

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
            "username": data[0][3],
            "password": data[0][4]
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
    email = data["email"]
    url = data["url"]
    if url and username and user.put_data(
        url=url,
        username=username,
        password=password,
        email=email
    ):
        fetch_data = user.get_data(
            table="users", key="username", value=username)
        print("fetched data: ", fetch_data)
        return "Data saved successfully!"
    else:
        return "Data failed to save!"


@app.route("/savecredspage")
def save_creds_page():
    flag = request.args.get('flag')
    return render_template('save_passwords.html')


@app.route("/viewcreds")
def view_data():
    data = user.get_alldata("users")
    dict_data = [dict(zip(('id', 'url', 'email', 'username', 'password'), d)) for d in data]
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