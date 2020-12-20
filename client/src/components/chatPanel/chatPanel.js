import './chatPanel.css';
import NewMessage from './newMessage/newMessage';
import Message from './message/message';

function ChatPanel(props) {
  return (
    <div className="chat-panel">
      <div className="chat-panel__messages">
          {props.messages.map(message => {
              return <Message content={message} key={message.id} />
          })}
      </div>
      <NewMessage sendMessage={props.sendMessage} />
    </div>
  );
}

export default ChatPanel; 
