import { useState } from 'react';
import EditUserProfile from './editUserProfile';

function UserProfile(props) {
  const [displayPanel, setDisplayPanel] = useState(false);

  function displayEditPanel() {
    if (displayPanel) {
      return (< EditUserProfile user={props} />);
    } else return 0
  }
  return (
    <div>
      <span className="material-icons md-light" onClick={setDisplayPanel(prev => !prev)}>settings</span>
      <span>{props.username}</span>
      <span>{props.email}</span>
      {displayEditPanel()}
    </div>
  )
}

export default UserProfile;