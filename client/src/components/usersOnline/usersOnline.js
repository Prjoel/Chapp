import './usersOnline.css';
import UserTab from './userTab/userTab';

function UsersOnline(props) {
  function goToPublicChannel() {
    props.getUser({ socketId: 'public', partnerId: 'public'});
  }
  function highlight(id) {
    if (props.tabsToHighlight.includes(id)) {
      return true
    } else return false
  }

  function shouldHighlight() {
    if (highlight("public")) {
      return "highlighted"
    } else return ""
  }

  return (
    <div className="users-online" >
      <span onClick={goToPublicChannel} >Public <span className={ `material-icons md-light md-18 ${shouldHighlight()}`}>forum</span></span>
      {
        props.users.map(user => {
          return <UserTab user={user} key={user.id} getUser={props.getUser} highlight={highlight(user.socketId)} />
        })
      }
    </div>
  );
}

export default UsersOnline; 
