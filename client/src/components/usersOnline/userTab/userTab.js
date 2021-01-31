import './userTab.css';
import EditUser from "./editUser/editUser";
import { useState } from 'react';

function UserTab(props) {
  const [displayEditUser, setDisplayEditUser] = useState(false)
  function handleClick(params) {
    setDisplayEditUser((s => !s))
  }
  function getUser() {
    props.getUser(props.user, handleClick);
    return 0;
  }

  return (
    <div className="users-online__user-tab">
      <span onClick={getUser} >{props.user.username}</span>
      {props.highlight && <span className="material-icons md-light md-18">mark_chat_unread</span>}
      {
        displayEditUser &&
        <EditUser user={props.user} />
      }
    </div>
  );
}

export default UserTab; 
