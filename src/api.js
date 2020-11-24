export const getTodos = () => fetch("http://localhost:5001/").then(res => res.json())


export const adduser = (todo) => fetch("http://localhost:5001/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

export const updateTodo = (todo, id) => fetch(`http://localhost:5001/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
   

  },
  
  body: JSON.stringify(todo)
  
})  

export const deleteTodo = (todo, id) => fetch(`http://localhost:5001/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
   

  },
  
  body: JSON.stringify(todo)
  
})  
export const getTodo = (id) => fetch(`http://localhost:5001/${id}`).then(res => res.json())
