from cryptography.fernet import Fernet
import json
import os


class CMChiper:
    def __init__(self) -> None:
        self.key = self.get_key()
        self.fernet = Fernet(self.key.encode())

    def get_key(self):
        filename = "api_key.json"
        if os.path.isfile(filename):
            with open(filename, 'r') as f:
                data = json.load(f)
                return data["key"]
        else:
            key = Fernet.generate_key().decode()
            self.save_key(key)
            return key

    def save_key(self, key):
        filename = "api_key.json"
        if os.path.isfile(filename):
            print(f"The file '{filename}' already exists.")
        else:
            data = {"key": key}
            with open(filename, 'w') as f:
                json.dump(data, f)
            print(f"key saved.")

    def encrypt_data(self, data):
        encrypted_data = self.fernet.encrypt(data.encode())
        return encrypted_data

    def decrypt_data(self, encrypted_data):
        decrypted_data = self.fernet.decrypt(encrypted_data).decode()
        return decrypted_data
    
def main():       
    cm = CMChiper()
    ed = cm.encrypt_data("1234")
    dd = cm.decrypt_data(ed)
    print("ed: ", ed, " dd: ", dd)

# main()