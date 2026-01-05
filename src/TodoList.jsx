import TodoListItem from "./TodoListItem";

function TodoList({todoList}) {
 return (
  <>
    {todoList.length>0?
    (<ul>
      {todoList.map((todo) => (<TodoListItem key={todo.id} todo={todo}/>))}
    </ul>)
    :(<p>Please enter a todo</p>)}
  </>

  );
}

export default TodoList