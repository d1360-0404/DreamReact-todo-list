import { useState } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({todoList,onCompleteTodo,onUpdateTodo}) {
  const filterTodoList=todoList.filter((todo)=>todo.isCompleted !=true);
  return (
  <>
    {todoList.length>0?
    (<ul>
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