import os
import sqlite3
from pycrpto import CMChiper


class User:
    def __init__(self):
        self.basepath = self.getpath()
        self.crypto = CMChiper()

    def getpath(self):
        current_path = os.path.abspath(__file__)
        basepath = current_path.removesuffix(os.path.basename(current_path))
        return basepath

    def connect_db(self):
        con = sqlite3.connect("userDetails.db")
        return con

    def create_table(self):
        con = sqlite3.connect("userDetails.db")
        query = """ CREATE TABLE IF NOT EXISTS users 
        ( id INTEGER PRIMARY KEY, url, email, username, password ) 
        """
        cur = con.cursor()
        cur.execute(query)

    def get_alldata(self, table):
        con = sqlite3.connect("userDetails.db")
        cur = con.cursor()
        res = cur.execute(f"SELECT * FROM {table}")
        return res.fetchall()

    def get_data(self, table, key, value):
        con = sqlite3.connect("userDetails.db")
        cur = con.cursor()
        res = cur.execute(f"SELECT * FROM {table} WHERE {key} = ?", (value,))
        data = res.fetchall()
        if (data and len(data[0]) >= 1):
            data = list(data[0])
            print("list: ", data)
            data[4] = self.crypto.decrypt_data(data[4])
            return [data]
        return []

    def put_data(self, url=None, email=None, username=None, password=None):
        con = sqlite3.connect("userDetails.db")
        cur = con.cursor()
        password = self.crypto.encrypt_data(password)
        cur.execute(
            "SELECT * FROM users WHERE url=? AND username=?", (url, username))
        print(cur.fetchone())
        if cur.fetchone() is None:
            cur.execute(
                f"INSERT INTO users (url, email, username, password) VALUES (?, ?, ?, ?)",
                (url, email, username, password)
            )
            con.commit()
            return True
        return False

    def remove_data(self, query):
        con = sqlite3.connect("userDetails.db")
        cur = con.cursor()
        cur.execute(f"DELETE FROM users WHERE url = ?", (query,))
        con.commit()


def main():
    print("mainnn")
    user = User()
    # print(user.conn)
    user.create_table()
    print(user.get_alldata("users"))
    user.put_data("url1", "kiran@gmail.com", "kiran9", "pop")
    user.put_data("url2", "sm@gmail.com", "kdasiran9", "podap")
    user.put_data("url3", "kiran@gmail.com", "kiran9", "pop")
    user.put_data("http://localhost:5000/", "kiran@gmail.com", "kiran9", "pop")
    user.put_data("http://localhost:5000/register",
                  "kiran@gmail.com", "Sahithi", "hope9")
    user.remove_data("daas")
    print("Final data")
    print("Data: ", user.get_alldata("users"))
    print("data: ", user.get_data("users", "url", "url1"))

# main()
