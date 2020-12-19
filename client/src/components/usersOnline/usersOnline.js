import './usersOnline.css';
import UserTab from './userTab/userTab';

function UsersOnline(props) {
  return (
    <div className="users-online" >
      {
        props.users.map(user => {
          return <UserTab user={user} key={user.id} />
        })
      }
    </div>
  );
}

export default UsersOnline; 
