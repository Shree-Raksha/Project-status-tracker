import React, { useState,  useContext, useEffect  } from "react";
import axios from 'axios'
import { useHistory, useParams  } from "react-router-dom";
import UserContext from "../context/UserContext";
import { CredentialsContext } from "../App";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";


const Edituser  = () => {
  const { userData } = useContext(UserContext);
const [, setCredentials] = useContext(CredentialsContext);
  let history = useHistory();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    PSI: "",
    status: "",  
    task: "",
    date:new Date(),
  });

  const { name, PSI, status, task, date } = user;
  const onInputChange = e => {
    
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/users/${id}`, user);
    history.push("/displayuser");
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3001/users/${id}`);
    setUser(result.data);
  };

  return (

    <div className="bck3">
    <div class="row pt-2">
      <div class="col-sm-2">

      </div>
      <div class="col-sm-8">
        <div className="homepageboxcreateprj">

            {userData.user ? (
              <>
            <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add User to Project</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
           <div className="row">
             <div className="col-sm-2">
                <h3>Name: </h3>
             </div>
             <div className="col-sm-10">
             <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
             </div>
            </div>
          </div>
          <div className="form-group">
          <div className="row">
             <div className="col-sm-2">
              <h3>PSI:</h3>
             </div>
                <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your PSI"
                  name="PSI"
                  value={PSI}
                  onChange={e => onInputChange(e)}
                />
                </div>
            </div>
         
          </div>
          <div className="form-group">
          <div className="row">
             <div className="col-sm-2">
              <h3>Status:</h3>
             </div>
                <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Project Status out of %100"
                  name="status"
                  value={status}
                  onChange={e => onInputChange(e)}
                />
                </div>
            </div>
         
           
          </div>
  
          <div className="form-group">
          <div className="row">
             <div className="col-sm-2">
              <h3>Task:</h3>
             </div>
                <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Assign task"
                  name="task"
                  value={task}
                  onChange={e => onInputChange(e)}
                />
                </div>
            </div>
           
          </div>
          <div className="form-group">
            <label><h5>ETA:</h5></label>
            <Form.Control
            type="date"
            name="date"
            required
            placeholder="enter date" onChange={e => onInputChange(e)} />
        
          </div>
          <button className="pinkbtn">Edit User</button>
                                                             
        </form>
      </div>
              </>

            ) : (
                <>
                 <h2>You are not logged in</h2>
                  <a href="/login">
                  <button className="pinkbtn" type="submit">Log In</button>
                  </a>
                </>
              )}
      
        </div>
      </div>
      <div class="col-sm-2">


      </div>
    </div>
  </div>
  );
};

export default Edituser ;