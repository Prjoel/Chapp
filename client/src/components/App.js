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
  const [tabsToHighlight, setTabsToHighlight] = useState([]);

  useEffect(lookForUser, []);

  useEffect(() => {
    socket.on("send users", (users) => {
      console.log(users);
      setUsers(users);
    })
  }, [])

  useEffect(() => {
    socket.on("chat message", function (msg) {
      console.log(currentChat.room, '¡?¡?¡?¡?', currentChat.room === "public");
      setMessages(msgs => [...msgs, msg]);
    });
  }, [])

  useEffect(() => {
    if (currentChat.room !== "public") { // Checking if the room from where the msg comes from is not the same as currentChat.
      setTabsToHighlight(rooms => {
        return [...rooms, "public"] // Passing the Public Room to be highlighted. See getUser(), there we remove highlight once Public Room is clicked.
      })
    }
  }, [messages])

  useEffect(() => {
    socket.on("private message", function (msg) {
      if (currentChat.room !== msg.author.socketId) { // Checking if the room from where the msg comes from is not the same as currentChat.
        setTabsToHighlight(rooms => [...rooms, msg.author.socketId]) // Passing the rooms to be highlighted. See getUser(), there we remove highlight once userTab is clicked.
      }
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
      isOwnMsg: true // this prop if true sets the text on the right side of ChatPanel. On server side when broadcasting the message the prop is set to false. 
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
    if (user.socketId === socket.id) {//blocks action if userTab is the same than currentUser
      return 0
    } else {
      setCurrentChat({ room: user.socketId });
      setTabsToHighlight(rooms => {
        let filteredRooms = rooms.filter(item => item !== user.socketId);
        return filteredRooms;
      })
    }
  }
  return (
    <div className="App">
      {displayChatPanel ? (
        <div className="main-panel">
          <UsersOnline users={users} getUser={getUser} tabsToHighlight={tabsToHighlight} />
          {whichChatPanel()}
        </div>
      ) : (
          <RegisterUser registerUser={registerUser} />
        )}
    </div>
  );
}

export default App;
