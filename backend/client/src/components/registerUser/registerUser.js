import {useState} from 'react';
import './registerUser.css';

function RegisterUser(props) {
  const [nickname, setNickname] = useState('');
  
  function handleSubmit(e){
    e.preventDefault();
    const id = new Date().getTime()
    const user = {
      nickname,
      id
    }
    props.registerUser(user);
  }
  function handleChange(e) {
    const value = e.target.value;
    setNickname(value);
  }
  
  return (
    <div>
      <h2>Select Your Nickname</h2>
      <form>
        <input value={nickname} onChange={handleChange} type="text" maxLength="30" minLength="1" />
        <button onClick={handleSubmit} >get in</button>
      </form>
    </div>
  );
}

export default RegisterUser; 
