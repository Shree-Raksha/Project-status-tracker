import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";

import { useRouteMatch, useHistory } from "react-router-dom";
import { getTodo, deleteTodo } from "../api";
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from "../context/UserContext";
import {Draftform} from './Draftform'

export default function DeleteTodo()  {
  const match = useRouteMatch()
  const [todo, setTodo] = useState();
                 
  const history = useHistory()
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(match.params.id)
      setTodo(todo)
    
    }
    fetchTodo()
  }, []);

  const onSubmit = async (data) => {
    await deleteTodo(data, match.params.id)

   
    history.push("/displayuser")
  
  }

  return todo ? (
    <div className="container">


        {userData.user ? (
                <>
                
                <div className="mt-3">
                <div className="mt-3">
                    <h3>are you sure</h3>
                    <Draftform todo={todo} onSubmit={onSubmit}/>
                  
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
  ) : (
    <div>Loading...</div>
  );
};