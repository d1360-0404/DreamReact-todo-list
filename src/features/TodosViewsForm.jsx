import { useEffect,useState } from "react";
import styled from 'styled-components'

const StyledForm=styled.form`
  
`;
const StyledSelect=styled.select `
  background-color:transparent;
`;
const StyledSelectDiv=styled.div`
  
`;

function TodosViewsForm ({sortDirection,setSortDirection,sortField,setSortField,queryString,setQueryString}){
  const [localQueryString, setLocalQueryString] = useState(queryString);

  function preventRefresh(event){
    event.preventDefault();
  }

  useEffect(()=>{
    const debounce=setTimeout(()=>{
      setQueryString(localQueryString);
    },500)
    return ()=> clearTimeout(debounce);

  },[localQueryString,setQueryString])

return(
  <StyledForm onSubmit={preventRefresh}>
    <div>
      <label >Search todos</label>
      <input type="text" value={localQueryString} onChange={(e)=>{setLocalQueryString(e.target.value)}}/>
      <button type="button" onClick={(event)=>{
        event.preventDefault();
        setLocalQueryString("")
      }}>clear</button>
    </div>
    <div>
      <label>Sort by</label>
      <StyledSelect  onChange={(event)=>{
        setSortField(event.target.value)
      }} value={sortField}>
        <option value="title">Title</option>
        <option value="createdTime">Time added</option>
      </StyledSelect>
      <label >Direction</label>
      <StyledSelect onChange={(event)=>{
        setSortDirection(event.target.value)
      }} value={sortDirection}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </StyledSelect>
    </div>
    
  </StyledForm>
);
}

export default TodosViewsForm