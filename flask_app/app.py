from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)

class User:
    def __init__(self, username, password, email) -> None:
        self.username = username
        self.password = password
        self.email = email
        self.create_creds()

    def create_creds(self):
        current_path = os.getcwd()  # Get the current working directory
        filename = 'creds.csv'
        full_path = os.path.join(current_path, filename)
        if not os.path.exists(full_path):
            with open(full_path, "w+") as f:
                f.write("username,password,email\n")

    def save_details(self):
        data = self.username + "," + self.password + "," + self.email + "\n"
        with open("creds.csv", "a") as f:
            f.write(data)
        
@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        user = User(username, password, email)
        user.save_details()
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
    # return render_template("home.html", name=username)

@app.route("/message")
def message():
    name = request.args.get('name')
    return render_template("home.html")


if __name__ == "__main__":
    app.run(debug=True)
