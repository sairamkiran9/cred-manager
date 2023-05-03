import React, { useState, useEffect, useRef } from 'react';

function PasswordInput(props) {
  const [password, setPassword] = useState('');
  const elementRef = useRef(null);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    props.onPasswordChange(e.target.value);
  }

  const handleGenpass = (e) => {
    e.preventDefault();
    fetch("/generatepassword").then((res) =>
      res.text().then((password) => {
        setPassword(password);
        props.onPasswordChange(password);
        console.log("gen password: ", password);
      })
    );
  }

  useEffect(() => {
    const strength = checkPasswordStrength(password);
    console.log('Password strength:', strength);
    if (strength === "weak") {
      elementRef.current.style.backgroundColor = 'red';
    }
    else if (strength === "medium") {
      elementRef.current.style.backgroundColor = 'orange';
    }
    else if (strength === "strong") {
      elementRef.current.style.backgroundColor = 'green';
    }
    else {
      elementRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
    }
  }, [password]);

  return (
    <div>
      <label>
        Password:
        <input ref={elementRef} type="text" value={password} onChange={handlePassword} />
      </label>
      <button type="button" id="genpass" onClick={handleGenpass}> generatepassword </button>
    </div>
  );
}

function checkPasswordStrength(password) {
  if (password.length === 0) {
    return '';
  }
  else if (password.length < 8) {
    return 'weak';
  } else if (password.length < 12) {
    return 'medium';
  } else {
    return 'strong';
  }
}

export default PasswordInput;
