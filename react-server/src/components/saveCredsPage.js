import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import { createUser } from "../utils/utils"

function SaveCredentials(props) {
  const [email, setEmail] = useState('');
  // const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { url } = ();
  let url = "";
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlParams) {
    if(key === "url"){
      url = value;
    }
}

  const handleGenpass = (e) => {
    e.preventDefault();
    fetch("/generatepassword").then((res) =>
      res.text().then((password) => {
        setPassword(password);
        console.log("gen password: ", password);
      })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/savecreds', {
      method: 'POST',
      body: JSON.stringify({
        url: url,
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log("creds saved!")
  };

  return (
    <div>
      <h1>Save Credentials</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Site URl:
          <input type="text" value={url} onChange={()=>{}}/>
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" id="genpass" onClick={handleGenpass}> generatepassword </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SaveCredentials;