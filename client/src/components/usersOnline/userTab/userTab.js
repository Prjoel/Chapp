import './userTab.css';

function UserTab(props) {

  function getUser() {
    props.getUser(props.user);
    return 0
  }
  
  return (
    <div className="users-online__user-tab">
      <span onClick={getUser} >{props.user.username}</span>
      {props.highlight && <span className="material-icons md-light md-18">mark_chat_unread</span>}
    </div>
  );
}

export default UserTab; 
