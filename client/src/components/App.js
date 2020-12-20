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

  function fetchMessages() {
    const mss = requests.getMessages()
    setMessages(mss);
  }
  function sendMessage(message) {
    requests.sendMessage(message);
    // fetchMessages()
  }
  async function registerUser(user) {
    // let response = await requests.registerUser(user);
    // if(response.registered) {
       setDisplayChatPanel(true);
    // } else console.log(response);
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
