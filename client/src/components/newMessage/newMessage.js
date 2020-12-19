import './newMessage.css';
import {useState, useEffect} from 'React';

function NewMessage(props) {
  const [newMessage, setNewMessage] = useState('');
  function handleChange(e) {
    const value = e.target.value;
    setNewMessage(value);
  }
  return (
    <div>
      <input type="text" value={newMessage} onChange={handleChange} />
      <button className="material-icons md-dark">send</button>
    </div>
  );
}

export default NewMessage; 
