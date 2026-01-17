import { useEffect, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({todo,onCompleteTodo,onUpdateTodo}){
  const[isEditing,setIsEditing]=useState(false);
  const [workingTitle,setWorkingTitle]=useState(todo.title);

  function handelCancel(){
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  function handleEdit(event){
    setWorkingTitle(event.target.value);
  }
  function handelUpdate(event){
    if(isEditing===false){return}
    else{
      event.preventDefault();
      onUpdateTodo({...todo,title:workingTitle});
      setIsEditing(false);
    }
  }
  useEffect(()=>{
    setWorkingTitle(todo.title)
  },[todo])


return (
  <li>
    <form onSubmit={handelUpdate}>
      {isEditing?(
        <>
          <TextInputWithLabel elementId={`edit-${todo.id}`} value={workingTitle} onChange={handleEdit}/>
          <button type="button" onClick={handelCancel}>Cancel</button>
          <button type="button" onClick={handelUpdate}>Update</button>
        </>
      ):
      (<>
      <label>
        <input 
          type="checkbox" 
          checked={todo.isCompleted} 
          onChange={()=>onCompleteTodo(todo.id)}/>
     
      </label>
      <span onClick={()=>setIsEditing(true)}>{todo.title}</span>
      </>)
      }
    </form>
  </li>
  );
}

export default TodoListItem