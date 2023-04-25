import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import { createUser } from "../utils/utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setUser] = useState(false);

  const handleLogin = (e) => {
    setUser(true);
  }

  if(isUser){
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(fireAuth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        createUser(email);
        console.log(user);
        toast.success('User saved successfully');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error('User not saved');
      });
    console.log("user registered!")
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

  return (
    // <div>
    //   <h1>Register</h1>
    //   {/* <iframe src="./Login/login.html" title="Login Page"></iframe> */}
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Email:
    //       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     </label>
    //     <label>
    //       Password:
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <button type="submit">Register</button>
    //   </form>
    // </div>

    <div className='box'>
      <div className='box-form'>
        <div className='box-login-tab'></div>
        <div className='box-login-title'>
          <div className='i i-login'></div>
          <h2>REGISTER</h2>
        </div>
        <div className='box-login'>
          <div className='fieldset-body' id='login_form'>
            <button onClick={openLoginInfo} className='b b-form i i-more' title='Mais Informações'></button>
            <p className='field'>
              <label for='user'>E-MAIL</label>
              <input type='text' id='user' name='user' title='Username' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <span id='valida' className='i i-warning'></span>
            </p>
            <p className='field'>
              <label for='pass'>PASSWORD</label>
              <input type='password' id='pass' name='pass' title='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <span id='valida' className='i i-close'></span>
            </p>

            <input type='submit' id='do_login' value='REGISTER' title='Get Started' onClick={handleSubmit}/>
          </div>
        </div>
      </div>
      <div className='box-info'>
        <div><button onClick={closeLoginInfo} className='b b-info i i-left' title='Back to Sign In'></button>
          <h3>Need Help?</h3>
        </div>
        <div className='line-wh'></div>
        <button className='b-support' title='Contact Support'> Contact Dindu</button>
        <div className='line-wh'></div>
        <button onClick={handleLogin} className='b-cta' title='Sign in now!'> Already a user? </button>
      </div>
    </div>
  );
}

export default Registration;