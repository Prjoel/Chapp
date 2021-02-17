import './userTab.css';
import EditUser from "./editUser/editUser";
import { useState } from 'react';
import { Modal } from 'antd';

function UserTab(props) {
  const [displayEditUser, setDisplayEditUser] = useState(false);
  function showModal() {
    setDisplayEditUser(true);
  }
  function closeModal() {
    setDisplayEditUser(false);
  }
  function getUser() {
    props.getUser(props.user, showModal);
    return 0;
  }
  return (
    <li onClick={getUser} className="users-online__user-tab">
      <span>{props.user.username}</span>
      {props.highlight && <span className="material-icons md-light md-18"> mark_chat_unread</span>}
      <Modal title="Edit user information" visible={displayEditUser} footer={null} onCancel={closeModal} >
        <EditUser user={props.user} />
      </Modal>
    </li>
  );
}

export default UserTab; 
