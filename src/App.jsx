import './App.css'
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm  from "./features/TodoForm.jsx";
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [errorMessage,setErrorMessage]=useState(""); 
  const [isSaving,setIsSaving]=useState(false);
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
              title: record.fields.title,                 
              isCompleted: record.fields.isCompleted ?? false,
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

  async function addTodo(newTodo){
    const payload ={
      records:[
        {
          fields:{
            title:newTodo.title,
            isCompleted:newTodo.isCompleted,
          },
        },
      ],
    };
    const option={
      method:'POST',
      headers:{
        Authorization:token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp=await fetch(url,option);
      if(!resp.ok){
        throw new Error(resp.message)
      }
      const {records}=await resp.json();
      const savedTodo={
        id:records[0].id,
        title:records[0].fields.title,
        isCompleted: records[0].fields.isCompleted ?? false
      };       
      setTodoList([...todoList,savedTodo]);
      
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }finally{
      setIsSaving(false);
    }
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
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}/>
      {errorMessage !=""? (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={()=>{
            setErrorMessage('');
          }}>Dismiss</button>
        </div>
        ) : null
      }
      </div>
  )
}

export default App
