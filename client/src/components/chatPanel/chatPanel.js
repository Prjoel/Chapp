import './chatPanel.css';
import NewMessage from '../newMessage/NewMessage';
import Message from '../message/Message';

function ChatPanel(props) {
  return (
    <div className="chat-panel">
      <div>
          {props.messages.map(message => {
              return <Message content={message} key={message.id} />
          })}
      </div>
      <NewMessage />
    </div>
  );
}

export default ChatPanel; 
