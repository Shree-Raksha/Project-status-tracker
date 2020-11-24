import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getTodos } from "../api"
import { CredentialsContext } from "../App";
import { useContext } from 'react';
import UserContext from "../context/UserContext";
import axios from "axios";
import "../style.css";


export default function Displayuser() {
  const [items, setItems] = useState([])
  const { userData } = useContext(UserContext);
  const [credentials] = useContext(CredentialsContext);
  let projectDivision = sessionStorage.getItem('buttonPressed')
  let projectName = sessionStorage.getItem('projectname')
  let setdate = sessionStorage.getItem('date')
  useEffect(() => {
    const fetchItems = async () => {
      const todos = await getTodos()
      setItems(todos)

    }
    fetchItems()
  }, [])



  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setUser(result.data.reverse());



  };


  const deleteUser = async id => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    alert("Do you want to delete user!!")
    loadUsers();
  };


  return (
    <div className="bckdiplsay">
      <div className="row_row">
        <div class="col-sm-12">
       
            {userData.user ? (
              <>
   <div className="homepageboxdislist">
                <div className="mt-3">
                  <h2 style={{ color: "#380af0c7", fontFamily: "cursive" }}>Project Details</h2>
                  <h5>Assigned By:{userData.user.displayName}</h5>
                  <h5>Project Division:{projectDivision}</h5>
                  <h5>Project Name: {projectName}</h5>
                  <h5>Project Assigned On: {setdate}</h5>

                  <div className="py-4">
                  <h2 style={{ color: "#380af0c7", fontFamily: "cursive", marginTop: "-20px" }}>Team List</h2>
        <table class="table1 border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">PSI</th>
              <th scope="col">status</th>
              <th scope="col">Task</th>
              <th scope="col">ETA</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.PSI}</td>
                <td>{user.status}</td>
                <td>{user.task}</td>
                <td>{user.date}</td>
                <td>
                  <Link
                   className="displaybtn"
                    to={`/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                     className="displaybtn1"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a  href="adduser">
       <button className="bluecreatebtn">Add user</button>  
          </a>
                                                                      
      </div>

                </div>
 </div>
              </>

            ) : (
                <>
                  <h2>You are not logged in</h2>
                  <Link to="/login">Log in</Link>
                </>
              )}
  </div>
       
        


      </div>
      <div className="space">

      </div>
    </div>
  );
};