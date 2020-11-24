import React, { Component,  useContext , useState } from 'react'
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
export default class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    const id = event.target.id;
    console.log(id);
    sessionStorage.setItem('buttonPressed',id)
  }
  render() {

    return (
    
         
      <div  className="bck1">
        
        
         
          <div class="row pt-2">
           
            <div class="col-sm-3">
              
            
            </div>
              <div class="col-sm-6">
                 
                 <div className="homepagebox">
            <h1 style={{ textAlign: "center", color: "white" , fontSize:"x-large"}}>Select Project Division  </h1> 
           
            <br>
            </br>
            <div>
                  <a  href="createProject"> 
                  <button className="prjDivisionBtn" id="webdevelopment" onClick={this.handleClick}>web development</button>
                  </a>
              </div>
              <div>
                   <a  href="createProject">         
                  <button className="prjDivisionBtn" id="Python" onClick={this.handleClick}>Python</button>
                  </a>
              </div>
              <div>
                  <a  href="createProject">          
                  <button className="prjDivisionBtn"  id="Networking" onClick={this.handleClick}>Networking</button>
                  </a>
              </div>
              <div>
                  <a  href="createProject">          
                  <button className="prjDivisionBtn"  id="Testing" onClick={this.handleClick}>Testing</button>
                  </a>
                  
              </div>
          
              </div>
              </div>
              <div class="col-sm-3">

</div>
            
          </div>
      </div>
         
      
              
              
  
      )
  }
}
