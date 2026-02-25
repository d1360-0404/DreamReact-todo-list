import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewsForm from "../features/TodosViewsForm";

function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString
}){


  return(
    <>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving}/>

      {todoState.errorMessage!=""? (
        <div className={styles.DivErrorStyle}>
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
    
    </>
  )
}
export default TodosPage