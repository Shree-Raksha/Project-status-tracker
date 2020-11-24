import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../style.css";
export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div  className="bck">
        <div class="row pt-2">
        <div class="col-sm-6">
        <div className="homepagebox">
      {userData.user ? (
          <>
          <div>
            
             <img className="logogif" src="https://media.tenor.com/images/e9f2c2b27a54df8bcb787fc248021259/tenor.gif"></img>
             <br></br>
             <br></br>
          </div>
        <h1>Welcome {userData.user.displayName}</h1>
        <a href="/dashboard">
          <button className="pinkbtn" type="submit">Dashboard</button>
        </a>
        
        </>
        
      ) : (
        <>
        <div>
             <img className="logo" src="https://img.icons8.com/nolan/2x/project.png"></img>
          </div>
          <h1>Hello! Admin</h1>
          <h2>You are not logged in</h2>
          <a href="/login">
          <button className="pinkbtn" type="submit">Log In</button>
          </a>
          
        </>
      )}
    </div>
        
        
        </div>
        <div class="col-sm-6">
          <div>
         <h1  className="Dashboard_title"> "Talent wins games, but teamwork and intelligence win championships." </h1>
         <h1 style={{ textAlign: "center", color: "white" , fontSize:"x-large"}}>--Michael Jordan</h1>
       </div>
        </div>
        </div>
      
  
    </div>

  );
}