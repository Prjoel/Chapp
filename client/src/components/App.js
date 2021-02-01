import { useState, useEffect, createContext } from "react";
import "./App.css";
import requests from "../requests/requests";
import { Main } from './main';
import NormalLoginForm from './registerUser/antLogin';

const UserContext = createContext({});
const ToLoginContext = createContext({});

function App() {
  const [displayMainPanel, setDisplayMainPanel] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(initSession, [])

  async function initSession() {
    let foundUser = await requests.checkForSession();
    if (foundUser) {
      setUser(foundUser)
      setDisplayMainPanel(true);
    } else return 0;
  }

  // Hacer pantalla de carga; Más tarde investigar sobre eficiencia.  
  return (
    <div className="App">
      {
        displayMainPanel ?
          <div className="main-panel">
            <UserContext.Provider value={user}>
              <ToLoginContext.Provider value={setDisplayMainPanel}>
                <Main />
              </ToLoginContext.Provider>
            </UserContext.Provider>
          </div>
          : <NormalLoginForm initSession={initSession} />
      }
    </div>
  )
}

export { App, UserContext, ToLoginContext };