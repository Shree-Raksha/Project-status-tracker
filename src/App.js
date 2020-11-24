
import React, { useState, useEffect} from "react"
import { BrowserRouter, Switch, Route , Router } from "react-router-dom";
import Axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Header from './components/layout/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/UserContext';
import CreateProject from './pages/CreateProject';
import Adduser from "./pages/Adduser";
import Edituser from './pages/Edituser';
import Displayuser from './pages/Displayuser';
import DeleteTodo from './pages/Deleteuser'
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import "./style.css";


export const CredentialsContext = React.createContext();
 function App() {
    const credentialsState = useState(null);
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
     
    useEffect(() => {
        const checkLoggedIn = async () =>{
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid", null, {headers: { "x-auth-token": token }});

             if (tokenRes.data) {
          const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
            token,
            user: userRes.data,
          });
        }
    };
        checkLoggedIn();
    }, []);
    return(
         <>
        <div className="App">
        <CredentialsContext.Provider value={credentialsState}>
        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <Header />
                <div className="container-form">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/createProject" component={CreateProject} />
                        <Route path="/adduser" component={Adduser} />
                        <Route path="/edit/:id" component={Edituser} />
                        <Route path="/displayuser" component={Displayuser} />
                        <Route path="/delete/:id" component={DeleteTodo} />
                     
  
                        
        
                    </Switch>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
        </CredentialsContext.Provider>
    </div>
    </>
    );
}

export default App;

