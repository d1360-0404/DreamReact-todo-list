
const initialState={
  todoList:[],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
};

const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
    turnOffLoading:'turnOffloading'
};

function reducer(state=initialState, action){

  switch(action.type){
    case 'turnOffloading':
      return {
        ...state,
        isLoading:false
      }
    case 'fetchTodos':
      return{
        ...state,
        isLoading:true,
      };
    case 'loadTodos':
      const list=action.records.map((record)=>{
        const todo={
          id:record.id,
          ...record.fields
        };
        if(!record.fields.isCompleted){
          todo.isCompleted=false;
        }
        return todo;
      });
      return{
        ...state,
        todoList:[...list],
        isLoading:false,
      };
    case 'setLoadError':
      return{
        ...state,
        errorMessage:action.error,
        isLoading:false,
      };
    case 'startRequest':
      return{
        ...state,
        isSaving:true,
      };
    case 'addTodo':
      const savedTodo={
        id:action.records[0].id,
        title:action.records[0].fields.title,
        isCompleted:action.records[0].fields.isCompleted ?? false,
      }
      return{
        ...state,
        todoList:[...state.todoList,savedTodo],
        isSaving:false,
      };
    case 'endRequest':
      return{
        ...state,
        isLoading:false,
        isSaving:false,
      };
    case 'completeTodo':
      const updateTodo=state.todoList.map((todo)=>{
        if(todo.id===action.id){
          return {...todo,isCompleted:true}
        }
        else{
          return todo;
        }
      });
      return{
        ...state,
        todoList:updateTodo
      };
    case 'revertTodo':
      action.editedTodo = action.originalTodo;
      
     case 'updateTodo':
      const updatedTodos=state.todoList.map((todo)=>{
        return todo.id === action.editedTodo.id ? action.editedTodo : todo
      });
      const updatedState={
        ...state,
        todoList:updatedTodos
      };
      if(action.error){
         updatedState.errorMessage = action.error.message;
      }
      return updatedState ;
    case 'clearError':
      return{
        ...state,
        errorMessage:""
      };
  }
}


export {actions,reducer,initialState};
