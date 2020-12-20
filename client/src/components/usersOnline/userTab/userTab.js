import './userTab.css';

function UserTab(props) {
  return (
    <div className="users-online__user-tab">
      <span>{props.user.name}</span>
    </div>
  );
}

export default UserTab; 
