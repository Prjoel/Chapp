import {useState, useEffect} from 'react';
import './App.css';
import ChatPanel from './chatPanel/chatPanel';
import requests from '../requests/requests';
import UsersOnline from './usersOnline/usersOnline';

const msg = [{text:'Hola', id: 1}, {text:'Hello', id: 2}, {text:'Ciao', id: 3}, {text:'Bonjour', id:4}, {text:'Hallo', id: 5}];
const userss = [{name: 'Joel', id: 14}, {name: 'Luna', id: 185114}]

function App() {
  const [messages, setMessages] = useState(msg);
  const [users, setUsers] = useState(userss);
  
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
  return (
    <div className="App">
      <UsersOnline users={users} />
      <ChatPanel messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default App; 
