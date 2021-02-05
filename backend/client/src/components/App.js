import { useState, useEffect, createContext } from "react";
import "./App.css";
import requests from "../requests/requests";
import { Main } from './main';
import NormalLoginForm from './registerUser/antLogin';
import { Switch, Route, Link } from "react-router-dom";

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
      <Switch >
        {
          displayMainPanel ?
            <div className="main-panel">
              <UserContext.Provider value={user}>
                <ToLoginContext.Provider value={setDisplayMainPanel}>
                  <Route path="/" exact component={Main} />
                </ToLoginContext.Provider>
              </UserContext.Provider>
            </div>
            : <Route path="/login" render={routerProps => <NormalLoginForm {...routerProps} initSession={initSession} /> } />
        }
      </Switch>
    </div>
  )
}

export { App, UserContext, ToLoginContext };