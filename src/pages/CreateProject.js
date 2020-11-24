import React, { useContext, useState } from 'react'
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'



const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
}

const handleErrorsexist = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
}

export default function CreateProject() {
  const [projectname, setProjectname] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const { userData } = useContext(UserContext);
  const [error1, setErrorexist] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());


  const Createproject = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/createproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectname,

      }),
    })

      .then(handleErrors)
      .then(() => {
        setCredentials({
          projectname,
        });
        history.push("/adduser");
      })
      .catch((error) => {
        setError(error.message);
      })
    console.log(projectname)
    sessionStorage.setItem('projectname', projectname)
  };


  const Existingproject = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/existingproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectname,

      }),
    })

      .then(handleErrorsexist)
      .then(() => {
        setCredentials({
          projectname,
        });
        history.push("/adduser");
      })
      .catch((error1) => {
        setErrorexist(error1.message);
      })
      sessionStorage.setItem('projectname', projectname)
  };

  const displayDate = selectedDate => {
    setSelectedDate(selectedDate)
    var newdate = selectedDate.toISOString().slice(0, 10);
    console.log(newdate)
    sessionStorage.setItem("date", newdate);
  }


  const history = useHistory();

  return (
    <div className="bck3">
      <div class="row pt-2">
        <div class="col-sm-2">

        </div>
        <div class="col-sm-8">
          <div className="homepageboxcreateprj">

              {userData.user ? (
                <>
                  <h2>Hello!{userData.user.displayName}</h2>
                  <h4>Let's Create New Project</h4>
                  {error && <span style={{ color: "red" }}>{error}</span>}
                        <form onSubmit={Createproject}>
                          <label >Project Name: </label>
                          <input type="text" onChange={(e) => setProjectname(e.target.value)} />
                          <button className="pinkbtncreate" type="submit">CREATE</button>
                        </form>

                        <h4>Existing Project</h4>
                        {error1 && <span style={{ color: "red" }}>{error1}</span>}
                        <form onSubmit={Existingproject}>
                            <label >Project Name:</label>
                            <input type="text" onChange={(e) => setProjectname(e.target.value)} />
                            <button className="pinkbtncreate" type="submit">CREATE</button>
                            <div className="page">
                    <label>Assigned Date: </label>
                    <Calendar   className="Calendar" onChange={displayDate} value={selectedDate} />

                    </div>
                  </form>
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
  )
}
