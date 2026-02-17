import './App.css'
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm  from "./features/TodoForm.jsx";
import { useEffect, useState,useCallback,useReducer } from 'react';
import { sendResquest } from './util/util.js';
import TodosViewsForm from './features/TodosViewsForm.jsx';
import styles from "./assets/App.module.css"
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';


function App() {
  //const [todoList, setTodoList]=useState([]);
  //const [isLoading,setLoading]=useState(false);
  //const [errorMessage,setErrorMessage]=useState(""); 
  //const [isSaving,setIsSaving]=useState(false);
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField,setSortField]=useState("createdTime");
  const [sortDirection,setSortDirection]=useState("desc");
  const [queryString,setQueryString]=useState("");

  const [todoState,dispatch]=useReducer(todosReducer,initialTodosState);

  const encodeUrl=useCallback(()=>{
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery="";
    if (queryString!==''){
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
    },[sortField, sortDirection, queryString, url])
  
  useEffect(()=>{
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options={
        method:"GET",
        headers:{
          Authorization: token,
        },
      };
      try {
         const respond=await sendResquest(encodeUrl(),options);
         if (!respond) return;
         const {records}= await respond.json();
        dispatch({type: todoActions.loadTodos, records:records});
         
        }catch (error) {
          dispatch({type: todoActions.setLoadError,error: error.message,});
        }finally{
        dispatch({type: todoActions.turnOffLoading});

      }
    };
    fetchTodos();
  },[sortDirection,sortField,queryString]);

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
      dispatch({type: todoActions.startRequest});
      try {
        const respond=await sendResquest(url,options,);
        if (!respond) return;
        const {records}=await respond.json();
        dispatch({type: todoActions.addTodo, records:records})  
      }catch (error) {
          dispatch({type: todoActions.setLoadError});
      }finally {
          dispatch({type: todoActions.endRequest});

        }
  }
  function completeTodo(id) {
    dispatch({type: todoActions.completeTodo,id })
  }

  async function updateTodo(editedTodo){
    const originalTodo=todoState.todoList.find((todo)=>
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
    dispatch({type:todoActions.startRequest});
    try {
      await sendResquest(url,options);
      dispatch({type: todoActions.updateTodo, editedTodo})
    ;
    } catch (error) {
      console.log(error.message);
      dispatch({type: todoActions.revertTodo, originalTodo,error:`${error.message}. Reverting todo...` })
    }
    finally{
      dispatch({type: todoActions.endRequest});
    }

  };

  return (
    <div className={styles.AppStyle}>
      <div className="header">
        <img src="learns-dark.png" alt="logo" />
        <h1>My Todos</h1>  
      </div>
        
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving}/>
      
      {todoState.errorMessage!=""? (
        <div className={styles.DivErrorStyle}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={()=>{
            dispatch({type: todoActions.clearError});
          }}>Dismiss</button>
        </div>
        ) : <TodoList 
      todoList={todoState.todoList} 
      onCompleteTodo={completeTodo} 
      onUpdateTodo={updateTodo} 
      isLoading={todoState.isLoading}/>
      }
      <TodosViewsForm 
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
        
      />
      </div>
  )
}

export default App
