import { socket } from '../../requests/requests';
import { useState, useEffect } from 'react';
import './chatPanel.css';
import NewMessage from './newMessage/newMessage';
import Message from './message/message';

function ChatPanel(props) {

  const [typing, setTyping] = useState(false);
  const [whoTypes, setWhoTypes] = useState('');
  const [timerId, setTimerId] = useState(1);

  useEffect(() => {
    socket.on("typing", (typer) => { //here we listen for "typing" events
      clearTimeout(timerId); // then we cancel previous setTimeout() to not have flickering text 
      const id = setTimeout(() => setTyping(false), 1000); // programming a timer to hide the "typing text"
      setTimerId(id); // saving the timer id to be able to cancel it later
      setTyping(true); // this allows the "typing text" to be shown 
      setWhoTypes(typer.nickname);
    })
  }, [])

  useEffect(() => {
    const msgsElements = document.querySelectorAll('.chat-panel__messages--others');
    if (msgsElements[msgsElements.length - 1]) {
      msgsElements[msgsElements.length - 1].scrollIntoView(true); //The scrollIntoView() method scrolls the specified element into the visible area of the browser window. Use CSS { scroll-behavior: smooth;} (not required) 
    }
  }, [props.messages])

  return (
    <div className="chat-panel">
      <div className="chat-panel__messages">
        {props.messages.map(message => {
          return <Message content={message} key={message.id} />
        })}
      </div>
      {typing && `${whoTypes} is typing...`}
      <NewMessage sendMessage={props.sendMessage} />
    </div>
  );
}

export default ChatPanel; 
