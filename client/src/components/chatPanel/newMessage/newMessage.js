import './newMessage.css';
import {useState, useEffect} from 'react';

function NewMessage(props) {
  const [newMessage, setNewMessage] = useState('');
  function handleChange(e) {
    const value = e.target.value;
    setNewMessage(value);
  }
  function handleSubmit(){
    props.sendMessage(newMessage);
    setNewMessage('');
  }
  return (
    <div className="new-message">
      <input type="text" value={newMessage} onChange={handleChange} />
      <button onClick={handleSubmit} ><i className="material-icons md-dark">send</i></button>
    </div>
  );
}

export default NewMessage; 
