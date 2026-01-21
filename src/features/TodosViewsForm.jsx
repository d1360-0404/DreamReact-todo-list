
function TodosViewsForm (){

return(
  <form>
    <div>
      <label>Sort by</label>
      <select >
        <option value="title">Title</option>
        <option value="createdTime">Time added</option>
      </select>
      <label >Direction</label>
      <select>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    
  </form>
);
}

export default TodosViewsForm