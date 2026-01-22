import { useRef,useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({onAddTodo}) {
	const [workingTodoTitle,setWorkingTodoTitle]=useState("")
	const todoTitleInput=useRef(null);

	function handleAddTodo(event){
		event.preventDefault();
		onAddTodo(workingTodoTitle);
		setWorkingTodoTitle("");
		todoTitleInput.current.focus();
	}

  return(
		<form onSubmit={handleAddTodo}>
			<TextInputWithLabel 
			ref={todoTitleInput} 
			value={workingTodoTitle}
			onChange={(event)=>setWorkingTodoTitle(event.target.value)}
			elementId={"todoTitle"}
			label={"Todo"}
			>
			</TextInputWithLabel>
			<button disabled={workingTodoTitle.trim()===""}>Add todo</button>
		</form>
  )
}

export default TodoForm