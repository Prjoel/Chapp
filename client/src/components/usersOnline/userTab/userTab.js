import './userTab.css';

function UserTab(props) {
  return (
    <div>
      <span>{props.user.name}</span>
    </div>
  );
}

export default UserTab; 
