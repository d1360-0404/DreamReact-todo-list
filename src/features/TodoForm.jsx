import { useRef,useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from 'styled-components'

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
		font-family: "Times New Roman";
  }
`;

function TodoForm({onAddTodo,isSaving}) {
	const [workingTodoTitle,setWorkingTodoTitle]=useState("")
	const todoTitleInput=useRef(null);

	function handleAddTodo(event){
		event.preventDefault();
		onAddTodo({title:workingTodoTitle,isComplete:false});
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
			<StyledButton disabled={workingTodoTitle===""}>
				{
					isSaving? 'Saving':'Add todo'
				}
			</StyledButton>
		</form>
  )
}

export default TodoForm