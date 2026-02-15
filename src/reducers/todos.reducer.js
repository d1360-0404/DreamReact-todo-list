
const initialState={
  todoList:[],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
  sortField: "createdTime",
  sortDirection: "desc",
  queryString: "",
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
};

function reducer(state=initialState, action){

  switch(action.type){
    case action.fetchTodos:
      return{
        ...state,
      };
    case action.loadTodos:
      return{
        ...state,
      };
    case action.setLoadError:
      return{
        ...state,
      };
    case action.startRequest:
      return{
        ...state,
      };
    case action.addTodo:
      return{
        ...state,
      };
    case action.endRequest:
      return{
        ...state,
      };
    case action.updateTodo:
      return{
        ...state,
      };
    case action.completeTodo:
      return{
        ...state,
      };
    case action.revertTodo:
      return{
        ...state,
      };
    case action.clearError:
      return{
        ...state,
      };
  }


}


export default {initialState,actions};
