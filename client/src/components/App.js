import {useState, useEffect} from 'react';
import './App.css';
import ChatPanel from './chatPanel/chatPanel';
import requests from '../requests/requests';
import UsersOnline from './usersOnline/usersOnline';
import RegisterUser from './registerUser/registerUser';

const userss = [{name: 'Joel', id: 14}, {name: 'Luna', id: 185114}]
const msg = [
             {text:'Hola', id: 1, author: userss[0].name}, {text:'Hello', id: 2, author: userss[1].name}, {text:'Ciao', id: 3, author: userss[0].name}
             , {text:'Bonjour', id:4, author: userss[1].name}, {text:'Hallo', id: 5, author: userss[0].name}
            ];


function App() {
  const [messages, setMessages] = useState(msg);
  const [users, setUsers] = useState(userss);
  const [displayChatPanel, setDisplayChatPanel] = useState(false);
  
  /* useEffect(async () => {
    const activeUsers = await requests.getUsers()
    setUsers(activeUsers);
  })
  //useEffect(fetchMessages); */
  useEffect(lookForUser);

  function lookForUser() {
    const user = localStorage.getItem('user');
    const userParsed = JSON.parse(user);
    if(userParsed && userParsed.nickname) {
      setDisplayChatPanel(true);
    } else return 0
  }
  function fetchMessages() {
    const mss = requests.getMessages()
    setMessages(mss);
  }
  function sendMessage(message) {
    requests.sendMessage(message);
    // fetchMessages()
  }
  function registerUser(user) {
    const newUser = JSON.stringify(user);
    localStorage.setItem('user', newUser);
    lookForUser()
  }

  return (
    <div className="App">
      {
        displayChatPanel ?
          <div className="main-panel" >
            <UsersOnline users={users} />
            <ChatPanel messages={messages} sendMessage={sendMessage} />
          </div>
        : <RegisterUser registerUser={registerUser} />
      }
      
    </div>
  );
}

export default App; 
