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
  registerUser() {
    return console.error("Faux Error.  ");
  },
};

export const socket = io("http://localhost:2021/");
