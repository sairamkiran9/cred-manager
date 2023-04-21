import secrets
import string


def generate():
    length = 12
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(chars) for _ in range(length))
    print(password)
