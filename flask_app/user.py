import os
import sqlite3


class User:
    def __init__(self) -> None:
        # self.username = username
        # self.password = password
        # self.email = email
        self.basepath = self.getpath()
        self.conn = self.connect_db()

    def getpath(self):
        current_path = os.path.abspath(__file__)
        basepath = current_path.removesuffix(os.path.basename(current_path))
        return basepath

    def connect_db(self):
        con = sqlite3.connect("userDetails.db")
        return con

    def create_table(self):

        query = """ CREATE TABLE IF NOT EXISTS users 
        ( id INTEGER PRIMARY KEY, url, email, username, password ) 
        """
        cur = self.conn.cursor()
        cur.execute(query)

    def get_data(self, query):
        cur = self.conn.cursor()
        res = cur.execute(query)
        return res.fetchall()

    def put_data(self, url, email, username, password):
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM users WHERE url=? AND username=?", (url, username))
        if cur.fetchone() is None:
            cur.execute(
            f"INSERT INTO users (url, email, username, password) VALUES (?, ?, ?, ?)", 
            (url, email, username, password)
        )
        self.conn.commit()

    def remove_data(self, query):
        cur = self.conn.cursor()
        cur.execute(f"DELETE FROM users WHERE url = ?", (query,))
        self.conn.commit()


# user = User()
# user.create_table()
# print(user.get_data("select * from users"))
# user.put_data("asasas", "kiran@gmail.com", "kiran9", "pop")
# user.put_data("daas", "sm@gmail.com", "kdasiran9", "podap")
# user.put_data("asasas", "kiran@gmail.com", "kiran9", "pop")
# print(user.get_data("select * from users"))
# user.remove_data("daas")
# print(user.get_data("select * from users"))
