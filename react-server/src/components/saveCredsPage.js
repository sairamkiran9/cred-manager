import { useState } from 'react';
import { json, useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import { createUser, addCreds, removeCreds, getCreds } from "../utils/utils"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordInput from './password';

function SaveCredentials(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  let url = "";
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlParams) {
    if (key === "url") {
      url = value;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#do_login").addEventListener("click", function () {
      closeLoginInfo();
      var spans = this.parentNode.querySelectorAll('span');
      for (var i = 0; i < spans.length; i++) {
        spans[i].style.display = "none";
        spans[i].classList.remove("i-save");
        spans[i].classList.remove("i-warning");
        spans[i].classList.remove("i-close");
      }
      var proceed = true;
      document.querySelectorAll("#login_form input").forEach(function (input) {
        if (!input.value.trim()) {
          input.parentNode.querySelector('span').classList.add("i-warning");
          input.parentNode.querySelector('span').style.display = "block";
          proceed = false;
        }
      });
      if (proceed) {
        spans.forEach(function (span) {
          span.classList.add("i-save");
          span.style.display = "block";
        });
      }
    });
    document.querySelectorAll("#login_form input").forEach(function (input) {
      input.addEventListener("keyup", function () {
        this.parentNode.querySelector('span').style.display = "none";
      });
    });

    openLoginInfo();
    setTimeout(closeLoginInfo, 500);
  });

  function openLoginInfo() {
    // document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.b-form').forEach(function (form) {
      form.style.opacity = "0.01";
    });
    document.querySelectorAll('.box-form').forEach(function (form) {
      form.style.left = "-37%";
    });
    document.querySelectorAll('.box-info').forEach(function (form) {
      form.style.right = "-37%";
    });
    // });
  }

  function closeLoginInfo() {
    // document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.b-form').forEach(function (form) {
      form.style.opacity = "1";
    });
    document.querySelectorAll('.box-form').forEach(function (form) {
      form.style.left = "0px";
    });
    document.querySelectorAll('.box-info').forEach(function (form) {
      form.style.right = "-5px";
    });
    // });
  }

  window.addEventListener('resize', function () {
    closeLoginInfo();
  });

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCreds({
      url: url,
      username: username,
      password: password,
    }, () => {
      console.log("Details updated successfully!");
    });

    // fetch('/savecreds', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     url: url,
    //     username: username,
    //     password: password,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => response.text())
    //   .then(data => {
    //     data = JSON.parse(data);
    //     if (data.status === 200) {
    //       toast.success(data.msg);
    //     } else {
    //       toast.error(data.msg);
    //     }

    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     toast.error('Something went wrong');
    //   });
    console.log("creds saved!")
  };

  return (
    // <div>
    //   <h1>Save Credentials</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Site URl:
    //       <input type="text" value={url} onChange={() => { }} />
    //     </label>
    //     <label>
    //       Username:
    //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </label>
    //     <PasswordInput />
    //     <button type="submit">Save</button>
    //   </form>
    // </div>

    <div className='box'>
      <div className='box-form'>
        <div className='box-login-tab'></div>
        <div className='box-login-title'>
          <div className='i i-login'></div>
          <h2> Save your credentials </h2>
        </div>
        <div className='box-login'>
          <div className='fieldset-body' id='login_form'>
            {/* <button onClick={openLoginInfo} className='b b-form i i-more' title='Mais Informações'></button> */}
            <p className='field'>
            <label>
              Login site URL:
              <input type="text" value={url} onChange={() => { }} />
            </label>
            </p>
            <p className='field'>
              <label for='user'>Username</label>
              <input type='text' id='user' name='user' title='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
              <span id='valida' className='i i-warning'></span>
            </p>
            <p className='field'>
              {/* <label for='pass'>PASSWORD</label> */}
              {/* <input type='password' id='pass' name='pass' title='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
              <PasswordInput onPasswordChange={handlePasswordChange} />
              <span id='valida' className='i i-close'></span>
            </p>

            <input type='submit' id='do_login' value='REGISTER' title='Get Started' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default SaveCredentials;