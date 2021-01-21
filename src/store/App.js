import { LOGGED_IN, SET_BANNER } from './type';

const defaultState = {
  currentUser: localStorage.token ? localStorage.token : null,
  messageBanner: ""
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGGED_IN:
      return {
        ...state, 
        currentUser: action.payload
      }
    case SET_BANNER: 
      return  {
        ...state,
        messageBanner: action.payload
      }
    default: 
      return state
  }
}

export default reducer; 