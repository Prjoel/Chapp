import './usersOnline.css';
import UserTab from './userTab/userTab';

function UsersOnline(props) {
  function goToPublicChannel() {
    props.getUser({socketId: 'public'})
  }
  return (
    <div className="users-online" >
      <span onClick={goToPublicChannel} >Public</span>
      {
        props.users.map(user => {
          return <UserTab user={user} key={user.id} getUser={props.getUser} />
        })
      }
    </div>
  );
}

export default UsersOnline; 
