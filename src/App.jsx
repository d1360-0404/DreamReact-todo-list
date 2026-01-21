import './App.css'
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm  from "./features/TodoForm.jsx";
import { useEffect, useState } from 'react';
import { sendResquest } from './util/util.js';
import TodosViewsForm from './features/TodosViewsForm.jsx';

function encodeUrl(sortField,sortDirection,url){
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
}

function App() {
  const [todoList, setTodoList]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [errorMessage,setErrorMessage]=useState(""); 
  const [isSaving,setIsSaving]=useState(false);
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField,setSortField]=useState("createTime");
  const [sortDirection,setSortDirection]=useState("desc");
  
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
         const respond=await sendResquest(encodeUrl(sortField,sortDirection,url),options,setErrorMessage);
         if (!respond) return;
         const {records}= await respond.json();
         setTodoList(records.map((record)=>{
          const example={
              id:record.id,
              title: record.fields.title,                 
              isCompleted: record.fields.isCompleted ?? false,
            }
            return example;
          }));
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
    const options={
      method:'POST',
      headers:{
        Authorization:token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify(payload),
    };
      setIsSaving(true);
      try {
        const respond=await sendResquest(encodeUrl(sortField,sortDirection,url),options,setErrorMessage);
        if (!respond) return;
        const {records}=await respond.json();
        const savedTodo={
          id:records[0].id,
          title:records[0].fields.title,
          isCompleted: records[0].fields.isCompleted ?? false};   
        setTodoList([...todoList,savedTodo]);    
      } finally {
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

  async function updateTodo(editedTodo){
    const originalTodo=todoList.find((todo)=>
      todo.id===editedTodo.id);
    const payload ={
      records:[
        {
          id:editedTodo.id,
          fields:{
            title:editedTodo.title,
            isCompleted:editedTodo.isCompleted,
          },
        },
      ],
    };
    const options={
      method:"PATCH",
      headers:{
        Authorization:token,
        'Content-Type':'application/json'
      },
       body:JSON.stringify(payload),
    }
    try {
      await sendResquest(encodeUrl(sortField,sortDirection,url),options,setErrorMessage);
      setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
      )
    );
      
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const convertedTodos=todoList.map((todo)=>{
        if (todo.id== editedTodo.id){
          return originalTodo;
        };
        return todo;
      })
      setTodoList([... convertedTodos]);
    }
    finally{
            setIsSaving(false);
    }

  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}/>
      {errorMessage !=""? (
        <div>
          <hr />
          <TodosViewsForm/>
          <p>{errorMessage}</p>
          <button onClick={()=>{
            setErrorMessage('');
          }}>Dismiss</button>
        </div>
        ) : null
      }
      <TodosViewsForm/>
      </div>
  )
}

export default App
