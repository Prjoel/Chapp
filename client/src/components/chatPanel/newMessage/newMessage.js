import './newMessage.css';
import { useState } from 'react';
import { socket } from "../../../requests/requests";

function NewMessage(props) {
  const [newMessage, setNewMessage] = useState('');
  function handleChange(e) {
    const value = e.target.value;
    socket.emit("typing", {typing: true})
    setNewMessage(value);
  }
  function handleSubmit(e) {
    const msg = newMessage.trim();
    if ((e.key === 'Enter' || e.target.id === 'send-message-btn') && msg) {
      props.sendMessage(newMessage);
      setNewMessage('');
    }
  }
  return (
    <div className="new-message">
      <input type="text" value={newMessage} onKeyDown={handleSubmit} onChange={handleChange} />
      <i onClick={handleSubmit} id="send-message-btn" className="material-icons md-dark">send</i>
    </div>
  );
}

export default NewMessage; 
