import { useState } from 'react';
import './login.css';
import requests from '../../requests/requests';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password
    }
    requests.registerUser(user);
  }
  function handleChange(e) {
    const value = e.target.value;
    e.target.id === "email" ? setEmail(value) : setPassword(value);
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label for="email"></label>
        <input id="email" value={email} onChange={handleChange} type="text" maxLength="30" minLength="1" />
        <label for="password"></label>
        <input id="password" value={password} onChange={handleChange} type="password" maxLength="30" minLength="1" />
        <button onClick={handleSubmit} >get in</button>
      </form>
    </div>
  );
}

export default Login; 
