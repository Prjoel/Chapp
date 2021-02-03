import './newMessage.css';
import { useState, useContext } from 'react';
import { SocketContext } from "../../main";
import EmojiPicker from 'emoji-picker-react';

function NewMessage(props) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const socket = useContext(SocketContext);

  function onEmojiClick(e, emojiObj) {
    setNewMessage(msg => `${msg}${emojiObj.emoji}`)
  }

  function showEmojiPanel() {
    setShowEmojis(show => !show)
  }
  function handleChange(e) {
    const value = e.target.value;
    socket.emit("typing", { typing: true })
    setNewMessage(value);
  }

  function handleSubmit(e) {
    const msg = newMessage.trim();
    if ((e.key === 'Enter' || e.target.id === 'send-message-btn') && msg) {
      props.sendMessage(newMessage, props.privateMsg);
      setNewMessage('');
      setShowEmojis(false);
    }
  }
  return (
    <div className="new-message">
      <input type="text" value={newMessage} onKeyDown={handleSubmit} onChange={handleChange} />
      {showEmojis && <span className="emoji-panel"><EmojiPicker onEmojiClick={onEmojiClick} /></span> }
      <span onClick={showEmojiPanel} className="material-icons md-dark new-message__insert-emoji-icon">
        insert_emoticon
      </span>
      <i onClick={handleSubmit} id="send-message-btn" className="material-icons md-dark">send</i>
    </div>
  );
}

export default NewMessage; 
