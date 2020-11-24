import React from "react";
import { useForm } from "react-hook-form";

export const Draftform= ({ todo, onSubmit }) => {
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
        <label htmlFor="text">Text:</label>
        <input
          className="form-control"
          ref={register}
          type="text"
          name="text"
          id="text"
          value="none"
        />
        <label htmlFor="status">Status:</label>
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
        <button type="submit" className="btn btn-primary">
         delete
        </button>
      </div>
    </form>
  );
};