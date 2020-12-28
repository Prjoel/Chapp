import { socket } from '../../requests/requests';
import { useState, useEffect } from 'react';
import './chatPanel.css';
import NewMessage from './newMessage/newMessage';
import Message from './message/message';

function ChatPanel(props) {

  const [typing, setTyping] = useState(false);
  const [whoTypes, setWhoTypes] = useState('')

  useEffect(() => {
    socket.on("typing", (typer) => {
      console.log(typer)
      setTyping(true)
      setWhoTypes(typer.nickname)
    })
  }, [])

  
  return (
    <div className="chat-panel">
      <div className="chat-panel__messages">
        {props.messages.map(message => {
          return <Message content={message} key={message.id} />
        })}
      </div>
      {typing && `${whoTypes} is typing...` }
      <NewMessage sendMessage={props.sendMessage} />
    </div>
  );
}

export default ChatPanel; 
