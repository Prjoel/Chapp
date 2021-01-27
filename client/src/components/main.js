import { useState, useEffect, useContext, createContext } from "react";
//import { deepCopy } from "../utils/utils";
import requests from "../requests/requests";
import ChatPanel from "./chatPanel/chatPanel";
import UsersOnline from "./usersOnline/usersOnline";
import { UserContext } from "./App";
import { io } from "socket.io-client";
const socket = io(requests.path);

const SocketContext = createContext(socket);

function Main() {
  const currentUser = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [privateMsgs, setPrivateMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState({ room: "public", partnerId: "public" });
  const [tabsToHighlight, setTabsToHighlight] = useState([]);

  useEffect(() => {
    socket.emit("registered user", currentUser);
  }, [])

  useEffect(() => {
    socket.on("send users", (users) => {
      setUsers(users);
    })
  }, [])

  useEffect(() => {
    socket.on("chat message", function (msg) {
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
      setPrivateMsgs(msgs => [...msgs, msg]);
    });
  }, []);


  function sendMessage(message, privateMsg) {
    const newMsg = {
      text: message,
      author: currentUser,
      isOwnMsg: true, // this prop if true sets the text on the right side of ChatPanel. On server side when broadcasting the message the prop is set to false. 
      receiver: currentChat.partnerId
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
      let msgs = [];
      try {
        msgs = privateMsgs.filter(item => (
          item.author.socketId === currentChat.room  // the author must be the same than the room identifier. 
          || (item.author.id === currentUser.id
            && currentChat.partnerId === item.receiver) // or author must be the User and the receiver the same than the room identifier.
        ));
      } catch (e) {
        console.error("There are no messages yet.", e)
      }
      return <ChatPanel privateMsg={true} messages={msgs} sendMessage={sendMessage} />
    }
  }

  function getUser(user) {
    if (user.socketId === socket.id) {//blocks action if userTab is the same than currentUser
      return 0
    } else {
      setCurrentChat({ room: user.socketId, partnerId: user.id });
      setTabsToHighlight(rooms => {
        let filteredRooms = rooms.filter(item => item !== user.socketId);
        return filteredRooms;
      })
    }
  }

  return (
    <div className="main-panel">
      <UsersOnline users={users} getUser={getUser} tabsToHighlight={tabsToHighlight} />
      {whichChatPanel()}
    </div>
  );
}

export { Main, SocketContext };
