import { useState } from 'react';
import './login.css';
import requests from '../../requests/requests';

function Signup(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      email,
      password
    }
    requests.registerUser(user);
  }
  function handleChange(e) {
    const value = e.target.value;
    const target = e.target.id;
    switch (target) {
      case "username": setUsername(value);
        break;
      case "email": setEmail(value);
        break;
      case "password": setPassword(value);
        break;
      case "password2": setPassword2(value);
        break;
      default: return 0;
        break;
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form id="signup-form" onClick={handleChange} >

        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Enter username" name="username" id="username" value={username} required />

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" value={email} required />

        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" id="password" value={password} required />

        <label for="password2"><b>Repeat Password</b></label>
        <input type="password" placeholder="Repeat Password" name="password2" id="password2" value={password2} required />

        <button type="submit" class="signupbtn" onClick={handleSubmit} >Sign Up</button>

        <a href="./login.html">Do you already have an account?</a>
      </form>
    </div>
  );
}

export default Signup; 
