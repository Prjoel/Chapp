import { useState, useEffect } from "react";
import "./App.css";
import { deepCopy } from "../utils/utils";
// components ...
import ChatPanel from "./chatPanel/chatPanel";
import { socket } from "../requests/requests";
import UsersOnline from "./usersOnline/usersOnline";
import RegisterUser from "./registerUser/registerUser";


function App() {
  const [messages, setMessages] = useState([]);
  const [privateMsgs, setPrivateMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayChatPanel, setDisplayChatPanel] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState({ room: "public" });


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
      setMessages(msgs => [...msgs, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on("private message", function (msg) {
      console.log("private message", msg);
      setPrivateMsgs(msgs => [...msgs, msg]);
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

  function sendMessage(message, privateMsg) {
    const newMsg = {
      text: message,
      author: currentUser,
    }
    if (!privateMsg) {
      setMessages(msgs => [...msgs, newMsg]);
      socket.emit("chat message", newMsg);
    } else {
      setPrivateMsgs(msgs => [...msgs, newMsg]);
      socket.emit("private message", currentChat.room, newMsg)
    }
  }

  function whichChatPanel() {
    if (currentChat.room === 'public') {
      return <ChatPanel privateMsg={false} messages={messages} sendMessage={sendMessage} />
    } else {
      let msgs;
      try {
        msgs = privateMsgs.filter(item => item.author.socketId === currentChat.room || item.author.socketId === currentUser.socketId);
      } catch (e) {
        console.log('error del mapeo', e)
      }
      return <ChatPanel privateMsg={true} messages={msgs} sendMessage={sendMessage} />
    }
  }

  function getUser(user) {
    setCurrentChat({ room: user.socketId })
  }
  return (
    <div className="App">
      {displayChatPanel ? (
        <div className="main-panel">
          <UsersOnline users={users} getUser={getUser} />
          {whichChatPanel()}
        </div>
      ) : (
          <RegisterUser registerUser={registerUser} />
        )}
    </div>
  );
}

export default App;
