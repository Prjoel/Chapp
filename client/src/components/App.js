import {useState, useEffect} from 'react';
import './App.css';
import ChatPanel from './chatPanel/chatPanel';
import requests from '../requests/requests';

let msg = [{text:'Hola', id: 1}, {text:'Hello', id: 2}, {text:'Ciao', id: 3}, {text:'Bonjour', id:4}, {text:'Halo', id: 5}];

function App() {
  const [messages, setMessages] = useState(msg);
  
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
      <ChatPanel messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default App; 
