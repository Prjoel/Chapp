import { io } from "socket.io-client";

export const requests = {
  sendMessage(ss) {
    console.log("------ ", ss);
  },
  getMessages() {
    return 1;
  },
  getUsers() {
    return 1;
  },
  registerUser(user) {
    return console.error("Faux Error.  ", user );
  },
  login(user) {
    return console.log("User to LOG: ", user)
  }
};

export const socket = io("http://localhost:2021/");
