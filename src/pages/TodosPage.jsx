import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewsForm from "../features/TodosViewsForm";
import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage=15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOffFirstTodo=(currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(todoState.todoList.length / itemsPerPage);
  const navigate = useNavigate();
  const currentTodos = todoState.todoList.slice(indexOffFirstTodo,indexOffFirstTodo + itemsPerPage);
  
  function handlePreviousPage(){
    const newPage = Math.max(currentPage - 1, 1);
    setSearchParams({ page: newPage });
  }
  function handleNextPage(){
    const newPage = Math.min(currentPage + 1, totalPages);
    setSearchParams({ page: newPage });
  }
  useEffect(() => {
    if(totalPages>0){
    const isInvalidPage =isNaN(currentPage) ||currentPage < 1 ||currentPage > totalPages;
    if (isInvalidPage) {
      navigate("/");
    }

    }
  
}, [currentPage, totalPages, navigate]);


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
      todoList={currentTodos} 
      onCompleteTodo={completeTodo} 
      onUpdateTodo={updateTodo} 
      isLoading={todoState.isLoading}/>
      }
       <div className='paginationControls'>
          <button onClick={handlePreviousPage}  disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button  onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>

        </div>
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