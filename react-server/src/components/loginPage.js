import React, { useState, useEffect } from 'react';
import { fireAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setUser] = useState('');
  const [isLoggedIn, setLogin] = useState(
    fireAuth.currentUser == null ? false : true
  );

  useEffect(() => {
    // Check if the user is already logged in
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  });

  const handleRegister = (event) => {
    setUser(true);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(fireAuth, email, password)
      .then((userCreds) => {
        console.log(fireAuth.currentUser.email);
        setLogin(true);
        fetch("/fireuser/login?email=" + fireAuth.currentUser.email).then((res) =>
          console.log(res)
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

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

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  if (isNewUser) {
    return <Navigate to="/register" />;
  }

  return (
    <div className='box'>
      <div className='box-form'>
        <div className='box-login-tab'></div>
        <div className='box-login-title'>
          <div className='i i-login'></div>
          <h2>LOGIN</h2>
        </div>
        <div className='box-login'>
          <div className='fieldset-body' id='login_form'>
            <button onClick={openLoginInfo} className='b b-form i i-more' title='Mais Informações'></button>
            <p className='field'>
              <label for='user'>E-MAIL</label>
              <input type='text' id='user' name='user' title='Username' onChange={handleEmailChange} />
              <span id='valida' className='i i-warning'></span>
            </p>
            <p className='field'>
              <label for='pass'>PASSWORD</label>
              <input type='password' id='pass' name='pass' title='Password' onChange={handlePasswordChange} />
              <span id='valida' className='i i-close'></span>
            </p>

            {/* <label className='checkbox'>
              <input type='checkbox' value='TRUE' title='Keep me Signed in' /> Keep me Signed in
            </label> */}

            <input type='submit' id='do_login' value='Login' title='Login' onClick={handleLogin} />
            {/* <input type='submit' id='do_login' value='Logout' title='Logout' onClick={handleLogout} /> */}
          </div>
        </div>
      </div>
      <div className='box-info'>
        <div><button onClick={closeLoginInfo()} className='b b-info i i-left' title='Back to Sign In'></button>
          <h3>Need Help?</h3>
        </div>
        <div className='line-wh'></div>
        <button className='b-support' title='Forgot Password?'> Forgot Password?</button>
        <button className='b-support' title='Contact Support'> Contact Dindu</button>
        <div className='line-wh'></div>
        <button className='b-cta' title='Sign up now!' onClick={handleRegister}> CREATE ACCOUNT</button>
      </div>
    </div>
  );
}

export default Login;
