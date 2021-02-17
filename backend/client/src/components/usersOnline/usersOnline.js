import './usersOnline.css';
import UserTab from './userTab/userTab';

function UsersOnline(props) {
  function goToPublicChannel() {
    props.getUser({ socketId: 'public', partnerId: 'public' });
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

  function sortAndDisplay(arr) { // places the currentUser in index 0 of users array. Returns a map of components.
    const copy = [...arr];
    const index = copy.findIndex(item => item.id === props.currentUser.id);
    const removed = copy.splice(index, 1);
    const sortedArr = [...removed, ...copy];
    return (sortedArr.map(user => {
      return <UserTab user={user} key={user.id} getUser={props.getUser} highlight={highlight(user.socketId)} />
    }))
  }

  return (
    <ul className="users-online" >
      <h2 id="public-tab" onClick={goToPublicChannel} >Public <span className={`material-icons md-light md-18 ${shouldHighlight()}`}>forum</span></h2>
      {
        sortAndDisplay(props.users)
      }
    </ul>
  );
}

export default UsersOnline;