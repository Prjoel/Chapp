import './userTab.css';

function UserTab(props) {
  function getUser() {
    props.getUser(props.user);
    return 0
  }
  return (
    <div className="users-online__user-tab">
      <span onClick={getUser} >{props.user.nickname}</span>
    </div>
  );
}

export default UserTab; 
