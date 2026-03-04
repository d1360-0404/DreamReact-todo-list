import { useState } from "react";
import TodoListItem from "./TodoListItem";
import styles from "../../assets/TodoList.module.css"

function TodoList({todoList,onCompleteTodo,onUpdateTodo,isLoading}) {
  const filterTodoList=todoList.filter((todo)=>todo.isCompleted !=true);
  if(isLoading){
    return(<p>
      Todo list loading...
    </p>)
  }
  return (
  <>
    {todoList.length>0?
    (<ul className={styles.TodoListStyle} >
      {filterTodoList.map((todo) => (
        <TodoListItem 
        key={todo.id} 
        todo={todo} 
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        />
        ))}
    </ul>)
    :(<p>Please enter a todo</p>)}
  </>

  );
}

export default TodoList