import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import { createUser } from "../utils/utils"

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(fireAuth, email, password)
        .then((userCreds) => {
            const user = userCreds.user;
            createUser(email);
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    console.log("user registered!")
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;