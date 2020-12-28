import { useState, useEffect } from "react";
import "./App.css";
import {deepCopy, checkIfTyping } from "../utils/utils";
// components ...
import ChatPanel from "./chatPanel/chatPanel";
import { socket } from "../requests/requests";
import UsersOnline from "./usersOnline/usersOnline";
import RegisterUser from "./registerUser/registerUser";


function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayChatPanel, setDisplayChatPanel] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  console.error("----- App component rendered. ", displayChatPanel);

  useEffect(lookForUser, []);

  useEffect(() => {
    socket.on("send users", (users) => {
      console.log(users);
      setUsers(users);
    })
  }, [])

  useEffect(() => {
    socket.on("chat message", function (msg) {
      console.log(msg);
      setMessages((msgs) => {
        console.log(msgs);
        const updatedMsgs = [...msgs, msg]; //msgs.push(msg);
        return updatedMsgs;
      });
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      let user = deepCopy(currentUser, (user) => {
        user.connectionId = socket.id
      })
      socket.emit("registered user", user);
    })
  }, [currentUser])
 
  function registerUser(user) {
    const newUser = JSON.stringify(user);
    localStorage.setItem("user", newUser);
    lookForUser();
  }

  function lookForUser() {
    const user = localStorage.getItem("user");
    const userParsed = JSON.parse(user);
    if (userParsed && userParsed.nickname) {
      setDisplayChatPanel(true);
      setCurrentUser(userParsed);
    } else return 0;
  }

  function sendMessage(message) {
    const newMsg = {
      text: message,
      author: currentUser,
    }
    setMessages((msgs) => {
      const newMsgs = deepCopy(msgs, copy => [...copy, newMsg] );
      return newMsgs;
    });
    socket.emit("chat message", newMsg);
  }

  return (
    <div className="App">
      {displayChatPanel ? (
        <div className="main-panel">
          <UsersOnline users={users} />
          <ChatPanel messages={messages} sendMessage={sendMessage} />
        </div>
      ) : (
          <RegisterUser registerUser={registerUser} />
        )}
    </div>
  );
}

export default App;
