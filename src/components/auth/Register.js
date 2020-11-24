import React, {useState, useContext} from 'react'
import Axios from 'axios'
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();


    const { setUserData} = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) =>{
       e.preventDefault();

       try{
       const newUser = { email, password, passwordCheck, displayName};
        await Axios.post("http://localhost:5000/users/register",newUser);
        const loginRes = await Axios.post("http://localhost:5000/users/login",{email,password,});
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
        }catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
          }
    };

    return (
        <div className="bck">
        <div class="row pt-2">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-6">
          <div className="container homepagebox">

          <h1>Register</h1>
          <br></br>
           {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
           <form className="form" onSubmit={submit}>
               <label htmlFor="register-email">Email</label>
               <input id="register-email" type="email"
               onChange={(e) => setEmail(e.target.value)}/>

               <label htmlFor="register-password">Password</label>
               <input id="register-password" type="password"
                onChange={(e) => setPassword(e.target.value)}/>

               <label>Confirm Password</label>
               <input  type="password" placeholder="Enter password"
                onChange={(e) => setPasswordCheck(e.target.value)}/>

               <label htmlFor="register-display-name">Display Name</label>
               <input id="register-display-name" type="text"
                onChange={(e) => setDisplayName(e.target.value)}/>

               <button  className="pinkbtn"  type="submit">Register</button>
           </form>

          </div>
        </div>
        <div class="col-sm-3"></div>
        
          
        </div>
        <div className="space"></div>
          
        </div>
    )
}
