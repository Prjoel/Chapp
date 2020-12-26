import './message.css';

function Message(props) {
  return (
    <div className="chat-panel__messages--others">
      <p>{props.content.author.nickname}</p>
      <p className="chat-panel__messages___text" >{props.content.text}</p>
    </div>
  );
}

export default Message; 
