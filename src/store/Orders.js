import { SET_ORDERS, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER, UPDATE_TOTAL_ORDER } from './type';

const defaultState = {
  orders: [],
  totalOrder: 0
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
    case UPDATE_ORDER: 
    console.log("UPDATE_ORDER", action.payload) 
      const updatedOrder = state.orders.map(order => {
        if (order.id === action.payload.id) {
          return action.payload
        } else {
          return order
        }
      })
      return {
        ...state,
        orders: [...updatedOrder]
      }
    case REMOVE_ORDER:
      const filteredOrders = state.orders.filter(o => o.id !== action.payload);
      return {
        ...state, 
        orders: [...filteredOrders]
      }
    case UPDATE_TOTAL_ORDER:
      return {
        ...state,
        totalOrder: action.payload
      }

    default:
      return state
      
  }
}

export default reducer;