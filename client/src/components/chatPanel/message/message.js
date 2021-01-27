import './message.css';

function Message(props) {
  return (
    <div className={props.content.isOwnMsg ? "chat-panel__messages--user" : "chat-panel__messages--others"}>
      <p>{props.content.author.username}</p>
      <p className="chat-panel__messages___text" >{props.content.text}</p>
    </div>
  );
}

export default Message; 
