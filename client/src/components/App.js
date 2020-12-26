import { useState, useEffect } from "react";
import "./App.css";
// components ...
import ChatPanel from "./chatPanel/chatPanel";
import { socket } from "../requests/requests";
import UsersOnline from "./usersOnline/usersOnline";
import RegisterUser from "./registerUser/registerUser";
const cl = console.log;

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayChatPanel, setDisplayChatPanel] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  console.error("----- App component rendered. ", displayChatPanel);

  useEffect(() => {

    socket.on("chat message", function (msg) {
      console.log("incomming message: ", msg);
      setMessages((msgs) => {
        console.log(msgs);
        const updatedMsgs = [...msgs, msg]; //msgs.push(msg);
        return updatedMsgs;
      });
    });
  }, []);

  useEffect(lookForUser, []);

  useEffect(() => {
    socket.emit("registered user", currentUser);
    console.log(currentUser)
  }, [currentUser])

  useEffect(() => {
    socket.on("send users", (users) => {
      setUsers(users);
    })
  }, [])

  function lookForUser() {
    const user = localStorage.getItem("user");
    const userParsed = JSON.parse(user);
    if (userParsed && userParsed.nickname) {
      setDisplayChatPanel(true);
      setCurrentUser(userParsed);
      console.log(userParsed);
    } else return 0;
  }

  function sendMessage(message) {
    const newMsg = {
      text: message,
      author: currentUser,
    };
    socket.emit("chat message", newMsg);
  }
  function registerUser(user) {
    const newUser = JSON.stringify(user);
    localStorage.setItem("user", newUser);
    lookForUser();
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
