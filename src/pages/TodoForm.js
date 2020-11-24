import React from "react";
import { useForm } from "react-hook-form";

export const TodoForm = ({ todo, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ?
      todo.text : "none" } ,
  });


  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
   
  });
 
 
 

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="text">Name:</label>
        <input
          className="form-control"
          ref={register}
          type="text"
          name="text"
          id="text"
        />
        <label htmlFor="status">Progress:</label>
        <input
          className="form-control"
          ref={register}
          placeholder="/100"
          type="text"
          name="status"
          id="status"
        />
      </div>
      <div className="form-group">
     <button className="pinkbtn" type="submit">ADD</button>
      </div>
    </form>
  );
};