import { useState, useEffect, createContext } from "react";
import "./App.css";
import requests from "../requests/requests";
import { Main } from './main';

const UserContext = createContext({});

function App() {
  const [user, setUser] = useState(false);

  useEffect(initSession, [])

  async function initSession() {
    let foundUser = await requests.checkForSession();
    if (foundUser) {
      setUser(foundUser)
    } else return 0;
  }
  
  return (
    <div className="App">
      <div className="main-panel">
        <UserContext.Provider value={user}>
            <Main />
        </UserContext.Provider>
      </div>
    </div>
  )
}

export { App, UserContext };