from flask import Flask, render_template, request, redirect, url_for
from user import User

app = Flask(__name__)


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


if __name__ == "__main__":
    user = User()
    user.create_table()
    print(user.get_data("select * from users"))
    app.run(debug=True)
