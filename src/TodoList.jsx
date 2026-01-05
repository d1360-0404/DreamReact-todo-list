import TodoListItem from "./TodoListItem";

function TodoList({todoList,onCompleteTodo}) {
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
        />
        ))}
    </ul>)
    :(<p>Please enter a todo</p>)}
  </>

  );
}

export default TodoList