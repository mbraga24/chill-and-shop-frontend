import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER } from './type';

const defaultState = {
  orders: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ORDERS:
      return {
        ...state, 
        orders: [...action.payload]
      }
    case ADD_ORDER: 
      return {
        ...state,
        orders: [...state.orders, action.payload]
      }
    case REMOVE_ORDER:
      const filteredOrders = state.orders.filter(o => o.id !== action.payload);
      return {
        ...state, 
        orders: [...filteredOrders]
      }
    default:
      return state
      
  }
}

export default reducer;