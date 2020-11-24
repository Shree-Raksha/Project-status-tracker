import React, {useState, useContext} from 'react'
import Axios from 'axios'
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{ 
          const loginUser = { email, password };
          const loginRes = await Axios.post(
            "http://localhost:5000/users/login",
            loginUser
          );
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

          <h2>Log In</h2>
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
        <form className="form" onSubmit={submit}>
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email"
            onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password"
             onChange={(e) => setPassword(e.target.value)}/>

            

<button  className="pinkbtn"  type="submit">Log In</button>
        </form>

          </div>
        </div>
        <div class="col-sm-3"></div>
        
          
        </div>
        <div className="space"></div>

       
     </div>
        
    )
}
