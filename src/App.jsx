import './App.css'
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm  from "./features/TodoForm.jsx";
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [errorMessage,setErrorMessage]=useState(""); 
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(()=>{
    const fetchTodos = async () => {
      setLoading(true);
      const options={
        method:"GET",
        headers:{
          Authorization: token,
        },
      };
      try {
          const resp=await fetch(url,options);
          if(!resp.ok){
            throw new Error(resp.message);
          }
          const {records}=await resp.json();
          setTodoList(records.map((record)=>{
            const example={
              id:record.id,
              ...record.fields,
            }
            if(!example.booleanProperty){
              example.booleanProperty=false;
            }
            return example;
          }));
          
        } 
        catch (error) {
          setErrorMessage(error.message);
      }finally{
        setLoading(false);
      }
    };
    fetchTodos();
  
  },[]);

  function addTodo(title){
    const newTodo={
      title:title,
      id:Date.now(),
      isCompleted:false,
    };
    setTodoList([...todoList,newTodo]);
  }
  function completeTodo(id) {
    const updatedTodos=todoList.map((todo)=>{
      if(todo.id === id){
        return {...todo,isCompleted:true};
      }
      return todo;
    })
    setTodoList(updatedTodos);
  }

  function updateTodo(editedTodo){
    const updatedTodos=todoList.map((todo)=>{
        if(todo.id ===editedTodo.id){
          return {...editedTodo}
        }
        else{
          return todo;
        }
      });
    setTodoList(updatedTodos);
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}/>
      {errorMessage !=""? (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={()=>{
            setErrorMessage('');
          }}>Dismiss</button>
        </div>
        ) : (
          <React.Fragment></React.Fragment>
      )
      };
      </div>
  )
}

export default App
